<style scoped>
    @import url("../../../styles/dashagro/smartfarm/displaysparam.scss");
</style>

<template>
    <div class="box_displaysparam">

        <div class="painel_display">

            <div class="col_display_param mr-1 ml-1 mb-1">

                <!-- LARGE -->
                <span class="tit_display_param">Estimativa de distribuição</span>
                <!-- SMALL hidden-sm-and-down
                <span class="tit_display_param hidden-md-and-up" :style="{'font-size':'0.7rem'}">Estimativa de distribuição</span>
                -->

                <!-- LARGE -->
                <div class="display_param_a hidden-sm-and-down" :style="{'height':'200px'}">

                    <v-img class="imgDisplay"
                    :src="$store.state.param_distrib"
                    :style="{'border-radius':'8px'}"
                    />

                </div>

                <!-- SMALL -->
                <div class="display_param_a hidden-md-and-up" :style="{'height':'100px'}">

                    <v-img class="imgDisplay"
                    :src="$store.state.param_distrib_s"
                    :style="{'border-radius':'8px'}"
                    />

                </div>

                <span class="tit_display_param mt-2">Máxima e mínima do terreno</span>

                <div class="display_param" :style="{'padding':'2px'}">
                    <!--Em manutenção. ..-->
                    <!--<GridFarmA class="" :tam_max_width="0.44" />-->
                    <!--<GridFarmA class="hidden-md-and-up" /> :tam_max_width="0.90" -->

                    <!-- LARGE alterado em 20/10/2023 :series="this.series_large" :chartOptions="chartOptions_large" -->
                    <CandlesFarmB class="hidden-sm-and-down" :dinam_width_graph="dinam_width_graph_large" />

                    <!-- SMALL alterado em 20/10/2023 :series="this.series_small" :chartOptions="chartOptions_small" -->
                    <CandlesFarmB class="hidden-md-and-up" :dinam_width_graph="dinam_width_graph_small" />
                    
                </div>

            </div>

            <div class="col_display_param mr-1 ml-1 mb-1">

                <span class="tit_display_param">Média geral do terreno</span>

                <div class="display_param mt-1" :style="{'padding':'2px'}">
                    <!--Em manutenção. ..-->
                    <!--<GridFarmA class="" :tam_max_width="0.44" />-->
                    <!--<GridFarmA class="hidden-md-and-up" /> :tam_max_width="0.90" -->

                    <!-- LARGE alterado em 20/10/2023 :series="this.series_large" :chartOptions="chartOptions_large" -->
                    <CandlesFarmA class="hidden-sm-and-down" :dinam_width_graph="dinam_width_graph_large" />

                    <!-- SMALL alterado em 20/10/2023 :series="this.series_small" :chartOptions="chartOptions_small" -->
                    <CandlesFarmA class="hidden-md-and-up" :dinam_width_graph="dinam_width_graph_small" />
                    
                </div>

            </div>

        </div>

    </div>
</template>

<script>
//import GridFarmA from './GridFarmA'
import CandlesFarmA from './CandlesFarmA'
import CandlesFarmB from './CandlesFarmB'

export default {
    components: { CandlesFarmA, CandlesFarmB },

    data() {
        return {
            imgKrig:require('../../../assets/mapkrig1.png'),

            dinam_width_graph_large:0,
            dinam_width_graph_small:0,
            //larguraGrid:350, // atualizado dinamicamente com o tam da pag.
        }
    },

    methods:{
        //
    },

    created() {
        var largura = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
        
        //this.larguraGrid = largura // this.tam_max_width
        
        this.dinam_width_graph_large = largura * 0.42
        this.dinam_width_graph_small = largura * 0.85 // devido ao wrap.
    }
}
</script>