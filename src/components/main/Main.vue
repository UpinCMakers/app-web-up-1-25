<style scoped>
    @import url("../../styles/main/main.scss");
</style>

<template>
    
    <div class="box_main" :style="{backgroundImage:'url(' + require('../../assets/fundo_t.png') + ')'}">
        

        <!-- LARGE :style="{'background-image':require('../../assets/fundox.png')}"
        <v-img 
        class="img_main hidden-sm-and-down" :src="require('../../assets/fundox.png')" 'url(../../assets/fundox.png)'
        :src="require('../../assets/nlx.jpg')"
        :style="{'max-height':'350px'}"
        />-->

        <!-- SMALL 
        <v-img 
        class="img_main hidden-md-and-up" 
        :src="require('../../assets/nlx.jpg')"
        />-->

        <!-- LARGE -->
        <!--<MenuMainB class="hidden-sm-and-down" />-->

        <!-- SMALL -->
        <!--<MenuMainB class="hidden-md-and-up"> :style="{'width':'240px','border':'1px solid blue'}" />
        
        <MenuMainA class="hidden-md-and-up" />-->

        <!--<TxtMain class="hidden-sm-and-down" />-->

        <MenuSupMain @callByMenu="returnFromMenu($event)" />

        <MenuBodyMain v-if="flagMenuSup" />

        <PainelIn v-if="!flagMenuSup" />

        <!--<LineMain class="hidden-sm-and-down" :style="{'height':'40%'}"/>-->
        <LineMain v-if="!flagMenuSup" />

        <!--
            
        <ParallaxMain />
    
        <LineMain  :style="{'height':'40%'}"/>
        -->
            
    </div>

</template>

<script>
import axios from 'axios'

//import MenuMainB from './MenuMainB.vue'
//import MenuMainA from './MenuMainA.vue'
//import TxtMain from './TxtMain.vue'
import MenuSupMain from './MenuSupMain'
import MenuBodyMain from './MenuBodyMain'
import PainelIn from './PainelIn'
import LineMain from './LineMain'
//import CardMainSup from '../grandes/CardMainSup.vue'

//import ParallaxMain from '../grandes/ParallaxMain.vue'

export default {
    
    components: { /*MenuMainB, MenuMainA, TxtMain,*/ MenuSupMain, MenuBodyMain, PainelIn, LineMain, /*ParallaxMain*/ },

    data() {
        return {
            flagMenuSup:false,
        }
    },

    methods: {
        returnFromMenu(flagStringMenuSmall) {

            if (flagStringMenuSmall == 'open') {

                //console.log('abrir menu')
                this.flagMenuSup = true
            
            } else {
                //console.log('fechar menu')
                this.flagMenuSup = false
            }
        },
    },

    created() {
        //this.$store.commit('srcIP') // without param. Initial main GET Req.
        axios.get(this.$store.state.pathAxiosInit).then(function (res) {

            console.log(res.data.result)
        })
    }
}

</script>