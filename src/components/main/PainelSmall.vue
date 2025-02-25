<style scoped>
    @import url("../../styles/main/painelSmall2.scss");
</style>

<template>

    <div class="box_painelSmall">

        <div class="estrutura_el" v-for="(segm,i) in listPainel" :key="i">
            
            <div class="img_card_menu" @click="callPage(segm.url)">

                <v-img :style="{'border-radius':'100px'}"
                    :src="segm.img"
                />
            </div>

            <div class="tit_card_menu">

                <span>{{ segm.tit }}</span>
            </div>

            <span v-if="segm.status == 'off'" :style="{'font-size':'0.6rem','color':'red'}">Em manutenção</span>
        </div>

    </div>

</template>

<script>
export default {

    methods: {
        callPage(url_page) {

            if (url_page == '') { // upinc.agro ainda não disponivel.
                return
            }

            if(url_page != 'https://www.factorymind.tk/') {

                this.$router.push(url_page)

            } else {

                window.location = url_page
            }
        },
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
                    img:require('../../assets/qs_a7.png'),
                    tit:'Quem Somos',
                    url:'/',
                    desc:'',
                    shadowCardMenu:'shadowCardMenu',
                    txtSegm:'',
                    status:'off',
                },
                {
                    id_:1,
                    img:require('../../assets/maker_p.png'),
                    tit:'UPinC.Makers',
                    url:'/makers',
                    desc:'Cresça junto com a comunidade maker (Em breve)',
                    shadowCardMenu:'shadowCardMenu',
                    txtSegm:'Conheça o que os makers estão a desenvolver.',
                    status:'on',
                },
                {
                    id_:2,
                    img:require('../../assets/fac1.png'),
                    tit:'FactoryMind',
                    url:'https://www.factorymind.tk/',
                    desc:'Uma nova alternativa para aprender (Em breve)',
                    shadowCardMenu:'shadowRed',
                    txtSegm:'Um novo ambiente de aprendizado.',
                    status:'on',
                },
                {
                    id_:3,
                    img:require('../../assets/l1.png'),
                    tit:'E-Commerce',
                    url:'', //'/loja'
                    desc:'Conheça os novos produtos IoT (Em breve)',
                    shadowCardMenu:'shadowYellow',
                    txtSegm:'Artigos únicos e personalizados.',
                    status:'off',
                },
                {
                    id_:4,
                    img:require('../../assets/agro_p.png'),
                    tit:'UPinC.Agro',
                    url:'/agro',
                    'desc':'(Em breve)',
                    'shadowCardMenu':'shadowCardMenu',
                    'txtSegm':'Impulsionando a agricultura para um nível mais preciso e sustentável.',
                    status:'on',
                },
            ]
        }
    }
}
</script>