<style scoped>
    @import url("../../styles/mainV2/linePromo.scss");
</style>

<template>
    
    <div :class="classDinam">
        <div @click="callSmartGarden()">
            <v-btn x-large block>smart garden Fundão 2025</v-btn>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            //
            classDinam:'box_linePromo animate__animated animate__fadeIn',
        }
    },

    methods: {
        //
        callSmartGarden() {
            this.$router.push('/smartgarden');
        }
    },

    created() {
        //
        let c=0
        setInterval(() => {
            if (c % 2 === 0) {
                this.classDinam = 'box_linePromo'
            } else {
                this.classDinam = 'box_linePromo animate__animated animate__fadeIn'
            }
            c++
        },1200)
    }
}

</script>