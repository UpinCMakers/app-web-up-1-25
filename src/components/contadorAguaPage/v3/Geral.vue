<style scoped>
    @import url("../../../styles/contadorAguaPage/v3/geral.scss");
</style>

<template>
    <div class="box_geral">

        <div class="titGeral">
            <v-icon :style="{'color':'rgb(31,122,177)'}">mdi-web</v-icon>
            <span class="ml-2">Informações gerais</span>
        </div>

        <div class="painelGeral">
            <div class="cardGeral" v-for="(el,i) in liInfo" :key="i" :style="{'background':el.b}"
            @mouseover="changeBtn(i,'on')"
            @mouseleave="changeBtn(i,'off')"
            @click="callBtn(i)"
            >
                <div class="tCard">{{ el.t }}</div>
                <div class="cCard">{{ el.c }}</div>
            </div>
        </div>

    </div>
</template>

<script>
export default {

    //props:['qntMalhas','qntGrupos','qntMedidores','qntZMC','qntEventos'],

    data() {
        return {
            //
            liInfo:[
                {'t':'Malhas','c':1,'b':''},
                {'t':'Grupos','c':1,'b':''},
                {'t':'Medidores','c':3,'b':''},
                {'t':'Eventos','c':4,'b':''},
            ]
        }
    },

    methods:{
        // -- CALL PAGE.
        callBtn(index) { 
            console.log('btn chamado para liInfo[index].titulo: ', this.liInfo[index].t)
        },

        changeBtn(index,strFlag) { 
            if (strFlag == 'on') { this.liInfo[index].b = 'rgb(247,215,46)' }
            else { this.liInfo[index].b = '' }
        },
    },

    created() {
        window.scrollTo(0,0)

        /*
        this.liInfo[0].c = this.qntMalhas
        this.liInfo[1].c = this.qntGrupos
        this.liInfo[2].c = this.qntMedidores
        this.liInfo[3].c = this.qntZMC
        this.liInfo[4].c = this.qntEventos
        */
    }
}
</script>