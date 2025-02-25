<style scoped>
    @import url("../../styles/dashagro/logindashagro.scss");
</style>

<template>
    <v-img class="box_logindashagro" :src="imgTest">
        
        <div class="painel_login_dashagro">

            <v-icon
            large 
            @mouseover="hoverBackAgro = 'rgb(247,215,46)'"
            @mouseleave="hoverBackAgro = 'rgb(31,122,177)'"
            @click="chamarRota('/agro')" 
            class="el_tit_btn_voltar_agro"
            :style="{'color': hoverBackAgro}"
            >
                mdi-arrow-top-left-thick
            </v-icon>

            <div class="img_logo_login">
                <span class="txt_img_logo_login">UPinC Agro</span>

                <v-img class="el_img_logo_login" :style="{'border-radius':'40px'}"
                    :src="imgLogoAgro"
                />

                <div class="txt_painel_login" v-if="!$store.state.flagCadastroUserAgro">Login</div>
                <div class="txt_painel_login" v-if="$store.state.flagCadastroUserAgro">Cadastro</div>
            </div>

            <div class="dados_login" v-if="!$store.state.flagCadastroUserAgro">
                <PainelLoginA />
            </div>

            <div class="dados_login" v-if="$store.state.flagCadastroUserAgro">
                <PainelCadastroA />
            </div>

        </div>

    </v-img>
</template>

<script>
import PainelLoginA from './PainelLoginA'
import PainelCadastroA from './PainelCadastroA'

export default {
    components: { PainelLoginA, PainelCadastroA },

    data() {
        return {
            imgTest:require('../../assets/p3b.png'), // background

            imgLogoAgro:require('../../assets/logoAgroB_v_t2.png'),

            hoverBackAgro:'rgb(31,122,177)',
        }
    },

    methods: {
        chamarRota(rota) {
            this.$router.push(rota)
            //this.$store.commit('startChange_p2')
        },
    },

    created() {
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.
    }
}
</script>