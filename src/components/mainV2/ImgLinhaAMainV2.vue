<style scoped>
    @import url("../../styles/mainV2/imgLinhaAMainV2.scss");
</style>

<template>
    
    <div class="box_imgLinhaAMainV2">

        <div class="el_img"
        :style="{
            backgroundImage:'url(' + require('../../assets/capa-up-t0.png') + ')',
            backgroundSize: 'cover', // contain
            backgroundPosition: 'top' // center
        }"
        ></div>

        <!--<v-img class="el_img" 
        :src="require('../../assets/imgMainV2_t0.webp')"
        ></v-img>-->
            
    </div>

</template>

<script>
export default {
    data() {
        return {
            //
        }
    },

    methods: {
        //
    },

    created() {
        //this.$store.commit('srcIP') // without param. Initial main GET Req.
    }
}

</script>