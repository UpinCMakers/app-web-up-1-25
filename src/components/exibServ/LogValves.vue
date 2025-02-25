<style scoped>
    @import url("../../styles/exibServ/logValves.scss");
</style>

<template>
    <div class="box_logValves mb-8">

        <!-- Títulos -->
        <div class="boxTit">
            <span class="tit">Histórico</span>
        </div>

        <!-- controle de válvulas -->
        <div class="boxControl">
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

                    <div class="colLog">
                        <span class="tit">Acionamento</span>
                        <span vclass="content">
                            <span class="">{{ log.acionamento }}</span>
                        </span>
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

    </div>
</template>

<script>
import axios from 'axios'

export default {

    data() {
        return {

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

                var tf = self.liHistValves[0].rcvValves // recortar último horário do front.
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
                }

                
            })
        },
        inputCor(liHistValves) {

            // add key cor no json histórico.
            let c=0
            while (c < liHistValves.length) {

                if (liHistValves[c]['sinc'] == 'solicitado' || liHistValves[c]['sinc'] == 'init' || liHistValves[c]['sinc'] == 'end') {

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

    created() {

        var self = this

        axios.get(self.$store.state.pathAxiosGetValves).then(function (res) {

            console.log(res.data.result)

            // histórico.
            self.liHistValves = res.data.result.li

            // obter status das válvulas.
            //self.handleValvesStatus()

            // essa func só deve ser executada após handle devido às keys.
            self.liHistValves = self.inputCor(self.liHistValves)

        })
    }
}
</script>