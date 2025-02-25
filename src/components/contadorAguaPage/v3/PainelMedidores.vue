<style scoped>
    @import url("../../../styles/contadorAguaPage/v3/painelMalhas.scss");
</style>

<template>
    <div class="box_painelMalhas">

        <router-view :idMalha="idMalha" :idGrupo="idGrupo" :idOUT="idOUT" :idIN="idIN"></router-view>

    </div>
</template>

<script>
export default {
    props:['idMalha','idGrupo','idOUT','idIN'],
    data() {
        return {
            //
        }
    },

    methods:{
        //
    },

    created() {
        window.scrollTo(0,0)
        //console.log('[painel medidores] idGrupo: ',this.idGrupo)
    }
}
</script>