<style scoped>
    @import url("../../styles/exibServ/valvesDir.scss");
</style>

<template>
    <div class="box_valvesDir">

        <!-- Títulos -->
        <div class="boxTit">
            <span class="tit">Painel de controle</span>
        </div>

        <!-- controle de válvulas -->
        <div class="boxControl" v-if="!flagLoadingDialog">
            <div class="boxValves mt-2 mr-2">
                <div class="statusValves">
                    <div class="titValve">Status</div>
                    <div class="linhaStatusValve">

                        <div class="colValve">
                            <span class="valve">Válvula 1</span>
                            <span class="valveValue">{{ valve1 }}</span>
                            <span :style="{'font-size':'0.8rem'}" class="valveValue">{{ rcvValve1 }}</span>
                        </div>

                        <div class="colValve">
                            <span class="valve">Válvula 2</span>
                            <span class="valveValue">{{ valve2 }}</span>
                            <span :style="{'font-size':'0.8rem'}" class="valveValue">{{ rcvValve2 }}</span>
                        </div>
                    </div>
                </div>

                <div class="btnsValves mt-2">
                    <div class="titValve">Acionamentos</div>
                    <div class="linhaBtns">
                        
                        <div class="btnOne">
                            
                            <span :style="{'align-self':'center'}">Válvula 1</span>

                            <v-btn :disabled="isButton1Disabled"
                            @click="trig('valve1',reqValve1)">{{ this.reqValve1 }}</v-btn>
                        </div>

                        <div class="btnOne">
                            <span :style="{'align-self':'center'}">Válvula 2</span>
                            
                            <v-btn :disabled="isButton2Disabled"
                            @click="trig('valve2',reqValve2)">{{ this.reqValve2 }}</v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="boxRes mt-2" v-if="!flagLoadingDialog && flagRes">
            <span class="">{{ msgRes }}</span>
            <span class="mt-1">{{ dateSent }}</span>
        </div>

        <!-- LOADING SENDING -->
        <div v-if="flagLoadingDialog" class="boxControl mt-2"
        :style="{'display':'flex','align-items':'center','justify-content':'center'}">
            <v-progress-circular 
                color="rgb(247,215,46)"
                size="64"
                indeterminate
            ></v-progress-circular>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { myDate } from './aux1.js';

export default {

    data() {
        return {
            flagLoadingDialog:false,
            flagRes:false,
            dateSent:null,
            msgRes:'Acionamento solicitado',

            //
            valve1:'-',
            valve2:'-',
            rcvValve1:'',
            rcvValve2:'',
            liHistValves:[],

            flagValveLocal:true,

            reqValve1:'Ligar', // init antes do created processar o status.
            reqValve2:'Ligar',

            isButton1Disabled:false,
            isButton2Disabled:false,
        }
    },

    methods:{
        //
        trig(flagStr,solicitado) {
            console.log('Start-func-send')
            this.flagLoadingDialog = true

            // desabilitar botão para evitar conflito de envios de downlink.

            var comando = ''

            var date = myDate() // chamar date apenas 1 vez devido à sincronia timestamp.

            //var el2exib = {
            //    'orig':'cliente',
            //    'solicitado':solicitado, // info local.
            //    'rcvValves':date,
            //}
            //console.log('date: ',date)

            // -- converter para o modelo do db. Manter sincronizado. db eng front pt.
            if (solicitado == 'Ligar') { 
            
                solicitado = 'open' 
                //el2exib['cor'] = 'rgb(31,122,177)' // 'on' => azul claro. 'off' => amarelo queimado.
            
            } else { 

                solicitado = 'close' 
                //el2exib['cor'] = 'rgba(173, 99, 1, 0.8)'
            }

            if (flagStr == 'valve1') {

                comando = ["FF","1D","A0","00",date,solicitado,'direto'] // info envio.
                this.isButton1Disabled = true
                //el2exib['valve'] = 'a0'

            } else {

                comando = ["FF","1D","A1","00",date,solicitado,'direto'] // info envio.
                this.isButton2Disabled = true
                //el2exib['valve'] = 'a1'
                
            }
            //console.log('date: ',date)

            //if (this.liHistValves.length == 0) {
            //    this.liHistValves.push(el2exib) // 1o input.
            //} else {
            //    this.liHistValves.unshift(el2exib) // add na 1a posição.
            //    this.liHistValves.pop() // retirar o ultimo elemento.
            //}

            console.log('Start-send')
            var payload = {'comando':comando}
            var self = this
            axios.post(self.$store.state.pathAxiosPostValve, payload).then(function (res) {

                console.log(res.data.result) // receber status após uplink com resultado do control

                self.msgRes = 'Falha de solicitação'

                if (res.data.result == 'comando-enviado') {

                    self.msgRes = 'Acionamento solicitado'
                }


                if (res.data.result == 'current-op') {

                    self.msgRes = 'Operação em andamento. Tente novamente mais tarde.'
                }
            
                self.dateSent = date // obtida antes do envio => date registrada no db.
                self.flagLoadingDialog = false
                self.flagRes = true
            })
        },

        handleValvesStatus() {

            var self = this

            // -- obter status atual das válvulas.
            // ---- | A0 <-> valve 1 | A1 <-> valve 2 |.
            var flagValve1ContentRcv = false // true quando o conteúdo estiver sido atualizado.
            var flagConfirmValve1 = false
            var indexFlagConfirmVV1 = 0 // confirmar o que foi solicitado.
            var flagValve2ContentRcv = false
            var flagConfirmValve2 = false // true quando houve confirmação de solicitação de alteração.
            var indexFlagConfirmVV2 = 0
            let c=0
            while (c <= self.liHistValves.length-1) {

                if (self.liHistValves[c]['valve'] == 'a0') {

                    if (self.liHistValves[c]['sinc'] == 'confirmado' && !flagConfirmValve1
                        && !flagValve1ContentRcv
                    ) {

                        flagConfirmValve1 = true
                        indexFlagConfirmVV1 = c
                    }

                    //
                    if (self.liHistValves[c]['sinc'] == 'solicitado' && !flagValve1ContentRcv) {

                        // -- obter status de solicitação.
                        var statusReq_1 = self.liHistValves[c]['solicitado']
                        if (flagConfirmValve1) {

                            // -- o conteúdo solicitado FOI efetivado.
                            if (statusReq_1 == 'open') { 
                                self.valve1 = 'on' 
                                self.reqValve1 = 'Desligar' // sempre o oposto do status da válvula.
                                self.liHistValves[indexFlagConfirmVV1]['solicitado'] = 'Ligar' // informar o que foi confirmado.
                                self.liHistValves[indexFlagConfirmVV1]['cor'] = 'rgb(31,122,177)' // cores de confirm apenas local.
                            } else { 
                                self.valve1 = 'off' 
                                self.reqValve1 = 'Ligar'
                                self.liHistValves[indexFlagConfirmVV1]['solicitado'] = 'Desligar'
                                self.liHistValves[indexFlagConfirmVV1]['cor'] = 'rgba(173, 99, 1, 0.8)'
                            }

                        } else {

                            // -- o conteúdo solicitado NÃO FOI efetivado.
                            if (statusReq_1 == 'open') { 
                                self.valve1 = 'off' 
                                self.reqValve1 = 'Ligar'
                            } else { 
                                self.valve1 = 'on' 
                                self.reqValve1 = 'Desligar'
                            }
                        }
                        
                        self.rcvValve1 = self.liHistValves[c]['rcvValves'] // -- horário.

                        flagValve1ContentRcv = true
                    }
                }

                if (self.liHistValves[c]['valve'] == 'a1') {
                    //console.log('entrei na vv2')

                    if (self.liHistValves[c]['sinc'] == 'confirmado' && !flagConfirmValve2
                        && !flagValve2ContentRcv
                    ) {

                        flagConfirmValve2 = true
                        indexFlagConfirmVV2 = c
                        //console.log('confirm vv2')
                    }

                    //
                    if (self.liHistValves[c]['sinc'] == 'solicitado' && !flagValve2ContentRcv) {
                        //console.log('entrei no solicitado vv2')

                        // -- obter status de solicitação.
                        var statusReq_2 = self.liHistValves[c]['solicitado']
                        
                        if (flagConfirmValve2) {
                            // -- o conteúdo solicitado FOI efetivado.
                            if (statusReq_2 == 'open') { 
                                self.valve2 = 'on' 
                                self.reqValve2 = 'Desligar'
                                self.liHistValves[indexFlagConfirmVV2]['solicitado'] = 'Ligar' // informar o que foi confirmado.
                                self.liHistValves[indexFlagConfirmVV2]['cor'] = 'rgb(31,122,177)'
                            } else { 
                                self.valve2 = 'off' 
                                self.reqValve2 = 'Ligar'
                                self.liHistValves[indexFlagConfirmVV2]['solicitado'] = 'Desligar'
                                self.liHistValves[indexFlagConfirmVV2]['cor'] = 'rgba(173, 99, 1, 0.8)'
                            }
                        
                        } else {
                            // -- o conteúdo solicitado NÃO FOI efetivado.
                            if (statusReq_2 == 'open') { 
                                self.valve2 = 'off' 
                                self.reqValve2 = 'Ligar'
                            } else { 
                                self.valve2 = 'on' 
                                self.reqValve2 = 'Desligar'
                            }
                        }
                            
                        self.rcvValve2 = self.liHistValves[c]['rcvValves'] // -- horário.

                        flagValve2ContentRcv = true
                    }
                }
                
                if (flagValve1ContentRcv && flagValve2ContentRcv) { 
                    console.log('break finish handle status valve')
                    return 
                }

                c++
            }

            // Se nenhum movimento ainda, retornar off para todas, sem horário.
            if (!flagValve1ContentRcv && !flagValve2ContentRcv) {

                console.log('nenhuma solicitação foi feita para as válulas ainda.')
                self.valve1 = 'off'
                self.valve2 = 'off'
                self.rcvValve1 = '-'
                self.rcvValve2 = '-'
                self.reqValve1 = 'Ligar' // sempre o oposto do status da válvula.
                self.reqValve2 = 'Ligar'
                return
            }

            // Se apenas valve 1 alterou, retornar valve2 off e sem horário.
            if (!flagValve2ContentRcv) {

                console.log('apenas a valve 1 foi alterada.')
                self.valve2 = 'off'
                self.rcvValve2 = '-'
                self.reqValve2 = 'Ligar'
                return
            }

            // Se apenas valve 2 alterou, retornar valve1 off e sem horário.
            if (!flagValve1ContentRcv) {

                console.log('apenas a valve 2 foi alterada.')
                self.valve1 = 'off'
                self.rcvValve1 = '-'
                self.reqValve1 = 'Ligar'
                return
            }
        },
    },

    created() {
        this.flagLoadingDialog = true

        var self = this
        axios.get(self.$store.state.pathAxiosGetValves).then(function (res) {

            console.log(res.data.result)

            // histórico.
            self.liHistValves = res.data.result.li

            // obter status das válvulas.
            self.handleValvesStatus()

            // essa func só deve ser executada após handle devido às keys.
            //self.liHistValves = self.inputCor(self.liHistValves)

            self.flagLoadingDialog = false
        })
    }
}
</script>