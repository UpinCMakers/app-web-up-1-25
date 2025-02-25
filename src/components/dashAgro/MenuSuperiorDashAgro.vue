<style scoped>
    @import url("../../styles/dashagro/menuSuperiorDashAgro.scss");
</style>

<template>
    <div class="box_menuSuperiorDashAgro">
        
        <div class="el_menu">
            <v-icon
            size="40"
            @mouseover="hoverBackAgro = 'rgb(247,215,46)'"
            @mouseleave="hoverBackAgro = 'rgb(31,122,177)'"
            @click="chamarRota()" 
            class="icon_menu_backAgro"
            :style="{'color': hoverBackAgro}"
            >
                mdi-arrow-top-left-thick
            </v-icon>
        </div>

        <div class="el_menu">

            <v-img class="el_img_logo ml-8"
                :src="imgLogoAgro" cover
            />
        </div>

        <div class="el_menu">
            <span class="txt_version">Versão beta 2.3.0</span>
        </div>

    </div>
</template>

<script setup>
import imgLogoAgro from '../../assets/logoAgroB_v_t1.png'
</script>

<script>
export default {
    props:['rota'],

    data() {
        return {
            //imgLogoAgro:require('../../assets/llt3.png'),

            hoverBackAgro:'rgb(31,122,177)',
        }
    },

    methods: {
        chamarRota() {
            this.$router.push(this.rota) // via props.
        },
    },

    created() {
        //console.log('this.rota: ',this.rota)
    }
}
</script>