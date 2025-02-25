<style scoped>
    @import url("../../../styles/dashagro/smartfarm/fazendasDash.scss");
</style>

<template>
    <div class="box_fazendaDash" v-if="!$store.state.flagMenuSup">

        <!-- <MenuSuperiorDashAgro :rota="'/dashagro'" /> -->
        <MenuSuperiorDashAgro :rota="'/dashmain'" />

        <div class="progress_bar" v-if="$store.state.flag_loading_init_farm">

            <span class="mb-2" :style="{'font-size':'0.7rem'}">Buscando suas informações</span>

            <v-progress-circular
            :size="70"
            :width="7"
            color="green"
            indeterminate
            ></v-progress-circular>

        </div>

        <div class="boxListFarms" v-if="!$store.state.flag_loading_init_farm">

            <v-icon class="mt-8">mdi-sprout</v-icon>

            <span class="mb-4 mt-2" :style="{'font-size':'1.1rem'}">Terrenos disponíveis</span>

            <div class="painelListFarms">

                <div v-for="(el,i) in $store.state.farm_li_names" :key="i" 
                class="el_list animate__animated animate__flash" 
                @click="openFarm(i)"
                >
                    {{ el }}
                </div>

            </div>

        </div>

        <!--<GridFarmA />-->

    </div>
</template>

<script>
//import axios from 'axios'

import MenuSuperiorDashAgro from '../MenuSuperiorDashAgro'
//import GridFarmA from './GridFarmA'

export default {
    components: { MenuSuperiorDashAgro /*GridFarmA*/ },

    data() {
        return {
            //flag_loading_init_farm:true, // init true (aguardando rcb els farms)

            //li_tmp:['Quinta experimental Fundão (lote de teste UPinC)','Teste qualquer de um item'],
            //li_tmp:['Quinta experimental Fundão (lote de teste UPinC)'],
        }
    },

    methods:{
        openFarm(index_farm) {
            //console.log('index_farm: ',index_farm)
            // atribuir info da farm selecionada em um var list global.
            this.$store.state.global_indexFarm = index_farm
            this.$router.push('/land')
        }
    },

    created() {
        window.scrollTo(0,0)
        
        /*setTimeout(() => {
            this.flag_loading_init_farm = false // desabilitar loading. Abrir page.
        },2000)
        */

        if (this.$store.state.flagLogadoDash == true) { // última alteração 10/09/2024

            this.$store.state.flag_loading_init_farm = true // habilitar loading. deixar page em espera de dados.

            //var self = this

            this.$store.state.farm_li_names = [
                'Quinta experimental Fundão (lote de teste UPinC)',
                'Quinta experimental Fundão (Macieira, Pereira, Pessegueiro)',
            ]
                
            this.$store.state.flag_loading_init_farm = false // desabilitar loading. Abrir page.

            // chamar info param => item.get
            /*var payload = {'data':'get_all_farms'} // init.
            axios.post(self.$store.state.pathAxiosGetFarm, payload).then(function (res) {

                //console.log(res.data.result)

                self.$store.state.farm_li_names = res.data.result.names
                
                self.$store.state.flag_loading_init_farm = false // desabilitar loading. Abrir page.
            })*/
            //this.$store.commit('startChange_p2') // retirado em 24/09/2024.

        } else {

            // -- reencaminhar para login.
            this.$router.push('/dashmain')
        }
    }
}
</script>