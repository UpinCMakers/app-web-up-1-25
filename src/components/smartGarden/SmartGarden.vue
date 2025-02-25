<style scoped>
    @import url("../../styles/smartGarden/smartGarden.scss");
</style>

<template>
    
    <div class="box_smartGarden">

        <div class="painel">

            <div class="line_btnToBack" @click="backToMain()"
            @mouseover="hoverBackInit = 'rgb(31,122,177)'"
            @mouseleave="hoverBackInit = 'rgb(247,215,46)'"
            >
                <v-icon large class="mr-2" :style="{'color':hoverBackInit}">mdi-arrow-left-thick</v-icon>
                <span>Voltar</span>
            </div>

            <!-- TITULO -->
            <div class="line_tit">
                <!--<v-icon large class="mr-2" :style="{'color':'#4B94C0'}">mdi-account-group</v-icon>-->
                <div class="parceiro">
                    <v-img class="img_parc" :style="{'border-radius':'90px'}" :src="require('../../assets/fabf2.png')" />
                </div>
                <span>Smart Garden Fundão</span>
            </div>

            <div class="imgGeral mb-2">
                <v-img class="img" :style="{'border-radius':'90px','width':'100%'}" :src="require('../../assets/smartn2.jpeg')" />
            </div>

            <div :style="{'font-size':'0.8rem'}">{{ lastRcv }}</div>
        </div>

        <!-- CARDS DE NUMEROS/STATUS -->
        <div class="painelNum mb-4" v-if="flagOpen">

            <!-- box card numeros -->
             <!-- LUZ -->
            <div class="boxCardNum">
                <div class="cardNum">
                    <span class="titNum">Luz</span>
                    <span class="valNum">
                        <span>{{ luz }}</span>
                        <div class="circStatus ml-1" :style="{'background':circLuz}"></div>
                    </span>
                </div>
            </div>

            <!-- BOMBA -->
            <div class="boxCardNum ml-1">
                <div class="cardNum">
                    <span class="titNum">Bomba</span>
                    <span class="valNum"><!--v-if="bomba == 0? bomba = 'OFF' : bomba = 'ON'"-->
                        <span>{{ bomba }}</span>
                        <div class="circStatus ml-1" :style="{'background':circBomba}"></div>
                    </span>
                </div>
            </div>

            <!-- contagem disparo BOMBA -->
            <div class="boxCardNum ml-1">
                <div class="cardNum">
                    <span class="titNum">Regas</span>
                    <span class="valNum">
                        <span>{{ contadorBomba }}</span>
                    </span>
                </div>
            </div>

        </div>
        
        <div class="painelGrafh mb-4" v-if="flagOpen">

            <div :style="{'width':'100%'}">
                <apexchart
                type="area"
                height="350"
                :options="chartOptions1"
                :series="series1"
                />
            </div>

            <div :style="{'width':'100%'}">
                <apexchart
                type="area"
                height="350"
                :options="chartOptions2"
                :series="series2"
                />
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
//import VueApexCharts from "vue-apexcharts";

export default {

    /*components: {
        apexchart: VueApexCharts,
    },*/

    data() {
        return {
            //
            flagOpen:false,
            hoverBackInit:'rgb(247,215,46)',

            luz:null,
            circLuz:'',

            bomba:null,
            circBomba:'',

            contadorBomba:0,
            
            lastRcv:'',

            //
            series1: [
            {
            name: "Temperatura", // Nome do conjunto de dados
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148], // Dados do gráfico
            },
            ],
            chartOptions1: {
                chart: {
                type: "area",
                height: 350,
                toolbar: {
                    show: false, // Esconde o menu superior
                },
                },
                dataLabels: {
                enabled: false,
                },
                stroke: {
                curve: "smooth",
                },
                xaxis: {
                    labels: {
                        show: false, // Remove os rótulos do eixo X
                    },
                    axisBorder: {
                        show: false, // Remove a linha do eixo X
                    },
                    axisTicks: {
                        show: false, // Remove as marcações do eixo X
                    },
                    },
                    yaxis: {
                    title: {
                        text: "Temperatura",
                    },
                    },
                    tooltip: {
                    enabled: true, // Mantém a dica de ferramenta
                    },
            },
            
            //
            series2: [
            {
            name: "Umidade AR", // Nome do conjunto de dados
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148], // Dados do gráfico
            },
            ],
            chartOptions2: {
                chart: {
                type: "area",
                height: 350,
                toolbar: {
                    show: false, // Esconde o menu superior
                },
                },
                dataLabels: {
                enabled: false,
                },
                stroke: {
                curve: "smooth",
                },
                xaxis: {
                    labels: {
                        show: false, // Remove os rótulos do eixo X
                    },
                    axisBorder: {
                        show: false, // Remove a linha do eixo X
                    },
                    axisTicks: {
                        show: false, // Remove as marcações do eixo X
                    },
                    },
                    yaxis: {
                    title: {
                        text: "Umidade do AR",
                    },
                    },
                    tooltip: {
                    enabled: true, // Mantém a dica de ferramenta
                    },
            },
        }
    },

    methods: {
        //
        backToMain() { this.$router.push('/') }
    },

    created() {
        //
        var self = this
        axios.get(self.$store.state.pathAxiosSmartGarden).then(function (res) {

            //console.log(res.data.result)
            var liRcv = res.data.result

            self.lastRcv = liRcv[liRcv.length-1]['received_at']

            self.luz = liRcv[liRcv.length-1]['l'] // processa condição no html
            if (self.luz == 0) { 
                self.luz = 'OFF'
                self.circLuz = 'red' 
            } else { 
                self.luz = 'ON'
                self.circLuz = 'green'
            }

            self.bomba = liRcv[liRcv.length-1]['b']
            if (self.bomba == 0) { 
                self.bomba = 'OFF'
                self.circBomba = 'red' 
            } else { 
                self.bomba = 'ON'
                self.circBomba = 'green'
            }

            self.contadorBomba = liRcv[liRcv.length-1]['c1']

            var liT = []
            let t=0
            while (t < liRcv.length) {
                liT.push(liRcv[t]['t'])
                t++
            }
            self.series1[0].data = liT

            var liUmAR = []
            let u=0
            while (u < liRcv.length) {
                liUmAR.push(liRcv[u]['u'])
                u++
            }
            self.series2[0].data = liUmAR

            // forçar update
            self.flagOpen = true
        })
    }
}

</script>