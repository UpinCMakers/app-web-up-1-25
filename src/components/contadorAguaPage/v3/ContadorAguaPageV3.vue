<style scoped>
    @import url("../../../styles/contadorAguaPage/v3/contadorAguaPage.scss");
</style>

<template>
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
        <MenuLateralDashV2 v-if="!flagLoadingCA"/>

        <!-- PAINEL EXIBIDOR -->
        <div class="painelExibidor" :style="{'width':$store.state.widthDinamCA}" v-if="$store.state.flagExib && !flagLoadingCA">

            <router-view></router-view>

        </div>

    </div>
</template>

<script>
//import axios from 'axios'

import MenuLateralDashV2 from './MenuLateralDashV2'

export default {

    components:{
        MenuLateralDashV2,
    },

    data() {
        return {
            //
            flagLoadingCA:true, // desabilitar Loading depois de carregar as info da page.
            //
            //flagExib:true, // init versão large (state)
            // this.$store.state.widthDinamCA
            //widthDinam:'75%', // init versão large com menu aberto. Na versão small o menu é width=100% sempre.

            //
            strFlagMenuOpenItem:'Geral', // controle do item selecionado na página, pelo menu lateral.

            //
            //LarguraPage:0, this.$store.state.LarguraPageCA

            // versão teste. DB LOCAL.
            malhas:[],
            grupos:[],
            saidas:[], // medidores de saida
            entradas:[], // medidores de entrada

            qntMalhas:0,
            qntGrupos:0,
            qntOUT:0, // medidores de saida
            qntIN:0, // medidores de entrada
            qntEventosOUT:0,
            qntEventosIN:0,
            qntEventos:0, // medidores + zmc
        }
    },

    methods:{
        // ---- CONTROLE DO ENQUADRAMENTO DO TAMANHO DA PÁGINA.
        // -- controle da versão do tamanho da página.
        /*callChangeFlagExib(flagFromChild) { 
            console.log('flagFromChild: ',flagFromChild)
            this.flagExib = flagFromChild 
        },*/

        // ---- CONTROLE DO ENQUADRAMENTO DO TAMANHO DA PÁGINA.
        // -- se o menu fechou então aumentar tamanho do painel de exibição da página, pois o menu ficou menor.
        /*callChangeTamExib(flagHide) { 
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
        },*/

        // ---- SWITCH para selecionar o item do menu, emitido do componente child.
        /*chooseItemFromMenu(routeFromChild) { 

            if (routeFromChild == 'back') { this.$router.push('/dashmain'); return; }

            this.$router.push(`/ca/${routeFromChild}`); // abrir item menu selecionado.

            //this.strFlagMenuOpenItem = strFromMenu
            this.flagExib = true // exibir conteúdo selecionado pelo menu lateral.
        },*/
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

            this.$store.state.LarguraPageCA = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

            var self = this

            // desabilitar overlay após requisição concluída.
            /*axios.get(self.$store.state.pathAxiosGetCA).then(function (res) {

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
            })*/

            // AQUI DEVEM SER INICIALIZADAS AS HIERARQUIAS DE MALHAS, GRUPOS E CONTADORES. 20/01/2025
            self.flagLoadingCA = false // tmp enquanto nao ha axios. 20/01/2025

        } else {

            // -- reencaminhar para login.
            this.$router.push('/dashmain')
            return
        }

        // versão teste. DB LOCAL. 05/12/2024. <---------- INICIALIZAÇÃO TMP ANTES DE ACIONAR O AXIOS.
        this.malhas = this.$store.state.liMalhas
        this.qntMalhas = this.malhas.length
        var m = 0
        while (m < this.qntMalhas) {
            this.qntGrupos = this.qntGrupos + this.malhas[m].grupos.length // int
            this.grupos = this.malhas[m].grupos // list
            var c = 0
            while (c < this.qntGrupos) {
                this.qntOUT = this.qntOUT + this.grupos[c].saidas.length // int
                this.qntIN = this.qntIN + this.grupos[c].entradas.length // int
                this.saidas = this.grupos[c].saidas // list
                this.entradas = this.grupos[c].entradas // list
                var vm = 0
                while (vm < this.qntOUT) {
                    this.qntEventosOUT = this.qntEventosIN + this.saidas[vm].eventos.length
                    vm++
                }
                var vz = 0
                while (vz < this.qntIN) {
                    this.qntEventosIN = this.qntEventosIN + this.entradas[vz].eventos.length
                    vz++
                }
                c++
            }
            m++
        }
        this.qntEventos = this.qntEventosOUT + this.qntEventosIN // int

        //console.log('qntMedidores: ',this.qntMedidores)
        //console.log('qntZMC: ',this.qntZMC)
    }
}
</script>