<style scoped>
    @import url("../../styles/mainV2/elTxtShowAuxMain0.scss");
</style>

<template>
    
    <div class="box_elTxtShowAuxMain0"
    :style="{
        'width':widthDinam,
        'height':heightDinam
        }">

        <div class="paineltxtShow">

            <v-icon class="hidden-sm-and-down" large :style="{'color':'rgb(31,122,177)'}">mdi-earth</v-icon>
            
            <div class="boxTxtShow mt-4">
                <span class="elTxtShow" v-for="(txt,i) in liTxtAuxMain0" :key="i">{{ txt }}</span>
            </div>

            <span
            class="mt-4"
            :style="{
                'font-size':'2.4rem',
                'font-weigth':'bold'
                }">

                700km2 +
            </span>

            <div class="btnCallAction"
            @mouseover="corBtnMapaMainV2 = 'rgb(31,122,177)'"
            @mouseleave="corBtnMapaMainV2 = ''"
            :style="{'color':corBtnMapaMainV2}"
            @click="callPage('lora')"
            >
                <span class="mr-1">Mapa</span>
                <v-icon :style="{'color':corBtnMapaMainV2}">mdi-map</v-icon>
            </div>

        </div>
        
    </div>

</template>

<script>
export default {

    props:['widthDinam','heightDinam'],

    data() {
        return {
            // v1
            //liTxtAuxMain0:['Área','coberta','pela','rede','LoRaWAN','sob','nossa','supervisão.'],

            // v2
            liTxtAuxMain0:['Conheça'/*,'em','segundos' */,'a','área','coberta','pela','rede','LoRaWAN','sob','nossa','supervisão.'],
        
            corBtnMapaMainV2:'',
        }
    },

    methods: {
        callPage(rota) { this.$router.push(rota) },
    },

    created() {
        //
    }
}

</script>