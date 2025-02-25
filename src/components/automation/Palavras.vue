<style scoped>
    @import url("../../styles/automation/palavras.scss");
</style>

<template>
    <div class="box_palavras">
        
        <!--<div class="el_palavra_init" v-if="!flagFimInit">{{ palavraShow }}</div>-->

        <!--<v-icon class="mt-4" large v-if="flagFimInit">mdi-wrench-clock</v-icon>-->

        <!-- Inicializador (animação) -->
        <!--<div class="el_palavra_on mt-4" v-if="!flagFimInit">
            <span class="">{{ palavraShow }}</span>
        </div>-->

        <div class="el_palavra_on mt-4"> <!-- v-if="flagFimInit" -->
            <span class="">IoT e Automação</span>

            <div class="painelCirc">

                <div class="circ" :style="{'box-shadow':shadowCircA,'background':backCircA}"></div>
                <div class="circ" :style="{'box-shadow':shadowCircB,'background':backCircB}"></div>
                <div class="circ" :style="{'box-shadow':shadowCircC,'background':backCircC}"></div>

            </div>

        </div>

    </div>
</template>

<script>
export default {

    data() {
        return {
            // V1
            palavraShow:'... ..',
            palavras:['Iniciando..','O seu sistema ..','Automatizado.'],
            flagFimInit:false,

            // V2 --- 27/08/2024
            //bordaCircA:'1px solid rgb(197, 22, 22)', // 'border':bordaCircA,
            shadowCircA:'',
            backCircA:'',
            shadowCircB:'',
            backCircB:'',
            shadowCircC:'',
            backCircC:'',

            // -- variável intervalo (técnica polling).
            polling:null,

            // -- rotina init cores.
            liCoresCirc:[
                ['rgba(247,215,46,1)','',''],
                ['rgba(247,215,46,1)','rgba(247,215,46,1)',''],
                ['rgba(247,215,46,1)','rgba(247,215,46,1)','rgb(31,122,177)'],
            ],

            // -- rotina pisca.
            liPisca:['','rgb(31,122,177)'],
        }
    },

    methods: {
        //
    },

    beforeUnmount () {
      clearInterval(this.polling)
    },

    created() {
        // V2 - 27/08/2024
        // (print 3 círculos [amarelo,amarelo,azul] acendendo em intervalos)
        // (por fim, o círculo azul fica piscando sob fade)
        let index = 0;

        // Função que será chamada a cada 2 segundos
        const intervalo = setInterval(() => {

            // Verifica se ainda há elementos na lista
            if (index < this.liCoresCirc.length) {
                //
                this.shadowCircA = `0px 2px 4px ${this.liCoresCirc[index][0]}`
                this.backCircA = `${this.liCoresCirc[index][0]}`

                this.shadowCircB = `0px 2px 4px ${this.liCoresCirc[index][1]}`
                this.backCircB = `${this.liCoresCirc[index][1]}`

                this.shadowCircC = `0px 2px 4px ${this.liCoresCirc[index][2]}`
                this.backCircC = `${this.liCoresCirc[index][2]}`

                //console.log('count: ',index)

                // Avança para o próximo elemento
                index++;
            } else {
                // Para o intervalo quando todos os elementos forem impressos
                clearInterval(intervalo);
                //this.flagFimInit = true
                //console.log('fim de intervalo init')

                this.polling = setInterval(() => {
                    //console.log('count: ',index)

                    if (index % 2 === 0) {
    
                        this.shadowCircC = `0px 2px 4px ${this.liPisca[1]}`
                        this.backCircC = `${this.liPisca[1]}`
                    
                    } else {

                        this.shadowCircC = `0px 2px 4px ${this.liPisca[0]}`
                        this.backCircC = `${this.liPisca[0]}`
                    }

                    index++;
                },1400)
            }
        }, 1200);

        // V1 (print palavras intervaladas ao iniciar o componente).
        /*let index = 0;

        // Função que será chamada a cada 2 segundos
        const intervalo = setInterval(() => {

            // Verifica se ainda há elementos na lista
            if (index < this.palavras.length) {
                // Imprime o elemento atual
                //console.log(this.palavras[index]);
                this.palavraShow = this.palavras[index]
                // Avança para o próximo elemento
                index++;
            } else {
                // Para o intervalo quando todos os elementos forem impressos
                clearInterval(intervalo);
                this.flagFimInit = true
            }
        }, 1200);*/
    }
}
</script>