<style scoped>
    @import url("../../styles/estruturais/cardMainSup.scss");
</style>

<template>

    <!--<v-img class="box_main"
    :src="require('../../assets/fundo4.png')"
    >
        <LineMain />

    </v-img>

    <div class="box_main">

        <v-img class="el_main_img"
            :src="require('../../assets/fundo4.png')"
        >

            <LineMain />

        </v-img>

    </div>-->

    <v-parallax class="box_cardMainSup"
    :src="$store.state.img_parallax"
    height="700"
    >
    </v-parallax>

    <!--<div class="box_cardMainSup">

         :style="{'margin-top':'50px','box-shadow': '10px 0px 6px rgba(1, 1, 1, 1)'}" 
        <v-parallax 
        :src="$store.state.img_parallax"
        width="1000"
        >
        </v-parallax>
    
    </div>-->


</template>

<script>
//import LineMain from './LineMain.vue'

export default {
    
    //components: { LineMain }
}
</script>