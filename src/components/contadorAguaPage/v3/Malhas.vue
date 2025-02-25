<style scoped>
    @import url("../../../styles/contadorAguaPage/v3/malhas.scss");
</style>

<template>
    <div class="box_consumidores">

        <div class="titGeral">
            <v-icon :style="{'color':'rgb(31,122,177)'}">mdi-transit-connection-variant</v-icon>
            <span class="ml-2">Malhas</span>
        </div>

        <div class="mt-1 mb-1" :style="{'width':'99%','align-self':'center'}">
            <v-btn block small @click="flagDialogMalha = true">
                <span>Adicionar nova malha</span>
                <v-icon class="ml-1">mdi-plus-box-outline</v-icon>
            </v-btn>
        </div>

        <!-- Caixa de diálogo: input string -->
        <v-dialog v-model="flagDialogMalha" max-width="250px">
            <div class="">
                <!-- O componente form -->
                <DialogA :t="'Nova Malha'" :icon="'mdi-transit-connection-variant'" 
                @fromInput="desableDialog($event)" />
            </div>
        </v-dialog>

        <div class="label mt-2">
            <span class="ml-2">Todas as malhas</span>
        </div>

        <div class="painelGeralConsumidor">

            <div class="headersClasses" :style="{'border':'1px solid rgba(7,46,79,0.8)'}">
                <div class="hCard">Nome</div>
                <div class="hCard">Grupos</div>
                <div class="hCard">Contadores</div>
            </div>

            <!-- lista de malhas -->
            <div class="boxLi">
                <div class="liClasses" v-for="(cl,r) in liConsumidores" :key="r"
                :style="{'background':cl.b}"
                @mouseover="changeBtn(r,'on')"
                @mouseleave="changeBtn(r,'off')"
                @click="callMalha(r)"
                >
                    <div class="cCard">{{ cl.t }}</div>
                    <div class="cCard">{{ cl.c }}</div>
                    <div class="cCard">{{ cl.m }}</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import DialogA from './DialogA'

export default {

    components:{DialogA},

    data() {
        return {
            //
            idMalha:0,
            liConsumidores:[],

            //flagConsumidorSelected:false, // nenhum consumidor selecionado inicialmente.
            hoverBack:'rgb(247,215,46)', // cor do botão.

            flagClasseSelected:false,

            //
            items:[], // init empty then is it filled by loop on created.
            hoverSearch:'rgb(247,215,46)',
            valueSelected: '',
            fullC:'', // preenchido após selected value by autocomplete search.

            //
            flagDialogMalha:false,
        }
    },

    methods:{
        callMalha(idMalha) { 
            //
            //this.idMalha = idMalhaSelected
            this.$store.state.jTmpMalha.idMalha = idMalha
            this.$store.state.jTmpMalha.malha = this.liConsumidores[idMalha].t // nome malha.
            this.flagConsumidorSelected = true

            this.$router.push(`/ca/malhas/${idMalha}/grupos`);
        },

        backTo(strFlag) { 
            if (strFlag == 'consumidores') {
                // forçar update state?
                var li = this.$store.state.liMalhas
                this.$store.state.liMalhas = li

                // back from consumidor to consumidores
                this.flagConsumidorSelected = false
            }
             
        },

        callCatalogo(itemSelected) {
            var c=0
            while (c < this.liConsumidores.length) {
                if (itemSelected == this.liConsumidores[c].t) {
                    this.fullC = this.liConsumidores[c]
                }
                c++
            }
        },

        changeBtn(index,strFlag) { 
            var liTmpChange = this.liConsumidores
            if (strFlag == 'on') { 
                liTmpChange[index].b = 'rgb(247,215,46)'
            }
            else { 
                liTmpChange[index].b = ''
            }
            this.liConsumidores = liTmpChange
            this.$forceUpdate();
        },

        desableDialog(flagLi) { 
            this.flagDialogMalha = flagLi[0]

            var novoEl = {
                'id':this.liConsumidores.length,
                'malha':flagLi[1],
                'grupos':[],
            }
            //console.log('nova malha: ', novoEl)

            //this.liConsumidores.push(novoEl) // input novo nome string. (versão dev)
            
            this.$store.state.liMalhas.push(novoEl) // (versão teste local)
            this.init()
            //console.log('rcved from input dialog: ', flagBool)
        },

        init() {
            // montar lista search. (versão dev).
            /*var tam = this.liConsumidores.length
            var c = 0
            while (c < tam) {
                this.items.push(this.liConsumidores[c].t) 
                c++
            }*/

            // montar lista search. (versão teste local).
            var liTmp = []
            var tam = this.$store.state.liMalhas.length
            var m = 0
            while (m < tam) {

                var grupos = this.$store.state.liMalhas[m].grupos // list
                var qntOUT = 0 // int qnt de medidores de saida
                var c = 0
                while (c < grupos.length) {
                    qntOUT = qntOUT + grupos[c].saidas.length // int
                    c++
                }

                var el = {
                    'iddC':this.$store.state.liMalhas[m].id,
                    't':this.$store.state.liMalhas[m].malha,
                    'c':this.$store.state.liMalhas[m].grupos.length,
                    'm':qntOUT,
                    'b':''
                }

                liTmp[m] = el

                //this.items.push(this.liConsumidores[m].t) 
                this.items.push(liTmp[m].t) 
                m++
            }

            this.liConsumidores = liTmp
        },
    },

    created() {
        window.scrollTo(0,0)

        this.init()
    }
}
</script>