<style scoped>
    @import url("../../styles/agro/menuAgro.scss");
</style>

<template>
    <div class="box_menuAgro">
        
        <div class="content_menuAgro">
            
            <!-- BTN VOLTAR -->
            <div class="el_menuSup">
                
                <!--<v-icon large>mdi-arrow-top-left-thick</v-icon>-->
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                        v-bind="attrs"
                        v-on="on"
                        large 
                        @mouseover="hoverBackMain = 'rgb(31,122,177)'"
                        @mouseleave="hoverBackMain = 'rgb(247,215,46)'"
                        @click="chamarRota('/')" 
                        class="el_tit_btn_voltar"
                        :style="{'color': hoverBackMain}"
                        >
                            mdi-arrow-top-left-thick
                        </v-icon>
                    </template>

                    <span>Voltar ao início</span>

                </v-tooltip>

                <!---->
                <span 
                class="el_tit_btn_voltar hidden-sm-and-down" 
                @click="chamarRota('/')"
                @mouseover="hoverBackMain = 'rgb(31,122,177)'"
                @mouseleave="hoverBackMain = 'rgb(247,215,46)'"
                >
                    Voltar ao início</span>

            </div>

            <!-- IMG Menu -->
            <div class="img_card_menu">

                <span class="txt_img_agro">UPinC Agro</span>

                <v-img class="img_agro" :style="{'border-radius':'40px'}"
                    :src="imgLogoAgro"
                />
            </div>

            <!-- USER -->
            <div class="user_el" @click="chamarRota('/dashagro')" 
            @mouseover="hoverUser = 'rgb(31,122,177)'"
            @mouseleave="hoverUser = 'rgb(247,215,46)'"
            >
                <span class="txt_user hidden-sm-and-down">Área do usuário</span>

                <v-icon large :style="{'color':hoverUser}"
                >
                    mdi-account</v-icon>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    //components: { MenuAgro },

    data() {
        return {
            hoverBackMain:'rgb(247,215,46)',
            hoverUser:'rgb(247,215,46)',

            imgLogoAgro:require('../../assets/logoAgroB_v_t1.png'),
        }
    },

    methods: {
        chamarRota(rota) {
            this.$router.push(rota)
        },
    },

    created() {
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.
    }
}
</script>