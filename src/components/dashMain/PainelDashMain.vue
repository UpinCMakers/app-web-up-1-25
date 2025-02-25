<style scoped>
    @import url("../../styles/dashMain/painelDashMain.scss");
</style>

<template>
    <div class="box_painelDashMain mt-4 mb-4" v-if="!$store.state.flagMenuSup">

        <!-- Usuário -->
        <div class="linhaTit">
            <v-icon>mdi-account</v-icon>
            <span>Bem vinda(o), {{ $store.state.contentUser.nome }}</span>
        </div>

        <div class="linhaContent">
            
            <CardUserDashMain :objUser="$store.state.contentUser" />

            <!-- BTN LOG OFF USER -->
            <div class="btnLogOffUser"
            @click="closePainel()"
            @mouseover="changeBtnLogOff('on')"
            @mouseleave="changeBtnLogOff('off')"
            :style="{'background':backLogOffBtn}"
            >
                <!-- <v-icon x-large>mdi-account-lock</v-icon> -->
                <v-icon :style="{'color':corIconLogOffBtn}" x-large>mdi-door-closed-lock</v-icon>
                <span>Sair do painel</span>
            </div>

        </div>

        <!-- Serviços -->
        <div class="linhaTit">
            <v-icon>mdi-account-wrench</v-icon>
            <span>Serviços contratados</span>
        </div>

        <div class="linhaContent">
            
            <CardServDashMain v-for="(s, i) in liServsLocal" :key="i"
            :serv="s.serv" :img="s.img" :content="s.content" :rota="s.rota"
            />

        </div>

    </div>
</template>

<script>
import CardUserDashMain from './CardUserDashMain'
import CardServDashMain from './CardServDashMain'

export default {

    //props:['objUser'],

    components:{CardUserDashMain, CardServDashMain},

    data() {
        return {
            //
            liServsLocal:[], // lista de serviços contratados pelo usuário. Rcv from db.

            backLogOffBtn:'rgba(1,1,1,0.6)', // background do btn logoff user.
            corIconLogOffBtn:'',
        }
    },

    methods:{
        // encerrar sessão do usuário logado. (não necessário enviar parâmetro flag).
        closePainel() { this.$emit('closePainel') },
        
        changeBtnLogOff(strFlag) { 
            if(strFlag == 'on') {
                this.backLogOffBtn = 'rgba(31,122,177,0.4)'
                this.corIconLogOffBtn = 'rgb(247,215,46)'
            } else {
                this.backLogOffBtn = 'rgba(1,1,1,0.6)'
                this.corIconLogOffBtn = ''
            }
        },
    },

    created() {
        window.scrollTo(0,0)
        //console.log('objUser [painelDashMain]: ',this.objUser)
        this.liServsLocal = this.$store.state.contentUser.liServs
    }
}
</script>