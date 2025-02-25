<style scoped>
    @import url("../../../styles/dashagro/smartfarm/paramfarm.scss");
</style>

<template>
    <div class="box_paramfarm">

        <MenuSuperiorDashAgro :rota="'/land'" />

        <!-- Menu geral farm -->
        <MenuFarm />

        <!-- loading bar -->
        <div class="progress_bar mt-8" v-if="$store.state.flag_loading_param_farm">

            <span class="mb-2" :style="{'font-size':'0.7rem'}">Buscando suas informações</span>

            <v-progress-circular
            :size="70"
            :width="7"
            color="green"
            indeterminate
            ></v-progress-circular>
        </div>

        <!-- Títulos -->
        <div class="box_titLine_param" v-if="!$store.state.flag_loading_param_farm">

            <div class="painel_titLine_param mr-1 animate__animated animate__flash">
                <v-icon class="mr-2">mdi-land-plots-marker</v-icon>
                <span>{{ $store.state.param_selected }}</span>
            </div>

            <div class="painel_titLine_param ml-1">
                <v-icon class="mr-2">mdi-sprout</v-icon>
                <span>{{ $store.state.farm_name }}</span>
            </div>
        </div>

        <!-- Painels -->
        <div class="box_param_selected" v-if="!$store.state.flag_loading_param_farm">

            <ParamFarmViewV2 />

            <!--<DisplaysLine />

            <LineAnalisePeriodo />

            <Volat />

            <ChatParamFarm />-->

        </div>

        <LogoUPINCLinha />

    </div>
</template>

<script>
import axios from 'axios'

import MenuSuperiorDashAgro from '../MenuSuperiorDashAgro'
import MenuFarm from './MenuFarm'

import ParamFarmViewV2 from './ParamFarmViewV2'

//import DisplaysLine from './DisplaysLine'
//import LineAnalisePeriodo from './LineAnalisePeriodo'
//import Volat from './Volat'
//import ChatParamFarm from './ChatParamFarm'

import LogoUPINCLinha from './LogoUPINCLinha'

export default {
    components: { 
        MenuSuperiorDashAgro, 
        MenuFarm, 
        //DisplaysLine, 
        //LineAnalisePeriodo, 
        //Volat, 
        //ChatParamFarm, 
        ParamFarmViewV2,
        LogoUPINCLinha 
    },

    data() {
        return {
            //flag_loading_param_farm:true,
        }
    },

    methods:{
        //
    },

    created() {

        // A requisição abaixo pode ser descartada, uma vez que a entrada é através do menuFarm.
        // A não ser que haja um reload forçado na página. A busca init é pelo parâmetro [N].

        //console.log('param_selected: ',this.$store.state.param_selected)
        if (this.$store.state.param_selected != 'Nenhum parâmetro selecionado') { 
            return 
        } else {
            //console.log('nenhum param selecionado.')

            // a func req v1 ficou comentada apenas no component dashAgro/MenuFarm.vue
            // portanto, atribuir abaixo a func v2 para o caso de não haver param selecionado...

            // hardcode temporário.
            //this.$store.state.farm_name = 'Quinta experimental Fundão (lote de teste UPinC)'
            // 22/11/2024
            this.$store.state.farm_name = this.$store.state.farm_li_names[this.$store.state.global_indexFarm]
            var banco = ''
            if (this.$store.state.global_indexFarm == 0) {
                banco = 'farm'
            } else {
                banco = 'farm2'
            }

            this.$store.state.flag_loading_param_farm = true // habilitar loading. deixar page em espera de dados.
            //console.log(this.$router.history.current.path)
            
            var self = this

            // new 01/10/2024
            // chamar info param => item.get
            //console.log('item.get: ',item.get)
            var payload = {'data':'info_n_farm','banco':banco}
            axios.post(self.$store.state.pathAxiosGetParamFarmV2, payload).then(function (res) {
                //console.log(res.data.result)
                //console.log('tam: ',res.data.result.length)

                self.$store.state.param_selected = 'Nitrogênio [N] (Azoto) [mg/kg]' // nome local do param.

                var liTmpValues = []
                var liTmpDates = []
                var c=0
                while (c < res.data.result.length) {

                    liTmpValues.push(res.data.result[c].param)
                    
                    if (c == 0 || c == res.data.result.length-1) {

                        liTmpDates.push(res.data.result[c].date.slice(0,5))
                    
                    } else {

                        liTmpDates.push('')
                    }
                    c++
                }
                self.$store.state.param_values = liTmpValues
                self.$store.state.param_dates = liTmpDates
                //console.log('self.$store.state.param_values: ',self.$store.state.param_values)

                // tempo de carregamento também atribuído no ParamFarm.vue
                self.$store.state.flag_loading_param_farm = false // desabilitar loading. Abrir page.
            })
        }
    }
}
</script>