<style scoped>
    @import url("../../styles/elemCarousel.scss");
</style>

<template>

    <div class="box_elemCarousel" ref="MyWidth">

            <!--<div class="img_carousel">

                <v-img :dinamicWidth="dinamicWidth" :style="{'width': dinamicWidth}"
                    :src="require('../../assets/ppearth.jpg')"
                />

            </div>-->

            <div class="div_carousel"
            :style="{}"
            v-for="(item,i) in items"
            :key="i"
            :visibleSlide="visibleSlide"
            v-show="visibleSlide == i"
            >

                <!-- SMALL -->
                <div 
                class="tit_carousel hidden-md-and-up" 
                :style="{'font-size':'1.1rem'}"
                >
                    {{ item.tit }}</div>

                <!-- LARGE -->
                <div class="tit_carousel hidden-sm-and-down">{{ item.tit }}</div>

                <img @click="next()" class=" animate__animated animate__flash"
                    
                    :src="item.src"
                    :style="{'width':'100%','height': '250px'}"
                />

                <div class="desc_carousel">
                    <span class="txt_desc_carousel">{{ item.desc }}</span>
                </div>

                <div class="lastLine_carousel">
                    <v-btn icon>
                        <v-icon>mdi-open-in-new</v-icon>
                    </v-btn>
                </div>

            </div>

    </div>

</template>

<script>
//import ElemCarousel from '../pequenos/ElemCarousel.vue'

export default {
    
    //components: { ElemCarousel }

    data() {
        return {

            timer: null,
            polling: null,
            lista_carousel: null,

            initContador: true, // inicialização carousel.
            pararCarousel: false, // parar carousel com scroll.
            visibleSlide: 0, // posição da lista de imagens carousel.
            item_escolhido: 0, // item da lista carousel ao chamar a aux page.
            aux_index: 0,
            items: [
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
            ], // Lista com o conteúdo carousel front. (large)

            dinamicWidth: 100, //  v-bind:style="{'width': dinamicWidth}"
        }
    },

    methods: {
        rcvWidthDinamic() {
            //
            //#app > div > main > div > div > div > div.v-responsive__content > div > div.box_cardMainC
            //const textEl = this.$refs['formData.title'].$el
            //const myElement = textEl.getAttribute('data-vv-id')
            
            /*
            const elemento = this.$refs.MyWidth

            console.log(elemento.getBoundingClientRect());

            const propriedades = elemento.getBoundingClientRect();

            // altura
            const altura = propriedades.height;

            // largura
            const largura = propriedades.width;

            console.log(altura)
            console.log(largura)

            this.dinamicWidth = parseInt(largura)
            console.log(this.dinamicWidth)
            */ // TALVEZ BUSCAR O WIDTH DINAMICO DE OUTRO COMPONENETE IMUTAVEL DO MESMO TAMANHO DESEJADO. POIS
            // ESTE JA INICIA GIGANTE!!!!
        },
        next() {
            if(this.visibleSlide >= this.items.length - 1) {
                //this.visibleSlide = 0 // RESET
                this.visibleSlide = 0 // RESET
            }
            else {
                //this.visibleSlide++
                this.visibleSlide++
            }
        },
        contadorCarousel() {
            // fazer outra abordagem. Zerar contador em toda reentrada na pág.
            //console.log(this.initContador)
            //if (this.initContador) {
            this.polling = window.setInterval(() => {
            //console.log('dentro do interval 1')

                if(this.pararCarousel == true) {
                    this.aux_index = this.visibleSlide
                    this.visibleSlide = this.aux_index // STOP
                }

                else{ // Keep on
                    if(this.visibleSlide >= this.items.length - 1) {
                    this.visibleSlide = 0 // RESET
                    }
                    else {
                    this.visibleSlide++
                    }
                }

            }, 8000);
        }
    },

    beforeUnmount () {
      clearInterval(this.polling)
    },
    created(){
      this.contadorCarousel() // inicializa com a pág
    },

    mounted() {
        //console.log(this.$refs.MyWidth)

        //const elemento = querySelector("#meu-elemento");
        //const elemento = querySelector('box_elemCarousel');
        
        /*const elemento = this.$refs.MyWidth

        console.log(elemento.getBoundingClientRect());

        const propriedades = elemento.getBoundingClientRect();

        // altura
        const altura = propriedades.height;

        // largura
        const largura = propriedades.width;

        console.log(altura)
        console.log(largura)

        this.dinamicWidth = largura
        console.log(this.dinamicWidth)
        
        setInterval(this.rcvWidthDinamic, 2000);
        */
    },
}
</script>