<style scoped>
    @import url("../../styles/mainV2/menuSupMainV2.scss");
</style>

<template>
    
    <div class="box_menuSupMain"
    :style="{
            backgroundImage:'url(' + require('../../assets/fundo_t.png') + ')',
            backgroundSize: 'cover', // contain
            backgroundPosition: 'center' // top center
            }">

        <div class="barra_util">

            <div class="logo_menuSupMain" @click="callMainPage()">
                <!-- LOGO MENU SUP MAIN -->
                <div class="el_img">
                    <!--<v-img :src="require('../../assets/0t.png')"/>-->
                    <v-img cover :src="imageLogo" />
                </div>
            </div>

            <!-- MENU LARGE-->
            <div class="menuLarge hidden-sm-and-down">

                <div 
                v-for="(el,i) in liMenuDrop" :key="i" 
                @click="callPage(el.rota)"
                class="btnMenuLarge"
                @mouseover="changeColorItemMenu(i,'on')"
                @mouseleave="changeColorItemMenu(i,'off')"
                :style="{'background':el.background}"
                >
                    <span class="" :style="{'color':el.cor}">{{ el.name }}</span>
                </div>

                <!--<div class="btnMenuLarge">Quem somos</div>
                <div class="btnMenuLarge">IoT e automação</div>
                <div class="btnMenuLarge">Área do usuário</div>-->
            </div>

            <!-- MENU SMALL hidden-md-and-up ,'transform':'rotate(90deg)' -->
            <div @click="openMenuSupMain()" class="icon_menuSupMain hidden-md-and-up mr-1">
                <v-icon large :style="{'color':'rgba(247,215,46,1)'}"
                >{{ iconMenu }}</v-icon>
            </div>

            <div class="btnUser hidden-sm-and-down">
                <div class="btnMenuLarge" @click="callPage(liUser[0].rota)"
                @mouseover="changeColorUser(0,'on')"
                @mouseleave="changeColorUser(0,'off')"
                :style="{'background':liUser[0].background}"
                >
                    <span class="" :style="{'color':liUser[0].cor}">{{ liUser[0].name }}</span>
                </div>
            </div>

        </div>
            
    </div>

</template>

<script setup>
import imageLogo from '../../assets/0t.png'
</script>

<script>
export default {

    props:['iconMenu'],

    data() {
        return {
            flagIconMenuOpened:true,
            //iconMenu:'mdi-menu-close', // 'mdi-menu-open'
            //iconMenu:'mdi-menu', // via props from body -> app -> menu sup

            liMenuDrop:[
                {'rota':'/quemSomos','name':'Quem somos','cor':'','background':''},
                {'rota':'/automation','name':'Serviços','cor':'','background':''},
                {'rota':'/fale','name':'Fale conosco','cor':'','background':''},
            ],
            liUser:[{'rota':'/dashmain','name':'Área do usuário','cor':'','background':''}],
        }
    },

    methods: {
        //
        changeColorUser(i,strFlag) {
            //
            if (strFlag == 'on') {

                this.liUser[i].cor = 'rgb(31,122,177)'
                this.liUser[i].background = 'rgba(31,122,177,0.3)'

            } else {

                this.liUser[i].cor = ''
                this.liUser[i].background = ''
            }
        },
        changeColorItemMenu(i,strFlag) {
            //
            if (strFlag == 'on') {

                this.liMenuDrop[i].cor = 'rgb(31,122,177)'
                this.liMenuDrop[i].background = 'rgba(31,122,177,0.3)'

            } else {

                this.liMenuDrop[i].cor = ''
                this.liMenuDrop[i].background = ''
            }
        },
        openMenuSupMain() {
            this.flagIconMenuOpened = !this.flagIconMenuOpened

            if (this.flagIconMenuOpened == true) { // fechar menu drop.
                
                //this.iconMenu = 'mdi-menu' 
                this.$emit('callByMenu','close') // return emit String.

            } else { // abrir menu drop.
                
                //this.iconMenu = 'mdi-menu-up-outline'
                this.$emit('callByMenu','open') // return emit String.
            }
        },
        callMainPage() { 
            //console.log('this.$route.path: ',this.$route.path)
            if(this.$route.path != '/') {
                this.$router.push('/')
            }
         },
         callPage(rota) {
            if(rota != '/') {
                
                this.$router.push(rota)

                //this.$emit('callByMenuBody','close') // return emit String. (trocar icon menu)
                //this.$store.state.flagMenuSup = false
            }
        },
    },

    created() {
        //this.$store.commit('srcIP') // without param. Initial main GET Req.
    }
}

</script>