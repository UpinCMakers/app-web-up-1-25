<style scoped>
    @import url("../../styles/contadorAguaPage/mLeitura.scss");
</style>

<template>
    <div class="box_mLeitura">

        <!-- Contador -->
        <div class="painelGeralConsumidor">

            <!--<div class="boxTit">Informações do medidor</div>

             headers da tabela abaixo -->
            <div class="headersClasses" :style="{'border':'1px solid rgba(7,46,79,0.8)'}">
                <div class="hCard">Data</div>
                <div class="hCard">Hora</div>
                <div class="hCard">Leitura</div>
                <div class="hCard">RSSI</div>
                <div class="hCard">SNR</div>
            </div>

            <div class="boxLi">
                <div class="liClasses" v-for="(el,r) in readingsInfo" :key="r"
                >
                    <div class="cCard">{{ el.data }}</div>
                    <div class="cCard">{{ el.hora }}</div>
                    <div class="cCard">{{ el.leitura }}</div>
                    <div class="cCard">{{ el.rssi }}</div>
                    <div class="cCard">{{ el.snr }}</div>

                    <!--<v-icon :style="{'align-items':'center','width':'100px'}">mdi-square-edit-outline</v-icon>-->
                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {

    props:['leiturasM'],

    data() {
        return {
            //
            readingsInfo:[
                {
                    'date':'29/11/2024',
                    'hr':'16:30',
                    'reading':1052.5,
                    'rssi':0,
                    'snr':0,
                },
                {
                    'date':'29/11/2024',
                    'hr':'10:30',
                    'reading':1052.35,
                    'rssi':0,
                    'snr':0,
                },
                {
                    'date':'29/11/2024',
                    'hr':'2:30',
                    'reading':1052,
                    'rssi':0,
                    'snr':0,
                },
                {
                    'date':'28/11/2024',
                    'hr':'20:30',
                    'reading':1051.75,
                    'rssi':0,
                    'snr':0,
                },
            ],
        }
    },

    methods:{
        //
    },

    created() {
        //window.scrollTo(0,0)
        
        /*var idMalha = this.$store.state.jTmpMalha.idMalha
        var idGrupo = this.$store.state.jTmpMalha.idGrupo
        var idMedidor = this.$store.state.jTmpMalha.idMedidor
        //var nomeMedidor = this.$store.state.jTmpMalha.medidor

        var medidor = this.$store.state.liMalhas[idMalha].grupos[idGrupo].medidores[idMedidor]

        // todas as leituras
        this.readingsInfo = []
        var i=medidor.leituras.length-1
        while (i > 0) {
            this.readingsInfo.push(medidor.leituras[i])
            i--
        }*/

        this.readingsInfo = this.leiturasM
    }
}
</script>