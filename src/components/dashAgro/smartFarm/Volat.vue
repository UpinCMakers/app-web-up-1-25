<style scoped>
    @import url("../../../styles/dashagro/smartfarm/volat.scss");
</style>

<template>
    <div class="box_volat">

        <div class="painel_volat">

            <span class="tit animate__animated animate__flash">Zonas de manejo</span>

            <div class="display_volat">
                
                <!-- LARGE 
                <CandlesFarmA class="hidden-sm-and-down" :series="this.series_large" :chartOptions="chartOptions_large" />
                -->
                <!-- SMALL 
                <CandlesFarmA class="hidden-md-and-up" :series="this.series_small" :chartOptions="chartOptions_small" />
                -->

                <!-- LARGE and SMALL --- ATUAL 03/11/2023 [PAUSADO]
                <GridFarmA class="" :tam_max_width="0.85" />--> 

                <div class="tmp_aviso">Disponível em breve</div>

            </div>

        </div>

    </div>
</template>

<script>
//import CandlesFarmA from './CandlesFarmA'
//import GridFarmA from './GridFarmA'

export default {
    //components: { GridFarmA },

    data() {
        return {
            series_large: [
                {
                    name: 'Valor atual',
                    type: 'column',
                    data: [440, 505, 414, 671, 227, 440, 505, 600, 700]
                },
                /*{
                    name: 'Valor esperado',
                    type: 'line',
                    data: [23, 42, 35, 27, 43, 23, 42, 45, 88]
                }*/
            ],
            chartOptions_large: {
                chart: {
                    //height: 400,
                    type: 'line',
                },
                stroke: {
                    width: [0, 4]
                },
                /*title: {
                    text: 'Média geral | Macro nutriente [N]'
                },*/
                /*dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                },*/
                //labels: ['08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001', '13 Jan 2001', '14 Jan 2001', '15 Jan 2001', '16 Jan 2001'],
                labels: ['08/01', '09/01', '10/01', '11/01', '12/01', '13/01', '14/01', '15/01', '16/01'],
                /*xaxis: {
                    type: 'datetime'
                },*/
                yaxis: [
                    {
                        title: {
                            text: 'VALOR ATUAL',
                        },
                    }, 
                    /*{
                        opposite: true,
                        title: {
                            text: 'VALOR ESPERADO'
                        }
                    }*/
                ]
          },

          series_small: [
                {
                    name: 'Valor atual',
                    type: 'column',
                    data: [505, 600, 700]
                },
                {
                    name: 'Valor esperado',
                    type: 'line',
                    data: [42, 45, 88]
                }
            ],
            chartOptions_small: {
                chart: {
                    //height: 400,
                    type: 'line',
                },
                stroke: {
                    width: [0, 4]
                },
                /*title: {
                    text: 'Média geral | Macro nutriente [N]'
                },*/
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                },
                labels: ['25/10', '26/10', '27/10'],
                /*xaxis: {
                   type: 'datetime'
                },*/
                yaxis: [{
                    title: {
                        text: 'VALOR ATUAL',
                    },
                    
                    }, {
                    opposite: true,
                    title: {
                        text: 'VALOR ESPERADO'
                    }
                }]
          },
        }
    },

    methods:{
        //
    },

    created() {
        // -- disponibilizar dimensão do array no formato small após rcb large do db.
    }
}
</script>