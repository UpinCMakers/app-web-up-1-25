<style scoped>
    @import url("../../styles/exibServ/exibServ.scss");
</style>

<template>
    <div class="box_exibServ" v-if="!$store.state.flagMenuSup"><!-- /exib -->

        <!-- Títulos -->
        <div class="boxTit">
            <span class="tit">Painel de controle</span>
        </div>

        <!-- controle de válvulas -->
        <div class="boxControl">
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
                            <v-btn @click="trig('valve1',reqValve1)">{{ this.reqValve1 }}</v-btn>
                        </div>

                        <div class="btnOne">
                            <span :style="{'align-self':'center'}">Válvula 2</span>
                            <v-btn @click="trig('valve2',reqValve2)">{{ this.reqValve2 }}</v-btn>
                        </div>
                    </div>
                </div>
            </div>

            <div class="painelLogs mt-2">

                <div class="boxLineTit">
                    <v-icon class="cantoSupLog ml-2">mdi-list-box-outline</v-icon>
                    <v-chip label class="cantoSupLog mr-2" @click="updateLogs()">
                        <v-icon>mdi-update</v-icon>
                        <span>Atualizar</span>
                    </v-chip>
                </div>

                <div class="boxLogTit">Logs</div>

                <div class="boxLog mb-2"
                v-for="(log,i) in liHistValves" :key=i
                ><!-- flagValveLocal -->

                    <div class="colLog">
                        <span class="tit">Origem</span>
                        <span v-if="log.orig != 'servidor'" class="content">Cliente</span>
                        <span v-else class="content" :style="{'color':'rgb(105,2,2)'}">Servidor</span>
                        <!--<span class="content">{{ log.orig }}</span>-->
                    </div>

                    <v-divider class="mr-1 ml-1" inset vertical></v-divider>

                    <div class="colLog" v-if="log.valve == 'a0'">
                        <span class="tit">Dispositivo</span>
                        <div class="content">
                            <span class="mr-2">Válvula 1</span>

                            <!--<span v-if="log.valve1Hist == 'on'? log.cor = 'rgb(31,122,177)' : log.cor = 'rgba(7,46,79,0.8)'"
                            :style="{'font-weight':'bolder','color':log.cor}"
                            >{{ log.valve1Hist }}</span>-->

                        </div>
                        <v-chip x-small label v-if="log.orig != 'servidor'" color="rgb(247,215,46)">Pendente</v-chip>
                    </div>

                    <v-divider class="mr-1 ml-1" inset vertical></v-divider>

                    <div class="colLog" v-if="log.valve == 'a1'">
                        <span class="tit">Dispositivo</span>
                        <div class="content">
                            <span class="mr-2">Válvula 2</span>

                            <!-- v-if="log.valve1Hist == 'on'? log.cor = 'rgb(31,122,177)' : log.cor = 'rgba(7,46,79,0.8)'" -->
                            <!--<span :style="{'font-weight':'bolder','color':log.cor}">{{ log.valve2Hist }}</span>-->

                        </div>
                        <v-chip x-small label v-if="log.orig != 'servidor'" color="rgb(247,215,46)">Pendente</v-chip>
                    </div>

                    <v-divider class="mr-1 ml-1" inset vertical></v-divider>

                    <!-- TIPO REQ ou RESP -->
                    <div class="colLog">

                        <span class="tit">Ação</span>

                        <div class="content"><!-- v-if="log.sinc == 'solicitado'" -->
                            
                            <span class="mr-2">{{ log.sinc }}</span>

                            <span class="mr-2" v-if="log.cor" :style="{'color':log.cor}">{{ log.solicitado }}</span>

                            <span class="mr-2" v-else>{{ log.solicitado }}</span>
                        </div>

                        <!--<div class="content" v-if="log.sinc == 'confirmado'">
                            <span class="mr-2">confirmado</span>
                            <span class="mr-2">{{ log.solicitado }}</span>
                        </div>-->
                    </div>

                    <v-divider class="mr-1 ml-1" inset vertical></v-divider>

                    <div class="colLog">
                        <span class="tit">Horário</span>
                        <span class="content">{{ log.rcvValves }}</span>
                    </div>

                </div>

            </div>
        </div>

        <!-- gráfico contador -->
        <div class="graf mt-4">
            <apexchart ref="chart" :width="widthMapDinam" type="line" :options="options" :series="series"></apexchart>
        </div>

        <div class="graf mt-4">
            <h3>Selecione uma data:</h3>
            <!-- O componente do calendário -->
            <v-date-picker
            v-model="selectedDate" 
            @input="handleDateChange" 
            :attributes="attrs"
            is-inline
            locale="pt-BR"
            />

            <p>Data selecionada: {{ selectedDate }}</p>
        </div>

        <v-container class="graf mt-4">
            <h3>Selecione um horário:</h3>

            <!-- Time Picker -->
            <v-time-picker
            v-model="selectedTime"
            @change="handleTimeChange"
            full-width
            format="24hr"
            scrollable
            ampm-in-title
            ></v-time-picker>

            <p>Horário selecionado: {{ selectedTime }}</p>
        </v-container>

    </div>
</template>

<script>
import axios from 'axios'

// Importando o v-date-picker de v-calendar
//import { VDatePicker } from 'v-calendar';
import { setupCalendar, VDatePicker } from 'v-calendar';

export default {
    components: {VDatePicker},

    data() {
        return {
            //
            widthMapDinam:'280px',

            // calendário.
            selectedDate:null, // teste calendário 01/10/2024.
            attrs: [
                {
                key: 'today',
                highlight: true,
                dates: new Date(),
                },
            ],

            // horário.
            selectedTime: null, // Armazena o horário selecionado

            // init.
            options: {
                chart: {
                    id: 'mapaContador'
                },
                xaxis: {
                    //categories: [1,1,1,1,1,1]
                    categories: [0,0,0,0,0,0]
                }
            },
            series: [{
                name: 'Contador',
                data: [0, 1, 2, 1.5, 0.2, 0.9]
            }],

            //
            valve1:'-',
            valve2:'-',
            rcvValve1:'',
            rcvValve2:'',
            liHistValves:[],

            flagValveLocal:true,

            reqValve1:'Ligar', // init antes do created processar o status.
            reqValve2:'Ligar',
        }
    },

    methods:{
        //
        handleDateChange(newDate) {
            // Captura a nova data selecionada
            console.log('Data selecionada:', newDate);
            this.selectedDate = newDate;
        },
        handleTimeChange(newTime) {
            // Evento disparado ao mudar o horário
            console.log('Horário selecionado:', newTime);
            this.selectedTime = newTime;
        },
        //
        trig(flagStr,solicitado) {
            console.log('Start-func-send')
            //console.log('reqValve1: ',this.reqValve1)
            //console.log('reqValve2: ',this.reqValve2)

            //var solicitado = this.reqValve2

            // transformar var SOLICITADO na dinâmica baseada nos últimos items do db.

            var comando = ''

            var date = this.obterDate() // chamar date apenas 1 vez devido à sincronia timestamp.

            var el2exib = {
                'orig':'cliente',
                'solicitado':solicitado, // info local.
                'rcvValves':date,
            }
            console.log('date: ',date)

            // -- converter para o modelo do db. Manter sincronizado. db eng front pt.
            if (solicitado == 'Ligar') { 
            
                solicitado = 'open' 
                el2exib['cor'] = 'rgb(31,122,177)' // 'on' => azul claro. 'off' => amarelo queimado.
            
            } else { 

                solicitado = 'close' 
                el2exib['cor'] = 'rgba(173, 99, 1, 0.8)'
            }

            if (flagStr == 'valve1') {

                comando = ["FF","1D","A0","00",date,solicitado,'direto'] // info envio.
                el2exib['valve'] = 'a0'

            } else {

                comando = ["FF","1D","A1","00",date,solicitado,'direto'] // info envio.
                el2exib['valve'] = 'a1'
                
            }
            console.log('date: ',date)
            //console.log('Comando', comando)
            //console.log('')

            //this.liHistValves.push(el2exib)
            //console.log('log (local)', el2exib)
            //this.liHistValves.unshift(el2exib) // add na 1a posição.
            //this.liHistValves.pop() // retirar o ultimo elemento.
            //console.log('lista log (local)', this.liHistValves)

            if (this.liHistValves.length == 0) {

                this.liHistValves.push(el2exib) // 1o input.

            } else {

                this.liHistValves.unshift(el2exib) // add na 1a posição.
                this.liHistValves.pop() // retirar o ultimo elemento.
            }

            // TESTES 26/09
            /*console.log('this.liHistValves: ',this.liHistValves)
            console.log('hr do valor [0]: ',this.liHistValves[0].rcvValves.slice(11, 16))

            var x = this.liHistValves[0].rcvValves.slice(11, 16)
            if (x == '16:47') {console.log('true ok')}*/

            //console.log('Sent-local')

            // atenção ao deslocamento de reported e retirada do control na api

            console.log('Start-send')
            /*setTimeout(() =>{
                var payload = {'comando':comando}
                var self = this
                axios.post(self.$store.state.pathAxiosPostValve, payload).then(function (res) {

                    console.log(res.data.result) // receber status após uplink com resultado do control
                })
            },30000)*/

            var payload = {'comando':comando}
            var self = this
            axios.post(self.$store.state.pathAxiosPostValve, payload).then(function (res) {

                console.log(res.data.result) // receber status após uplink com resultado do control
            })
        },
        converterParaTimestamp(horario) {
            return new Date(horario).getTime();
        },
        updateLogs() {
            console.log('update logs')

            // se tiver um item no db trazido via get que tenha data e hora superior à ultima na pagina
            // então inputar a nova leitura na primeira posição do histórico de exbição e pop ultimo elem
            var self = this
            axios.get(self.$store.state.pathAxiosGetValves).then(function (res) {
                console.log(res.data.result)

                // histórico.
                var liHistTmp = res.data.result.li // from db
                var tamEldb = liHistTmp.length

                // SE for o primeiro input. há no máximo 2 itens no db nesse momento.
                if (tamEldb < 3) {
                
                    // atualizar status.
                    if (liHistTmp[0]['sinc'] == 'confirmado') {

                        if (liHistTmp[0]['readings'].slice(4,6) == 'a0') {
                            if (liHistTmp[1]['solicitado'] == 'open') {
                                self.valve1 = 'on' 
                                self.reqValve1 = 'Desligar' // sempre o oposto do status da válvula.
                            } else {
                                self.valve1 = 'off' 
                                self.reqValve1 = 'Ligar'
                            }
                            self.rcvValve1 = liHistTmp[0]['rcvValves'] // -- horário.
                        }
                        if (liHistTmp[0]['readings'].slice(4,6) == 'a1') {
                            if (liHistTmp[1]['solicitado'] == 'open') {
                                self.valve2 = 'on' 
                                self.reqValve2 = 'Desligar' // sempre o oposto do status da válvula.
                            } else {
                                self.valve2 = 'off' 
                                self.reqValve2 = 'Ligar'
                            }
                            self.rcvValve2 = liHistTmp[0]['rcvValves'] // -- horário.
                        }

                        //
                        self.liHistValves.unshift(liHistTmp[0])
                        //self.liHistValves.pop() // retirar o ultimo elemento. <-- só há 1 na 1a ite.
                        self.liHistValves = self.inputCor(self.liHistValves)

                        console.log('first update done.')
                        return
                    
                    } else { return }
                }

                //console.log('self.liHistValves: ',self.liHistValves)
                var tf = self.liHistValves[0].rcvValves // recortar último horário do front.
                //var hrEldb = '' // hora recortada por [c]
                //var minEldb = '' // min recortado por [c]
                //var fixadaHrExib = parseInt(self.liHistValves[0].rcvValves.slice(11, 13))
                //var fixadaMinExib = parseInt(self.liHistValves[0].rcvValves.slice(14, 16))
                //console.log('fixadaHrExib: ',fixadaHrExib)
                //console.log('fixadaMinExib: ',fixadaMinExib)
                // formato de exibição no front --> 27/09/2024-19:19:21
                //const horarioFixado = "2024-09-23 12:30:45"; EXEMPLO FORMATO para conversão.
                var horarioFixado = tf.slice(6,10)+"-"+tf.slice(3,5)+"-"+tf.slice(0,2)+" "+tf.slice(11,13)+":"+tf.slice(14,16)+":"+tf.slice(17,19)
                console.log('horarioFixado: ',horarioFixado)
                horarioFixado = self.converterParaTimestamp(horarioFixado)

                let c = 0
                while (c < tamEldb) {
                    // -- comparar a partir do último elem (o mais recente no db), com a lista atual exib.
                    var tdb = liHistTmp[c].rcvValves
                    var horarioDB = tdb.slice(6,10)+"-"+tdb.slice(3,5)+"-"+tdb.slice(0,2)+" "+tdb.slice(11,13)+":"+tdb.slice(14,16)+":"+tdb.slice(17,19)
                    console.log('horarioDB: ',horarioDB)
                    horarioDB = self.converterParaTimestamp(horarioDB)
                    if (horarioDB > horarioFixado) {

                        // atualizar status.
                        var aux = liHistTmp
                        console.log('liHistTmp (li db)',aux)
                        
                        if (liHistTmp[c]['readings'].slice(4,6) == 'a0') {
                            if (liHistTmp[c+1]['solicitado'] == 'open') {
                                self.valve1 = 'on' 
                                self.reqValve1 = 'Desligar' // sempre o oposto do status da válvula.
                            } else {
                                self.valve1 = 'off' 
                                self.reqValve1 = 'Ligar'
                            }
                            console.log('self.valve1',self.valve1)
                            console.log('self.reqValve1',self.reqValve1)

                            self.rcvValve1 = liHistTmp[c]['rcvValves'] // -- horário.
                        }
                        if (liHistTmp[c]['readings'].slice(4,6) == 'a1') {
                            if (liHistTmp[c+1]['solicitado'] == 'open') {
                                self.valve2 = 'on' 
                                self.reqValve2 = 'Desligar' // sempre o oposto do status da válvula.
                            } else {
                                self.valve2 = 'off' 
                                self.reqValve2 = 'Ligar'
                            }
                            console.log('self.valve2',self.valve2)
                            console.log('self.reqValve2',self.reqValve2)

                            self.rcvValve2 = liHistTmp[c]['rcvValves'] // -- horário.
                        }

                        //
                        self.liHistValves.unshift(liHistTmp[c])
                        self.liHistValves.pop() // retirar o ultimo elemento.
                        self.liHistValves = self.inputCor(self.liHistValves)

                        console.log('update done.')
                        return

                    }
                    c++
                    //hrEldb = liHistTmp[c].rcvValves.slice(11, 13) // recortar hr
                    //minEldb = liHistTmp[c].rcvValves.slice(14, 16) // recortar hr
                    //console.log('hrEldb: ',hrEldb)
                    //console.log('minEldb: ',minEldb)
                    //console.log('liHistTmp[c][readings].slice(4,6): ',liHistTmp[c]['readings'].slice(4,6))
                    /*if (fixadaHrExib == hrEldb) {
                        if (fixadaMinExib < minEldb) { // <= implica em duplicação de informação.

                            // precisa ser ao segundo a comparação para não haver duplicidade no mesmo minuto...

                            // atualizar status.
                            if (liHistTmp[c]['readings'].slice(4,6) == 'a0') {
                                if (liHistTmp[c]['solicitado'] == 'open') {
                                    self.valve1 = 'on' 
                                    self.reqValve1 = 'Desligar' // sempre o oposto do status da válvula.
                                } else {
                                    self.valve1 = 'off' 
                                    self.reqValve1 = 'Ligar'
                                }
                                self.rcvValve1 = liHistTmp[c]['rcvValves'] // -- horário.
                            }
                            if (liHistTmp[c]['readings'].slice(4,6) == 'a1') {
                                if (liHistTmp[c]['solicitado'] == 'open') {
                                    self.valve2 = 'on' 
                                    self.reqValve2 = 'Desligar' // sempre o oposto do status da válvula.
                                } else {
                                    self.valve2 = 'off' 
                                    self.reqValve2 = 'Ligar'
                                    self.rcvValve2 = liHistTmp[c]['rcvValves'] // -- horário.
                                }
                            }

                            //
                            self.liHistValves.unshift(liHistTmp[c])
                            self.liHistValves.pop() // retirar o ultimo elemento.
                            self.liHistValves = self.inputCor(self.liHistValves)

                            console.log('update done.')
                            return
                        }
                    }
                    c++
                    */
                }

                
            })
        },
        obterDate() {

            // get time
            var dataAtual = new Date();
            var dia = dataAtual.getDate();
            var mes = (dataAtual.getMonth() + 1);
            var ano = dataAtual.getFullYear();
            var horas = dataAtual.getHours();
            var minutos = dataAtual.getMinutes();
            var seg = dataAtual.getSeconds();

            if(String(seg).length == 1) {
                
                seg = ("0" + seg)
            }
            if(String(minutos).length == 1) {

                minutos = ("0" + minutos)
            }
            if(String(horas).length == 1) {

                horas = ("0" + horas)
            }
            if(String(dia).length == 1) {

                dia = ("0" + dia)
            }
            if(String(mes).length == 1) {
                
                mes = ("0" + mes)
            }

            let day = (dia + "/" + mes + "/" + ano + "-" + horas + ":" + minutos + ":" + seg)
            return day
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
                    console.log('break status')
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
        inputCor(liHistValves) {

            // add key cor no json histórico.
            let c=0
            while (c < liHistValves.length) {

                if (liHistValves[c]['sinc'] == 'solicitado') {

                    if (liHistValves[c]['solicitado'] == 'close') {

                        liHistValves[c]['solicitado'] = 'Desligar'
                        liHistValves[c]['cor'] = 'rgba(173, 99, 1, 0.8)'
                    }

                    if (liHistValves[c]['solicitado'] == 'open') {

                        liHistValves[c]['solicitado'] = 'Ligar'
                        liHistValves[c]['cor'] = 'rgb(31,122,177)'
                    }
                }
                c++
            }
            return liHistValves
        }
    },

    mounted() {
        setupCalendar({
            locales: {
                'pt-BR': {
                    firstDayOfWeek: 1, // Iniciar a semana na segunda-feira
                    masks: {
                        L: 'DD/MM/YYYY',
                    },
                },
            },
        });
    },

    created() {
        window.scrollTo(0,0)

        var LarguraPage = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        //console.log('LarguraPage: ',LarguraPage)

        this.widthMapDinam = 0.9 * LarguraPage
        this.widthMapDinam = `${this.widthMapDinam}px`

        var self = this

        // desabilitar overlay após requisição concluída.
        axios.get(self.$store.state.pathAxiosGetCA).then(function (res) {

            //console.log(res.data.result)

            // -- VERSÃO DE RECEBIMENTO PARA APENAS 1 CONTADOR.
            let c=0
            var liDates = []
            var liValues = []
            var tam = res.data.result.length
            while (c<tam) {
                
                // -- apenas a primeira e ultima data.
                if (c==0 || c==tam-1) {

                    liDates.push(res.data.result[c].dataRcv.slice(0, 10))
                } else {

                    liDates.push('')
                }

                liValues.push(res.data.result[c].litrosConsumidos)
                
                c++
            }
            self.options.xaxis.categories = liDates // lista com o eixo x.
            self.series[0].data = liValues // lista com o valores.

            //console.log('liValues: ',liValues)

            self.$refs.chart.updateSeries(self.series, true) // forçar chart update.
            self.$refs.chart.updateOptions(self.options, true) // forçar chart update.

            //self.flagLoadingCA = false
        })

        axios.get(self.$store.state.pathAxiosGetValves).then(function (res) {

            console.log(res.data.result)

            // histórico.
            self.liHistValves = res.data.result.li

            // obter status das válvulas.
            self.handleValvesStatus()

            // essa func só deve ser executada após handle devido às keys.
            self.liHistValves = self.inputCor(self.liHistValves)

        })
    }
}
</script>