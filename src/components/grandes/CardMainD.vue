<style scoped>
    @import url("../../styles/lineMain/cardMainD.scss");
</style>

<template>
    
    <div class="box_cardMainD" :style="{width:config_cardD.tamWidth, height:config_cardD.tamheight}">

            <div class="div_carousel_cardD"
            :style="{}"
            v-for="(item,i) in el_cardD"
            :key="i"
            :visibleSlide="visibleSlide"
            v-show="visibleSlide == i"
            >

                <!-- SMALL -->
                <img v-if="item.showImg"
                @click="next()" 
                class="img_carousel animate__animated animate__flash hidden-md-and-up"
                :src="item.src"
                :style="{
                    'width':'100%',
                    'height':'100%',
                    'max-height':'150px',
                    'border-radius':'4px'
                    }"
                />

                <!-- LARGE -->
                <img v-if="item.showImg"
                @click="next()" 
                class="img_carousel animate__animated animate__flash hidden-sm-and-down"
                :src="item.src"
                :style="{
                    'width':'100%',
                    'height':'100%',
                    'max-height':'120px',
                    'max-width':'300px',
                    'border-radius':'4px'
                    }"
                />

                <div v-if="item.showTit"
                @click="next()" 
                class="tit_carousel"
                >
                    {{ item.tit }}</div>

                <div v-if="item.showTx1"
                @click="next()" 
                class="desc_carousel"
                >
                    <span class="txt_desc_carousel">{{ item.desc }}</span>
                </div>

                <!--<div class="lastLine_carousel">
                    <v-btn icon>
                        <v-icon>mdi-open-in-new</v-icon>
                    </v-btn>
                </div>-->

            </div>
    
    </div>

</template>

<script>
//import ElemCarousel from '../pequenos/ElemCarousel.vue'

export default {
    
    //components: { ElemCarousel }

    props: ['config_cardD','el_cardD'],

    data() {
        return {

            // rcv via props
            showImg: true,
            showTit: false,
            showTx1: false,

            // --- ESTRUTURA DE FUNCIONAMENTO CAROUSEL.
            polling: null, // elemento temporizador carousel.
            pararCarousel: false, // flag parar carousel. Exemplo: flag ativada com o scroll.
            visibleSlide: 0, // posição da lista de imagens carousel.
            aux_index: 0, // AUX
            items: [ // pode ser recebido via props.
                {
                    src:require('../../assets/img_capa.jpg'),
                    tit:'Projeto SMART GARDEN',
                    desc:'Aquisições de dados automáticas em um jardim com comunicação LoRa. Em conjunto com uma aplicação Web.'
                },
                {
                    src:require('../../assets/lab.jpeg'),
                    tit:'MakerSpace',
                    desc:'Em construção o primeiro MakerSpace da comunidade UPinC Makers.'
                },
            ],
        }
    },

    methods: {
        next() { // forçar a rotina carousel: SE qnt de items ok => passar para o prox item.

            if(this.visibleSlide >= this.items.length - 1) {
                
                this.visibleSlide = 0 // RESET

            } else {
                
                this.visibleSlide++
            }
        },
        contadorCarousel() {

            this.polling = window.setInterval(() => {

                if(this.pararCarousel == true) { // flag de delisgamento.

                    this.aux_index = this.visibleSlide // rcv o item atual indiretamente.
                    this.visibleSlide = this.aux_index // STOP preparado.

                    // executar desligamento do contador setInterval.
                }

                else{ // Keep on or init carousel.

                    // -- SE o index atual ultrapassar a qnt de items da lista ENTÃO reset. 
                    if(this.visibleSlide >= this.items.length - 1) {
                    
                        this.visibleSlide = 0 // RESET

                    } else { // passar para o próximo item.
                    
                        this.visibleSlide++
                    }
                }

            }, 18000);
        }
    },

    beforeUnmount () {
      clearInterval(this.polling) // reset contador ao matar o component carousel.
    },
    created(){
      this.contadorCarousel() // inicializa com a pág.
    },
}
</script>