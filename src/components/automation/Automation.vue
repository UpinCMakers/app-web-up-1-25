<style scoped>
    @import url("../../styles/automation/automation.scss");
</style>

<template>
    <div class="mt-10 ml-10">Página em manutenção</div>
</template>

<script>
//import MenuSupMainV2 from '../mainV2/MenuSupMainV2'
//import MenuBodyMainV2 from '../mainV2/MenuBodyMainV2'

//import Palavras from './Palavras'
//import CardsServs from './CardsServs'

/*
    <!-- -->
    <div class="box_automation" v-if="!$store.state.flagMenuSup"
    :style="{
    backgroundImage:'url(' + require('../../assets/gopr1.jpg') + ')',
    backgroundSize: 'cover', // contain cover
    backgroundPosition: 'bottom' // center
    }"
    >
        <!--<MenuSupMainV2 @callByMenu="returnFromMenu($event)" />

        <MenuBodyMainV2 v-if="flagMenuSup" />-->

        <Palavras class="mt-8" />

        <CardsServs class="mt-10 mb-10" />

        <!-- rede LoRaWAN 
        <CardsServs :el="elLoraRede" class="mt-10" v-if="!flagMenuSup" />

        <!- Produto gateway LoRaWAN 
        <CardsServs :el="elLoraProd1" class="mt-10" v-if="!flagMenuSup" />-->

        <!-- TORNAR COMPONENTE SERVS.VUE O ELEMENTO CARD DENTRO DO PAINEL CardsServs.vue -->
    </div>
*/

export default {

    //components: { /*MenuSupMainV2, MenuBodyMainV2,*/ Palavras, CardsServs },

    data() {
        return {
            //
            //flagMenuSup:false,
            imgBackAutomation:'url(' + require('@/assets/tester0.jpeg') + ')',
        }
    },

    methods: {
        /*returnFromMenu(flagStringMenuSmall) {

            if (flagStringMenuSmall == 'open') {

                //console.log('abrir menu')
                this.flagMenuSup = true
            
            } else {
                //console.log('fechar menu')
                this.flagMenuSup = false
            }
        },*/
    },

    created() {
        this.$store.commit('init') // despertar api.
        window.scrollTo(0,0)

        // -- obter tamanho da página atual do cliente.
        //const larguraPagina = window.innerWidth; // Obtém a largura da página em pixels
        //const alturaPagina = window.innerHeight; // Obtém a altura da página em pixels

        //console.log(`Largura da página: ${larguraPagina}px`);
        //console.log(`Altura da página: ${alturaPagina}px`);

        //if ( larguraPagina > 500 ) { this.imgBackAutomation = 'url(' + require('../../assets/GOPR0.jpg') + ')' }

    }
}
</script>
