<style scoped>
    @import url("../../styles/dashagro/painelDash.scss");
</style>

<template>
    <div class="box_painelDash">
        
        <!-- LARGE menu lateral -->
        <!-- :style="{'width':widthMenuLat}" -->
        <MenuLateralDash class="hidden-sm-and-down" />

        <!-- SMALL menu lateral -->
        <MenuLateralDashSmall class="hidden-md-and-up" />
        
        <!-- ÁREA DE EXIBIÇÃO -->
        <!-- LARGE -->
        <!-- :style="{'width':$store.state.dinanWidthExib}" -->
        <ExibGeralDash class="hidden-sm-and-down" :style="{'width':$store.state.dinanWidthExib}" />

        <!-- SMALL -->
        <!-- state.dinanWidthExib usado para montar a primeira entrada na page -->
        <ExibGeralDash v-if="!this.$store.state.flagMenuSmall" 
        class="hidden-md-and-up" 
        :style="{'width':$store.state.dinanWidthExib}" 
        />

    </div>
</template>

<script>
import MenuLateralDash from './MenuLateralDash'
import MenuLateralDashSmall from './MenuLateralDashSmall'
import ExibGeralDash from './ExibGeralDash'

export default {
    components: { MenuLateralDash, MenuLateralDashSmall, ExibGeralDash },

    data() {
        return {
            //widthMenuLat:'20%',
        }
    },

    created() {
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.

        /*var largura = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        console.log('width page: ',largura)

        this.$store.state.dinanWidthExib = largura - 60 // -60px
        console.log('this.$store.state.dinanWidthExib: ',this.$store.state.dinanWidthExib)
        
        this.widthMenuLat = 60
        console.log('this.widthMenuLat: ',this.widthMenuLat)*/
    }
}
</script>