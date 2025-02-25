<style scoped>
    @import url("../../styles/gateway/gatewayPageComercial.scss");
</style>

<template>
    <!--<div class="box_gatewayPageComercial" v-if="!$store.state.flagMenuSup"
    :style="{
    backgroundImage:'url(' + require('../../assets/fundo_t.png') + ')',
    backgroundSize: 'cover', // contain cover
    backgroundPosition: 'center' // center
    }"
    >-->
    <div class="box_gatewayPageComercial" v-if="!$store.state.flagMenuSup">

        <!-- Títulos -->
        <div class="titGwComercial">
            <v-icon class="iconTitGw mt-8">mdi-access-point-network</v-icon>
            <span class="tit mt-2">A sua gateway LoRaWAN</span>
            <div class="subTit mt-4">
                <span class="elSubTit" v-for="(p,i) in subTitFrase_print" :key="i">{{ p }}</span>
            </div>
        </div>

        <!-- Painel de círculos -->
        <div class="painelTiposGw mt-8 mb-16">
            <div class="boxCircTipoGw mt-2" v-for="(gw,g) in liCircs" :key="g">

                <div class="titCircGw">
                    <span class="elTitCircGw" v-for="(titGw,tg) in gw.tit" :key="tg">{{ titGw }}</span>
                </div>
                
                <div class="circGw"
                :style="{
                backgroundImage:gw.img,
                backgroundSize: 'cover', // contain cover
                backgroundPosition:gw.bp // center, bottom, top
                }"
                >
                </div>

                <div class="txtCircGw mt-2 mb-4">
                    <span class="eltxtCircGw" v-for="(t,j) in gw.txt" :key="j">{{ t }}</span>
                </div>
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
            // --- título.
            //subTitFrase:'Obtenha informações detalhadas da sua localidade e a instalação precisa para a sua necessidade.',
            subTitFrase:'Obtenha informações detalhadas sobre a disponibilidade de rede LoRaWAN na sua localidade e recomendações precisas de instalação conforme suas necessidades específicas.',
            subTitFrase_print:[],
            //flagOpenActionBtn:false,

            //
            liCircs:[
                {
                    'tit':'Gateway Indoor',
                    //'img':'url(' + require('../../assets/gopr1.jpg') + ')',
                    'img':'url(' + require('../../assets/gwIndoor0.png') + ')',
                    //'txt':' Categoria de gateway usualmente utilizada em projetos com necessidade de comunicação em interiores. Os sensores dentro da sua casa ou do seu estabelecimento podem agora se conectar através do LoRaWAN.',
                    'txt':' Esta categoria de gateway é comumente empregada em projetos que demandam comunicação em ambientes internos. Os sensores instalados em residências ou estabelecimentos comerciais podem agora operar por vários anos sem necessidade de substituição de baterias, ao se conectarem via LoRaWAN.',
                    'bp':'top',
                },
                {
                    'tit':'Gateway Outdoor On-grid',
                    'img':'url(' + require('../../assets/gwExtcn2.jpeg') + ')',
                    'txt':' As gateways utilizadas em ambientes externos têm como finalidade cobrir amplas áreas, proporcionando conectividade a sensores e dispositivos de controle remoto em longas distâncias a um baixo custo energético.',
                    'bp':'top',
                },
                {
                    'tit':'Gateway Outdoor Off-grid',
                    'img':'url(' + require('../../assets/gwExtcav0.png') + ')',
                    'txt':' Para projetos em que as gateways precisam ser totalmente autônomas, sistemas off-grid oferecem uma solução eficaz para garantir a cobertura em regiões remotas.',
                    'bp':'bottom',
                }
            ]
        }
    },

    methods: {
        //
    },

    created() {
        window.scrollTo(0,0)

        // -- quebrar frase txt de cada card circulo da lista de circulos.
        let c=0
        while (c < this.liCircs.length) {
            this.liCircs[c].tit = this.liCircs[c].tit.split(" ")
            this.liCircs[c].txt = this.liCircs[c].txt.split(" ")
            c++
        }

        // -- quebrar frase subtítulo geral.
        this.subTitFrase = this.subTitFrase.split(" ")

        // -- entrada animada do subtítulo geral.
        let index = 0;
        const intervalo = setInterval(() => {

            // Verifica se ainda há elementos na lista
            if (index < this.subTitFrase.length) {
                // Imprime o elemento atual
                this.subTitFrase_print.push(this.subTitFrase[index])
                index++;
            } else {
                // Parar o intervalo quando todos os elementos forem impressos
                clearInterval(intervalo);
                //this.flagOpenActionBtn = true
            }
        }, 400);
    }
}
</script>