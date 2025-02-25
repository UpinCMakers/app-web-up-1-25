<style scoped>
    @import url("../../styles/mainV2/mainV2.scss");
</style>

<template>
    
    <div class="box_main" v-if="!$store.state.flagMenuSup">
    <!--<div class="box_main" v-if="!$store.state.flagMenuSup"
    :style="{
        backgroundImage:'url(' + require('../../assets/fundo_t.png') + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
        }">-->

        <!--<MenuSupMainV2 @callByMenu="returnFromMenu($event)" />

        <MenuBodyMainV2 v-if="flagMenuSup" />-->

        <LinePromo />

        <ImgLinhaAMainV2 />

        <TxtLinhaMainV2 />

        <LineAuxMain1 />

        <!--<LineAuxMain0 />

        <LineCards />-->
            
    </div>

</template>

<script>
import axios from 'axios'

//import MenuSupMainV2 from './MenuSupMainV2'
//import MenuBodyMainV2 from './MenuBodyMainV2'

import LinePromo from './LinePromo'

import ImgLinhaAMainV2 from './ImgLinhaAMainV2'
import TxtLinhaMainV2 from './TxtLinhaMainV2'

import LineAuxMain1 from './LineAuxMain1'
//import LineAuxMain0 from './LineAuxMain0'
//import LineCards from './LineCards'

export default {
    
    components: { 
        LinePromo,
        /*MenuSupMainV2, MenuBodyMainV2,*/ ImgLinhaAMainV2, TxtLinhaMainV2, 
        LineAuxMain1, 
        //LineAuxMain0, LineCards 
    },

    data() {
        return {
            //flagMenuSup:false,
        }
    },

    methods: {
        /*returnFromMenu(flagStringMenuSmall) {

            if (flagStringMenuSmall == 'open') {

                //console.log('abrir menu')
                this.flagMenuSup = true
            
            } else {
                //console.log('fechar menu')
                this.flagMenuSup = false
            }
        },*/
    },

    created() {
        this.$store.commit('srcIP') // without param. Initial main GET Req.
        
        axios.get(this.$store.state.pathAxiosInit).then(function (res) {

            console.log(res.data.result)
        })
    }
}

</script>