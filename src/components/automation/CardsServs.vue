<style scoped>
    @import url("../../styles/automation/cardsServs.scss");
</style>

<template>
    <div class="box_cardsServs">

        <Servs :el="elLoraRede" />

        <Servs :el="elLoraProd1" />

        <Servs :el="elMonitor" />
        
        <!--<div class="elCardServ"> v-if="flagOpenCards"
            
            <div class="tit">
                <v-icon class="mt-2" :style="{'color':'rgb(31,122,177)'}">{{ el.icon }}</v-icon>
                <span>{{ el.nome }}</span>
            </div>

            <div class="linha1">
                <span>{{ el.txtBody }}</span>
                <span :style="{'font-size':'1.6rem'}">{{ el.txtBody2 }}</span>
            </div>

            <div class="linha2">
                <v-btn block color="#092D4F" :style="{'cursor':'pointer'}" @click="callPage(el.rota)">
                    <span :style="{'color':'rgba(247,215,46,1)'}">Ver Mais</span>
                </v-btn>
            </div>
        </div>-->

    </div>
</template>

<script>
import Servs from './Servs'

export default {

    components:{Servs},

    data() {
        return {
            //
            //flagOpenCards:false, // abrir os cards dos serviços.

            elLoraRede:{
                'icon':'mdi-map-marker-path',
                'nome':'Rede LoRaWAN',
                //'txtBody':'Área sob nossa supervisão',
                'txtBody':'Expanda suas possibilidades com nossa rede LoRaWAN sob supervisão especializada.',
                'txtBody2':'700km2 +',
                'rota':'/lora',
            },

            elLoraProd1:{
                'icon':'mdi-access-point-network',
                'nome':'Gateway LoRaWAN',
                'txtBody':'Qualidade garantida na instalação do seu gateway com análise detalhada no local.',
                'txtBody2':'',
                'rota':'/gatewaycomercial',
            },

            elMonitor:{
                'icon':'mdi-monitor-dashboard',
                'nome':'Monitorização de hardware',
                'txtBody':'Gestão eficiente de dados e alertas inteligentes.',
                'txtBody2':'',
                'rota':'/monitorc',
            },
        }
    },

    methods: {
        //
    },

    created() {
        /*setInterval(() => {
            this.flagOpenCards = true
        }, 6000);*/
    }
}
</script>