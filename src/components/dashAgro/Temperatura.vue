<template>
    <div class="">
        <div id="chart">
            <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>

    </div>
</template>

<script>
export default {

    data() {
        return {
            series: [
                {
                    name: "Temperatura [ºC]",
                    data: [16.5, 16.8, 16.9, 17.2, 17.4, 17.8, 20.0, 20.8, 22.0, 21.5, 21, 20.0, 19.0, 18.0]
                },
            ],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'line',
                    dropShadow: {
                        enabled: true,
                        color: '#000',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2
                    },
                    toolbar: {
                        show: false
                    }
                },
                colors: ['#77B6EA', '#545454'],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: 'Temperatura interna',
                    align: 'center'
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                    colors: ['rgba(1,1,1,0.2)', 'transparent'], // #f3f3f3 takes an array which will be repeated on columns
                    opacity: 0.5
                    },
                },
                markers: {
                    size: 1
                },
                xaxis: {
                    categories: ['19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30','20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15'],
                    title: {
                        text: '15 minutos'
                    }
                },
                yaxis: {
                    title: {
                    text: 'Temperatura'
                    },
                    min: 0,
                    max: 40
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
            },
        }
    },

    methods:{
        //
    },

    created() {
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.
    }
}
</script>