<style scoped>
    @import url("../../../styles/contadorAguaPage/v3/dialogA.scss");
</style>

<template>
    <div class="box_dialogA">

        <div class="session_form mb-2 mt-2" v-if="flag_loading_loginAgro">

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

        <div class="tit" v-if="!flag_loading_loginAgro">{{ t }}</div>

        <v-form v-if="!flag_loading_loginAgro" class="session_form"
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent
        >
            <v-text-field
            color="orange"
            v-model="nomeMalha"
            :rules="nameRules"
            label="Novo nome"
            required
            style="width: 200px;"
            @keyup.enter.prevent="chamada()"
            ></v-text-field>

        </v-form>

        <div v-if="!flag_loading_loginAgro" class="btn_login mb-2">
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

        <span v-if="flagErrorLogin && !flag_loading_loginAgro"
        :style="{'margin-top':'10px','color':'red','font-size':'0.8rem'}">
            {{ msgErrorLogin }}
        </span>

    </div>
</template>

<script>
//import axios from 'axios'

export default {

    props:['t','icon','flagStrTipoDialog'],

    data() {
        return {
            nomeMalha:'',
            flagErrorLogin:false,
            msgErrorLogin:'Nome inválido',

            valid: false, // btn 'entrar' inicia desabilitado.
            nameRules: [
                v => !!v || 'Preenchimento obrigatório',
            ],

            flag_loading_loginAgro:false,
        }
    },

    methods: {
        chamada() {

            this.flag_loading_loginAgro = true // iniciar loading...

            if (this.nomeMalha.length >= 2) {

                if (this.$refs.form.validate()) {

                    console.log('input ok')
                    this.$emit('fromInput',[false,this.nomeMalha,this.flagStrTipoDialog]) // desable dialog.

                    this.flag_loading_loginAgro = false // desabilitar loading
                    this.flagErrorLogin = false // reset flag error

                    this.nomeMalha = '' // reset var input
                }

            } else {
                
                this.flag_loading_loginAgro = false // desabilitar loading
                this.flagErrorLogin = true
                return
            }
        },
    },

    created() {
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.
    }
}
</script>