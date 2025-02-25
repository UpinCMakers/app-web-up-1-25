<style scoped>
    @import url("../../styles/dashagro/mainDashAgro.scss");
</style>

<template>
    <div class="box_mainDashAgro">
        
        <MenuSuperiorDashAgro :rota="'/agro'" />

        <div class="progress_bar_pda" v-if="$store.state.flag_loading_perfil_dash_agro">

            <span class="mb-2" :style="{'font-size':'0.7rem'}">Buscando suas informações</span>

            <v-progress-circular
            :size="70"
            :width="7"
            color="green"
            indeterminate
            ></v-progress-circular>

        </div>

        <!-- PAINEL MENU LATERAL + ÁREA DE EXIBIÇÃO -->
        <PainelDash v-if="!$store.state.flag_loading_perfil_dash_agro" />

    </div>
</template>

<script>
import axios from 'axios'

import MenuSuperiorDashAgro from './MenuSuperiorDashAgro'
import PainelDash from './PainelDash'

export default {
    components: { MenuSuperiorDashAgro, PainelDash },

    data() {
        return {
            rotaBackToDashAgro:'/agro', // voltar ao upinc.agro
        }
    },

    created() {
        this.$store.state.flag_loading_perfil_dash_agro = true // loading perfil dash agro
        
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.

        var self = this
        axios.get(self.$store.state.pathAxiosGetPerfilDash).then(function (res) {

            //console.log(res.data.result)

            self.$store.state.perfil_agro_nome = res.data.result.nome
            self.$store.state.perfil_agro_email = res.data.result.email
            self.$store.state.perfil_agro_servicos = res.data.result.servicos
            self.$store.state.perfil_agro_suporte = res.data.result.suporte
            self.$store.state.perfil_agro_notific = res.data.result.notific
            self.$store.state.perfil_agro_chat_log = res.data.result.chat_log.slice(0).reverse()

            self.$store.state.flag_loading_perfil_dash_agro = false // abrir perfil dash agro
        })
    }
}
</script>