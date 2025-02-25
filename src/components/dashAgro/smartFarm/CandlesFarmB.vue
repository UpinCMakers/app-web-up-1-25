<style scoped>
    @import url("../../../styles/dashagro/smartfarm/candlesFarmA.scss");
</style>

<template>
    <div class="box_candlesFarmA">

        <div class="el_chart">
            <apexchart
            class="mt-2"
            :width=dinam_width_graph
            height="200" 
            type="rangeArea" 
            :options="chartOptions" 
            :series="$store.state.seriesB"
            ></apexchart>
        </div>

    </div>
</template>

<script>
//import axios from 'axios'

export default {
    //components: { GridFarmA },

    props:['dinam_width_graph'],

    data() {
        return {
            larguraGraph:350,


            series: [
                {
                    type: 'rangeArea',
                    name: 'Área de alcance',
                    data: [
                        {
                            x: 'Jan',
                            y: [3100, 3400]
                        },
                        {
                            x: 'Feb',
                            y: [4200, 5200]
                        },
                        {
                            x: 'Mar',
                            y: [3900, 4900]
                        },
                        {
                            x: 'Apr',
                            y: [3400, 3900]
                        }
                    ]
                },
            
                {
                    type: 'line',
                    name: 'Média',
                    data: [
                        {
                            x: 'Jan',
                            y: 3300
                        },
                        {
                            x: 'Feb',
                            y: 4900
                        },
                        {
                            x: 'Mar',
                            y: 4300
                        },
                        {
                            x: 'Apr',
                            y: 3700
                        }
                    ]
                }
            ],
            chartOptions: {
                chart: {
                    //height: 350,
                    type: 'rangeArea',
                    animations: {
                        speed: 500
                    }
                },
                colors: ['#33b2df'],
                dataLabels: {
                    enabled: false
                },
                fill: {
                    opacity: [0.24, 0.24, 1, 1]
                },
                forecastDataPoints: {
                    count: 2
                },
                stroke: {
                    curve: 'straight',
                    width: [0, 0, 2, 2]
                },
                legend: {
                    show: true,
                    customLegendItems: ['Máxima, média e mínima'],
                    inverseOrder: true
                },
                title: {
                    text: 'Alcance'
                },
                markers: {
                    hover: {
                        sizeOffset: 5
                    }
                }
            },
        }
    },

    methods:{
        //
    },

    created() {
        this.larguraGraph = this.dinam_width_graph
    }
}
</script>