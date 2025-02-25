<style scoped>
    @import url("../../../styles/contadorAguaPage/v3/grupos.scss");
</style>

<template>
    <div class="box_consumidor">

        <div class="label" v-if="flagStrSelect == ''"><span class="ml-2">Malha</span></div>
        
        <div class="boxTitGeralConsumidor" v-if="flagStrSelect == ''">
            <span class="ml-2" v-if="!flagEditNome">{{ nomeA }}</span>

            <v-form v-if="!flag_loading_A && flagEditNome" class=""
            ref="form"
            v-model="valid"
            lazy-validation
            >
                <v-text-field 
                color="orange"
                v-model="nomeMalhaEditing"
                :rules="nameRules"
                :label="nomeA"
                required
                style="width: 300px;"
                ></v-text-field>
            </v-form>

            <v-btn color="success" x-small v-if="flagEditNome" @click="changeName()">Atualizar nome</v-btn>
        
            <span v-if="flagError_A && !flag_loading_A"
            :style="{'margin-top':'10px','color':'red','font-size':'0.8rem'}">
                {{ msgError_A }}
            </span>
        </div>

        <v-btn block small class="mt-1" v-if="flagStrSelect == '' && !flagEditNome" @click="flagEditNome = true">
            <span>Editar nome malha</span>
            <v-icon class="ml-1">mdi-square-edit-outline</v-icon>
        </v-btn>

        <!-- Caixa de diálogo: input string -->
        <v-dialog v-model="flagDialog" max-width="250px">
            <div class="">
                <!-- O componente form -->
                <DialogA :t="'Novo Grupo'" :icon="'mdi-home-group'" 
                @fromInput="desableDialog($event)" 
                />
            </div>
        </v-dialog>

        <div class="titGeral mt-4">
            <v-icon :style="{'color':'rgb(31,122,177)'}">mdi-home-group</v-icon>
            <span class="ml-2">Grupos</span>
        </div>

        <!-- NOVO GRUPO -->
        <v-btn block small class="mt-4" @click="flagDialog = true">
            <span>Adicionar novo grupo</span>
            <v-icon class="ml-1">mdi-plus-box-outline</v-icon>
        </v-btn>

        <!-- PAINEL GRUPOS -->
        <div class="label mt-2"><span class="ml-2">Todos os grupos</span></div>

        <div class="painelGeralConsumidor">

            <div class="headersClasses" :style="{'border':'1px solid rgba(7,46,79,0.8)'}">
                <div class="hCard">Nome</div>
                <div class="hCard">Medidores de Entradas</div>
                <div class="hCard">Medidores de Saídas</div>
                <div class="hCard" :style="{'justify-self':'flex-end'}">Ação</div>
            </div>

            <div class="boxLi">
                <div class="liClasses" v-for="(el,r) in liClasses" :key="r"
                :style="{'background':el.b}"
                @mouseover="changeBtn(r,'on')"
                @mouseleave="changeBtn(r,'off')"
                @click="callGrupo(r)"
                >
                    <div class="hCard">{{ el.t }}</div>
                    <div class="hCard">{{ el.z }}</div>
                    <div class="hCard">{{ el.m }}</div>

                    <v-icon class="hCard" :style="{'justify-self':'flex-end'}">mdi-square-edit-outline</v-icon>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
//import Classe from './Classe'
//import Medidor from './Medidor'
//import ZMC from './ZMC'

import DialogA from './DialogA'

export default {

    props:['idMalha'],
    //props: ['id'], // O Vue Router injeta o ID aqui

    components:{DialogA}, // Classe,Medidor,ZMC,

    data() {
        return {
            //
            liClasses:[
                //{'t':'Grupo sem nome','m':3,'z':0,'b':''},
                //{'t':'Laboratório','m':3,'z':0,'b':''},
            ],
            idGrupo:0, // enviado via props para ativar o grupo selecionado.

            nomeA:'UPinC Lda', // nome da malha

            flagStrSelect:'',

            // edit nome
            flagEditNome:false,
            nomeMalhaEditing:'',
            valid: false, // btn 'entrar' inicia desabilitado.
            nameRules: [
                v => !!v || 'Preenchimento obrigatório',
            ],
            flag_loading_A:false,
            flagError_A:false,
            msgError_A:'Nome inválido',

            // dialog
            flagDialog:false,
        }
    },

    methods:{
        // -- CALL PAGE via flag local.
        callGrupo(index) { 
            //console.log('Grupo requisitado: ', this.liClasses[index].t)

            var idGrupo = index
            this.$store.state.jTmpMalha.idGrupo = index
            this.$store.state.jTmpMalha.grupo = this.liClasses[index].t
            this.flagStrSelect = 'grupo'

            //var idMalhaSelected = this.$store.state.jTmpMalha.idMalha // via store.
            var idMalha = this.idMalha // via props rota aninhada.
            //console.log('Grupo [idMalha]: ', idMalha)

            this.$router.push(`/ca/malhas/${idMalha}/grupos/${idGrupo}/medidores`);
        },

        changeBtn(index,strFlag) { 
            if (strFlag == 'on') { this.liClasses[index].b = 'rgb(247,215,46)' }
            else { this.liClasses[index].b = '' }
        },
        changeFlagStr(flagStr) {
            this.flagStrSelect = flagStr
        },

        changeName() {
            this.flag_loading_A = true // iniciar loading...

            if (this.nomeMalhaEditing.length >= 2) {

                if (this.$refs.form.validate()) {

                    //console.log('input ok')

                    this.flag_loading_A = false // desabilitar loading
                    this.flagError_A = false // reset flag error

                    this.nomeA = this.nomeMalhaEditing
                    this.nomeMalhaEditing = '' // reset var input

                    // update malha final store (idMalha via props router)
                    this.$store.state.liMalhas[this.idMalha].malha = this.nomeA

                    this.flagEditNome = false // desable edit.
                }

            } else {
                
                this.flag_loading_A = false // desabilitar loading
                this.flagError_A = true

                //this.flagEditNome = false // desable edit.
                return
            }
        },

        desableDialog(flagLi) { 

            this.flagDialog = flagLi[0]

            var novoEl = {
                'id':this.liClasses.length,
                'grupo':flagLi[1],
                'entradas':[],
                'saidas':[]
            }
            //console.log('Novo grupo: ', novoEl)
            //console.log('grupos[qualquer].entradas.length [init grupos]: ', novoEl.entradas.length)

            //this.liClasses.push(novoEl) // input novo nome string. (versão dev)
            //this.$store.state.liMalhas[this.$store.state.jTmpMalha.idMalha].grupos.push(novoEl) // (versão teste local)
            this.$store.state.liMalhas[this.idMalha].grupos.push(novoEl)
            //console.log('this.$store.state.liMalhas[this.idMalha].grupos: ', this.$store.state.liMalhas[this.idMalha].grupos)

            this.init() // remontar página com novo grupo adiconado.
        },

        init() {
            //var grupos = this.$store.state.liMalhas[this.$store.state.jTmpMalha.idMalha].grupos // list
            var grupos = this.$store.state.liMalhas[this.idMalha].grupos // list com id via props router
            //console.log('grupos [init grupos]: ', grupos)
            //console.log('grupos.length [init grupos]: ', grupos.length)

            var liTmp = []
            var c = 0
            while (c < grupos.length) {
                //console.log('c [init grupos]: ', c)

                var elGrupoLocal = {
                    'iddCl':grupos[c].id,
                    't':grupos[c].grupo, // nome do grupo
                    'm':grupos[c].saidas.length,
                    'z':grupos[c].entradas.length,
                    'b':''
                }

                liTmp.push(elGrupoLocal) // input grupo em uma malha

                c++
            }
            this.liClasses = liTmp

            //this.nomeA = this.$store.state.jTmpMalha.malha
            this.nomeA = this.$store.state.liMalhas[this.idMalha].malha
        },
    },

    created() {
        window.scrollTo(0,0)

        this.init()
    }
}
</script>