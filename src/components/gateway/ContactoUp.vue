<style scoped>
    @import url("../../styles/lora/contactoUp.scss");
</style>

<template>
    <div class="box_contactoUp">
        
        <span class="textosPersonA mt-6"><!-- mdi-bell-ring -->
            <!--<v-icon class="mr-2" large :style="{'color':'rgba(7,46,79,0.9)'}">mdi-notebook</v-icon>-->
            Quer ter mais controlo sobre o seu negócio?
        </span>

        <span class="textosPersonB">Agende uma reunião conosco</span>

        <!-- INPUT: descrição do problema do cliente -->
        <v-text-field
            label="Breve descrição do assunto"
            v-model="desc_item"
        ></v-text-field>

        <v-text-field
            label="E-mail"
            v-model="email_dest"
        ></v-text-field>

        <v-text-field
            label="Nome"
            v-model="nome_dest"
        ></v-text-field>

        <!--<vue-recaptcha sitekey="Your key here"></vue-recaptcha>-->

        <v-icon class="btn_sender" v-if="flagEnviando" :style="{'transform':rotLod}">mdi-bike-fast</v-icon>

        <div v-if="!flagEnviando && !flagConfirmMsg"
        class="btn_sender" @click="envioPerson()" :style="{'margin-bottom':varBottomA}">
            Enviar
            <!-- mdi-arrow-top-right-bold-box -->
            <v-icon :style="{'color':'rgba(7,46,79,0.9)'}">mdi-email-fast-outline</v-icon>
        </div>

        <span v-if="flagMsgEnvioEmailPerson"
        class="" 
        :style="{'margin-bottom':varBottomB,'font-size':'0.8rem','color':corMsgEnvioEmail}"
        >
            {{ msgEnvioEmailPerson }}</span>

    </div>
</template>

<script>
//import VueRecaptcha from 'vue-recaptcha'
import axios from 'axios'

export default {

    //components: { VueRecaptcha },

    data() {
        return {
            desc_item:'',
            email_dest:'',
            nome_dest:'',

            // rotação icon loading.
            flagEnviando:false,
            interval: {},
            value:0,
            rotLod:'rotate(0deg)',

            varBottomA:'40px',
            varBottomB:'40px',
            corMsgEnvioEmail:'',
            flagMsgEnvioEmailPerson:false,
            msgEnvioEmailPerson:'',

            flagConfirmMsg:false,
        }
    },
    methods: {
        envioPerson() {

            //console.log('desc_item: ',this.desc_item)
            //console.log('email_dest: ',this.email_dest)

            if (this.desc_item.length > 10 && this.email_dest.length > 13) {

                this.msgEnvioEmailPerson = '' // init func => RESET a frase atual.

                this.flagEnviando = true // habilitar icon "loading..."

                this.interval = setInterval(() => {

                    this.value += 45
                    this.rotLod = 'rotate(' + this.value + 'deg)'

                }, 500)

                //var el = {'email':this.email_dest,'desc':this.desc_item}

                const self = this

                var params = {'ref':'a','cliente':self.nome_dest,'email':self.email_dest,'desc':self.desc_item}

                axios.post(self.$store.state.pathAxiosLojaSuporteA, params).then(function (res) {

                    console.log(res.data.result)

                    // RESET.
                    //this.varBottomA = '40px' // reabilitar margem inferior.
                    self.varBottomA = '2px' // retirar margem inferior.
                    self.desc_item = ''
                    self.email_dest = ''

                    // MSG FINAL.
                    if (res.data.result == 'email-enviado') {

                        self.msgEnvioEmailPerson = 'Enviado. Aguarde o retorno no seu email em até 12h.'
                        self.corMsgEnvioEmail = 'rgb(89, 150, 10)' // verde.

                        self.flagConfirmMsg = true // desabilitar btn de envio.

                    } else {

                        self.msgMsgEnvioEmailPerson = 'Não foi possível enviar seu pedido. Tente novamente mais tarde.'
                        self.corMsgEnvioEmail = 'rgb(175, 28, 9)' // vermelho.
                    }

                    self.flagMsgEnvioEmailPerson = true
                    self.flagEnviando = false // desabilitar icon de rotação.

                    clearInterval(self.interval) // desabilitar rotação. "loading"
                })

            } else { // Não foi preenchido minimamente correto.

                this.varBottomA = '2px' // retirar margem inferior.

                this.msgEnvioEmailPerson = 'Preenchimento incorreto. Tente novamente.'
                this.corMsgEnvioEmail = 'rgb(175, 28, 9)' // vermelho.
                this.flagMsgEnvioEmailPerson = true // habilitar frase de error de preenchimento.

                this.desc_item = ''
                this.email_dest = ''
            }
        }
    },

    created () {
        window.scrollTo(0,0)
    }
}
</script>