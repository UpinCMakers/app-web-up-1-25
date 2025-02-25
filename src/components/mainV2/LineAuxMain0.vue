<style scoped>
    @import url("../../styles/mainV2/lineAuxMain0.scss");
</style>

<template>
    
    <div class="box_lineAuxMain0 mt-10 mb-10">

        <!-- LARGE -->
        <ElImgAuxMain0 class="hidden-sm-and-down"
        :widthDinam="'48%'" :heightDinam="'70%'"
        />

        <!-- SMALL -->
        <ElImgAuxMain0 class="hidden-md-and-up mt-8"
        :widthDinam="'280px'" :heightDinam="'220px'"
        />

        <!-- LARGE -->
        <ElTxtShowAuxMain0 class="hidden-sm-and-down"
        :widthDinam="'48%'" :heightDinam="'70%'"
        />

        <!-- SMALL -->
        <ElTxtShowAuxMain0 class="hidden-md-and-up"
        :widthDinam="'280px'" :heightDinam="'400px'"
        />
            
    </div>

</template>

<script>
import ElImgAuxMain0 from './ElImgAuxMain0'
import ElTxtShowAuxMain0 from './ElTxtShowAuxMain0'

export default {

    //props:['widthDinam'],

    components:{ElImgAuxMain0,ElTxtShowAuxMain0},

    data() {
        return {
            //
        }
    },

    methods: {
        //callPage(rota) { this.$router.push(rota) },
    },

    created() {
        //
    }
}

</script>