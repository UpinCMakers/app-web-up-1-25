<style scoped>
    @import url("../../styles/cardMainA.scss");
</style>

<template>

    <div class="box_cardMainA">

        <!-- LARGE tit -->
        <span class="tit_cardA">
            <span class="palavrasTit" v-for="(c,index) in palavrasTit" :key="index">{{ c }}</span>
        </span>

        <!-- SMALL tit -->
        <!--<span class="tit_cardA hidden-md-and-up" :style="{'font-size':'1.6rem'}">
            <span class="palavrasTit" v-for="(c,index) in palavrasTit" :key="index">{{ c }}</span>
        </span>-->

        <!-- texto abaixo do título -->
        <span class="txt_cardA">
            <span class="palavras_txt_cardA" v-for="(i,index) in palavras" :key="index" >
                
                <span>{{ i }}</span>
            </span>
        </span>

        <AnimSmartGarden class="carousel_cardA hidden-sm-and-down" />

    </div>

</template>

<script>
//import ElemPainel from '../pequenos/ElemPainel.vue'
import AnimSmartGarden from '../pequenos/AnimSmartGarden.vue'

export default {
    
    components: { AnimSmartGarden },

    data() {
        return {
            txt0:'Você sabe como a UPinC pode fazer parte da sua trajetória?',
            palavrasTit: [],
            txt1:'Em breve você poderá conhecer como a comunidade pode contribuir com o seu crescimento.',
            palavras: [],
        }
    },

    created () {

        this.palavrasTit = this.txt0.split(" ")
        this.palavras = this.txt1.split(" ")
        console.log('palavra: ',this.palavras)
    }

}
</script>