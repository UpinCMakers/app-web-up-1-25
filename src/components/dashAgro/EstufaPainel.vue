<style scoped>
    @import url("../../styles/dashagro/estufaPainel.scss");
</style>

<template>
    <div class="box_estufaPainel">

        <!-- Título da estufa -->
        <div class="titEstufa hidden-sm-and-down">

            <v-icon large class="iconTit">mdi-hoop-house</v-icon>
            
            {{ estufa.nome }}
        </div>
        <div class="titEstufa_small hidden-md-and-up">
          <v-icon small class="iconTit mr-2" :style="{'color':'rgb(31,122,177)'}">mdi-hoop-house</v-icon>
          {{ estufa.nome }}
        </div>
        
        <!-- Características da estufa -->
        <div class="box_carac">

          <div class="info_icons">

            <div class="box_tit_icons">Painel de controlo</div>
            
            <div class="box_icons">

              <div class="el_carac" v-for="(el, index) in controList" :key="index"
              @mouseover="trocaCorBtnControl(index,'over')"
              @mouseleave="trocaCorBtnControl(index,'leave')"
              :style="{'box-shadow': el.shadow}"
              @click="addNovoDialog(el.valor,el.nome,index)"
              >
                <v-icon class="icons" large :style="{'color': el.cor}">{{ el.icon }}</v-icon>

                <span class="txt_carac">
                  <!--<span v-if="el.flag">{{ el.nome }}</span>-->
                  {{ el.nome }}
                </span>
                
                <span class="txt_valor">{{ el.valor }}</span>
              </div>

            </div>

          </div>

          <div class="info_textos">

            <div class="painel_i_t">Painel de informações</div>

            <div class="painel_msg">
              
              <!-- 4 itens lista dialog -->
              <div v-for="(msg,i) in dialogList_recent" :key="i" class="el_msg">
                <span>{{ msg }}</span>
              </div>
              
              <!-- BTN call hist -->
              <div class="btn_to_hist_dialog"
              @mouseover="hoverHist('on')"
              @mouseleave="hoverHist('')"
              :style="{'box-shadow': colorBtnToHist}"
              >
                Ver histórico completo
                <v-icon class="ml-2" :style="{'color': colorBtnOnHover}">mdi-history</v-icon>
              </div>
            </div>

          </div>
        </div>

        <!-- Detalhes das características da estufa -->
        <div class="box_chart">
            <Umidade />
            <Temperatura />
            <PH />
            <Reservatorio />
        </div>

    </div>
</template>

<script>
import Umidade from './Umidade'
import Temperatura from './Temperatura'
import PH from './PH'
import Reservatorio from './Reservatorio'

export default {
    //components: { Apexchart: ApexCharts },
    components: { Umidade, Temperatura, PH, Reservatorio },

    props:['estufa'],

    data() {
      return {

        // elementos painel de informações.
        dialogList:[
          'Olá. Bem vinda(o) ao seu sistema de controlo.',
          'Aqui você obterá todas as informações e atualizações da sua estufa.',
          'Visualizará ações de controlo caso disponíveis.',
          '...',
        ],
        tamDialogList:4,
        dialogList_recent:[],
        colorBtnToHist:'',
        colorBtnOnHover:'',

        // elementos painel de controlo.
        controList:[
          {'icon':'mdi-car-light-high','nome':'Luz A','valor':'On','shadow':'0px 1px 2px rgb(247,215,46)','cor':'rgb(247,215,46)'},
          {'icon':'mdi-thermometer','nome':'Temperatura','valor':'16ºC','shadow':'0px 1px 2px rgba(1,1,1,1)','cor':'rgba(255,255,255,0.5)'},
          {'icon':'mdi-fan','nome':'Exaustor','valor':'Off','shadow':'0px 1px 2px rgba(1,1,1,1)','cor':'rgba(255,255,255,0.5)'},
          {'icon':'mdi-water','nome':'Bomba dágua','valor':'Off','shadow':'0px 1px 2px rgba(1,1,1,1)','cor':'rgba(255,255,255,0.5)'},
          {'icon':'mdi-waves','nome':'Reservatório','valor':'70%','shadow':'0px 1px 2px rgba(1,1,1,1)','cor':'rgba(255,255,255,0.5)'},
          {'icon':'mdi-ph','nome':'pH','valor':'6.8','shadow':'0px 1px 2px rgba(1,1,1,1)','cor':'rgba(255,255,255,0.5)'},
          {'icon':'mdi-weather-windy','nome':'Umidificador','valor':'Off','shadow':'0px 1px 2px rgba(1,1,1,1)','cor':'rgba(255,255,255,0.5)'},
        ],

        icone:'mdi-hoop-house',

        imgLogoIcon:require('../../assets/estufa_icon.png'),
      }
    },

    methods:{
      addNovoDialog(act,disp,index) {
        //console.log('act: ',act)

        let tam = this.dialogList.length
        var li = this.dialogList
        var newMsg = ''

        if (act == 'On') { 
          act = 'Off' 

          this.controList[index]['shadow'] = '0px 1px 2px rgba(1,1,1,1)'
          this.controList[index]['cor'] = 'rgba(255,255,255,0.3)'

          //newMsg = disp + ': ' + 'atualizado para' + ' ' + act
          newMsg = disp + ': ' + act
          this.dialogList.push(newMsg)
          //console.log('this.dialogList: ',this.dialogList)

          this.controList[index]['valor'] = act

          tam = this.dialogList.length
          li = this.dialogList

          this.dialogList_recent = [li[tam-4],li[tam-3],li[tam-2],li[tam-1]]
          return
        }
        if (act == 'Off') { 
          act = 'On'
          
          this.controList[index]['shadow'] = '0px 1px 2px rgb(247,215,46)'
          this.controList[index]['cor'] = 'rgb(247,215,46)'

          //newMsg = disp + ': ' + 'atualizado para' + ' ' + act
          newMsg = disp + ': ' + act
          this.dialogList.push(newMsg)
          //console.log('this.dialogList: ',this.dialogList)

          this.controList[index]['valor'] = act

          tam = this.dialogList.length
          li = this.dialogList

          this.dialogList_recent = [li[tam-4],li[tam-3],li[tam-2],li[tam-1]]
          return
        }
        // SE não é btn de operação não opera.
      },

      trocaCorBtnControl(index, wayHover){
        if(wayHover == 'over') {
          
          this.controList[index]['shadow'] = '0px 1px 2px rgb(31,122,177)'
          this.controList[index]['cor'] = 'rgb(31,122,177)'

        } else {

          if (this.controList[index]['valor'] == 'On') {
            
            this.controList[index]['shadow'] = '0px 1px 2px rgb(247,215,46)'
            this.controList[index]['cor'] = 'rgb(247,215,46)'
            return
          }
          
          this.controList[index]['shadow'] = '0px 1px 2px rgba(1,1,1,1)'
          this.controList[index]['cor'] = 'rgba(255,255,255,0.3)'
        }
      },

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
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.

        // -- criar iniciação do box dialog.
        let tam = this.dialogList.length
        let li = this.dialogList
        this.dialogList_recent = [li[tam-4],li[tam-3],li[tam-2],li[tam-1]]

        // -- con
        //var mqtt = require('mqtt');

        /*const client = mqtt.connect('mqtt://broker.hivemq.com')

        client.on('connect', () => {
          // Inform controllers that garage is connected
          client.publish('garage/connected', 'true')
        })*/

        /*var options = {
          host: '3847fff847b94b34ade804af8c41b40e.s2.eu.hivemq.cloud',
          port: 8884,
          //protocol: 'mqtt',
          protocol: 'mqtts',
          //protocol: 'wss',
          username: 'condevweb',
          password: 'sEnh0aCon'
        }*/

        /*const options = {
          username: 'condevweb',
          password: 'sEnh0aCon',
          rejectUnauthorized: false
        }*/

        // initialize the MQTT client -- sEnh0aCon
        //const client = mqtt.connect('mqtt://3847fff847b94b34ade804af8c41b40e.s2.eu.hivemq.cloud:8884', options);
        //var client = mqtt.connect('mqtts://3847fff847b94b34ade804af8c41b40e.s2.eu.hivemq.cloud:8883',options);
        //var client = mqtt.connect(options);
        //const client = mqtt.connect('tls://3847fff847b94b34ade804af8c41b40e.s2.eu.hivemq.cloud:8883', options);

        /*var options = {
            host: '3847fff847b94b34ade804af8c41b40e.s2.eu.hivemq.cloud',
            port: 8884,
            protocol: 'mqtts',
            username: 'condevweb',
            password: 'sEnh0aCon'
        }

        // initialize the MQTT client
        var client = mqtt.connect(options);

        // setup the callbacks
        client.on('connect', function () {
            console.log('Connected');
        });

        client.on('error', function (error) {
            console.log(error);
        });

        client.on('message', function (topic, message) {
            // called each time a message is received
            console.log('Received message:', topic, message.toString());
        });

        // subscribe to topic 'my/test/topic'
        client.subscribe('my/test/topic');

        // publish message 'Hello' to topic 'my/test/topic'
        client.publish('my/test/topic', 'Hello');
        */
    }
}
</script>