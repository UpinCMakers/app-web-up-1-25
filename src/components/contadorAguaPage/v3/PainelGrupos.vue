<style scoped>
    @import url("../../../styles/contadorAguaPage/v3/painelMalhas.scss");
</style>

<template>
    <div class="box_painelMalhas">

        
        <router-view :idMalha="idMalha"></router-view>

    </div>
</template>

<script>

export default {
    props:['idMalha'],
    
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
    }
}
</script>