<style scoped>
    @import url("../../../styles/dashagro/smartfarm/fazenda.scss");
</style>

<template>
    <div class="box_fazenda">

        <MenuSuperiorDashAgro :rota="'/smartfarm'" />

        <div class="progress_bar mt-8" v-if="$store.state.flag_loading_farm">

            <span class="mb-2" :style="{'font-size':'0.7rem'}">Buscando suas informações</span>

            <v-progress-circular
            :size="70"
            :width="7"
            color="green"
            indeterminate
            ></v-progress-circular>
        </div>

        <!-- Menu geral farm -->
        <MenuFarm v-if="!$store.state.flag_loading_farm" />

        <!-- LARGE -->
        <div class="box_titLine_farm hidden-sm-and-down" v-if="!$store.state.flag_loading_farm">
            <div class="painel_titLine_farm">
                <v-icon class="mr-1">mdi-sprout</v-icon>
                <span>{{ $store.state.farm_name }}</span>
            </div>
        </div>

        <!-- SMALL -->
        <div class="box_titLine_farm hidden-md-and-up" v-if="!$store.state.flag_loading_farm">
            <div class="painel_titLine_farm" :style="{'width':'90%'}">
                <v-icon class="mr-1">mdi-sprout</v-icon>
                <span>{{ $store.state.farm_name }}</span>
            </div>
        </div>

        <div class="box_farm_selected" v-if="!$store.state.flag_loading_farm">

            <div class="painel_farm" :style="{'width':'90%'}">

                <v-img class="main_farm_a"
                :src="imgLocalFarmSelected"
                cover
                />
                
                <GridFazenda :info_farm="info_farm_rcv" />

            </div>

        </div>

        <LogoUPINCLinha />

        <!--<GridFarmA />-->

    </div>
</template>

<script setup>
import map0Image from '../../../assets/map0.png'
import map1Image from '../../../assets/map1.jpeg'

import { useStore } from 'vuex'
</script>

<script>
import axios from 'axios'

import MenuSuperiorDashAgro from '../MenuSuperiorDashAgro'
import MenuFarm from './MenuFarm'
import LogoUPINCLinha from './LogoUPINCLinha'
import GridFazenda from './GridFazenda'

export default {
    components: { MenuSuperiorDashAgro, MenuFarm, LogoUPINCLinha, GridFazenda },

    data() {
        return {
            //flag_loading_select_farm:true, // init true (aguardando rcb els farms)

            imgLocalFarmSelected:'', // selecionado localmente através do id clicado na lista de terrenos.
            indexImgFarm:0,

            info_farm_rcv:{}, // axios
        }
    },

    methods:{
        //
    },

    created() {
        
        /*setTimeout(() => {
            this.flag_loading_select_farm = false // desabilitar loading. Abrir page.
        },2000)*/


        const store = useStore()

        var liImgFarmCl = [ map0Image, map1Image ]

        store.state.flag_loading_farm = true // habilitar loading. deixar page em espera de dados.

        var self = this

        // chamar info param => item.get
        var payload = {'data':store.state.global_indexFarm} // init.
        axios.post(store.state.pathAxiosGetFarm, payload).then(function (res) {

            //console.log(res.data.result.farm_logs)

            self.imgLocalFarmSelected = liImgFarmCl[store.state.global_indexFarm] // LOCAL (tmp)

            store.state.farm_name = res.data.result.farm_name
            store.state.farm_img = res.data.result.farm_img

            // props send.
            self.info_farm_rcv = {
                'farm_name':res.data.result.farm_name,
                'farm_desc':res.data.result.farm_desc,
                'farm_area':res.data.result.farm_area,
                'farm_perimetro':res.data.result.farm_perimetro,
                'tipo_solo':res.data.result.tipo_solo,
                'farm_logs':res.data.result.farm_logs.slice(0).reverse() // o ultimo é o mais recente.
            }
            // local save.
            store.state.farm_desc = res.data.result.farm_desc
            store.state.farm_area = res.data.result.farm_area
            store.state.farm_perimetro = res.data.result.farm_perimetro
            store.state.farm_logs = res.data.result.farm_logs.slice(0).reverse()
            
            store.state.flag_loading_farm = false // desabilitar loading. Abrir page.
        })
    }
}
</script>