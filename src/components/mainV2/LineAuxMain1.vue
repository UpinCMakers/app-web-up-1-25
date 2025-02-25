<style scoped>
    @import url("../../styles/mainV2/lineAuxMain1.scss");
</style>

<template>
    
    <div class="box_lineAuxMain1 mt-16 mb-16">

        <div class="titElemServs">Nossos serviços</div>

        <div class="painelElemServs">
            <!--<div class="elServ" v-for="(el,i) in liElem" :key="i"
            :style="{
            backgroundImage:el.img,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
            }">-->
            <div class="elServ" v-for="(el,i) in liElem" :key="i"
            @mouseover="el.background = 'rgba(31,122,177,0.4)'"
            @mouseleave="el.background = '#B2B2B2'"
            :style="{'background':el.background}"
            @click="callPage('/automation')"
            >

                <v-icon :style="{'color':'rgb(31,122,177)'}" class="elIconServ">{{ el.icon }}</v-icon>
                
                <!-- Título -->
                <div class="elTitServ">
                    <span class="pTit" v-for="(titPalavr,j) in el.tit" :key="j">{{ titPalavr }}</span>
                </div>

                <!-- Texto -->
                <div class="elTxtServ mt-4">
                    <span class="pTxt" v-for="(txtPalavr,k) in el.txt" :key="k">{{ txtPalavr }}</span>
                </div>
            </div>
        </div>
            
    </div>

</template>

<script>
export default {

    data() {
        return {
            liElem:[
                {
                    'img':'url(' + require('../../assets/fundo_t.png') + ')',
                    'icon':'mdi-lightbulb-on',
                    'tit':'Soluções LoRaWAN',
                    'txt':'Instalação e gestão de redes LoRaWAN para conectar dispositivos em áreas urbanas e agrícolas.',
                    'background':'#B2B2B2'
                },
                {
                    'img':'url(' + require('../../assets/fundo_t.png') + ')',
                    'icon':'mdi-monitor-dashboard', //'icon':'mdi-check-decagram',
                    'tit':'Serviços de monitorização',
                    'txt':'Monitoramento remoto de dispositivos IoT em tempo real, permitindo gestão eficiente de dados e alertas inteligentes.',
                    'background':'#B2B2B2'
                },
                {
                    'img':'url(' + require('../../assets/fundo_t.png') + ')',
                    'icon':'mdi-access-point-network',
                    'tit':'Gateways de comunicação',
                    'txt':'Implementação de gateways LoRaWAN personalizados, proporcionando ampla cobertura para redes de sensores.',
                    'background':'#B2B2B2'
                },
                {
                    'img':'url(' + require('../../assets/fundo_t.png') + ')',
                    'icon':'mdi-thumb-up',
                    'tit':'Integração com plataformas IoT',
                    'txt':'Conectividade com plataformas de análise e gestão de dados para otimizar operações agrícolas e urbanas',
                    'background':'#B2B2B2'
                },
                {
                    'img':'url(' + require('../../assets/fundo_t.png') + ')',
                    'icon':'mdi-clipboard-list',
                    'tit':'Consultoria técnica',
                    'txt':'Suporte especializado para a implementação e manutenção de soluções IoT e redes de sensores.',
                    'background':'#B2B2B2'
                },
            ],
        }
    },

    methods: {
        //
        callPage(rota) { this.$router.push(rota) }
    },

    created() {
        //
        let c=0
        while (c<this.liElem.length) {
            this.liElem[c].tit = this.liElem[c].tit.split(" ")
            this.liElem[c].txt = this.liElem[c].txt.split(" ")
            c++
        }
    }
}

</script>