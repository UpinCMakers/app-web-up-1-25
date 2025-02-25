<style scoped>
    @import url("../../styles/exibServ/mainExibServ.scss");
</style>

<template>
    <div class="box_mainExibServ" v-if="!$store.state.flagMenuSup"
    :style="{
    backgroundImage:'url(' + require('../../assets/autot0.webp') + ')',
    backgroundSize: 'cover', // contain cover
    backgroundPosition: 'bottom' // center
    }"
    >

        <div v-if="flagLoadingInit"
        :style="{'display':'flex','width':'100%','align-items':'center','justify-content':'center'}">
            <v-progress-circular 
                color="rgb(247,215,46)"
                size="64"
                indeterminate
            ></v-progress-circular>
        </div>

        <!-- MENU LATERAL -->
        <MenuLateralDash v-if="!flagLoadingInit"
        @watchExib="callChangeFlagExib($event)" 
        @watchHideMenu="callChangeTamExib($event)" 
        @chooseItemFromMenu="chooseItemFromMenu($event)"
        />

        <!-- PAINEL EXIBIDOR -->
        <div class="painelExibidor" :style="{'width':widthDinam}" v-if="flagExib && !flagLoadingInit">

            <ValvesAg v-if="strFlagMenuOpenItem == 'Acionamento agendado'" />

            <ValvesDir v-if="strFlagMenuOpenItem == 'Acionamento direto'" />

            <LogValves v-if="strFlagMenuOpenItem == 'Logs acionamento'" />

            <Sensores v-if="strFlagMenuOpenItem == 'Sensoriamento'" />

        </div>

    </div>
</template>

<script>
import axios from 'axios'
import MenuLateralDash from './MenuLateralDash'

import ValvesAg from './ValvesAg'
import ValvesDir from './ValvesDir'
import LogValves from './LogValves'
import Sensores from './Sensores'

export default {
    components: { MenuLateralDash, ValvesAg, ValvesDir, LogValves, Sensores },

    data() {
        return {
            //
            flagLoadingInit:true, // desabilitar Loading depois de carregar as info da page.
            //
            flagExib:true, // init versão large
            widthDinam:'75%', // init versão large com menu aberto. Na versão small o menu é width=100% sempre.

            //
            strFlagMenuOpenItem:'Acionamento agendado', // controle do item selecionado na página, pelo menu lateral.
            // 'Acionamento agendado' 'Acionamento direto' 'Logs acionamento'

            //
            LarguraPage:0,
        }
    },

    methods:{
        // ---- CONTROLE DO ENQUADRAMENTO DO TAMANHO DA PÁGINA.
        // -- controle da versão do tamanho da página.
        callChangeFlagExib(flagFromChild) { this.flagExib = flagFromChild }, //flagFromChild[0] },
        // ---- CONTROLE DO ENQUADRAMENTO DO TAMANHO DA PÁGINA.
        // -- se o menu fechou então aumentar tamanho do painel de exibição da página, pois o menu ficou menor.
        callChangeTamExib(flagHide) { 
            //var flagHide = li[0]
            //var tamPage = li[1]
            if (flagHide == true) { // menu fechou.

                if (this.LarguraPage < 500) { this.flagExib = true }

                this.widthDinam = '100%' // preencher toda a página, pois o menu lateral é 80px.

            } else { // menu abriu.

                // versão small deve ser exibida quando o menu fechar.
                if (this.LarguraPage < 500) { this.flagExib = false }

                this.widthDinam = '75%' // reset (menu re-aberto).
            }
        },

        // ---- SWITCH para selecionar o item do menu, emitido do componente child.
        chooseItemFromMenu(strFromMenu) { 

            if (strFromMenu == 'Voltar Área Usuário') { this.$router.push('/dashmain'); return; }

            this.strFlagMenuOpenItem = strFromMenu
            this.flagExib = true // exibir conteúdo selecionado pelo menu lateral.
        },
    },

    created() {
        window.scrollTo(0,0)

        // -- STORAGE
        var creden = JSON.parse(localStorage.getItem('creden'))
        var contentUser = JSON.parse(localStorage.getItem('contentUser'))

        if (creden != null) {
            this.$store.state.flagLogadoDash = creden.flagLogadoDash
            this.$store.state.contentUser = contentUser
        }

        if (this.$store.state.flagLogadoDash == true) { // última alteração 07/10/2024

            this.LarguraPage = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

            var self = this

            axios.get(self.$store.state.pathAxiosGetValvesAg).then(function (res) {

                console.log(res.data.result)

                self.flagLoadingInit = false
            })

        } else {

            // -- reencaminhar para login.
            this.$router.push('/dashmain')
        }
    }
}
</script>