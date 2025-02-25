<style scoped>
    @import url("../../styles/mainV2/lineCards.scss");
</style>

<template>
    
    <div class="box_lineCards">

        <!-- LARGE -->
        <ElCardMain class="hidden-sm-and-down"
        v-for="(el_i,i) in liCardsMain" :key="i" 
        :infoCard="el_i" :widthDinam="'48%'" :heightDinam="'90%'"
        />

        <!-- SMALL -->
        <ElCardMain class="hidden-md-and-up"
        v-for="(el_j) in liCardsMain" :key="el_j.tit" 
        :infoCard="el_j" :widthDinam="'280px'" :heightDinam="'220px'"
        />
            
    </div>

</template>

<script>
import ElCardMain from './ElCardMain'

export default {
    
    components: { ElCardMain },

    data() {
        return {
            liCardsMain:[
                {
                    'tit':'Quem Somos',
                    'txt':'Frase qualquer de exemplo',
                    //'img':'url(' + require('../../assets/covi0.jpeg') + ')',
                    //'img2':'url(' + require('../../assets/feira23v3.jpeg') + ')',
                    'img':'url(' + require('../../assets/up-capaQ-main-t0.png') + ')',
                    'img2':'url(' + require('../../assets/up-capaQ-main-t0-pb.png') + ')',
                    'rota':'/quemSomos'
                },
                /*{
                    'tit':'UPinC.Makers',
                    'txt':'Conheça o que os makers estão a desenvolver.',
                    'img':'url(' + require('../../assets/agrotech1.jpg') + ')',
                    'img2':'url(' + require('../../assets/placaup.jpeg') + ')',
                    'rota':'/makers'
                },*/
                {
                    'tit':'IoT e Automação',
                    //'tit':'Serviços',
                    'txt':'Impulsionando a agricultura para um nível mais preciso e sustentável.',
                    //'img':'url(' + require('../../assets/1qe1.jpeg') + ')',
                    'img':'url(' + require('../../assets/up-capa-main-t2.jpeg') + ')',
                    //'img2':'url(' + require('../../assets/tester0.jpeg') + ')',
                    'img2':'url(' + require('../../assets/up-capa-main-t2-pb.png') + ')',
                    'rota':'/automation'
                },
                /*{
                    'tit':'Fabricação Digital',
                    'txt':'Artigos únicos e personalizados.',
                    'img':'url(' + require('../../assets/laser6.jpg') + ')',
                    'img2':'url(' + require('../../assets/produtos/p_tel.jpeg') + ')',
                    'rota':'/loja'
                }*/
            ],
        }
    },

    methods: {
        //
    },

    created() {
        //
    }
}

</script>