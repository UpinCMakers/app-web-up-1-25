<style scoped>
    @import url("../../../styles/dashagro/smartfarm/logoLinha.scss");
</style>

<template>
    <div class="box_logoLinha">

        <v-img class="el_img_logoLinha" :style="{'border-radius':'40px'}"
        :src="imgLogoAgro"
        />

    </div>
</template>

<script>
export default {
    data() {
        return {
            imgLogoAgro:require('../../../assets/0t.png'),
        }
    },

    methods:{
        //
    },

    created() {
        //
    }
}
</script>