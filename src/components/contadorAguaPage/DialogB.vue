<style scoped>
    @import url("../../styles/contadorAguaPage/dialogB.scss");
</style>

<template>
    <div class="box_dialogB">

        <div class="session_form mb-2 mt-2" v-if="flag_loading_B">

            <span class="mb-2" :style="{'font-size':'0.7rem'}">Atualizando suas informações</span>

            <v-progress-circular
            :size="70"
            :width="7"
            color="green"
            indeterminate
            :style="{'display':'flex','align-self':'center'}"
            ></v-progress-circular>

        </div>

        <v-icon class="mt-4" :style="{'color':'rgb(31,122,177)'}">{{ icon }}</v-icon>

        <div class="tit" v-if="!flag_loading_B">{{ t }}</div>

        <v-form v-if="!flag_loading_B" class="session_form"
        ref="form"
        v-model="valid"
        lazy-validation
        >
            <v-text-field
            color="orange"
            v-model="nome_B"
            :rules="nameRules"
            label="Novo nome"
            required
            ></v-text-field>

        </v-form>

        <div v-if="!flag_loading_B" class="btn_login mb-2">
            <v-btn
            x-small
            block
            :disabled="!valid"
            color="blue"
            class="mr-4 mt-1"
            @click="coord"
            >
                atribuir coordenada geográfica
            </v-btn>

            <span :style="{'font-size':'0.7rem'}">(Opcional)</span>
        </div>

        <div class="boxCoord" v-if="flagBoolCoordOpen">
            
            <MapLeaf @coordFromClick="coordRcvedFromClick($event)"
            :style="{'z-index':'1'}" />
            <div class="aux_boxCoord"></div>
        </div>

        <div class="exibCoord" v-if="flagCoordShow">
            <span>Coordenadas: </span>
            <span>{{ coordRcved.lat }}, {{ coordRcved.lng }}</span>
        </div>

        <div v-if="!flag_loading_B" class="btn_login mb-2">
            <v-btn
            small
            block
            :disabled="!valid"
            color="success"
            class="mr-4 mt-1"
            @click="chamada"
            >
                adicionar
            </v-btn>
        </div>

        <span v-if="flagError_B && !flag_loading_B"
        :style="{'margin-top':'10px','color':'red','font-size':'0.8rem'}">
            {{ msgError_B }}
        </span>

    </div>
</template>

<script>
import MapLeaf from './MapLeaf.vue';

//import axios from 'axios'

export default {

    props:['t','icon'],

    components:{MapLeaf},

    data() {
        return {
            nome_B:'',
            flagError_B:false,
            msgError_B:'Nome inválido',

            valid: false, // btn 'entrar' inicia desabilitado.
            nameRules: [
                v => !!v || 'Preenchimento obrigatório',
            ],

            flag_loading_B:false,

            // coord
            flagBoolCoordOpen:false,
            coordRcved:{},
            flagCoordShow:false,
        }
    },

    methods: {
        chamada() {
            this.flag_loading_B = true // iniciar loading...

            if (this.nome_B.length >= 2) {

                if (this.$refs.form.validate()) {

                    //console.log('input ok')
                    this.$emit('fromInput',[false,this.nome_B,this.coordRcved]) // desable dialog.

                    this.flag_loading_B = false // desabilitar loading
                    this.flagError_B = false // reset flag error

                    this.nome_B = '' // reset var input
                    this.flagBoolCoordOpen = false // reset flag that open the map.
                }

            } else {
                
                this.flag_loading_B = false // desabilitar loading
                this.flagError_B = true
                return
            }
        },

        coord() {
            //console.log('coord open')
            this.flagBoolCoordOpen = true
        },

        coordRcvedFromClick(liCoord) {
            this.coordRcved = liCoord
            //console.log('liCoord: ',this.coordRcved)
            this.flagCoordShow = true
        }
        
    },

    created() {
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.
    }
}
</script>