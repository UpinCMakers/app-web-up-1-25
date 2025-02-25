<style scoped>
    @import url("../../styles/mainV2/elCardMain.scss");
</style>

<template>
    
    <div class="box_elCardMain" 
    :style="{
    'height':heightDinam,
    'width':widthDinam,
    backgroundImage:imgFromChangeByMouse,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
    }"
    @mouseover="changeImg('on')"
    @mouseleave="changeImg('off')"
    >

        <div class="bodyText">
            <div class="tit mb-4">{{ infoCard.tit }}</div>
            <div class="contentText ml-2 mr-2"><span v-if="infoCard.tit != 'Quem Somos'">{{ infoCard.txt }}</span></div>
            <div class="saibaMais mb-2" v-if="flagSaibaMais" @click="callRotaFromMenuMain(infoCard.rota)">Saiba mais</div>
        </div>
            
    </div>

</template>

<script>
export default {
    
    props:['infoCard','heightDinam','widthDinam'],

    data() {
        return {
            flagSaibaMais:false,
            imgFromChangeByMouse:'',
        }
    },

    methods: {
        callRotaFromMenuMain(rota) {
            //console.log('infoCard.rota: ',rota)
            this.$router.push(rota)
        },
        changeImg(flagChange) {
            if (flagChange == 'on') {

                this.flagSaibaMais = true
                this.imgFromChangeByMouse = this.infoCard.img2

            } else {

                this.flagSaibaMais = false
                this.imgFromChangeByMouse = this.infoCard.img
            }
        },
    },

    created() {
        //console.log('infoCard: ',this.infoCard)
        this.imgFromChangeByMouse = this.infoCard.img // init img from props.
    }
}

</script>