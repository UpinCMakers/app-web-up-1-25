<style scoped>
    @import url("../../styles/monitor/monitorComercial.scss");
</style>

<template>
    <!--<div class="box_monitorComercial" v-if="!$store.state.flagMenuSup"
    :style="{
    backgroundImage:'url(' + require('../../assets/fundo_t.png') + ')',
    backgroundSize: 'cover', // contain cover
    backgroundPosition: 'center' // center
    }"
    >-->
    <div class="box_monitorComercial" v-if="!$store.state.flagMenuSup">
        
        <!-- Títulos -->
        <div class="titGwComercial">
            <v-icon class="iconTitGw mt-8">mdi-monitor-dashboard</v-icon>
            <span class="tit mt-2">
                <span 
                class="mr-2" 
                v-for="(pT,i) in titMain" :key="i">{{ pT }}</span>
            </span>
            <div class="subTit mt-4">
                <!--<span class="elSubTit" v-for="(p,i) in subTitFrase_print" :key="i">{{ p }}</span>-->
                <span class="elSubTit">As suas máquinas sempre operacionais</span>
            </div>
        </div>

        <div class="painelLinhas mt-8 mb-16">

            <!--<div class="boxLinha" v-for="(lin,j) in liLinhas" :key="j">
                
                <div class="colImg"
                :style="{
                backgroundImage:lin.img,
                backgroundSize: 'cover', // contain cover
                backgroundPosition:'center' // center, bottom, top
                }"
                ></div>

                <div class="colTxt">
                    <span class="elTxt" v-for="(p,n) in lin.txt" :key="n">{{ p }}</span>
                    <span class="">{{ lin.txt }}</span>
                </div>
            </div>-->

            <!-- LINHA 0 -->
            <div class="boxLinha mt-4">
                
                <div class="colImg"
                :style="{
                backgroundImage:liLinhas[0].img,
                backgroundSize: 'cover', // contain cover
                backgroundPosition:'top-right' // center, bottom, top
                }"
                ></div>

                <div class="colTxt">
                    <span class="">{{ liLinhas[0].txt }}</span>
                </div>
            </div>

            <!-- LINHA 1 -->
            <div class="boxLinha mt-4 mb-4" :style="{'flex-wrap':'wrap-reverse'}">

                <div class="colTxt" :style="{'justify-content':'flex-end'}">
                    <!--<span class="elTxt">{{ liLinhas[1].txt }}</span>-->
                    <span class="elTxt" v-for="(p,n) in liLinhas[1].txt" :key="n">{{ p }}</span>
                </div>

                <div class="colImg"
                :style="{
                backgroundImage:liLinhas[1].img,
                backgroundSize: 'cover', // contain cover
                backgroundPosition:'right' // center, bottom, top
                }"
                ></div>
            </div>

        </div>

        <ContactoUp />

    </div>
</template>

<script>
import ContactoUp from './ContactoUp.vue'

export default {

    components:{ContactoUp},

    data() {
        return {
            //
            titMain:'Monitorização de hardware',
            //
            liLinhas:[
                {
                    'img':'url(' + require('../../assets/zz0.png') + ')',
                    //'txt':'Saiba quando as suas máquinas estiverem a falhar e tenha as ferramentas para agir imediatamente.',
                    //'txt':'Seja informado prontamente sobre falhas em suas máquinas e disponha das ferramentas necessárias para agir de forma imediata.'
                    'txt':'Monitore em tempo real as falhas de suas máquinas e disponha de recursos para tomar medidas imediatas.'
                },
                {
                    'img':'url(' + require('../../assets/zz0.png') + ')',
                    'txt':'Acompanhe as informações de desempenho de cada máquina e receba alertas personalizados conforme suas necessidades de ação.'
                }
            ]
        }
    },

    methods: {
        //
    },

    created() {
        window.scrollTo(0,0)

        this.titMain= this.titMain.split(" ")

        // -- quebrar frase txt de cada card circulo da lista de circulos.
        /*let c=0
        while (c < this.liLinhas.length) {
            this.liLinhas[c].txt = this.liLinhas[c].txt.split(" ")
            c++
        }*/
        this.liLinhas[1].txt = this.liLinhas[1].txt.split(" ")
    }
}
</script>