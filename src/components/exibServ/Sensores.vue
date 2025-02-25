<style scoped>
    @import url("../../styles/exibServ/sensores.scss");
</style>


<template>
    <div class="box_sensores">

        <div class="titS">Sensoriamento</div>

        <div class="painelS mt-2" v-if="!flagLoadingDialog">
            
            <!-- Nível de água do reservatório :width="260" type="bar" -->
            <div class="box_nivelAgua mt-2 mr-1" v-if="!flagLoadingInitNivel">
                <div class="titGraf">Controle de nível</div>
                
                <apexchart class="elGraf mt-1" ref="chart" :series="series" :options="options"></apexchart>
                
                <div class="boxEdit mt-1">

                    <div class="editH">
                        <!-- :rules="[timeRule]" -->
                        <v-text-field
                        v-model="limiarPercH"
                        label="Humidade percentual (%)"
                        :placeholder="limiarPercH"
                        maxlength="2"
                        ></v-text-field>
                    </div>

                    <!-- Seleção Válvula -->
                    <div class="boxRatioV">

                        <span @click="changeAgValve('A0')"
                        class="ratioV mr-1" :style="{'background':backCorV1}">Válvula 1</span>
                        
                        <span @click="changeAgValve('A1')"
                        class="ratioV" :style="{'background':backCorV2}">Válvula 2</span>
                    </div>

                    <v-btn block @click="sendEditH()">editar controle</v-btn>
                </div>
            </div>

            <!-- Contador de água para exibição teste -->
            <div class="box_contadorAgua mt-2" v-if="!flagLoadingInitCA">
                <div class="titGraf">Contador de água</div>
                
                <apexchart class="elGraf mt-1" ref="chartCA" :series="seriesCA" :options="optionsCA"></apexchart>
            </div>
        </div>

        <!-- LOADING INIT -->
        <div v-if="flagLoadingInitNivel || flagLoadingInitCA" class="painelL mt-2">
            <v-progress-circular 
                color="rgb(247,215,46)"
                size="64"
                indeterminate
            ></v-progress-circular>
        </div>

        <!-- LOADING SENDING -->
        <div v-if="flagLoadingDialog" class="painelL mt-2">
            <v-progress-circular 
                color="rgb(247,215,46)"
                size="64"
                indeterminate
            ></v-progress-circular>
            <div v-if="flag1" class="boxMsgVerif mt-1">Edição concluída</div>
            <div v-if="flag1" class="boxMsgVerif mt-1">Verificando limiar</div>

            <div v-if="flag2" class="boxMsgVerif mt-1">Reservatório dentro do limite</div>
            
            <div v-if="flag3" class="boxMsgVerif mt-1">Reservatório abaixo do limite</div>
            <div v-if="flag3" class="boxMsgVerif mt-1">Iniciando procedimento de ajuste</div>

            <div v-if="flag4" class="boxMsgVerif mt-1">O sistema acionou a válvula com sucesso</div>
            <div v-if="flag5" class="boxMsgVerif mt-1">Verificação concluída</div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { myDate } from './aux1.js';

export default {

    data() {
        return {
            // controle tam page.
            //widthMapDinam:0,
            //flagLoadingInit:true, // init on
            flagLoadingInitNivel:true,
            flagLoadingInitCA:true,

            flagLoadingDialog:false,

            flag1:false, // controle de mensagem loading.
            flag2:false,
            flag3:false,
            flag4:false,
            flag5:false,

            // valor humidade.
            limiarPercH:"12", // %
            vv:'A1', // valvula a ser controlada. => init var backCor

            backCorV1:'', // color background valve selected.
            backCorV2:'green', // init qlqr. => init vv

            // chart nivel agua
            series: [
                {
                    name: 'Reservatório/solo',
                    type: 'column',
                    data: [60, 40, 36, 31, 9, 25]
                },
                {
                    name: 'Limite',
                    type: 'line',
                    data: [12, 12, 12, 12, 12, 12],
                    dashArray: 5  // Define a linha como pontilhada
                }
            ],
            options:{
                chart: {
                    type: 'line',
                    toolbar: {
                        show: false  // Desativa o menu (toolbar)
                    }
                },
                stroke: {
                    width: [0, 4],
                    dashArray: [0, 5]  // Faz a segunda série (linha) ser pontilhada
                },
                labels: ['', '', '', '', '', ''],
            },

            // chart nivel agua
            seriesCA: [
                {
                    name: 'Líquido consumido [litros]',
                    type: 'column',
                    data: [1, 2]
                },
                {
                    name: '',
                    type: 'line',
                    data: []
                }
            ],
            optionsCA:{
                chart: {
                    type: 'line',
                    //type: 'bar',
                    toolbar: {
                        show: false  // Desativa o menu (toolbar)
                    }
                },
                labels: ['', ''],
            },
        }
    },

    methods:{
        //
        changeAgValve(strV) {
            if (strV == 'A0') {
                this.backCorV1 = 'green'
                this.backCorV2 = ''
            } else {
                this.backCorV1 = ''
                this.backCorV2 = 'green'
            }
            this.vv = strV
        },
        sendEditH() {
            this.flagLoadingDialog = true // habilitar dialog box loading.
            //console.log('novo limiar: ',this.limiarPercH)
            //console.log('vv a ser controlada: ',this.vv)

            var date = myDate()

            var el2send = {
                'valve':this.vv,
                'limiar':this.limiarPercH,
                'sinc':'init', // início do intervalo.
                'lastUpdate':date
            }

            var payload = {'up':el2send}
            var self = this
            axios.post(self.$store.state.pathAxiosUpSensorControl, payload).then(function (res) {

                //console.log(res.data.result)
                //self.limiarPercH = res.data.result['statusControl']['limiar']

                if (res.data.result == 'up-sensor-ok') {
                    self.flag1 = true

                    setTimeout(() => {

                        axios.get(self.$store.state.pathAxiosGetValves).then(function (res) {

                            //console.log(res.data.result)

                            // -- verif se o log é o início de um acionamento.
                            var li = res.data.result['li']
                            if (li[0]['acionamento'] == 'sensor') {
                                if (li[0]['sinc'] == 'init') {
                                    //console.log('DISPARO from SENSOR')
                                    self.flag3 = true // reservatório abaixo do limite.

                                    // -- enviar disparo de finalização.
                                    setTimeout(() => {

                                        el2send['lastUpdate'] = myDate()
                                        el2send['sinc'] = 'end' // fim do intervalo. fixado em 1min nessa versão.
                                        payload = {'up':el2send}
                                        axios.post(self.$store.state.pathAxiosUpSensorControl, payload).then(function (res) {
                                            
                                            //console.log(res.data.result)
                                            if (res.data.result == 'up-sensor-ok') {
                                                self.flag4 = true // o sistema acionou a valvula com sucesso.
                                                
                                                var n=0
                                                while (n < self.series[1]['data'].length) {
                                                    self.series[1]['data'][n] = self.limiarPercH // preencher toda a lista de exibição front.
                                                    n++
                                                }

                                                self.flagLoadingDialog = false

                                                // reset
                                                self.flag1 = false
                                                self.flag2 = false
                                                self.flag3 = false
                                                self.flag4 = false
                                                self.flag5 = false
                                            }
                                        })
                                    
                                    },40000) // 40segundos.
                                }
                            } else {

                                self.flag2 = true // reservatório dentro do limite.
                                self.flag5 = true // verificação concluída.

                                var j=0
                                while (j < self.series[1]['data'].length) {
                                    self.series[1]['data'][j] = self.limiarPercH // preencher toda a lista de exibição front.
                                    j++
                                }
                                self.flagLoadingDialog = false

                                // reset
                                self.flag1 = false
                                self.flag2 = false
                                self.flag3 = false
                                self.flag4 = false
                                self.flag5 = false
                            }

                        })

                    },3000) // 3s. (tempo de escrever no log?)

                    //self.flagLoadingDialog = false // desabilitar dialog. => updateSeries() desnecessário.
                    //self.$refs.chart.updateSeries(self.series, true) // forçar chart update.
                }
            })
        }
    },

    created() {

        var self = this
        axios.get(self.$store.state.pathAxiosGetSensorControl).then(function (res) {

            //console.log(res.data.result)

            var n=0
            while (n < self.series[1]['data'].length) {
                self.series[1]['data'][n] = parseFloat(res.data.result['statusControl']['limiar']) // preencher toda a lista de exibição front.
                n++
            }
            //self.$refs.chart.updateSeries(self.series, true) // forçar chart update.

            self.limiarPercH = res.data.result['statusControl']['limiar']

            // -- obter última leitura do sensor npk btn.
            axios.get(self.$store.state.pathAxiosGetSensorBtn).then(function (res) {

                console.log(res.data.result)
                //var lastReading = res.data.result.last
                // -- humidade do solo. últimas 4 ou 5 leituras.
                let n=0
                var liAux = []
                var li = res.data.result.li
                while (n < li.length) {
                    liAux.push(li[n].h) // lista com o valores de humidade.
                    n++
                }
                self.series[0].data = liAux

                self.flagLoadingInitNivel = false
            })
        })

        axios.get(self.$store.state.pathAxiosGetCA).then(function (res) {

            //console.log(res.data.result)

            // -- VERSÃO DE RECEBIMENTO PARA APENAS 1 CONTADOR.
            let c=0
            var liAux = []
            while (c < res.data.result.length) {
                liAux.push(res.data.result[c].litrosConsumidos)
                c++
            }
            self.seriesCA[0].data = liAux // lista com o valores.
            //self.$refs.chartCA.updateSeries(self.seriesCA, true) // forçar chart update.

            self.flagLoadingInitCA = false

            //if (self.flagLoadingInitNivel && self.flagLoadingInitCA) {
            //    self.flagLoadingInit = false // desabilitar loading init.
            //}
        })
    }
}
</script>