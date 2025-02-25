<style scoped>
    @import url("../../../styles/contadorAguaPage/v3/pesquisa.scss");
</style>

<template>
    <div class="box_classes">

        <div class="titGeral">
            <v-icon :style="{'color':'rgb(31,122,177)'}">mdi-magnify</v-icon>
            <span class="ml-2">Pesquisa Geral</span>
        </div>

        <div class="label mt-2"><span class="ml-2">Malhas, grupos ou medidores</span></div>

        <div class="painelGeralConsumidor">

            <div class="searchBar mt-1 mb-1">
                <v-autocomplete
                v-model="valueSelected"
                :items="items"
                color="rgb(247,215,46)"
                class="w-100"
                @change="callCatalogo(valueSelected)"
                ></v-autocomplete>  

                <v-icon @click="callCatalogo(valueSelected)"
                size="42"
                class="el_icon_search"
                @mouseover="hoverSearch = 'rgb(31,122,177)'"
                @mouseleave="hoverSearch = 'rgb(247,215,46)'"
                :style="{'color': hoverSearch}">mdi-magnify</v-icon>
            </div>
        </div>

        <div class="mb-1 btnResetSearch">
            <v-btn density="compact" size="small" @click="valueSelected = ''">
                <span>Limpar pesquisa</span>
                <v-icon size="16" :style="{'color':'black'}">mdi-trash-can-outline</v-icon>
            </v-btn>
        </div>

        <div class="label mt-2"><span class="ml-2">Resultados encontrados</span></div>

        <div class="painelGeralConsumidor">

            <div class="headersClasses" :style="{'border':'1px solid rgba(7,46,79,0.8)'}">
                <div class="hCard">Nome</div>
                <div class="hCard">Hierarquia</div>
            </div>

            <div class="boxLi" v-if="valueSelected == ''">
                <div class="liClasses" v-for="(cl,index) in liClasses" :key="index"
                :style="{'background':cl.b}"
                @mouseover="changeBtn(index,'on')"
                @mouseleave="changeBtn(index,'off')"
                @click="callClasse(index,'a')"
                >
                    <div class="cCard">{{ cl.t }}</div>

                    <!--<v-icon :style="{'align-items':'center','width':'100px'}">mdi-square-edit-outline</v-icon>-->
                </div>
            </div>
            <div class="boxLi" v-if="valueSelected != ''">
                <div class="liClasses" @click="callClasse(fullClasse,'b')" 
                :style="{'background':fullClasse.b}"
                @mouseover="changeBtn(fullClasse.iddCl,'on')"
                @mouseleave="changeBtn(fullClasse.iddCl,'off')"
                >

                    <div class="cCard">{{ fullClasse.t }}</div>
                    <div class="cCard">{{ fullClasse.m }}</div>
                    <div class="cCard">{{ fullClasse.z }}</div>

                    <v-icon :style="{'align-items':'center','width':'100px'}">mdi-square-edit-outline</v-icon>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {

    data() {
        return {
            //
            liClasses:[
                //{'iddCl':0,'t':'Grupo sem nome','m':2,'z':0,'b':''},
                //{'iddCl':1,'t':'Laboratório','m':3,'z':0,'b':''},
            ],

            //
            items:[], // init empty then is it filled by loop on created.
            hoverSearch:'rgb(247,215,46)',
            valueSelected: '',
            fullClasse:'', // preenchido após selected value by autocomplete search.
        }
    },

    methods:{
        //
        changeBtn(index,strFlag) {
            if (strFlag == 'on') { this.liClasses[index].b = 'rgb(247,215,46)' }
            else { this.liClasses[index].b = '' }
        },

        callCatalogo(itemSelected) {
            //console.log('from search!')
            //console.log('itemSelected: ',itemSelected)
            var c=0
            while (c < this.liClasses.length) {
                if (itemSelected == this.liClasses[c].t) {
                    this.fullClasse = this.liClasses[c]
                }
                c++
            }
            //console.log('this.fullClasse: ',this.fullClasse)
        },

        callClasse(idGrupo) { 
            console.log('idGrupo: ',idGrupo)
            // idClasse == idGrupo

            // a malha já está definida aqui, pois estamos selecionando um grupo contido na malha.

            //this.$store.state.jTmpMalha.idMalha = idMalhaSelected
            //this.$store.state.jTmpMalha.malha = this.liConsumidores[idMalhaSelected].t // nome malha.

        },

        init() {
            var grupos = this.$store.state.liMalhas[this.$store.state.jTmpMalha.idMalha].grupos // list

            var liTmp = []
            var c = 0
            while (c < grupos.length) {

                var elGrupoLocal = {
                    'iddCl':grupos[c].id,
                    't':grupos[c].grupo, // nome do grupo
                    'm':grupos[c].medidores.length,
                    'z':grupos[c].zmc.length,
                    'b':''
                }

                liTmp[c] = elGrupoLocal

                this.items.push(liTmp[c].t) 
                c++
            }
            this.liClasses = liTmp
        },

        preInit() {
            // processar: obter todos os nomes de tudo?

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
            this.qntEventos = this.qntEventosOUT + this.qntEventosIN
        },
    },

    created() {
        //window.scrollTo(0,0)

        // montar lista search.
        /*var tam = this.liClasses.length
        var c = 0
        while (c < tam) {
            this.items.push(this.liClasses[c].t) 
            c++
        }*/

        //this.preInit()
        //this.init()
    }
}
</script>