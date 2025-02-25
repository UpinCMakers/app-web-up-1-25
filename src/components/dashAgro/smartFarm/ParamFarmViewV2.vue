<style scoped>
    @import url("../../../styles/dashagro/smartfarm/paramFarmViewV2.scss");
</style>

<template>
    <div class="box_paramFarmViewV2">

        <!-- grafico simples apenas com eixo X -->

        <!--<v-sparkline
          :value="$store.state.param_values"
          color="rgba(7,46,79,0.8)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
          class=""
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>-->

        <apexchart ref="chart" :width="widthMapDinam" type="line" :options="options" :series="series"></apexchart>

    </div>
</template>

<script>
export default {    
    data() {
        return {

            // init apexchart.
            options: {
                chart: {
                    id: 'mapaParam',
                    toolbar: {
                        show: false  // Desativa o menu (toolbar)
                    }
                },
                xaxis: {
                    categories: [1,1,1,1,1,1]
                },
                yaxis: [{
                    labels: {
                        formatter: function (value) {
                            return value.toFixed(2); // Limita a 2 casas decimais
                        }
                    }
                }]
            },
            series: [{
                name: 'Param',
                data: [0, 1, 2, 1.5, 0.2, 0.9]
            }]
        }
    },

    methods:{
        //
    },

    created() {
        // -- largura para o tamanho dos elementos gráfico e mapa.
        var largura = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        //
        this.widthMapDinam = 0.85 * largura
        this.widthMapDinam = `${this.widthMapDinam}px`

        this.options.xaxis.categories = this.$store.state.param_dates // lista com o eixo x.
        this.series[0].data = this.$store.state.param_values // lista com o valores.
    }
}
</script>