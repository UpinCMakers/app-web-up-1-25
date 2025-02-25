<style scoped>
    @import url("../../styles/mainV2/elImgAuxMain0.scss");
</style>

<template>
    
    <div class="box_elImgAuxMain0"
    :style="{
        backgroundImage:'url(' + require('../../assets/img-map-t1.png') + ')',
        backgroundSize: 'contain', //cover
        backgroundPosition: 'center',
        'width':widthDinam,
        'height':heightDinam
        }"></div>

</template>

<script>
export default {

    props:['widthDinam','heightDinam'],

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