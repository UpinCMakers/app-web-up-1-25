<style scoped>
    @import url("../../../styles/contadorAguaPage/v3/medidorV2.scss");
</style>

<template>
    <div class="box_targetSearchCA">

        <div class="label"><span class="ml-2">Medidor de entrada</span></div>

        <div class="boxTitGeralConsumidor">
            <span class="ml-2" v-if="!flagEditNome">{{ nomeA }}</span>

            <v-form v-if="!flag_loading_A && flagEditNome" class=""
            ref="form"
            v-model="valid"
            lazy-validation
            >
                <v-text-field 
                color="orange"
                v-model="nomeEditing"
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

        <v-btn block small class="mt-1" v-if="!flagEditNome" @click="flagEditNome = true">
            <span>Editar nome medidor</span>
            <v-icon class="ml-1">mdi-square-edit-outline</v-icon>
        </v-btn>

        <div class="label"><span class="mt-4 ml-2">Informações</span></div>

        <div class="box_expande">

            <!-- Leituras -->
            <PainelExpande :name="'Leituras'" :liKeys="liKeysLeituras" :liValues="liValuesLeituras" />

            <!-- Eventos -->
            <PainelExpande :name="'Eventos'" :liKeys="liKeysEventos" :liValues="liValuesEventos" />
        </div>

    </div>
</template>

<script>
//import MapLeafExib from './MapLeafExib'
import PainelExpande from './PainelExpande'

export default {

    props:['idIN','idGrupo','idMalha'],

    components:{PainelExpande},

    data() {
        return {
            //
            coordA:[],
            nomeA:'UP/6541668',
            nomeIN:'',
            // edit nome
            flagEditNome:false,
            nomeEditing:'',
            valid: false, // btn 'entrar' inicia desabilitado.
            nameRules: [
                v => !!v || 'Preenchimento obrigatório',
            ],
            flag_loading_A:false,
            flagError_A:false,
            msgError_A:'Nome inválido',


            // processamento init
            liLeituras:[],
            liEventos:[],
            liKeysLeituras:[],
            liKeysEventos:[],
            liValuesLeituras:[],
            liValuesEventos:[],
        }
    },

    methods:{
        changeName() {
            this.flag_loading_A = true // iniciar loading...

            if (this.nomeEditing.length >= 2) {

                if (this.$refs.form.validate()) {

                    this.flag_loading_A = false // desabilitar loading
                    this.flagError_A = false // reset flag error

                    this.nomeA = this.nomeEditing
                    this.nomeEditing = '' // reset var input

                    // Atualizar store.
                    var idMalha = this.idMalha // via props router
                    var idGrupo = this.idGrupo
                    var idIN = this.idIN
                    this.$store.state.liMalhas[idMalha].grupos[idGrupo].entradas[idIN].nome = this.nomeA

                    this.flagEditNome = false // desable edit.
                }

            } else {
                
                this.flag_loading_A = false // desabilitar loading
                this.flagError_A = true

                //this.flagEditNome = false // desable edit.
                return
            }
        },

        init() {
            //console.log('[saida] this.idOUT: ',this.idOUT)

            var idMalha = this.idMalha // via props router
            var idGrupo = this.idGrupo
            var idIN = this.idIN
            //console.log('idOUT: ',idOUT)

            // store
            this.nomeMalha = this.$store.state.liMalhas[idMalha].malha
            this.nomeGrupo = this.$store.state.liMalhas[idMalha].grupos[idGrupo].grupo
            //console.log('this.$store.state.liMalhas[idMalha].grupos[idGrupo].saidas[idOUT]: ',this.$store.state.liMalhas[idMalha].grupos[idGrupo].saidas[idOUT])
            this.nomeIN = this.$store.state.liMalhas[idMalha].grupos[idGrupo].entradas[idIN].nome
            
            //console.log('befora liLeituras')
            //console.log('elem saida: ',this.$store.state.liMalhas[idMalha].grupos[idGrupo].saidas[idOUT].leituras)
            var liLeituras = this.$store.state.liMalhas[idMalha].grupos[idGrupo].entradas[idIN].leituras
            //console.log('(teste) liLeituras: ',liLeituras)
            var liEventos = this.$store.state.liMalhas[idMalha].grupos[idGrupo].entradas[idIN].eventos

            // recortar e agrupar apenas o títulos (keys) dos json's leituras e eventos.
            this.liKeysEventos = Object.keys(liEventos[0])
            if (liLeituras.length > 0) { this.liKeysLeituras = Object.keys(liLeituras[0]) }

            // loop na lista.
            let c=0
            if (liLeituras.length > 0) {
                while (c<liLeituras.length) {
                    this.liValuesLeituras.push(Object.values(liLeituras[c]))
                    c++
                }
            }
            console.log('(teste) this.liValuesLeituras: ',this.liValuesLeituras)
            c=0
            while (c<liEventos.length) { // Sempre haverá o evento inicial de criaçao de um medidor.
                this.liValuesEventos.push(Object.values(liEventos[c]))
                c++
            }

            this.nomeA = this.nomeIN // variável para edição de nome.

        }
    },

    created() {
        window.scrollTo(0,0)

        this.init()
    }
}
</script>