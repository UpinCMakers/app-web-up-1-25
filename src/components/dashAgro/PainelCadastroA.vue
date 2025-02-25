<style scoped>
    @import url("../../styles/dashagro/painelCadastroA.scss");
</style>

<template>
    <div class="box_painelCadastroA">

        <!--<v-form class="session_form"
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

        <div class="btn_login">
            <v-btn
            small
            block
            :disabled="!valid"
            color="success"
            class="mr-4 mt-1"
            @click="chamarClientPage"
            >
                cadastrar
            </v-btn>
        </div>-->

        <span 
        @mouseover="hoverCadastro = 'rgb(247,215,46)'"
        @mouseleave="hoverCadastro = 'rgb(31,122,177)'"
        class="cadastroNameClient" 
        @click="chamarLogin()"
        :style="{'color':hoverCadastro}"
        >
            Voltar ao login</span>

        <span v-if="flagErrorLogin"
        :style="{'margin-top':'10px','color':'red','font-size':'0.8rem'}">
            {{ msgErrorLogin }}
        </span>

    </div>
</template>

<script>
export default {
    data() {
        return {
            nameClient:'',
            passClient:'',
            hoverCadastro:'rgb(31,122,177)',
            flagErrorLogin:false,
            msgErrorLogin:'Usúario ou senha incorretos',

            valid: false,
            nameRules: [
                v => !!v || 'Preenchimento obrigatório',
            ],
        }
    },

    methods: {
        chamarClientPage() {
            
            if (this.$refs.form.validate()) {

                if (this.nameClient.length >= 5 && this.passClient.length >= 5) {

                    // request

                    if (this.nameClient == 'userupinc' && this.passClient == 'senhatesteç') {

                        this.$store.state.flagLogadoDashAgro = true
                        console.log('teste login')
                        
                    } else {
                        this.flagErrorLogin = true
                        return
                    }
                } else {
                    this.flagErrorLogin = true
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

                this.flagErrorLogin = false
            }
        },
        chamarLogin() {
            this.$store.state.flagCadastroUserAgro = false
        },
    },

    created() {
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.
    }
}
</script>