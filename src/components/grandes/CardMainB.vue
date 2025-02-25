<style scoped>
    @import url("../../styles/cardMainB.scss");
</style>

<template>

    <div class="box_cardMainB">
        
        <!--<div class="box_anim_smartGarden">
            
            <AnimSmartGarden />

        </div>-->

        <ElemPainel :infoElPainel="listPainel[0]" />

        <ElemPainel :infoElPainel="listPainel[1]" />

        <ElemPainel :infoElPainel="listPainel[2]" />

        <ElemPainel :infoElPainel="listPainel[3]" />

        <!--<div class="extraLine_CardB">
            extra line
        </div>-->

    </div>

</template>

<script>
//import AnimSmartGarden from '../pequenos/AnimSmartGarden.vue'
import ElemPainel from '../pequenos/ElemPainel.vue'

export default {
    
    components: { ElemPainel },

    data() {
        return {

            listPainel: [
                {
                    img:require('../../assets/maker.png'),
                    tit:'UPinC.Makers',
                    desc:'Cresça junto com a comunidade maker (Em breve)',
                    shadowCardMenu:'shadowCardMenu'
                },
                {
                    img:require('../../assets/cm.png'),
                    tit:'UPinC.Mind',
                    desc:'Uma nova alternativa para aprender (Em breve)',
                    shadowCardMenu:'shadowRed'
                },
                {
                    img:require('../../assets/st_b.png'),
                    tit:'E-Commerce',
                    desc:'Conheça os novos produtos IoT (Em breve)',
                    shadowCardMenu:'shadowYellow'
                },
                {
                    img:require('../../assets/eng_b.png'),
                    tit:'Projects',
                    desc:'(Em breve)',
                    shadowCardMenu:'shadowCardMenu'
                }
            ]
        }
    }
}
</script>