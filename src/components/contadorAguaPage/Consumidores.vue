<style scoped>
    @import url("../../styles/contadorAguaPage/consumidores.scss");
</style>

<template>
    <div class="box_consumidores">

        <div class="titGeral">
            <v-icon :style="{'color':'rgb(31,122,177)'}">mdi-transit-connection-variant</v-icon>
            <span class="ml-2">Malhas</span>
        </div>

        <div class="label mt-2" v-if="!flagConsumidorSelected">
            <span class="ml-2">Pesquisar Malha</span>
        </div>

        <div class="painelGeralConsumidor" v-if="!flagConsumidorSelected">

            <div class="searchBar mt-1 mb-1">
                <v-autocomplete
                v-model="valueSelected"
                :items="items"
                class="el_search"
                color="rgb(247,215,46)"
                :height="12"
                @change="callCatalogo(valueSelected)"
                ></v-autocomplete>  

                <v-icon @click="callCatalogo(valueSelected)"
                large
                class="el_icon_search"
                @mouseover="hoverSearch = 'rgb(31,122,177)'"
                @mouseleave="hoverSearch = 'rgb(247,215,46)'"
                :style="{'color': hoverSearch}">mdi-magnify</v-icon>
            </div>
        </div>

        <div class="mb-1 mt-1 btnResetSearch" v-if="!flagConsumidorSelected">
            <v-btn x-small @click="valueSelected = ''">
                <span>Limpar pesquisa</span>
                <v-icon>mdi-clean</v-icon>
            </v-btn>
        </div>

        <div class="label mt-2" v-if="!flagConsumidorSelected">
            <span class="ml-2">Todas as malhas</span>
        </div>

        <div class="painelGeralConsumidor" v-if="!flagConsumidorSelected">

            <div class="headersClasses" :style="{'border':'1px solid rgba(7,46,79,0.8)'}">
                <div class="hCard">Nome</div>
                <div class="hCard">Grupos</div>
                <div class="hCard">Contadores</div>
            </div>

            <!-- Caixa de diálogo: input string -->
            <v-dialog v-model="flagDialogMalha" max-width="250px">
                <div class="">
                    <!-- O componente form -->
                    <DialogA :t="'Nova Malha'" :icon="'mdi-transit-connection-variant'" 
                    @fromInput="desableDialog($event)" />
                </div>
            </v-dialog>

            <div class="mt-1 mb-1" :style="{'width':'99%','align-self':'center'}">
                <v-btn block small @click="flagDialogMalha = true">
                    <span>Adicionar nova malha</span>
                    <v-icon>mdi-plus-box-outline</v-icon>
                </v-btn>
            </div>

            <div class="boxLi" v-if="valueSelected == ''">
                <div class="liClasses" v-for="(cl,r) in liConsumidores" :key="r"
                :style="{'background':cl.b}"
                @mouseover="changeBtn(r,'on')"
                @mouseleave="changeBtn(r,'off')"
                @click="callConsumidor(r)"
                >
                    <div class="cCard">{{ cl.t }}</div>
                    <div class="cCard">{{ cl.c }}</div>
                    <div class="cCard">{{ cl.m }}</div>

                    <!--<v-icon :style="{'align-items':'center','width':'100px'}">mdi-square-edit-outline</v-icon>-->
                </div>
            </div>
            <div class="boxLi" v-if="valueSelected != ''">
                <div class="liClasses" @click="callConsumidor(fullC.iddC)" 
                :style="{'background':fullC.b}"
                @mouseover="changeBtn(fullC.iddC,'on')"
                @mouseleave="changeBtn(fullC.iddC,'off')"
                >

                    <div class="cCard">{{ fullC.t }}</div>
                    <div class="cCard">{{ fullC.c }}</div>
                    <div class="cCard">{{ fullC.m }}</div>

                    <v-icon :style="{'align-items':'center','width':'100px'}">mdi-square-edit-outline</v-icon>
                </div>
            </div>
        </div>

        <!--<div class="painelGeral" v-if="!flagConsumidorSelected">
            <div class="cardGeral" v-for="(el,i) in liConsumidores" :key="i" :style="{'background':el.b}"
            @mouseover="changeBtn(i,'on')"
            @mouseleave="changeBtn(i,'off')"
            @click="callConsumidor(i)"
            >
                <div class="tCard">{{ el.t }}</div>
                <div class="cCard">Classes: {{ el.c }}</div>
                <div class="cCard">Medidores: {{ el.m }}</div>

                <v-icon>mdi-square-edit-outline</v-icon>
            </div>
        </div>-->

        <div v-if="flagConsumidorSelected" class="voltarConsumidores" @click="backTo('consumidores')"
        @mouseover="hoverBack = 'rgb(31,122,177)'"
        @mouseleave="hoverBack = 'rgb(247,215,46)'"
        >
            <v-icon large class="mr-2" :style="{'color':hoverBack}">mdi-arrow-left-thick</v-icon>
            <span>Voltar</span>
        </div>

        <!--<Consumidor v-if="flagConsumidorSelected" />-->
        
        <router-view></router-view>

    </div>
</template>

<script>
//import Consumidor from './Consumidor'
import DialogA from './DialogA'

export default {

    components:{/*Consumidor,*/DialogA},

    data() {
        return {
            //
            liConsumidores:[
                //{'iddC':0,'t':'UPinC Lda','c':2,'m':6,'b':''},
                //{'iddC':1,'t':'CMF','c':1,'m':4,'b':''},
            ],
            idMalha:0,

            flagConsumidorSelected:false, // nenhum consumidor selecionado inicialmente.
            hoverBack:'rgb(247,215,46)', // cor do botão.

            flagClasseSelected:false,

            //
            items:[], // init empty then is it filled by loop on created.
            hoverSearch:'rgb(247,215,46)',
            valueSelected: '',
            fullC:'', // preenchido após selected value by autocomplete search.

            //
            flagDialogMalha:false,
        }
    },

    methods:{
        // -- CALL PAGE via flag local.
        /*callConsumidor(index) { 
            console.log('Consumidor requisitado: ', this.liConsumidores[index].t)

            // fazer req ou enviar via props para o child consumidor

            this.flagConsumidorSelected = true
        },*/
        callConsumidor(idMalhaSelected) { 
            //
            //this.idMalha = idMalhaSelected
            this.$store.state.jTmpMalha.idMalha = idMalhaSelected
            this.$store.state.jTmpMalha.malha = this.liConsumidores[idMalhaSelected].t // nome malha.
            this.flagConsumidorSelected = true

            this.$router.push(`/ca/malhas/${idMalhaSelected}/grupos`);
        },

        backTo(strFlag) { 
            if (strFlag == 'consumidores') {
                // forçar update state?
                var li = this.$store.state.liMalhas
                this.$store.state.liMalhas = li

                // back from consumidor to consumidores
                this.flagConsumidorSelected = false
            }
             
        },

        callCatalogo(itemSelected) {
            var c=0
            while (c < this.liConsumidores.length) {
                if (itemSelected == this.liConsumidores[c].t) {
                    this.fullC = this.liConsumidores[c]
                }
                c++
            }
        },

        changeBtn(index,strFlag) { 
            if (strFlag == 'on') { this.liConsumidores[index].b = 'rgb(247,215,46)' }
            else { this.liConsumidores[index].b = '' }
        },

        desableDialog(flagLi) { 
            this.flagDialogMalha = flagLi[0]

            var novoEl = {
                'id':this.liConsumidores.length,
                'malha':flagLi[1],
                'grupos':[],
            }

            //this.liConsumidores.push(novoEl) // input novo nome string. (versão dev)
            this.$store.state.liMalhas.push(novoEl) // (versão teste local)
            this.initLiSearch()
            //console.log('rcved from input dialog: ', flagBool)
        },

        initLiSearch() {
            // montar lista search. (versão dev).
            /*var tam = this.liConsumidores.length
            var c = 0
            while (c < tam) {
                this.items.push(this.liConsumidores[c].t) 
                c++
            }*/

            // montar lista search. (versão teste local).
            var liTmp = []
            var tam = this.$store.state.liMalhas.length
            var m = 0
            while (m < tam) {

                var grupos = this.$store.state.liMalhas[m].grupos // list
                var qntMedidores = 0 // int
                var c = 0
                while (c < grupos.length) {
                    qntMedidores = qntMedidores + grupos[c].medidores.length // int
                    c++
                }

                var el = {
                    'iddC':this.$store.state.liMalhas[m].id,
                    't':this.$store.state.liMalhas[m].malha,
                    'c':this.$store.state.liMalhas[m].grupos.length,
                    'm':qntMedidores,
                    'b':''
                }

                liTmp[m] = el

                //this.items.push(this.liConsumidores[m].t) 
                this.items.push(liTmp[m].t) 
                m++
            }

            this.liConsumidores = liTmp
        },
    },

    created() {
        window.scrollTo(0,0)

        this.initLiSearch()
    }
}
</script>