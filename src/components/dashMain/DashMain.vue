<style scoped>
    @import url("../../styles/dashMain/dashMain.scss");
</style>

<template>
    <div class="box_dashMain" v-if="!$store.state.flagMenuSup"
    :style="{
    backgroundImage:'url(' + require('../../assets/city_ia_t1.webp') + ')',
    backgroundSize: 'cover', // cover contain
    backgroundPosition: 'center' // top center
    }">

        <LoginPageTipoA v-if="!$store.state.flagLogadoDash"
        @openPainel="resultLogin($event)"
        />

        <PainelDashMain v-if="$store.state.flagLogadoDash"
        @closePainel="logOff()"
        :objUser="$store.state.contentUser"
        />

    </div>
</template>

<script>
import LoginPageTipoA from './LoginPageTipoA'
import PainelDashMain from './PainelDashMain'

export default {

    components:{LoginPageTipoA, PainelDashMain},

    data() {
        return {
            //
            //flagLoginDashMain:true, // tornou-se variável global em 10/09/2024.
            //objUserMain:{}, // tornou-se variável global em 10/09/2024. (contentUser)
        }
    },

    methods:{
        //
        resultLogin(objUser) { 

            //console.log('objUser: ',objUser)
            //this.objUserMain = objUser
            this.$store.state.contentUser = objUser
            //console.log('objUserMain: ',this.objUserMain)
            this.$store.state.flagLogadoDash = true // habilitar painel inicial do usuário.
        },
        logOff() { 
            // -- desabilitar painel inicial do usuário.
            
            this.$store.state.flagLogadoDash = false
            this.$store.state.contentUser = {} // reset

            var update_creden = {'flagLogadoDash':false}
            localStorage.setItem('creden', JSON.stringify(update_creden))
            localStorage.setItem('contentUser', JSON.stringify({}))
        },
    },

    created() {
        window.scrollTo(0,0)

        // -- STORAGE
        var creden = JSON.parse(localStorage.getItem('creden'))
        var contentUser = JSON.parse(localStorage.getItem('contentUser'))
        //console.log(creden)

        if (creden != null) {
            this.$store.state.flagLogadoDash = creden.flagLogadoDash
            this.$store.state.contentUser = contentUser

            //console.log('flag login está alocada localmente [dashmain]')
        }
    }
}
</script>