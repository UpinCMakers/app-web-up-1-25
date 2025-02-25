<style scoped>
    @import url("../../styles/dashagro/dashagro.scss");
</style>

<template>
    <div class="box_dashagro"><!-- :style="image" -->
        
        <LoginDashAgro v-if="!$store.state.flagLogadoDashAgro" />

        <MainDashAgro v-if="$store.state.flagLogadoDashAgro" />

    </div>
</template>

<script>
import LoginDashAgro from './LoginDashAgro'
import MainDashAgro from './MainDashAgro'

export default {
    components: { LoginDashAgro, MainDashAgro },

    data() {
        return {
            //flagLogado:false,

            /*image: { 
                backgroundImage:'url(' + require('../../assets/p3b.png') + ')',
                border:'1px solid red',
            }*/
        }
    },

    created() {
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.
        this.$store.commit('startChange',{'qnt':9}) // qnt período a ser buscado. // descontinuado?

        // -- STORAGE
        var credenAgro = JSON.parse(localStorage.getItem('credenAgro'))
        //console.log(credenAgro)

        if (credenAgro != null) {
            this.$store.state.flagLogadoDashAgro = credenAgro.flagLogadoDashAgro
            //console.log('flag login alocada localmente')
        }
    }
}
</script>