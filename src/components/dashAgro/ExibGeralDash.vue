<style scoped>
    @import url("../../styles/dashagro/exibGeralDash.scss");
</style>

<template>
    <div class="box_exibGeralDash">
        
        <PerfilDash v-if="$store.state.flagInt_selectDashAgro == 0" />

        <!--<TutoriaisDash v-if="$store.state.flagInt_selectDashAgro == 1" />

        <ResidencialDash v-if="$store.state.flagInt_selectDashAgro == 2" />-->

        <EstufasDash v-if="$store.state.flagInt_selectDashAgro == 3" 
        class="hidden-sm-and-down" 
        @selectEstufa="selectEstufa($event)"/>

        <EstufasDash v-if="$store.state.flagInt_selectDashAgro == 3" 
        class="hidden-md-and-up"
        :style="{'font-size':'0.7rem'}"
        @selectEstufa="selectEstufa($event)"/>

        <EstufaPainel v-if="$store.state.flagInt_selectDashAgro == 13" :estufa="estufa_select" />

        <!--<FazendasDash v-if="$store.state.flagInt_selectDashAgro == 4" />-->

    </div>
</template>

<script>
import PerfilDash from './PerfilDash'
import EstufasDash from './EstufasDash'
import EstufaPainel from './EstufaPainel'
//import FazendasDash from './FazendasDash' // realocado. Acesso via router js.

export default {
    components: { PerfilDash, EstufasDash, EstufaPainel, /*FazendasDash*/ },

    data() {
        return {
            estufa_select:null,
        }
    },

    methods:{
        selectEstufa(estufa) {
            //console.log('estufa rcv: ',estufa)
            this.estufa_select = estufa
            this.$store.state.flagInt_selectDashAgro = 13 // selecionar component EstufaPainel.vue
        }
    },

    created() {
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.
    }
}
</script>