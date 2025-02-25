<style scoped>
    @import url("../../../styles/dashagro/smartfarm/chatUnid.scss");
</style>

<template>
    <div class="box_chatUnid">

        <!--<div class="painel_i_t">Painel de informações</div>-->

        <div class="painel_msg">
        
            <!-- 4 itens lista dialog
            <div v-for="(msg,i) in $store.state.param_chat_log" :key="i" class="el_msg"> -->
            <div v-for="(msg,i) in this.dialogList_recent" :key="i" class="el_msg">
                <span>{{ msg }}</span>
            </div>
            
            <!-- BTN call hist 
            <div class="btn_to_hist_dialog"
            @mouseover="hoverHist('on')"
            @mouseleave="hoverHist('')"
            :style="{'box-shadow': colorBtnToHist}"
            >
                Ver histórico completo
                <v-icon class="ml-2" :style="{'color': colorBtnOnHover}">mdi-history</v-icon>
            </div>-->
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            // elementos painel de informações.
            dialogList:[
            'Olá. Bem vinda(o) ao seu sistema de controlo.',
            'Aqui você obterá todas as informações e atualizações do seu terreno.',
            'Visualizará ações de controlo caso disponíveis.',
            '...',
            ],
            tamDialogList:4,
            dialogList_recent:[], // preenchida on created()
            colorBtnToHist:'',
            colorBtnOnHover:'',
        }
    },

    methods:{
        hoverHist(wayHover) {
            if(wayHover == 'on') {
            this.colorBtnToHist = '0px 1px 2px rgb(247,215,46)'
            this.colorBtnOnHover = 'rgb(247,215,46)'
            } else {
            this.colorBtnToHist = '0px 1px 2px rgba(1,1,1,1)'
            this.colorBtnOnHover = 'rgba(255,255,255,0.3)'          
            }
        }
    },

    created() {
        // -- criar iniciação do box dialog.
        let tam = this.dialogList.length
        let li = this.dialogList
        this.dialogList_recent = [li[tam-4],li[tam-3],li[tam-2],li[tam-1]]
    }
}
</script>