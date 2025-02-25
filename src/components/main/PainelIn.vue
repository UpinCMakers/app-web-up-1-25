<style scoped>
    @import url("../../styles/main/painelIn.scss");
</style>

<template>
    
    <div class="box_painelIn">
        
        <!-- SMALL -->

        <div class="el_painel_small hidden-md-and-up">
            <div class="el_img_small">
                <v-img :style="{'border-radius':'8px'}" :src="require('../../assets/covi2.png')"/>
            </div>
            <div class="el_img_small">
                <v-img :style="{'border-radius':'8px'}" :src="require('../../assets/fund4.png')"/>
            </div>
        </div>

        <!-- LARGE -->

        <div class="el_painel hidden-sm-and-down">
            <div class="el_img">
                <v-img :style="{'border-radius':'8px'}" :src="require('../../assets/covi1.png')"/>
            </div>
        </div>

        <div class="el_painel hidden-sm-and-down">
            <div class="el_img">
                <!--<v-img class="hidden-md-and-up" :style="{'border-radius':'8px'}" :src="require('../../assets/fund1.jpg')"/>-->
                <v-img class="" :style="{'border-radius':'8px'}" :src="require('../../assets/fund4.png')"/>
            </div>
        </div>    
    </div>

</template>

<script>
export default {

    methods: {
        //
    },

    created() {
        //this.$store.commit('srcIP') // without param. Initial main GET Req.
    }
}

</script>