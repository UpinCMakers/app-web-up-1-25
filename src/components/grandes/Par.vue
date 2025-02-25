<style scoped>
    @import url("../../styles/pars.scss");
</style>

<template>

    <!-- @mousemove="callMoveAction" -->
    <div class="par_el" v-scroll="callMoveAction">

        <!--<div class="par_tit">
            {{ par.title }}
        </div>-->

        <img v-if="!flagApagarImg" :src="par.src" class="par_img" :style="{'width':widthDinamic+'%'}"/>

    </div>

</template>

<script>
export default {
    props: ['par'],
    data() {
        return {
            widthDinamic:110,
            flagApagarImg:false,
            flagInitImgOn:true,
        }
    },
    methods: {
        callMoveAction() {
            let scrollY = window.scrollY
            //console.log(scrollY)

            let fator = scrollY / 200

            this.widthDinamic = this.widthDinamic - fator
            //console.log(this.widthDinamic)

            // desabilitar imagem inicial.
            if (this.widthDinamic <= 10 && this.flagInitImgOn) {

                //this.par.src = require('../../assets/nl (3).jpg')
                //this.widthDinamic = 100
                this.flagApagarImg = true // desabilitar img.
                this.flagInitImgOn = false // entrar nesse if apenas 1 vez por cada renderização.
                // manter foto do laboratório após primeira descida.
            }

            // reabilitar imagem inicial.
            if (window.scrollY > 830) {
                
                this.flagApagarImg = false // REabilitar img.
            }
        },
    },

    created () {

        window.scrollTo(0,0)
    }
}
</script>