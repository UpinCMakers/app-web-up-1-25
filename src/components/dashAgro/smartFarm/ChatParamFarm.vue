<style scoped>
    @import url("../../../styles/dashagro/smartfarm/chatParamFarm.scss");
</style>

<template>
    <div class="box_chatParamFarm">

        <div class="painel_chatParamFarm">

            <span class="display_tit">Avaliações, notas e informações</span>

            <div class="display_chatParamFarm">
                
                <ChatUnid />
                
            </div>

        </div>

    </div>
</template>

<script>
import ChatUnid from './ChatUnid'

export default {
    components: { ChatUnid },

    data() {
        return {
            //
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