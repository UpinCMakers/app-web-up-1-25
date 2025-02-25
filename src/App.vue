<style scoped>
    @import url("./styles/app.scss");
</style>

<template>
  <v-app class="box_app">

    <MenuSupMainV2 @callByMenu="returnFromMenu($event)" :iconMenu="iconMenu" />

    <MenuBodyMainV2 @callByMenuBody="returnFromMenu($event)" v-if="$store.state.flagMenuSup" />

    <v-main>

      <router-view/>
    
    </v-main>

    <Rodape v-if="mdAndUp" />
    <Rodape :style="{'justify-content':'center'}" v-if="smAndDown" />

  </v-app>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mdAndUp, smAndDown } = useDisplay()
</script>

<script>
//import MenuMainA from './components/estrutural/MenuMainA.vue'
//import MenuMainB from './components/estrutural/MenuMainB.vue'
import Rodape from './components/estrutural/Rodape.vue'

import MenuSupMainV2 from './components/mainV2/MenuSupMainV2'
import MenuBodyMainV2 from './components/mainV2/MenuBodyMainV2'

export default {
  name: 'App',

  components: { /*MenuMainA, MenuMainB,*/ Rodape, MenuSupMainV2, MenuBodyMainV2 },

  data: () => ({
    //
    flagMenuSup:false,
    iconMenu:'mdi-menu', // init menu small
  }),

  metaInfo() {
    return {
      title:`UPinC`,
      meta:[
        {
          name:'description',
          content:'UPinC.Makers'
        }
      ]
    }
  },

  methods: {
    returnFromMenu(flagStringMenuSmall) {

        if (flagStringMenuSmall == 'open') {

            //console.log('abrir menu')
            this.$store.state.flagMenuSup = true
            this.iconMenu = 'mdi-menu-up-outline'
        
        } else {
            //console.log('fechar menu')
            this.$store.state.flagMenuSup = false
            this.iconMenu = 'mdi-menu'
        }
    }
  }
};
</script>
