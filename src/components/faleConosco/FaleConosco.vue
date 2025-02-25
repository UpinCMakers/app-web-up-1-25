<style scoped>
    @import url("../../styles/faleConosco/faleConosco.scss");
</style>

<template>
    
    <div class="box_faleConosco"
    :style="{
            backgroundImage:'url(' + require('../../assets/fundo_t.png') + ')',
            backgroundSize: 'cover', // contain
            backgroundPosition: 'center' // top center
            }">
        
        <ContactoUp />
            
    </div>

</template>

<script>
import ContactoUp from './ContactoUp'

export default {

    components:{ContactoUp},
    
    data() {
        return {
            //
        }
    },

    methods: {
        //
    },

    created() {
        this.$store.commit('init') // despertar api.
        window.scrollTo(0,0)
    }
}

</script>