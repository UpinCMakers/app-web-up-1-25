<style scoped>
    @import url("../../styles/agro/bodyAgro.scss");
</style>

<template>
    <div class="box_bodyAgro" :style="image">
        
        <MsgEmBreve />

    </div>
</template>

<script>
import MsgEmBreve from './MsgEmBreve'

export default {
    components: { MsgEmBreve },

    data() {
        return {
            //image: { backgroundImage: "url(https://vuejs.org/images/logo.png)" }
            image: { backgroundImage:'url(' + require('../../assets/p0g.jpg') + ')' }
            //
        }
    },

    created() {
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.
    }
}
</script>