<style scoped>
    @import url("../../styles/mainV2/txtLinhaMainV2.scss");
</style>

<template>

    <div class="box_txtLinhaMainV2 animate__animated animate__flash">

        <div class="painel_el_txt">

            <div class="box_el_txt" v-for="(txt,i) in liTxt_print" :key="i">
                <span class="el_txt">{{ txt }}</span>
            </div>

            <div v-if="flagOpenActionBtn" class="saibaMais" @click="callPage('automation')">Saiba Mais</div>

        </div>
            
    </div>

</template>

<script>
export default {

    //props:['widthDinam'],

    data() {
        return {
            // 'Ingresse','agora','e',
            liTxt:['Mantenha','o','seu','negócio','monitorizado','e','automatizado','com','LoRaWAN.'],
            liTxt_print:[],
            flagOpenActionBtn:false,
        }
    },

    methods: {
        callPage(rota) { this.$router.push(rota) },
    },

    created() {
        let index = 0;

        // Função que será chamada a cada 2 segundos
        const intervalo = setInterval(() => {

            // Verifica se ainda há elementos na lista
            if (index < this.liTxt.length) {
                // Imprime o elemento atual
                this.liTxt_print.push(this.liTxt[index])
                index++;
            } else {
                // Parar o intervalo quando todos os elementos forem impressos
                clearInterval(intervalo);
                this.flagOpenActionBtn = true
            }
        }, 800);
    }
}

</script>