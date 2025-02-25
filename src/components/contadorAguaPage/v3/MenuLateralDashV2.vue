<style scoped>
    @import url("../../../styles/contadorAguaPage/v3/menuLateralDash.scss");
</style>

<template>
    <div class="box_menuLateralDash" :style="{'width':widthDinam}">

        <div class="linhaIconHide">
            <v-icon  class="mr-2"
            @mouseover="corIconMain = 'rgb(247,215,46)'"
            @mouseleave="corIconMain = ''"
            :style="{'color':corIconMain}"
            @click="hideMenu()"
            >
                {{ nomeIconMain }}
            </v-icon>
        </div>

        <div class="tit">
            <v-icon size="48" class="mt-2" :style="{'color':'rgb(31,122,177)'}">mdi-water-pump</v-icon>
            <span class="" v-if="!flagMenuHide">Medidores de Água</span>
            <span class="mb-2" :style="{'font-size':'0.7rem'}">Versão 1.3.1</span>
        </div>
        
        <div class="painelBtns">
            <div class="lineBtn" v-for="(b,i) in liBtns" :key="i" 
            :style="{'background':b.background,'justify-content':jcDinam}"
            @mouseover="changeBtn(i,'on')"
            @mouseleave="changeBtn(i,'off')"
            @click="callBtn(i)"
            >
                <span v-if="!flagMenuHide">{{ b.nome }}</span>
                <v-icon :style="{'color':'rgb(31,122,177)'}">{{ b.icon }}</v-icon>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            //
            liBtns:[
                {
                    'nome':'Geral',
                    'rota':'',
                    'icon':'mdi-web',
                    'background':''
                },
                {
                    'nome':'Editar',
                    'rota':'malhas',
                    'icon':'mdi-vector-square-edit',
                    'background':''
                },
                {
                    'nome':'Pesquisar',
                    'rota':'pesquisaca',
                    'icon':'mdi-magnify', // 'mdi-water-plus'
                    'background':''
                },
                {
                    'nome':'Voltar Área Usuário',
                    'rota':'back',
                    'icon':'mdi-home-account',
                    'background':''
                }
            ],
            corIconMain:'',
            nomeIconMain:'mdi-menu-open',

            flagMenuHide:false, // menu init opened

            widthDinam:'25%',
            jcDinam:'space-between', // justify-content: space-between

            flagSmallScreen:false, // init large screen

            largura:0,
        }
    },

    methods:{
        // -- SELECIONAR ITEM DO MENU.
        callBtn(index) { 
            //console.log('btn chamado para emit: ', this.liBtns[index].nome) 

            if (this.liBtns[index].rota == 'back') { this.$router.push('/dashmain'); return; }

            // fechar menu ao selecionar uma opção do menu. Chamar função hideMenu() após escolher a flaghide
            // se o menu estiver aberto então fechar o menu.
            if (this.flagMenuHide == false) { 
                //this.callChangeTamExib(!this.flagMenuHide)
                this.hideMenu(this.flagMenuHide) 
            }
            
            // switch para a chamada aqui ou no componente pai? 04/09/24
            //var strFlag = this.liBtns[index].nome
            
            //var strFlag = this.liBtns[index].rota // 13/01/2025
            //this.$emit('chooseItemFromMenu',strFlag)

            // 20/01/2025 usando router.js
            console.log(`/ca/${this.liBtns[index].rota}`)
            this.$router.push(`/ca/${this.liBtns[index].rota}`);
        },

        changeBtn(index,strFlag) { 
            if (strFlag == 'on') { this.liBtns[index].background = 'rgb(247,215,46)' }
            else { this.liBtns[index].background = '' }
        },

        callChangeTamExib(flagHide) { 
            //var flagHide = li[0]
            //var tamPage = li[1]
            if (flagHide == true) { // menu fechou.

                //if (this.$store.state.LarguraPageCA < 500) { this.flagExib = true }

                this.$store.state.widthDinamCA = '100%' // preencher toda a página, pois o menu lateral é 80px.

            } else { // menu abriu.

                // versão small deve ser exibida quando o menu fechar.
                //if (this.$store.state.LarguraPageCA < 500) { this.flagExib = false }

                this.$store.state.widthDinamCA = '75%' // reset (menu re-aberto).
            }
        },

        hideMenu() {
            // Se o menu estiver aberto então fechar e trocar status flag.
            var hiding = this.flagMenuHide
            if (this.flagMenuHide == false) {
                //
                this.flagMenuHide = true // fechado/escondendo menu lateral
                this.nomeIconMain = 'mdi-menu-close'
                this.widthDinam = '80px'
                this.jcDinam = 'center'
                this.$store.state.flagExib = true // esconder/fechar menu e habilitar pag nav

                if (this.flagSmallScreen == false) { // large precisa expandir o pag nav

                    this.$store.state.widthDinamCA = '100%'
                }

                //this.$emit('watchHideMenu',true) // informar ao component pai que o menu fechou.

            } else {

                this.flagMenuHide = false // abrindo menu lateral.
                this.nomeIconMain = 'mdi-menu-open'
                this.jcDinam = 'space-between'

                if (this.flagSmallScreen == true) { // small
                    
                    this.widthDinam = '100%'
                    this.$store.state.flagExib = false // desabilitar pag nav na versao small do menu

                } else { // large
                    
                    this.widthDinam = '25%'
                    //this.$store.state.widthDinamCA = '75%' // reset (menu re-aberto).
                    if (hiding  == false) {

                        this.$store.state.widthDinamCA = '100%' // fechando menu e expandindo pag nav.
                    } else {
                        this.$store.state.widthDinamCA = '75%' // reset (menu re-aberto).
                    }
                }

                //this.$emit('watchHideMenu',false) // informar ao component pai que o menu abriu.
            }
        },
    },

    created() {
        //window.scrollTo(0,0)

        this.larguraPage = window.innerWidth // controle width menu lateral localmente.
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        // state init large => comparar tam para reduzir para small se pag<500px
        if (this.larguraPage < 500) { 
            this.flagSmallScreen = true
            this.widthDinam = '100%' // largura do menu ao iniciar component menu lateral
            this.$store.state.flagExib = false // menu init cobrindo toda a pag enquanto pag nav off.
            //this.$emit('watchExib',false) // tudo component local a partir da mudança de navegação.
        } 

        //console.log('largura page: ',largura)
    }
}
</script>