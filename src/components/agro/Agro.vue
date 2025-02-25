<style scoped>
    @import url("../../styles/agro/agro.scss");
</style>

<template>
    <div class="box_agro" v-if="!$store.state.flagMenuSup"><!--:style="image"-->
        
        <MenuAgro />

        <!-- SMALL -->
        <BodyAgro class="hidden-md-and-up" />

        <!-- LARGE -->
        <BodyAgroLarge class="hidden-sm-and-down" />

        <!--<MsgEmBreve />-->
    </div>
</template>

<script>
import MenuAgro from './MenuAgro'
import BodyAgro from './BodyAgro'
import BodyAgroLarge from './BodyAgroLarge'
//import MsgEmBreve from './MsgEmBreve'

export default {
    components: { MenuAgro, BodyAgro, BodyAgroLarge /*MsgEmBreve*/ },

    data() {
        return {
            //image: { backgroundImage: "url(https://vuejs.org/images/logo.png)" }
            //image: { backgroundImage:'url(' + require('../../assets/p0g.jpg') + ')' }
            //
        }
    },

    created() {
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.
        this.$store.commit('init') // despertar api.
    }
}
</script>