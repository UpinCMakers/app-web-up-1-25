<style scoped>
    @import url("../../styles/rodape.scss");
</style>

<template>

    <div class="box_rodape">

        <span class="el_parceiros_tit mt-4">Parceiros UPinC</span>

        <div class="el_parceiros_rodape mt-2 mb-4">
            <div class="parceiro" v-for="(el,i) in li" :key="i">
                <v-img cover class="img_parc" :style="{'border-radius':'90px'}" :src="el.img" />
            </div>
        </div>

        <div class="el_frase_rodape">
            
            <v-icon small :style="{'margin':'4px'}">
                mdi-circle
            </v-icon>

            geral@upinc.pt
            
        </div>
        
        <div class="el_frase_rodape">
            
            <v-icon small :style="{'margin':'4px'}">
                mdi-circle
            </v-icon>

            <span>Rua António Augusto Aguiar, 60, Covilhã, Portugal</span>
        </div>

        <div class="el_frase_rodape">
            
            <v-icon small :style="{'margin':'4px'}">
                mdi-circle
            </v-icon>

            <span>Rua Capelo Ivens, 86, Fundão, Portugal</span>            
        </div>

        <span 
        class="el_end_rodape mt-4"
        >
            <v-icon small :style="{'margin':'4px'}">
                mdi-copyright
            </v-icon>

            2024 Copyright UPinC Lda All right Reserved.
        </span>
            <!--<span class="inside_el_end_rodape"></span>-->
    
    </div>

</template>

<script>
export default {
    data() {
        return {
            li:[
                {'img':require('../../assets/prrf1.png')},
                {'img':require('../../assets/ptcft0.png')},
                {'img':require('../../assets/uicanf1.png')},
                {'img':require('../../assets/incub1.png')},
                {'img':require('../../assets/ciecf3.png')},
                {'img':require('../../assets/fac1.png')},
                {'img':require('../../assets/fabf2.png')}
            ]
        }
    }
}
</script>
