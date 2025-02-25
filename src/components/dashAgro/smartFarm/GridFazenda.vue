<style scoped>
    @import url("../../../styles/dashagro/smartfarm/gridFazenda.scss");
</style>

<template>
    <div class="box_gridFazenda">

        <div class="line_sup">

            <!-- LADO Esquerdo -->
            <div class="item_sup animate__animated animate__flash">
                
                <div class="item_sup_tit">
                    <v-icon class="ml-1">mdi-draw-pen</v-icon>
                    <span class="ml-1">Descrição</span>
                </div>

                <div class="item_sup_body_desc">{{ info_farm.farm_desc }}</div>
            </div>

            <!-- LADO Direito mdi-map-marker-radius -->
            <div class="item_sup animate__animated animate__flash">
                <div class="item_sup_tit">
                    <v-icon class="ml-1">mdi-land-fields</v-icon>
                    <span class="ml-1">Área</span>
                </div>

                <div class="item_sup_body_desc">{{ info_farm.farm_area }}</div>

                <div class="item_sup_tit">
                    <v-icon class="ml-1">mdi-land-plots</v-icon>
                    <span class="ml-1">Perímetro</span>
                </div>

                <div class="item_sup_body_desc">{{ info_farm.farm_perimetro }}</div>

                <div class="item_sup_tit">
                    <v-icon class="ml-1">mdi-sprout</v-icon>
                    <span class="ml-1">Solo</span>
                </div>

                <div class="item_sup_body_desc">{{ info_farm.tipo_solo }}</div>
            </div>

        </div>
        
        <div class="line_inf">

            <div class="item_inf">
                <div class="item_inf_tit">
                    <v-icon class="ml-1">mdi-clipboard-text-clock-outline</v-icon>
                    <span class="ml-1">Logs</span>
                    <div class="ml-2 notific">
                        <v-icon small>mdi-history</v-icon>
                        <span class="ml-1 mr-1">{{this.liChat.length}}</span>
                    </div>
                </div>
            </div>

            <!-- [scss] item da região inferior -->
            <div class="item_inf">
                <!-- [scss] body contido no item -->
                <div class="inf_body">

                    <div class="row_scroll_body mt-1" @click="scrollUpListExib()" v-if="flagScrollUp"
                    @mouseover="el1cor = 'rgb(247,215,46)'"
                    @mouseleave="el1cor = ''"
                    >
                        <v-icon :style="{'color':el1cor}" large>mdi-arrow-up-drop-circle-outline</v-icon>
                    </div>

                    <div v-for="(el,i) in this.liExib" :key="i"
                    class="item_inf_body mb-2 animate__animated animate__flash"
                    >
                        <div class="txt_body ml-1">{{ el.tit }}</div>
                        <div class="end_body">
                            <v-icon>mdi-history</v-icon>
                            <span class="ml-1">{{ el.day }}</span>
                            <span class="ml-1">{{ el.hr }}</span>
                        </div>
                    </div>
                    
                    <div class="row_scroll_body mt-2" @click="scrollDownListExib()" v-if="flagScrollDown"
                    @mouseover="el2cor = 'rgb(247,215,46)'"
                    @mouseleave="el2cor = ''"
                    >
                        <v-icon :style="{'color':el2cor}" large>mdi-arrow-down-drop-circle-outline</v-icon>
                    </div>

                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    
    props:['info_farm'],

    data() {
        return {
            /*desc:'Lote destinado a testes e validações da análise da capacidade nutricional do solo.',
            areaFarm:'979m2 (0.1 ha)',
            perimetroFarm:'230.32m',

            liLogMainFarm:[
                {
                    'tit':'Teste LOG',
                    'dia':'25/10/2023',
                    'hora':'12:57',
                },
                {
                    'tit':'Instalação e calibração concluídas',
                    'dia':'25/10/2023',
                    'hora':'12:32',
                },
            ],*/

            //
            el1cor:'',
            el2cor:'',

            //
            flagScrollUp:false,
            flagScrollDown:false,
            //
            liChat:[],
            liExib:[],
            index_marcLiChat:1, // init qualquer
        }
    },
    methods: {
        scrollDownListExib() {

            this.liExib[0] = this.liChat[this.index_marcLiChat]
            this.liExib[1] = this.liChat[this.index_marcLiChat+1]

            this.flagScrollUp = true // habilitado o scroll up.

            if ((this.liChat.length-1) == (this.index_marcLiChat+1)) { this.flagScrollDown = false } // limiar.

            this.index_marcLiChat = this.index_marcLiChat+1

            //console.log('this.liExib: ',this.liExib)
        },
        scrollUpListExib() {

            this.liExib[0] = this.liChat[this.index_marcLiChat-2]
            this.liExib[1] = this.liChat[this.index_marcLiChat-1]

            this.flagScrollDown = true // habilitado o scroll down.

            if (this.index_marcLiChat == 2) { this.flagScrollUp = false } // limiar.

            this.index_marcLiChat = this.index_marcLiChat-1

            //console.log('this.liExib: ',this.liExib)
        },
    },

    created() {
        this.liChat = this.info_farm.farm_logs
        //console.log('this.liChat: ',this.liChat)

        // -- Exibir lista invertida. Modelo de chat padrão.
        var tam = this.liChat.length
        let c = 0
        //while (c <= tam) { self.liExib.push(self.liChat[tam-c]); c++; }
        while (c <= tam) { 
            //self.liExib.push(self.liChat[c-1]) // sem inverter.
            //this.liExib.push(this.liChat[tam-c]) // inputando invertido para ter o último item.
            this.liExib.push(this.liChat[c]) // inputando invertido para ter o último item.
            this.index_marcLiChat = c
            if (c >= 1) { break }
            c++
        }
        // -- exibir o último item por primeiro, na parte de baixo.
        //this.liExib = this.liExib.slice(0).reverse()
        if (tam > 2) { 
            this.flagScrollDown = true // habilitado o scroll para exibir msgs anteriores.
        }
        //console.log('this.liExib: ',this.liExib)
    }
}
</script>