<style scoped>
    @import url("../../styles/contadorAguaPage/consumidor.scss");
</style>

<template>
    <div class="box_consumidor">

        <div class="labelConsumidor" v-if="flagStrSelect == ''"><span class="ml-2">Malha</span></div>
        
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
            <v-icon>mdi-square-edit-outline</v-icon>
        </v-btn>

        <div class="painelGeralConsumidor mt-4" v-if="flagStrSelect == ''">

            <div class="boxTit">Grupos de medidores</div>

            <div class="headersClasses mb-1" :style="{'border':'1px solid rgba(7,46,79,0.8)'}">
                <div class="hCard">Nome</div>
                <div class="hCard">ZMC</div>
                <div class="hCard">Medidores</div>
            </div>

            <!-- Caixa de diálogo: input string -->
            <v-dialog v-model="flagDialog" max-width="250px">
                <div class="">
                    <!-- O componente form -->
                    <DialogA :t="'Novo Grupo'" :icon="'mdi-home-group'" 
                    @fromInput="desableDialog($event)" 
                    />
                </div>
            </v-dialog>

            <v-btn block small class="mb-1" @click="flagDialog = true">
                <span>Adicionar novo grupo</span>
                <v-icon>mdi-plus-box-outline</v-icon>
            </v-btn>

            <div class="cardGeralClasses" v-for="(el,j) in liClasses" :key="j" :style="{'background':el.b}"
            @mouseover="changeBtn(j,'on')"
            @mouseleave="changeBtn(j,'off')"
            @click="callClasse(j)"
            >
                <div class="cCard">{{ el.t }}</div>
                <div class="cCard">{{ el.z }}</div>
                <div class="cCard">{{ el.m }}</div>

                <v-icon>mdi-square-edit-outline</v-icon>
            </div>

        </div>

        <!--<div class="painelGeralConsumidor mt-4" v-if="flagClasseSelected">
            <div class="boxTit">Classe</div>
        </div>-->

        <Classe v-if="flagStrSelect == 'grupo'" 
        @fromClasse="changeFlagStr($event)" 
        />
        
        <Medidor v-if="flagStrSelect == 'medidor'" />

        <ZMC v-if="flagStrSelect == 'zmc'" />

    </div>
</template>

<script>
import Classe from './Classe'
import Medidor from './Medidor'
import ZMC from './ZMC'

import DialogA from './DialogA'

export default {

    props:['idMalha'],
    //props: ['id'], // O Vue Router injeta o ID aqui

    components:{Classe,Medidor,ZMC,DialogA},

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
        callClasse(index) { 
            console.log('Grupo requisitado: ', this.liClasses[index].t)

            //this.idGrupo = index
            this.$store.state.jTmpMalha.idGrupo = index
            this.$store.state.jTmpMalha.grupo = this.liClasses[index].t
            this.flagStrSelect = 'grupo'
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

                    var idMalha = this.$store.state.jTmpMalha.idMalha
                    
                    // update current json
                    this.$store.state.jTmpMalha.malha = this.nomeA

                    // update malha final
                    this.$store.state.liMalhas[idMalha].malha = this.nomeA

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
            //console.log('bool flagLi: ',flagLi[0])

            this.flagDialog = flagLi[0]
            
            /*var novoEl = {
                'iddC':this.liClasses.length,
                't':flagLi[1],
                'm':0,
                'z':0,
                'b':''
            }*/

            var novoEl = {
                'id':this.liClasses.length,
                'grupo':flagLi[1],
                'zmc':[],
                'medidores':[]
            }

            //this.liClasses.push(novoEl) // input novo nome string. (versão dev)
            this.$store.state.liMalhas[this.$store.state.jTmpMalha.idMalha].grupos.push(novoEl) // (versão teste local)

            this.init() // remontar página com novo grupo adiconado.
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

                c++
            }
            this.liClasses = liTmp

            this.nomeA = this.$store.state.jTmpMalha.malha
        },
    },

    created() {
        window.scrollTo(0,0)

        this.init()
    }
}
</script>