<style scoped>
    @import url("../../styles/contadorAguaPage/targetSearchCA.scss");
</style>

<template>
    <div class="box_targetSearchCA">

        <div class="titGeral">
            <v-icon :style="{'color':'rgb(31,122,177)'}">mdi-alert-circle-outline</v-icon>
            <span class="ml-2">Eventos</span>
        </div>

        <div class="label mt-2"><span class="ml-2">Pesquisar Evento por período</span></div>

        <div class="painelGeralConsumidor">

            <!--<div class="searchBar mt-1 mb-1">
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
            </div>-->

            <div class="sDate mt-1" @click="selectP('init')">
                <span class="t ml-1">Selecionar data inicial</span>
                <span class="c ml-1">{{ initDate }}</span>
            </div>

            <div class="sDate mt-1 mb-1" @click="selectP('end')">
                <span class="t ml-1">Selecionar data final</span>
                <span class="c ml-1">{{ endDate }}</span>
            </div>

            <!-- Caixa de diálogo: CALENDARIO -->
            <v-dialog v-model="flagDialogDate" max-width="250px">
                <div class="">
                    <!-- O componente do calendário -->
                    <v-date-picker
                    v-model="selectedDate" 
                    @input="handleDateChange" 
                    :attributes="attrs"
                    is-inline
                    locale="pt-BR"
                    />
                </div>
            </v-dialog>

        </div>

        <div class="mb-1 btnCallSearch">
            <v-btn @click="CallP()">
                <span>Pesquisar</span>
                <v-icon class="ml-1">mdi-magnify</v-icon>
            </v-btn>
        </div>

        <div class="mb-1 btnResetSearch">
            <v-btn x-small @click="valueSelected = ''">
                <span>Limpar pesquisa</span>
                <v-icon class="ml-1" small>mdi-close-circle-outline</v-icon>
            </v-btn>
        </div>

        <div class="label mt-2"><span class="ml-2">Todos os Eventos</span></div>

        <div class="painelGeralConsumidor">

            <div class="headersClasses" :style="{'border':'1px solid rgba(7,46,79,0.8)'}">
                <div class="hCard">Data</div>
                <div class="hCard">Hora</div>
                <div class="hCard">Tipo</div>
                <div class="hCard">Nota</div>
                <div class="hCard">Malha</div>
                <div class="hCard">Grupo</div>
            </div>

            <div class="boxLi" v-if="valueSelected == ''">
                <div class="liClasses" v-for="(el,r) in eventosInfo" :key="r"
                :style="{'background':el.b}"
                @mouseover="changeE(r,'on')"
                @mouseleave="changeE(r,'off')"
                @click="callTarget(r,'a')"
                >
                    <div class="hCard">{{ el.date }}</div>
                    <div class="hCard">{{ el.hr }}</div>
                    <div class="hCard">{{ el.tipo }}</div>
                    <div class="hCard">{{ el.notif }}</div>
                    <div class="hCard">{{ el.malha }}</div>
                    <div class="hCard">{{ el.grupo }}</div>

                    <v-icon :style="{'align-items':'center','width':'100px'}">mdi-square-edit-outline</v-icon>
                </div>
            </div>
            <div class="boxLi" v-if="valueSelected != ''">
                <div class="liClasses" @click="callTarget(fullTarget,'b')" 
                :style="{'background':fullTarget.b}"
                @mouseover="changeE(fullTarget.idd,'on')"
                @mouseleave="changeE(fullTarget.idd,'off')"
                >

                    <div class="cCard">{{ fullTarget.date }}</div>
                    <div class="cCard">{{ fullTarget.hr }}</div>
                    <div class="cCard">{{ fullTarget.tipo }}</div>
                    <div class="cCard">{{ fullTarget.notif }}</div>
                    <div class="cCard">{{ fullTarget.malha }}</div>
                    <div class="cCard">{{ fullTarget.grupo }}</div>

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
            eventosInfo:[
                {
                    'date':'29/11/2024',
                    'hr':'16:29',
                    'tipo':'Alarme',
                    'notif':'Seco',
                    'malha':'UPinC',
                    'grupo':'Sem nome',
                    'b':''
                },
                {
                    'date':'28/11/2024',
                    'hr':'10:31',
                    'tipo':'Alarme',
                    'notif':'fluxo inverso',
                    'malha':'UPinC',
                    'grupo':'Sem nome',
                    'b':''
                },
                {
                    'date':'25/11/2024',
                    'hr':'11:22',
                    'tipo':'Instalação',
                    'notif':'-',
                    'malha':'UPinC',
                    'grupo':'Sem nome',
                    'b':''
                }
            ],

            //
            items:[], // init empty then is it filled by loop on created.
            hoverSearch:'rgb(247,215,46)',
            valueSelected: '',
            fullTarget:'', // preenchido após selected value by autocomplete search.

            // calendário.
            flagDialogDate:false, // controle caixa dialog.
            selectedDate:null, // teste calendário 01/10/2024.
            attrs: [
                {
                key: 'today',
                highlight: true,
                dates: new Date(),
                },
            ],
            tmpFlagStrDate:'', // flag string para direcionar a gravação da data.
            initDate:'',
            endDate:'',

            //
        }
    },

    methods:{
        //
        changeBtn(index,strFlag) { 
            if (strFlag == 'on') { this.eventosInfo[index].b = 'rgb(247,215,46)' }
            else { this.eventosInfo[index].b = '' }
        },

        CallP() {
            console.log('from search!')
            //console.log('itemSelected: ',itemSelected)

            // buscar evento a partir do início do período e do fim.
            // this.initDate
            // this.endDate

            /*var c=0
            while (c < this.eventosInfo.length) {
                if (itemSelected == this.eventosInfo[c].t) {
                    this.fullTarget = this.eventosInfo[c]
                }
                c++
            }*/
        },

        changeE(index,strFlag) { 
            if (this.fullTarget != '') {
                
                if (strFlag == 'on') { this.fullTarget.b = 'rgb(247,215,46)' }
                else { this.fullTarget.b = '' }

            } else {

                if (strFlag == 'on') { this.eventosInfo[index].b = 'rgb(247,215,46)' }
                else { this.eventosInfo[index].b = '' }
            }
        },

        callTarget(fullTarget,flagStr) { 
            
            if (flagStr == 'a') {
                console.log('open selected target: ',this.eventosInfo[fullTarget]) 
            }

            if (flagStr == 'b') {
                console.log('open selected target: ',fullTarget) 
            }
        },

        // CALENDARIO.
        selectP(flagStr) {
            this.tmpFlagStrDate = flagStr
            this.flagDialogDate = true // ativar caixa dialog. CALENDARIO.
        },
        handleDateChange(newDate) {
            // Captura a nova data selecionada
            if (this.tmpFlagStrDate == 'init') {

                this.initDate = newDate.slice(8,10)+'/'+newDate.slice(5,7)+'/'+newDate.slice(0,4);
            }
            else {

                this.endDate = newDate.slice(8,10)+'/'+newDate.slice(5,7)+'/'+newDate.slice(0,4);
            }
            this.flagDialogDate = false // desativar caixa dialog.
        },
    },

    created() {
        //window.scrollTo(0,0)

        // montar lista search.
        var tam = this.eventosInfo.length
        var c = 0
        while (c < tam) {
            this.items.push(this.eventosInfo[c].t) 
            c++
        }
    }
}
</script>