<style scoped>
    @import url("../../styles/parallaxMain.scss");
</style>

<template>

    <div class="pars">

        <v-img :src="require('../../assets/lab (12).jpg')" class="parallaxMain_img">

            <Par :par="pars[0]"/>
        
        </v-img>
    </div>

</template>

<script>
import Par from './Par.vue'

export default {
    components: { Par },

    data() {
        return {
            pars: [
                {
                    title:'teste tit',
                    color:'green',
                    bgtext:'teste de background text',
                    src:require('../../assets/nl (1).jpg'), // apenas este é utilizado na parallax.
                },
            ],
        }
    },
}
</script>