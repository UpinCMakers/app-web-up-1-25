<style scoped>
    @import url("../../styles/main/lineMain.scss");
</style>

<template>

    <div class="box_LineMain">

        <PainelLineMain class="hidden-sm-and-down" />

        <!--<PainelSmall class="hidden-md-and-up" />-->

    </div>

</template>

<script>
import PainelLineMain from './PainelLineMain'
//import PainelSmall from './PainelSmall'

export default {
    
    components: { PainelLineMain, /*PainelSmall /*CardMainA, CardMainB, CardMainC CardMainD*/ },

    data () {
        return {

            els_carousel: [1,1,1,1,1,1,1,1,1],
            els_carousel_t2: [1,1],
            init_subtit:'Soluciona problemas IoT de diversos níveis a partir do espaço de desenvolvimento (MakerSpace) e da cultura de compartilhamento de conhecimento.', // desenvolve projectos IoT de diversos níveis
            subtit:[],

            // cada carousel é uma lista. [lista de [listas]] --> props --> child
            items: [
                
                [ // componente a11
                    {
                        src:'',
                        tit:'título qualquer',
                        desc:'Texto outro qualuqer',
                        showImg:false,
                        showTit:true,
                        showTx1:true
                    },
                    {
                        src:'',
                        tit:'título pag2 carousel a11',
                        desc:'Texto a11 p2',
                        showImg:false,
                        showTit:true,
                        showTx1:true
                    },
                ],
                [ // componente a12
                    {
                        src:'',
                        tit:'',
                        desc:'',
                        showImg:false,
                        showTit:true,
                        showTx1:true
                    },
                ],
                [ // componente a13
                    {
                        src:'',
                        tit:'',
                        desc:'',
                        showImg:false,
                        showTit:true,
                        showTx1:true
                    },
                ],
                [ // componente a21
                    {
                        src:'',
                        tit:'',
                        desc:'',
                        showImg:false,
                        showTit:true,
                        showTx1:true
                    },
                ],
                [ // componente central (a22)
                    {
                        src:require('../../assets/img_capa.jpg'),
                        tit:'Projeto SMART GARDEN',
                        desc:'Aquisições de dados automáticas em um jardim com comunicação LoRa. Em conjunto com uma aplicação Web.',
                        showImg:true,
                        showTit:false,
                        showTx1:false
                    },
                    {
                        src:require('../../assets/lab.jpeg'),
                        tit:'MakerSpace',
                        desc:'Em construção o primeiro MakerSpace da comunidade UPinC Makers.',
                        showImg:true,
                        showTit:false,
                        showTx1:false
                    },
                ],
                [ // componente a23
                    {
                        src:'',
                        tit:'',
                        desc:'',
                        showImg:false,
                        showTit:true,
                        showTx1:true
                    },
                ],
                [ // componente a31
                    {
                        src:'',
                        tit:'',
                        desc:'',
                        showImg:false,
                        showTit:true,
                        showTx1:true
                    },
                ],
                [ // componente a32
                    {
                        src:'',
                        tit:'',
                        desc:'',
                        showImg:false,
                        showTit:true,
                        showTx1:true
                    },
                ],
                [ // componente a33
                    {
                        src:'',
                        tit:'',
                        desc:'',
                        showImg:false,
                        showTit:true,
                        showTx1:true
                    },
                ],
            ],
        }
    },

    created () {

        this.subtit = this.init_subtit.split(" ")
    }
}
</script>