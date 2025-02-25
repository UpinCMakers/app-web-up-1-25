<style scoped>
    @import url("../../styles/contadorAguaPage/contadorAguaPage.scss");
</style>

<template>
    <!--
    :style="{
    backgroundImage:'url(' + require('../../assets/canot1.webp') + ')',
    backgroundSize: 'cover', // contain cover
    backgroundPosition: 'bottom' // center
    }"
    -->
    <div class="box_contadorAguaPage" v-if="!$store.state.flagMenuSup">

        <div v-if="flagLoadingCA"
        :style="{'display':'flex','width':'100%','align-items':'center','justify-content':'center'}">
            <v-progress-circular 
                color="rgb(247,215,46)"
                size="64"
                indeterminate
            ></v-progress-circular>
        </div>

        <!-- MENU LATERAL -->
        <MenuLateralDashV2 v-if="!flagLoadingCA"
        @watchExib="callChangeFlagExib($event)" 
        @watchHideMenu="callChangeTamExib($event)" 
        @chooseItemFromMenu="chooseItemFromMenu($event)"
        />

        <!-- PAINEL EXIBIDOR -->
        <div class="painelExibidor" :style="{'width':widthDinam}" v-if="flagExib && !flagLoadingCA">

            <router-view></router-view>

            <!--<Geral v-if="strFlagMenuOpenItem == 'Geral'" 
            :qntMalhas="qntMalhas"
            :qntGrupos="qntGrupos"
            :qntMedidores="qntMedidores"
            :qntZMC="qntZMC"
            :qntEventos="qntEventos"
            />

            <Consumidores v-if="strFlagMenuOpenItem == 'Malhas'" />

            <Classes v-if="strFlagMenuOpenItem == 'Grupos'" />

            <Medidores v-if="strFlagMenuOpenItem == 'Medidores'" />

            <Eventos v-if="strFlagMenuOpenItem == 'Eventos'" />
            -->

            <!---

            <AddClasse v-if="strFlagMenuOpenItem == 'Adicionar nova classe'" />

            <AddContador v-if="strFlagMenuOpenItem == 'Adicionar novo contador'" />

            <SearchContador v-if="strFlagMenuOpenItem == 'Pesquisar contador'" />
            -->

        </div>

    </div>
</template>

<script>
import axios from 'axios'

import MenuLateralDashV2 from './MenuLateralDashV2'

//import Geral from './Geral'
//import Consumidores from './Consumidores'
//import Classes from './Classes'
//import Medidores from './Medidores'
//import Eventos from './Eventos'

//import AddClasse from './AddClasse'
//import AddContador from './AddContador'
//import SearchContador from './SearchContador'

export default {

    components:{
        MenuLateralDashV2//,Geral,Consumidores,Classes,Medidores,Eventos
    },

    data() {
        return {
            //
            flagLoadingCA:true, // desabilitar Loading depois de carregar as info da page.
            //
            flagExib:true, // init versão large
            widthDinam:'75%', // init versão large com menu aberto. Na versão small o menu é width=100% sempre.

            //
            strFlagMenuOpenItem:'Geral', // controle do item selecionado na página, pelo menu lateral.

            //
            LarguraPage:0,

            // versão teste. DB LOCAL.
            malhas:[],
            grupos:[],
            medidores:[],
            zmc:[],

            qntMalhas:0,
            qntGrupos:0,
            qntMedidores:0,
            qntZMC:0,
            qntEventosM:0,
            qntEventosZ:0,
            qntEventos:0, // medidores + zmc
        }
    },

    methods:{
        // ---- CONTROLE DO ENQUADRAMENTO DO TAMANHO DA PÁGINA.
        // -- controle da versão do tamanho da página.
        callChangeFlagExib(flagFromChild) { this.flagExib = flagFromChild }, //flagFromChild[0] },
        // ---- CONTROLE DO ENQUADRAMENTO DO TAMANHO DA PÁGINA.
        // -- se o menu fechou então aumentar tamanho do painel de exibição da página, pois o menu ficou menor.
        callChangeTamExib(flagHide) { 
            //var flagHide = li[0]
            //var tamPage = li[1]
            if (flagHide == true) { // menu fechou.

                if (this.LarguraPage < 500) { this.flagExib = true }

                this.widthDinam = '100%' // preencher toda a página, pois o menu lateral é 80px.

            } else { // menu abriu.

                // versão small deve ser exibida quando o menu fechar.
                if (this.LarguraPage < 500) { this.flagExib = false }

                this.widthDinam = '75%' // reset (menu re-aberto).
            }
        },

        // ---- SWITCH para selecionar o item do menu, emitido do componente child.
        chooseItemFromMenu(routeFromChild) { 

            if (routeFromChild == 'back') { this.$router.push('/dashmain'); return; }

            this.$router.push(`/ca/${routeFromChild}`); // abrir item menu selecionado.

            //this.strFlagMenuOpenItem = strFromMenu
            this.flagExib = true // exibir conteúdo selecionado pelo menu lateral.
        },
    },

    created() {
        window.scrollTo(0,0)

        // -- STORAGE
        var creden = JSON.parse(localStorage.getItem('creden'))
        var contentUser = JSON.parse(localStorage.getItem('contentUser'))

        if (creden != null) {
            this.$store.state.flagLogadoDash = creden.flagLogadoDash
            this.$store.state.contentUser = contentUser
        }

        if (this.$store.state.flagLogadoDash == true) { // última alteração 07/10/2024

            this.LarguraPage = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

            var self = this

            // desabilitar overlay após requisição concluída.
            axios.get(self.$store.state.pathAxiosGetCA).then(function (res) {

                //console.log(res.data.result)

                // -- VERSÃO DE RECEBIMENTO PARA APENAS 1 CONTADOR.
                let c=0
                var liAux = []
                while (c<res.data.result.length) {
                    liAux.push({
                        'data':res.data.result[c].dataRcv.slice(0, 10),
                        'leitura':res.data.result[c].litrosConsumidos
                    })
                    c++
                }
                self.$store.state.liContadores = [
                    {
                        'classe':'Proj. UPinC Contadores LoRaWAN',
                        'liContadores':[
                            {
                                'id':'c1',
                                'nome':'UPinC Exemplo',
                                'classe':'Proj. UPinC Contadores LoRaWAN',
                                'coord':[40.279184, -7.504404],
                                'lileituras':liAux
                            }
                        ],
                    },
                ]

                //liContadores

                self.flagLoadingCA = false

                //self.$store.state.farm_li_names = res.data.result.names
                
                //self.$store.state.flag_loading_init_farm = false // desabilitar loading. Abrir page.
            })

        } else {

            // -- reencaminhar para login.
            this.$router.push('/dashmain')
        }

        // versão teste. DB LOCAL. 05/12/2024.
        this.malhas = this.$store.state.liMalhas
        this.qntMalhas = this.malhas.length
        var m = 0
        while (m < this.qntMalhas) {
            this.qntGrupos = this.qntGrupos + this.malhas[m].grupos.length // int
            this.grupos = this.malhas[m].grupos // list
            var c = 0
            while (c < this.qntGrupos) {
                this.qntMedidores = this.qntMedidores + this.grupos[c].medidores.length // int
                this.qntZMC = this.qntZMC + this.grupos[c].zmc.length // int
                this.medidores = this.grupos[c].medidores // list
                this.zmc = this.grupos[c].zmc // list
                var vm = 0
                while (vm < this.qntMedidores) {
                    this.qntEventosM = this.qntEventosM + this.medidores[vm].eventos.length
                    vm++
                }
                var vz = 0
                while (vz < this.qntZMC) {
                    this.qntEventosZ = this.qntEventosZ + this.zmc[vz].eventos.length
                    vz++
                }
                c++
            }
            m++
        }
        this.qntEventos = this.qntEventosM + this.qntEventosZ // int

        //console.log('qntMedidores: ',this.qntMedidores)
        //console.log('qntZMC: ',this.qntZMC)
    }
}
</script>