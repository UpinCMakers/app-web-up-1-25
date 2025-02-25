<style scoped>
    @import url("../../styles/contadorAguaPage/mAlarmes.scss");
</style>

<template>
    <div class="box_mAlarmes">

        <!-- Contador -->
        <div class="painelGeralConsumidor">

            <!--<div class="boxTit">Informações do medidor</div>

             headers da tabela abaixo -->
            <div class="headersClasses" :style="{'border':'1px solid rgba(7,46,79,0.8)'}">
                <div class="hCard">Data</div>
                <div class="hCard">Hora</div>
                <div class="hCard">Origem</div>
                <div class="hCard">Tipo</div>
                <div class="hCard">Nota</div>
            </div>

            <div class="boxLi">
                <div class="liClasses" v-for="(el,a) in alarmesInfo" :key="a"
                >
                    <div class="cCard">{{ el.data }}</div>
                    <div class="cCard">{{ el.hora }}</div>
                    <div class="cCard">{{ el.origem }}</div>
                    <div class="cCard">{{ el.tipo }}</div>
                    <div class="cCard">{{ el.notif }}</div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {

    props:['eventosM'],

    data() {
        return {
            //
            alarmesInfo:[
                {
                    'date':'29/11/2024',
                    'hr':'16:29',
                    'tipo':'Alarme',
                    'notif':'Seco',
                },
                {
                    'date':'28/11/2024',
                    'hr':'10:31',
                    'tipo':'Alarme',
                    'notif':'fluxo inverso'
                },
                {
                    'date':'25/11/2024',
                    'hr':'11:22',
                    'tipo':'Instalação',
                    'notif':'-'
                }
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

        // todos os eventos
        this.alarmesInfo = medidor.eventos.reverse() // v2
        */

        this.alarmesInfo = this.eventosM
    }
}
</script>