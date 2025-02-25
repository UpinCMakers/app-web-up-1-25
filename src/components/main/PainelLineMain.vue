<style scoped>
    @import url("../../styles/main/painelLineMain.scss");
</style>

<template>
    
    <div class="box_painelLineMain">

        <ElLineMainSup v-for="(segm,i) in listPainel" :key="i"
        :infoElPainel="listPainel[i]" />

        <!-- passar sob for -->
        <!--<ElLineMainSup v-if="flagSegm"
        :infoElPainel="listPainel[0]" 
        @eventCallSegm="callDescrSegm($event)" />

        <ElLineMainSup v-if="flagSegm"
        :infoElPainel="listPainel[1]" 
        @eventCallSegm="callDescrSegm($event)" />

        <ElLineMainSup v-if="flagSegm"
        :infoElPainel="listPainel[2]" 
        @eventCallSegm="callDescrSegm($event)" />

        <ElLineMainSup v-if="flagSegm"
        :infoElPainel="listPainel[3]" 
        @eventCallSegm="callDescrSegm($event)" />-->

        <!--<ExibSegm v-if="this.flagSegmSelectd" 
        :infoSegmSelected="listPainel[indexSegm]"
        />
        <v-btn v-if="this.flagSegmSelectd" @click="callResetSegm()">voltar</v-btn>
        -->

    </div>

</template>

<script>
import ElLineMainSup from './ElLineMainSup'
//import ExibSegm from '../grandes/ExibSegm.vue'
//import LineMain from './LineMain.vue'

export default {
    
    components: { ElLineMainSup, /*ExibSegm*/ },

    methods: {
        callResetSegm() {
            this.flagSegm = true
            this.flagSegmSelectd = false
        },
        callDescrSegm(flagSegm) { // inteiro.
            this.indexSegm = flagSegm
            console.log(this.indexSegm)
            switch (flagSegm) {
                case 0:
                    this.flagSegm = false
                    this.flagSegmSelectd = true
                    break
                case 1:
                    this.flagSegm = false
                    this.flagSegmSelectd = true
                    break
                case 2:
                    this.flagSegm = false
                    this.flagSegmSelectd = true
                    break
                case 3:
                    this.flagSegm = false
                    this.flagSegmSelectd = true
                    break
            }
        }
    },

    data() {
        return {

            flagSegm:true,
            flagSegmSelectd:false,

            // index elem selected
            indexSegm:0,

            listPainel: [
                {
                    id_:0,
                    img:require('../../assets/group11.png'),
                    tit:'Quem somos',
                    url:'/quemSomos',
                    desc:'Cresça junto com a comunidade maker (Em breve)',
                    shadowCardMenu:'shadowCardMenu',
                    txtSegm:'',
                    status:'on',
                },
                {
                    id_:1,
                    img:require('../../assets/map-marker-path-v2.png'),
                    tit:'UPinC.LoRaWAN',
                    url:'/lora',
                    desc:'Mapeamento Regional',
                    shadowCardMenu:'shadowCardMenu',
                    txtSegm:'Mapeamento de captação do sinal LoRa.',
                    status:'on',
                },
                {
                    id_:2,
                    img:require('../../assets/maker_p.png'),
                    tit:'UPinC.Makers',
                    url:'/makers',
                    desc:'Cresça junto com a comunidade maker (Em breve)',
                    shadowCardMenu:'shadowCardMenu',
                    txtSegm:'Conheça o que os makers estão a desenvolver.',
                    status:'on',
                },
                /*{
                    id_:1,
                    img:require('../../assets/fac1.png'),
                    tit:'FactoryMind',
                    url:'https://www.factorymind.tk/',
                    desc:'Uma nova alternativa para aprender (Em breve)',
                    shadowCardMenu:'shadowRed',
                    txtSegm:'Um novo ambiente de aprendizado.',
                    status:'on',
                },*/
                {
                    id_:3,
                    img:require('../../assets/fabr1.png'),
                    tit:'UPinC.Fabricação',
                    url:'/loja', // /loja
                    desc:'Conheça os novos produtos IoT (Em breve)',
                    shadowCardMenu:'shadowYellow',
                    txtSegm:'Artigos únicos e personalizados.',
                    status:'on',
                },
                /*{
                    id_:3,
                    img:require('../../assets/eng_b.png'),
                    tit:'Projects',
                    url:'',
                    desc:'(Em breve)',
                    shadowCardMenu:'shadowCardMenu',
                    txtSegm:'Precisa de ajuda com uma solução IoT para o seu negócio ou para a sua nova ideia?',
                },*/
                {
                    id_:4,
                    img:require('../../assets/agro_p.png'),
                    tit:'UPinC.Agro',
                    url:'/agro',
                    desc:'(Em breve)',
                    shadowCardMenu:'shadowCardMenu',
                    txtSegm:'Impulsionando a agricultura para um nível mais preciso e sustentável.',
                    status:'on',
                },
            ]
        }
    }
}
</script>