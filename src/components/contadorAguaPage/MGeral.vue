<style scoped>
    @import url("../../styles/contadorAguaPage/mGeral.scss");
</style>

<template>
    <div class="box_mGeral">

        <!-- Contador -->
        <div class="painelGeralConsumidor">

            <!--<div class="boxTit">Informações do medidor</div>

             headers da tabela abaixo -->
            <div class="headersClasses" :style="{'border':'1px solid rgba(7,46,79,0.8)'}">
                <div class="hCard">ID</div>
                <div class="hCard">Medidor</div>
                <div class="hCard">Última leitura [m3]</div>
                <div class="hCard">Instalação</div>
                <div class="hCard">Desinstalação</div>
                <div class="hCard">Coordenadas</div>
                <div class="hCard">Status</div>
                <div class="hCard">Alarmes</div>
                <!--<div class="hCard" :style="{'justify-self':'flex-end'}">Ação</div>-->
            </div>

            <div class="boxLi">
                <div 
                class="liClasses" @click="callContadore(fullContInfo)" 
                :style="{'background':fullContInfo.b}"
                >

                    <div class="cCard">{{ fullContInfo.idd }}</div>
                    <div class="cCard">{{ fullContInfo.t }}</div>
                    <div class="cCard">{{ fullContInfo.lastR }}</div>
                    <div class="cCard">{{ fullContInfo.initDate }}</div>
                    <div class="cCard">{{ fullContInfo.endDate }}</div>
                    <div class="cCard">{{ fullContInfo.coord }}</div>
                    <div class="cCard">{{ fullContInfo.status }}</div>
                    <div class="cCard">{{ fullContInfo.alarme }}</div>

                    <!--<v-icon :style="{'align-items':'center','width':'100px'}">mdi-square-edit-outline</v-icon>-->
                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {

    props:['geralM'],

    data() {
        return {
            //
            fullContInfo:{
                'idd':0,
                't':'UP/6541668',
                'lastR':1052.5, // m3.
                'initDate':'01/11/2024', // instalação do contador.
                'endDate':'-',
                'status':'Desligado',
                'coord':[40.27899076267598, -7.504206597805024],
                'alarme':'-',
                'b':''
            },
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
        var nomeMedidor = this.$store.state.jTmpMalha.medidor

        var medidor = this.$store.state.liMalhas[idMalha].grupos[idGrupo].medidores[idMedidor]

        //console.log('medidor.leituras: ',medidor.leituras)

        // geral
        this.fullContInfo = {
            'idd':idMedidor,
            't':nomeMedidor,
            'lastR':medidor.ultima_leitura/1000, // m3.
            'initDate':medidor.instalacao, // instalação do contador.
            'endDate':medidor.desinstalacao,
            'status':medidor.status,
            'coord':medidor.coord,
            'alarme':medidor.eventos.length,
            'b':''
        }*/
        this.fullContInfo = this.geralM
    }
}
</script>