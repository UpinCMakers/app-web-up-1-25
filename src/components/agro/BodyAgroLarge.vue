<style scoped>
    @import url("../../styles/agro/bodyAgroLarge.scss");
</style>

<template>
    <v-img :src="require('../../assets/p0b.png')" class="box_bodyAgroLarge"><!--:style="image"-->
        
        <MsgEmBreve />

    </v-img>
</template>

<script>
import MsgEmBreve from './MsgEmBreve'

export default {
    components: { MsgEmBreve },

    data() {
        return {
            //image: { backgroundImage: "url(https://vuejs.org/images/logo.png)" }
            image: { 
                backgroundImage:'url(' + require('../../assets/p0b.png') + ')',
                //border:'1px solid red',
            }
            //
        }
    },

    created() {
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.
    }
}
</script>