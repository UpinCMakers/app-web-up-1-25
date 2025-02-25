<style scoped>
    @import url("../../styles/dashagro/menuLateralDash.scss");
</style>

<template>
    <div class="box_menuLateralDash" :style="{'width':dinanWidth}">
        
        <!-- LOGO ACIMA DO MENU 
        <div class="logo_menuLat">

            <span class="txt_img_logo hidden-sm-and-down" :style="{'font-size':dinanFontSize}">UPinC Agro</span>
            <span class="txt_img_logo hidden-md-and-up" :style="{'font-size':'0.6rem'}">UPinC Agro</span>

            <v-img class="el_img_logo hidden-sm-and-down" :style="{'border-radius':'40px'}" :src="imgLogoAgro" />

            <v-img 
            class="el_img_logo hidden-md-and-up" 
            :style="{'border-radius':'40px','height':'60px','width':'60px'}" 
            :src="imgLogoAgro" />

        </div>-->

        <!-- ICONES DO MENU -->
        <div class="btns_menuLat mt-10">
            <div class="btn_HideMenu" @click="hideMenu()" >
                <v-icon v-if="!flagTrocaIconMenu"
                @mouseover="colorBtnHide = 'rgb(247,215,46)'"
                @mouseleave="colorBtnHide = 'green'"
                :style="{'color': colorBtnHide}"
                >
                    mdi-menu-open
                </v-icon>
                <v-icon v-if="flagTrocaIconMenu"
                @mouseover="colorBtnHide = 'rgb(247,215,46)'"
                @mouseleave="colorBtnHide = 'green'"
                :style="{'color': colorBtnHide,'transform':'rotate(180deg)'}"
                >
                    mdi-menu-open
                </v-icon>
            </div>

            <!-- btns -->
            <div class="el_btn" v-for="(el, index) in itemsMenuLat" :key="index"
            @mouseover="el.color = el.colorIn"
            @mouseleave="el.color = el.colorOut"
            @click="chamarExib(el.rota)" 
            >
                <span class="txt_menuLat hidden-sm-and-down" v-if="!flagHide">

                    {{ el.tit }}
                    
                    <span v-if="el.rota == ''"
                    :style="{'align-self':'flex-start','font-size':'0.6rem','color':'red'}">Em breve</span>
                    
                </span>
                <v-icon
                large 
                class="icon_menuLat"
                :style="{'color': el.color}"
                >
                    {{ el.icon }}
                </v-icon>
            </div>
        </div>

    </div>
</template>

<script>
//import MenuLateralDash from './MenuLateralDash'

export default {
    //components: { MenuLateralDash },

    data() {
        return {
            imgLogoAgro:require('../../assets/logoAgroB_v_t2.png'),

            colorBtnHide:'green',
            flagHide:true,
            dinanWidth:'', // init width = 15% + 85%
            //dinanWidth:'60px',
            dinanFontSize:'0.8rem',
            flagTrocaIconMenu:true,

            itemsMenuLat:[
                {'tit':'Perfil','rota':'/dashagro','icon':'mdi-account-cowboy-hat-outline','colorIn':'rgb(247,215,46)','colorOut':'rgb(31,122,177)','color':'rgb(31,122,177)'},
                {'tit':'Tutoriais','rota':'','icon':'mdi-message-cog-outline','colorIn':'rgb(247,215,46)','colorOut':'rgb(31,122,177)','color':'rgb(31,122,177)'},
                {'tit':'Residencial','rota':'','icon':'mdi-greenhouse','colorIn':'rgb(247,215,46)','colorOut':'rgb(31,122,177)','color':'rgb(31,122,177)'},
                {'tit':'Estufas','rota':'','icon':'mdi-hoop-house','colorIn':'rgb(247,215,46)','colorOut':'rgb(31,122,177)','color':'rgb(31,122,177)'},
                {'tit':'Fazendas','rota':'/smartfarm','icon':'mdi-sprout','colorIn':'rgb(247,215,46)','colorOut':'rgb(31,122,177)','color':'rgb(31,122,177)'},
                {'tit':'Sair','rota':'/exit','icon':'mdi-account-lock','colorIn':'rgb(247,215,46)','colorOut':'rgb(31,122,177)','color':'rgb(31,122,177)'},
            ],
        }
    },

    methods: {
        //chamarExib(index_page) {
        chamarExib(rota_page) {
            //console.log(index_page)
            
            if(rota_page == '/exit') {
                this.$store.state.flagLogadoDashAgro = false

                // -- STORAGE
                var update_credenAgro = {'flagLogadoDashAgro':false}
                localStorage.setItem('credenAgro', JSON.stringify(update_credenAgro))
                return
            }

            if(rota_page == '') {
                return
            }

            this.$router.push(rota_page)

            //this.$store.state.flagInt_selectDashAgro = index_page
        },
        hideMenu() {

            var largura = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

            if(!this.flagHide){
                this.dinanWidth = '60px'
                //this.$store.state.dinanWidthExib = '90%'
                this.$store.state.dinanWidthExib = (largura - 60)
                this.dinanFontSize = '0.6rem'
            } else {
                this.dinanWidth = '20%'
                //this.$store.state.dinanWidthExib = '80%'
                this.$store.state.dinanWidthExib = largura * 0.8
                this.dinanFontSize = '0.8rem'
            }
            this.flagHide = !this.flagHide
            this.flagTrocaIconMenu = !this.flagTrocaIconMenu
        },
    },

    created() {
        this.$store.state.flagInt_selectDashAgro = 0 // selecionar perfil page ao entrar.

        // Ajuste dinâmico para os componentes móveis.
        var largura = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        this.dinanWidth = '60px'
        //this.$store.state.dinanWidthExib = '1115px'
        this.$store.state.dinanWidthExib = (largura - 60) // -60px
        this.$store.state.dinanWidthExib = this.$store.state.dinanWidthExib.toString() + 'px'
        this.dinanFontSize = '0.6rem'
    }
}
</script>