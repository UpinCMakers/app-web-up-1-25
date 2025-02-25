<style scoped>
    @import url("../../styles/contadorAguaPage/menuLateralDash.scss");
</style>

<template>
    <div class="box_menuLateralDash" :style="{'width':widthDinam}">

        <div class="linhaIconHide">
            <v-icon large class="mr-2"
            @mouseover="corIconMain = 'rgb(247,215,46)'"
            @mouseleave="corIconMain = ''"
            :style="{'color':corIconMain}"
            @click="hideMenu()"
            >
                {{ nomeIconMain }}
            </v-icon>
        </div>

        <div class="tit">
            <v-icon large class="" :style="{'color':'rgb(31,122,177)'}">mdi-water-pump</v-icon>
            <span class="" v-if="!flagMenuHide">Medidores de Água</span>
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
                    'nome':'Malhas',
                    'rota':'malhas',
                    'icon':'mdi-transit-connection-variant',
                    'background':''
                },
                {
                    'nome':'Grupos',
                    'rota':'classes',
                    'icon':'mdi-home-group', // 'mdi-water-plus'
                    'background':''
                },
                {
                    'nome':'Medidores',
                    'rota':'medidores',
                    'icon':'mdi-counter',
                    'background':''
                },
                {
                    'nome':'Eventos',
                    'rota':'eventos',
                    'icon':'mdi-alert-circle-outline',
                    'background':''
                },
                {
                    'nome':'Voltar Área Usuário',
                    'rota':'back',
                    'icon':'mdi-account',
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

            // fechar menu ao selecionar uma opção do menu. Chamar função hideMenu() após escolher a flaghide
            // se o menu estiver aberto então fechar o menu.
            if (this.flagMenuHide == false) { this.hideMenu() }
            
            // switch para a chamada aqui ou no componente pai? 04/09/24
            //var strFlag = this.liBtns[index].nome
            var strFlag = this.liBtns[index].rota // 13/01/2025
            this.$emit('chooseItemFromMenu',strFlag)
        },

        changeBtn(index,strFlag) { 
            if (strFlag == 'on') { this.liBtns[index].background = 'rgb(247,215,46)' }
            else { this.liBtns[index].background = '' }
        },

        hideMenu() {
            // Se o menu estiver aberto então fechar e trocar status flag.
            if (this.flagMenuHide == false) {
                //
                this.flagMenuHide = true
                this.nomeIconMain = 'mdi-menu-close'
                this.widthDinam = '80px'
                this.jcDinam = 'center'

                this.$emit('watchHideMenu',true) // informar ao component pai que o menu fechou.

            } else {

                this.flagMenuHide = false
                this.nomeIconMain = 'mdi-menu-open'
                this.jcDinam = 'space-between'

                if (this.flagSmallScreen == true) { this.widthDinam = '100%' } else { this.widthDinam = '25%' }

                this.$emit('watchHideMenu',false) // informar ao component pai que o menu abriu.
            }
        },
    },

    created() {
        //window.scrollTo(0,0)

        this.largura = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        if (this.largura < 500) { 
            this.flagSmallScreen = true
            this.widthDinam = '100%'
            this.$emit('watchExib',false)
        }

        //console.log('largura page: ',largura)
    }
}
</script>