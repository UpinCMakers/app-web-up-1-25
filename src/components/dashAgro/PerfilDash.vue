<style scoped>
    @import url("../../styles/dashagro/perfilDash.scss");
</style>

<template>
    <div class="box_perfilDash">

        <div class="lineExibDash">

            <div class="cardPerfilExib">

                <!-- Título -->
                <div class="titPerfil">
                    <v-icon x-large class="mr-1">mdi-account-cowboy-hat-outline</v-icon>
                    <span>Início UPinC.Agro</span>
                </div>

                <!-- corpo abaixo do título -->
                <div class="box_a_Perfil">

                    <div class="tit_box_dialog mb-1">
                        <v-icon class="ml-1">mdi-monitor-account</v-icon>
                        <span class="ml-1">Informações gerais</span>
                        <div class="ml-2 notific_tit_box_dialog">
                            <v-icon small>mdi-history</v-icon>
                            <v-icon small>mdi-bug</v-icon>
                            <span class="ml-1 mr-1">{{this.liChat.length}}</span>
                        </div>
                    </div>

                    <div class="el_box_a">

                        <div class="box_dialog_icon mt-1" @click="scrollUpListExib()" v-if="flagScrollUp"
                        @mouseover="el1cor = 'rgb(247,215,46)'"
                        @mouseleave="el1cor = ''"
                        >
                            <v-icon :style="{'color':el1cor}" large>mdi-arrow-up-drop-circle-outline</v-icon>
                        </div>

                        <!-- box diálogo -->
                        <div v-for="(el,i) in liExib" :key="i"
                        class="box_dialog animate__animated animate__headShake">
                            <!-- Elemento linha diálogo mdi-bee -->
                            <v-icon small class="mr-1 ml-2 el_icon">mdi-bug</v-icon>
                            <div class="el_dialog">
                                <span class="ml-4 mt-2 mb-2">{{ el }}</span>
                            </div>
                        </div>

                        <div class="box_dialog_icon mt-2" @click="scrollDownListExib()" v-if="flagScrollDown"
                        @mouseover="el2cor = 'rgb(247,215,46)'"
                        @mouseleave="el2cor = ''"
                        >
                            <v-icon :style="{'color':el2cor}" large>mdi-arrow-down-drop-circle-outline</v-icon>
                        </div>

                    </div>
                </div>

            </div>

            <v-img class="cardExib_img"
            :src="imgPerfilDash"
            />
            
        </div>

        <div class="lineExibDash">

            <div class="cardExib">
                <!-- title -->
                <div class="tit_card">
                    <!--<v-icon small class="mr-1 ml-2 el_icon">mdi-account-cowboy-hat-outline</v-icon>-->
                    <span class="ml-2">Serviços contratados</span>
                </div>
                <!-- body -->
                <div class="box_painel_card">
                    <div v-for="(el,i) in $store.state.perfil_agro_servicos" :key="i"
                    class="el_painel_card mt-2 ml-2 mr-2 animate__animated animate__flash">

                        <div class="item_painel">
                            <v-icon small class="mr-1 ml-2 el_icon">mdi-sprout</v-icon>
                            <span>{{ el.nome }}</span>
                        </div>

                        <div class="item_painel">
                            <v-icon small class="mr-1 ml-2 el_icon">mdi-clock</v-icon>
                            <span>Início: {{ el.init }}</span>
                        </div>

                    </div>
                </div>
            </div>

            <div class="cardExib">
                <!-- title -->
                <div class="tit_card">
                    <!--<v-icon small class="mr-1 ml-2 el_icon">mdi-account-cowboy-hat-outline</v-icon>-->
                    <span class="">Atualizar minhas informações</span>
                    <span class="" :style="{'font-size':'0.6rem','color':'red'}">Disponível em breve</span>
                </div>
                <!-- body -->
                <div class="box_painel_card">

                    <div class="el_painel_card mt-2 ml-2 mr-2 animate__animated animate__flash">
                        <div class="item_painel">
                            <v-icon small class="mr-1 ml-1 el_icon">mdi-account</v-icon>
                            <span>Usuário</span>
                        </div>
                        <div class="item_painel mr-2">
                            <span>{{ $store.state.perfil_agro_nome }}</span>
                        </div>
                    </div>

                    <div class="el_painel_card mt-2 ml-2 mr-2 animate__animated animate__flash">
                        <div class="item_painel">
                            <v-icon small class="mr-1 ml-1 el_icon">mdi-account</v-icon>
                            <span>e-mail não cadastrado</span>
                        </div>
                        <div class="item_painel mr-2">
                            <span>-</span>
                        </div>
                    </div>

                    <div class="el_painel_card mt-2 ml-2 mr-2 animate__animated animate__flash">
                        <div class="item_painel">
                            <v-icon small class="mr-1 ml-1 el_icon">mdi-account</v-icon>
                            <span>Palavra passe</span>
                        </div>
                        <div class="item_painel mr-2">
                            <span>******</span>
                        </div>
                    </div>

                </div>
            </div>

            <div class="cardExib">
                <!-- title -->
                <div class="tit_card">
                    <div class="">
                        <v-icon small class="mr-1">mdi-headphones</v-icon>
                        <span class="">Suporte</span>
                    </div>
                    <span class="" :style="{'font-size':'0.6rem','color':'red'}">Disponível em breve</span>
                </div>
                <!-- body -->
                <div class="box_painel_card">

                    <!--<div class="el_painel_card mt-2 ml-2 mr-2">
                        <div class="item_painel">
                            <span>Digite aqui |</span>
                            <v-icon small class="mr-1 ml-1 el_icon">mdi-account</v-icon>
                        </div>
                    </div>-->

                </div>
            </div>

            <div class="cardExib">
                <!-- title -->
                <div class="tit_card">
                    <!--<v-icon small class="mr-1 ml-2 el_icon">mdi-account-cowboy-hat-outline</v-icon>-->
                    <span class="ml-2">Outras notificações</span>
                </div>
                <!-- body -->
                <div class="box_painel_card">
                    <span class="ml-2 mt-2" :style="{'font-size':'0.6rem'}">Você não tem nenhuma notificação</span>
                </div>
            </div>
            
        </div>

    </div>
</template>

<script>
//import PerfilDash from './PerfilDash'

export default {
    //components: { PerfilDash },

    data() {
        return {
            imgPerfilDash:require('../../assets/0qe0.jpeg'),

            /*liDialog:[
                'Olá, usuário agricultor.',
                'O meio ambiente agradece o seu ingresso na transição verde e digital.'
            ]*/

            // BOX DIALOG.
            //
            el1cor:'',
            el2cor:'',
            //
            flagScrollUp:false,
            flagScrollDown:false,
            //
            liChat:[],
            liExib:[],
            index_marcLiChat:1, // init qualquer
        }
    },

    methods:{
        scrollDownListExib() {

            this.liExib[0] = this.liChat[this.index_marcLiChat]
            this.liExib[1] = this.liChat[this.index_marcLiChat+1]

            this.flagScrollUp = true // habilitado o scroll up.

            if ((this.liChat.length-1) == (this.index_marcLiChat+1)) { this.flagScrollDown = false } // limiar.

            this.index_marcLiChat = this.index_marcLiChat+1
        },
        scrollUpListExib() {

            this.liExib[0] = this.liChat[this.index_marcLiChat-2]
            this.liExib[1] = this.liChat[this.index_marcLiChat-1]

            this.flagScrollDown = true // habilitado o scroll down.

            if (this.index_marcLiChat == 2) { this.flagScrollUp = false } // limiar.

            this.index_marcLiChat = this.index_marcLiChat-1
        },
    },

    created() {
        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.

        this.liChat = this.$store.state.perfil_agro_chat_log
        //console.log('this.liChat: ',this.liChat)

        // -- Exibir lista invertida. Modelo de chat padrão.
        var tam = this.liChat.length
        let c = 0
        //while (c <= tam) { self.liExib.push(self.liChat[tam-c]); c++; }
        while (c <= tam) { 
            //self.liExib.push(self.liChat[c-1]) // sem inverter.
            //this.liExib.push(this.liChat[tam-c]) // inputando invertido para ter o último item.
            this.liExib.push(this.liChat[c]) // inputando invertido para ter o último item.
            this.index_marcLiChat = c
            if (c >= 1) { break }
            c++
        }
        // -- exibir o último item por primeiro, na parte de baixo.
        //this.liExib = this.liExib.slice(0).reverse()
        if (tam > 2) { 
            this.flagScrollDown = true // habilitado o scroll para exibir msgs anteriores.
        }
    }
}
</script>