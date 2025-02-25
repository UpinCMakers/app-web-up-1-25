<style scoped>
    @import url("../../styles/contadorAguaPage/targetSearchCA.scss");
</style>

<template>
    <div class="box_targetSearchCA">

        <div class="titGeral">
            <v-icon :style="{'color':'rgb(31,122,177)'}">mdi-counter</v-icon>
            <span class="ml-2">Medidores</span>
        </div>

        <div class="label mt-2"><span class="ml-2">Pesquisar Medidor</span></div>

        <div class="painelGeralConsumidor">

            <div class="searchBar mt-1 mb-1">
                <v-autocomplete
                v-model="valueSelected"
                :items="items"
                class="el_search"
                color="rgb(247,215,46)"
                :height="12"
                @change="callCatalogo(valueSelected)"
                ></v-autocomplete>  

                <v-icon @click="callCatalogo(valueSelected)"
                large
                class="el_icon_search"
                @mouseover="hoverSearch = 'rgb(31,122,177)'"
                @mouseleave="hoverSearch = 'rgb(247,215,46)'"
                :style="{'color': hoverSearch}">mdi-magnify</v-icon>
            </div>
        </div>

        <div class="mb-1 btnResetSearch">
            <v-btn x-small @click="valueSelected = ''">
                <span>Limpar pesquisa</span>
                <v-icon>mdi-clean</v-icon>
            </v-btn>
        </div>

        <div class="label mt-2"><span class="ml-2">Todos os medidores</span></div>

        <div class="painelGeralConsumidor">

            <div class="headersClasses" :style="{'border':'1px solid rgba(7,46,79,0.8)'}">
                <div class="hCard">ID</div>
                <div class="hCard">Medidor</div>
                <div class="hCard">Última leitura [m3]</div>
                <div class="hCard">Instalação</div>
                <div class="hCard">Desinstalação</div>
                <div class="hCard">Status</div>
                <div class="hCard">Alarmes</div>
                <div class="hCard" :style="{'justify-self':'flex-end'}">Ação</div>
            </div>

            <div class="boxLi" v-if="valueSelected == ''">
                <div class="liClasses" v-for="(cont,r) in liContadores" :key="r"
                :style="{'background':cont.b}"
                @mouseover="changeBtn(r,'on')"
                @mouseleave="changeBtn(r,'off')"
                @click="callTarget(r,'a')"
                >
                    <div class="hCard">{{ cont.idd }}</div>
                    <div class="hCard">{{ cont.t }}</div>
                    <div class="hCard">{{ cont.lastR }}</div>
                    <div class="hCard">{{ cont.initDate }}</div>
                    <div class="hCard">{{ cont.endDate }}</div>
                    <div class="hCard">{{ cont.status }}</div>
                    <div class="hCard">{{ cont.alarme }}</div>

                    <v-icon :style="{'align-items':'center','width':'100px'}">mdi-square-edit-outline</v-icon>
                </div>
            </div>
            <div class="boxLi" v-if="valueSelected != ''">
                <div class="liClasses" @click="callTarget(fullContInfo,'b')" 
                :style="{'background':fullContInfo.b}"
                @mouseover="changeBtn(fullContInfo.idd,'on')"
                @mouseleave="changeBtn(fullContInfo.idd,'off')"
                >

                    <div class="cCard">{{ fullContInfo.idd }}</div>
                    <div class="cCard">{{ fullContInfo.t }}</div>
                    <div class="cCard">{{ fullContInfo.lastR }}</div>
                    <div class="cCard">{{ fullContInfo.initDate }}</div>
                    <div class="cCard">{{ fullContInfo.endDate }}</div>
                    <div class="cCard">{{ fullContInfo.status }}</div>
                    <div class="cCard">{{ fullContInfo.alarme }}</div>

                    <v-icon :style="{'align-items':'center','width':'100px'}">mdi-square-edit-outline</v-icon>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {

    data() {
        return {
            //
            liContadores:[
                {
                    'idd':0,
                    't':'UP/6541668',
                    'lastR':1052.5, // m3.
                    'initDate':'01/11/2024', // instalação do contador.
                    'endDate':'-',
                    'status':'Ligado',
                    'alarme':'-',
                    'b':''
                },
                {
                    'idd':1,
                    't':'Teste',
                    'lastR':2324, // m3.
                    'initDate':'01/11/2024', // instalação do contador.
                    'endDate':'-',
                    'status':'Desligado',
                    'alarme':'-',
                    'b':''
                }
            ],

            //
            items:[], // init empty then is it filled by loop on created.
            hoverSearch:'rgb(247,215,46)',
            valueSelected: '',
            fullContInfo:'', // preenchido após selected value by autocomplete search.
        }
    },

    methods:{
        //
        changeBtn(index,strFlag) { 
            if (strFlag == 'on') { this.liContadores[index].b = 'rgb(247,215,46)' }
            else { this.liContadores[index].b = '' }
        },

        callCatalogo(itemSelected) {
            //console.log('from search!')
            //console.log('itemSelected: ',itemSelected)
            var c=0
            while (c < this.liContadores.length) {
                if (itemSelected == this.liContadores[c].t) {
                    this.fullContInfo = this.liContadores[c]
                }
                c++
            }
        },

        callTarget(fullContInfo,flagStr) { 
            
            if (flagStr == 'a') {
                console.log('open alvo/contador selected: ',this.liContadores[fullContInfo]) 
            }

            if (flagStr == 'b') {
                console.log('open alvo/contador selected: ',fullContInfo) 
            }
        }
    },

    created() {
        //window.scrollTo(0,0)

        // montar lista search.
        var tam = this.liContadores.length
        var c = 0
        while (c < tam) {
            this.items.push(this.liContadores[c].t) 
            c++
        }
    }
}
</script>