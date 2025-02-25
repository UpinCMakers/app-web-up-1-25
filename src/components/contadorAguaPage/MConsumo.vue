<style scoped>
    @import url("../../styles/contadorAguaPage/mConsumo.scss");
</style>

<template>
    <div class="box_mConsumo">

        <!-- Contador -->
        <div class="painelGeralConsumidor">

            <!--<div class="boxTit">Informações do medidor</div>

             headers da tabela abaixo -->
            <div class="headersClasses" :style="{'border':'1px solid rgba(7,46,79,0.8)'}">
                <div class="hCard">Última leitura [m3]</div>
                <div class="hCard">Últimas 24h [m3]</div>
                <div class="hCard">Última semana [m3]</div>
                <div class="hCard">Último mês [m3]</div>
            </div>

            <div class="boxLi">
                <div class="liClasses"
                >
                    <div class="cCard">{{ consumoInfo.lastR }}</div>
                    <div class="cCard">{{ consumoInfo.lastD }}</div>
                    <div class="cCard">{{ consumoInfo.lastW }}</div>
                    <div class="cCard">{{ consumoInfo.lastM }}</div>

                    <!--<v-icon :style="{'align-items':'center','width':'100px'}">mdi-square-edit-outline</v-icon>-->
                </div>
            </div>
        </div>

        <!-- LOADING INIT -->
        <div v-if="flagLoadingInitCA" class="painelGeralConsumidor mt-2">
            <v-progress-circular 
                color="rgb(247,215,46)"
                size="64"
                indeterminate
            ></v-progress-circular>
        </div>

        <!-- Graf CA -->
        <div class="painelGeralConsumidor mt-2" v-if="!flagLoadingInitCA">            
            <apexchart class="boxGraf hidden-sm-and-down mt-1" ref="chartCA" :series="seriesCA" :options="optionsCA"></apexchart>
            <apexchart class="boxGraf hidden-md-and-up mt-1" ref="chartCA" :series="seriesCA" :options="optionsCA_small"></apexchart>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {

    props:['consumoM'],

    data() {
        return {
            //
            consumoInfo:{
                'lastR':1052.5,
                'lastD':0.07,
                'lastW':0.53,
                'lastM':1.90, // m3.
            },

            flagLoadingInitCA:true,

            // chart nivel agua
            seriesCA: [
                {
                    name: 'Líquido consumido [litros]',
                    type: 'column',
                    data: [1, 2]
                },
                /*{
                    name: '',
                    type: 'line',
                    data: []
                }*/
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
            optionsCA_small:{
                chart: {
                    type: 'line',
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
    },

    created() {
        //window.scrollTo(0,0)

        /*var idMalha = this.$store.state.jTmpMalha.idMalha
        var idGrupo = this.$store.state.jTmpMalha.idGrupo
        var idMedidor = this.$store.state.jTmpMalha.idMedidor
        //var nomeMedidor = this.$store.state.jTmpMalha.medidor

        var medidor = this.$store.state.liMalhas[idMalha].grupos[idGrupo].medidores[idMedidor]

        // todas as leituras
        var leituras = []
        var i=medidor.leituras.length-1
        while (i > 0) {
            leituras.push(medidor.leituras[i])
            i--
        }

        // exibição do consumo
        var r24 = medidor.ultima_leitura // ultimas 24h | init com ultima leitura
        var flag24 = true
        var r7 = medidor.ultima_leitura // ultimos 7 dias
        var countDay = 0
        var r30 = medidor.ultima_leitura // ultimos 30 dias
        //var leituras = medidor.leituras //.reverse() // list
        var dateA = leituras[0].data // data da ultima leitura para comparação.
        //console.log('data mais recente: ',dateA)
        var c=1
        while (c < leituras.length) {

            var dateB = leituras[c].data

            if (dateA != dateB && flag24) { // apenas 1 vez nesse if.
                //
                r24 = (leituras[0].leitura - leituras[c-1].leitura)/1000
                flag24 = false // terminou as 24h.
            }

            if (dateA != dateB) {
                //
                countDay++ // a cada mudança de dia conta+1
            }

            if (countDay == 7 || c == leituras.length-1) {
                if (c == leituras.length-1) {
                    r7 = medidor.ultima_leitura/1000
                } else {
                    r7 = (leituras[0].leitura - leituras[c].leitura)/1000
                }
            }

            if (countDay == 30 || c == leituras.length-1) {
                if (c == leituras.length-1) {
                    r30 = medidor.ultima_leitura/1000
                } else {
                    r30 = (leituras[0].leitura - leituras[c].leitura)/1000
                }
            }

            c++
        }
        this.consumoInfo = {
            'lastR':medidor.ultima_leitura/1000, // litros para m3.
            'lastD':r24,
            'lastW':r7,
            'lastM':r30, // m3
        }*/
        this.consumoInfo = this.consumoM

        var self = this
        axios.get(self.$store.state.pathAxiosGetCA).then(function (res) {

            //console.log(res.data.result)

            // -- VERSÃO DE RECEBIMENTO PARA APENAS 1 CONTADOR.
            let c=0
            var liAux = []
            var liLabels = []
            var datetime = null
            var formattedDate = null
            var formattedTime = null
            var dateHrStr = ''

            while (c < res.data.result.length) {
                liAux.push(res.data.result[c].litrosConsumidos)
                //liLabels.push(res.data.result[c].dataRcv)

                datetime = new Date(res.data.result[c].dataRcv)
                //console.log('datetime: ',datetime)
                
                formattedDate = datetime.toLocaleDateString("pt-PT", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                });
                //console.log('formattedDate: ',formattedDate)

                // Formatar hora para "23:50"
                formattedTime = datetime.toLocaleTimeString("pt-PT", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                });
                //console.log('formattedTime: ',formattedTime)

                dateHrStr = formattedDate + '-' + formattedTime
                //console.log('dateHrStr: ',dateHrStr)
                liLabels.push(dateHrStr)

                c++
            }
            self.seriesCA[0].data = liAux // lista com o valores.
            //self.$refs.chartCA.updateSeries(self.seriesCA, true) // forçar chart update.

            self.optionsCA.labels = liLabels
            //self.$refs.chartCA.updateOptions(self.optionsCA, true) // forçar chart update.
            
            self.flagLoadingInitCA = false
        })
    }
}
</script>