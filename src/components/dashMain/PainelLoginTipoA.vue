<style scoped>
    @import url("../../styles/dashMain/painelLoginTipoA.scss");
</style>

<template>
    <div class="box_painelLoginTipoA">

        <div class="session_form mb-2 mt-2" v-if="flag_loading_loginAgro">

            <span class="mb-2" :style="{'font-size':'0.7rem'}">Buscando suas informações</span>

            <v-progress-circular
            :size="70"
            :width="7"
            color="green"
            indeterminate
            :style="{'display':'flex','align-self':'center'}"
            ></v-progress-circular>

        </div>

        <div class="tit mt-4" v-if="!flag_loading_loginAgro" :style="{'font-weight':'bold'}">Login</div>

        <v-form v-if="!flag_loading_loginAgro" class="session_form"
        ref="form"
        v-model="valid"
        lazy-validation
        >
            <v-text-field
            color="orange"
            v-model="nameClient"
            :rules="nameRules"
            label="Nome de usuário"
            required
            ></v-text-field>

            <v-text-field
            type="password"
            color="orange"
            v-model="passClient"
            label="Palavra chave"
            required
            ></v-text-field>
        </v-form>

        <div v-if="!flag_loading_loginAgro" class="btn_login">
            <v-btn
            small
            block
            :disabled="!valid"
            color="success"
            class="mr-4 mt-1"
            @click="chamarClientPage"
            >
                entrar
            </v-btn>
        </div>

        <span v-if="!flag_loading_loginAgro"
        @mouseover="hoverCadastro = 'rgb(247,215,46)'"
        @mouseleave="hoverCadastro = 'rgb(31,122,177)'"
        class="cadastroNameClient" 
        @click="chamarCadastro()"
        :style="{'color':hoverCadastro}"
        >
            Novo Cadastro</span>

        <span v-if="flagErrorLogin && !flag_loading_loginAgro"
        :style="{'margin-top':'10px','color':'red','font-size':'0.8rem'}">
            {{ msgErrorLogin }}
        </span>

    </div>
</template>

<script>
//import axios from 'axios'

export default {
    data() {
        return {
            nameClient:'',
            passClient:'',
            hoverCadastro:'rgb(31,122,177)',
            flagErrorLogin:false,
            msgErrorLogin:'Usúario ou senha incorretos',

            valid: false, // btn 'entrar' inicia desabilitado.
            nameRules: [
                v => !!v || 'Preenchimento obrigatório',
            ],

            flag_loading_loginAgro:false,
        }
    },

    methods: {
        chamarClientPage() {

            this.flag_loading_loginAgro = true // iniciar loading...

            if (this.nameClient.length >= 3 && this.passClient.length >= 5) {

                var self = this

                if (this.$refs.form.validate()) {

                    //var payload = {'name':self.nameClient, 'pass':self.passClient }

                    /*axios.post(self.$store.state.pathAxiosLoginAgro, payload).then(function (res) {

                        //console.log(res.data.result)

                        if (res.data.result.ref == 'auth') {

                            self.$store.state.flagLogadoDashAgro = true
                            //console.log('[ok]')
                            self.flag_loading_loginAgro = false // desabilitar loading
                            
                            // -- STORAGE
                            var update_credenAgro = {'flagLogadoDashAgro':true}
                            localStorage.setItem('credenAgro', JSON.stringify(update_credenAgro))
                            return

                        } else {

                            self.flag_loading_loginAgro = false // desabilitar loading
                            self.flagErrorLogin = true
                            return
                        }
                    })*/

                    var objUser = {}
                    var update_creden = {}

                    // tmp login 10/09/2024
                    if (self.nameClient == 'cmf' && self.passClient == 'agrotech10') {

                        // teste de simulação: objeto usuário
                        objUser = {
                            'nome':self.nameClient,
                            'email':'geral@upinc.pt',
                            'liServs':[
                                {
                                    'serv':'Projecto ECO-NPK',
                                    'img':'url(' + require('../../assets/1qe1.jpeg') + ')',
                                    'content':'',
                                    'rota':'/smartfarm'
                                },
                            ],
                        }
                        self.$emit('openPainel',objUser) // emitir evento do neto ao pai.

                        // -- STORAGE
                        update_creden = {'flagLogadoDash':true}
                        localStorage.setItem('creden', JSON.stringify(update_creden))
                        localStorage.setItem('contentUser', JSON.stringify(objUser))

                        // -- habilitar entrada atual.
                        this.$store.state.contentUser = objUser
                        this.$store.state.flagLogadoDash = true
                    }

                    // tmp login 04/09/2024
                    if (self.nameClient == 'upinc' && self.passClient == '-uadm') {

                        // teste de simulação: objeto usuário
                        objUser = {
                            'nome':self.nameClient,
                            'email':'geral@upinc.pt',
                            'liServs':[
                                {
                                    'serv':'Gateway LoRaWAN',
                                    'img':'url(' + require('../../assets/gopr1.jpg') + ')',
                                    'content':'',
                                    'rota':'/lora'
                                },
                                {
                                    'serv':'Contador Água',
                                    'img':'url(' + require('../../assets/countAguat0.png') + ')',
                                    'content':'',
                                    'rota':'/ca'
                                },
                                {
                                    'serv':'Monitoramento de hardware',
                                    'img':'url(' + require('../../assets/monit0.png') + ')',
                                    'content':'',
                                    'rota':'/'
                                },
                                {
                                    'serv':'Controle remoto IoT',
                                    'img':'url(' + require('../../assets/controlt0.png') + ')',
                                    'content':'',
                                    'rota':'/exib'
                                },
                                {
                                    'serv':'Projecto ECO-NPK',
                                    'img':'url(' + require('../../assets/1qe1.jpeg') + ')',
                                    'content':'',
                                    'rota':'/smartfarm'
                                },
                                {
                                    'serv':'Aquaponia',
                                    'img':'url(' + require('../../assets/aq1.png') + ')',
                                    'content':'',
                                    'rota':'/aquaponia'
                                },
                            ],
                        }

                        self.$emit('openPainel',objUser) // emitir evento do neto ao pai.
                        //self.flag_loading_loginAgro = false // desabilitar loading
                        //console.log('fim login ok')

                        update_creden = {'flagLogadoDash':true}
                        localStorage.setItem('creden', JSON.stringify(update_creden))
                        localStorage.setItem('contentUser', JSON.stringify(objUser))

                        // -- habilitar entrada atual.
                        this.$store.state.contentUser = objUser
                        this.$store.state.flagLogadoDash = true

                    } else {

                        self.flag_loading_loginAgro = false // desabilitar loading
                        self.flagErrorLogin = true
                        return
                    }

                } else {

                    self.flag_loading_loginAgro = false // desabilitar loading
                    self.flagErrorLogin = true
                    return
                }

                /*var el = {
                    'status': 'entrada', // 'entrada' 'ativo' 'saída' 'encerrado'
                    'cond':'pendente', // pendente ou verificado.
                    'fornecedor': this.nomeFornecedor,
                    'entrada': date.day, //'12/11/2022',
                    'hora': date.hr, //'12:16', // fuso-horário do servidor?
                    'produtos': li_final
                }
                this.$store.commit('inputLOTE', el)
                //this.flagErroPreench = false // não necessário pois volta a main page. ~reset~
                this.$store.state.flagProgressLOTE = true
                this.$router.push('/') // reset
                */

                self.flagErrorLogin = false // reset

            } else {
                
                this.flag_loading_loginAgro = false // desabilitar loading
                this.flagErrorLogin = true
                return
            }
        },
        chamarCadastro() {
            this.$store.state.flagCadastroUserAgro = true
        },
    },

    created() {
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.
    }
}
</script>