<style scoped>
    @import url("../../styles/elemPainel.scss");
</style>

<template>

    <div class="box_elemPainel" :class="infoElPainel.shadowCardMenu">
        
        <!-- COLUNA ESQUERDA -->
        <div class="col_esq_elemPainel_cardB">
            <!-- IMG Menu -->
            <div class="img_card_menu">

                <v-img :style="{'border-radius':'10px'}"
                    :src="infoElPainel.img"
                />

            </div>

            <div class="tit_card_menu">
                <span>{{ infoElPainel.tit }}</span>
            </div>
        </div>

        <!-- COLUNA DIREITA -->
        <div class="col_direta_elemPainel_cardB">

            <div class="txt_card_menu">
                <span>{{ infoElPainel.desc }}</span>
            </div>

            <v-btn icon class="lastLine_card_menu">
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
            
        </div>

    </div>

</template>

<script>
export default {
    
    props: ['infoElPainel']
}
</script>