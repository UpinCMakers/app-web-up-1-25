<style scoped>
    @import url("../../styles/main/elLineMainSup.scss");
</style>

<template>
    
    <div 
    @click="callPage(infoElPainel.url)"
    @mouseover="exibirDesc()"
    @mouseleave="backDesc()"
    class="box_elLineMainSup shadowCardsMainLine"
    >

        <!-- FRONT @click="callPaiToCallSegm(infoElPainel.id_)" -->
        <div class="box_img_el_line">
            <!-- IMG Menu -->
            <div class="img_card_menu">

                <v-img :style="{'border-radius':'100px'}"
                    :src="infoElPainel.img"
                />
            </div>

            <div class="tit_card_menu">
                
                <span v-if="infoElPainel.url == '/loja'" :style="{'font-size':'0.8rem'}">{{ infoElPainel.tit }}</span>
                <span v-else>{{ infoElPainel.tit }}</span>
                <span v-if="infoElPainel.status == 'off'" :style="{'font-size':'0.6rem','color':'red'}">Em manutenção</span>
            </div>
        </div>

        <div v-if="flagShowDesc"
        class="desc_card_menu animate__animated animate__fadeIn"
        >
            <span
            v-for="(word,i) in txtSegmLocal" :key="i" 
            class="el_word_txtSegmLocal"
            >{{ word }}</span>
            
        </div>

    </div>

</template>

<script>
//import ElLineMainSup from '../grandes/ElLineMainSup.vue'
//import LineMain from './LineMain.vue'

export default {
    
    props: ['infoElPainel'],

    data() {
        return {
            flagShowDesc:false,
            txtSegmLocal:'',
        }
    },

    methods: {
        exibirDesc() {
            this.flagShowDesc = true
        },
        backDesc() {
            setTimeout(() => {
                this.flagShowDesc = false
            }, 500)
        },
        callPage(url_page) {
            //console.log(url_page)
            //window.open(url_page)

            if (url_page == '') { // upinc.agro ainda não disponivel.
                return
            }

            if(url_page != 'https://www.factorymind.tk/') {

                this.$router.push(url_page)

            } else {

                window.location = url_page
            }
        },
        callPaiToCallSegm() { //(idSegm)
            //console.log(idSegm)
            //this.$emit('eventCallSegm', idSegm)
            this.flagShowDesc = true
        }
    },

    created () {

        this.txtSegmLocal = this.infoElPainel.txtSegm.split(" ")
        //console.log('this.infoElPainel.txtSegm: ',this.infoElPainel.txtSegm)
    }
}
</script>