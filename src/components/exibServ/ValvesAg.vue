<style scoped>
    @import url("../../styles/exibServ/valveAg.scss");
</style>


<template>
    <div class="box_valveAg">

        <div class="titAg">Acionamentos agendados</div>

        <div class="painelAg" v-if="!flagLoadingDialog">
            <div class="agN mr-2 mt-2" v-for="(ag,i) in li" :key="i">

                <!-- Título -->
                <div class="titAgN">
                    <span>Agendamento:</span>
                    <span class="ml-1">{{ ag.agendamento }}</span>
                </div>

                <!-- Status -->
                <div class="ratioAgN">

                    <span @click="changeAgStatus(i,'on')"
                    class="boxRatioAgN mr-1" :style="{'background':ag.backOn}">ON</span>

                    <span @click="changeAgStatus(i,'off')"
                    class="boxRatioAgN" :style="{'background':ag.backOff}">OFF</span>
                </div>

                <!-- Seleção Válvula -->
                <div class="ratioAgN">

                    <span @click="changeAgValve(i,'A0')"
                    class="boxRatioAgN mr-1" :style="{'background':ag.vv1}">Válvula 1</span>
                    
                    <span @click="changeAgValve(i,'A1')"
                    class="boxRatioAgN" :style="{'background':ag.vv2}">Válvula 2</span>
                </div>

                <!-- Seleção data do agendamento -->
                <div class="boxBTNAgN mt-1" @click="changeAgDate(i)">
                    <v-btn>selecionar data</v-btn>
                    <span class="dateSelected ml-1">{{ ag.dia }}</span>
                </div>

                <!-- Seleção hora:minuto inicial do agendamento -->
                <div class="boxBTNAgN mt-1" @click="changeAgHr(i,'init')">
                    <v-btn>Horário inicial</v-btn>
                    <span class="dateSelected ml-1">{{ `${ag.hr_init}:${ag.min_init}` }}</span>
                </div>

                <!-- Seleção hora:minuto inicial do agendamento -->
                <div class="boxBTNAgN mt-1" @click="changeAgHr(i,'end')">
                    <v-btn>Horário final</v-btn>
                    <span class="dateSelected ml-1">{{ `${ag.hr_end}:${ag.min_end}` }}</span>
                </div>

                <!-- agendar -->
                <div class="actionAgN mt-2" @click="envio(i)">
                    <v-btn :style="{ backgroundColor: '#1F7AB1', color: '#fff' }" block>solicitar alteração</v-btn>
                </div>

                <!-- estado do agendamento solicitado -->
                <div class="boxBTNAgN">
                    <span>Estado atual:</span>
                    <span class="estadoAtual ml-1" :style="{'color':ag.corEstado}">{{ ag.flag }}</span>
                </div>
            </div>
        </div>

        <!-- Caixa de diálogo: CALENDARIO -->
        <v-dialog v-model="dialogDate" max-width="250px">
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

        <!-- Caixa de diálogo: HORAS:MINUTOS -->
        <v-dialog v-model="dialogHr" max-width="250px" class="">
            <div class="custom-dialog-background">
                <v-text-field
                v-model="selectedTime"
                label="Insira a hora (HH:mm)"
                :placeholder="selectedTime"
                :rules="[timeRule]"
                maxlength="5"
                ></v-text-field>
                <v-btn 
                :disabled="!isValidTime"
                color="green darken-2" 
                block @click="handleTimeChange(selectedTime)">Registar horário</v-btn>
            </div>
        </v-dialog>

        <!-- LOADING SENDING -->
        <div v-if="flagLoadingDialog" class="painelAg mt-2"
        :style="{'display':'flex','align-items':'center','justify-content':'center'}">
            <v-progress-circular 
                color="rgb(247,215,46)"
                size="64"
                indeterminate
            ></v-progress-circular>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { myDate } from './aux1.js';

export default {

    data() {
        return {
            //
            li:[],
            tmpIndex:-1, // var aux para index não explícito ao chamar um dialog.
            flagLoadingDialog:false,

            //
            dialogDate:false, // controle caixa dialog.
            // calendário.
            selectedDate:null, // teste calendário 01/10/2024.
            attrs: [
                {
                key: 'today',
                highlight: true,
                dates: new Date(),
                },
            ],

            //
            dialogHr:false, // controle caixa dialog horas.
            // horário.
            selectedTime: '12:01', // Armazena o horário selecionado
            tmpFlagInit:null, // var aux para direcionar se é um input hr:min init ou end.
        }
    },

    computed: {
        isValidTime() {
            // Verifica se a entrada de tempo está no formato correto
            return this.timeRule(this.selectedTime) === true;
        }
    },

    methods:{
        //
        envio(index) {
            //console.log('id db agend:', index);
            if (this.li[index]['status'] == 'on') {
                this.flagLoadingDialog = true
                // verif data --> deve ser superior a hoje <-- no worker as datas passadas são descartadas.
                var date = myDate() // rcvUpDate db

                var hr_init = parseInt(this.li[index]['hr_init']) - 1 // dec -1h sinc db<->front
                hr_init = hr_init.toString().padStart(2, '0') // forçar 2 dígitos ao número.

                var hr_end = parseInt(this.li[index]['hr_end']) -1 // dec -1h sinc db<->front
                hr_end = hr_end.toString().padStart(2, '0')

                var el2send = {
                    'index':index,
                    'dateInput':date,
                    'flag':'solicitado',
                    'status':this.li[index]['status'],
                    'valve':this.li[index]['valve'],
                    'dia':this.li[index]['dia'],
                    'hr_init':hr_init, // dec -1h sinc db
                    'min_init':this.li[index]['min_init'],
                    'hr_end':hr_end, // dec -1h sinc db
                    'min_end':this.li[index]['min_end'],
                }
                //console.log('el2send:', el2send)

                var payload = {'up':el2send}
                var self = this
                axios.post(self.$store.state.pathAxiosUpValvesAg, payload).then(function (res) {

                    console.log(res.data.result) // receber status após uplink com resultado do control

                    // update front após envio.
                    //self.corEstado = 'rgb(218, 83, 43)'
                    self.li[index]['corEstado'] = 'rgb(218, 83, 43)'
                    self.li[index]['flag'] = 'solicitado'
                    
                    self.flagLoadingDialog = false
                })

            } else {

                return
            }
        },
        changeAgStatus(index,status) {
            if (status == 'on') {
                this.li[index]['status'] = status // update local li.
                this.li[index]['backOn'] = 'green'
                this.li[index]['backOff'] = ''
            } else {

                this.li[index]['status'] = status // update local li.
                this.li[index]['backOn'] = ''
                this.li[index]['backOff'] = 'rgb(218, 83, 43)'
                this.li[index]['flag'] = 'desativado' // <---
            }
            this.$forceUpdate();
        },
        changeAgValve(index,valve) {
            if (valve == 'A0') {
                this.li[index]['valve'] = valve // update local li.
                this.li[index]['vv1'] = 'rgba(7,46,79,0.8)'
                this.li[index]['vv2'] = ''

            } else {

                this.li[index]['valve'] = valve // update local li.
                this.li[index]['vv1'] = ''
                this.li[index]['vv2'] = 'rgba(7,46,79,0.8)'
            }
            this.$forceUpdate();
        },
        // CALENDARIO.
        changeAgDate(index) {
            this.tmpIndex = parseInt(index)
            this.dialogDate = true // ativar caixa dialog. CALENDARIO.
        },
        handleDateChange(newDate) {
            // Captura a nova data selecionada
            this.li[this.tmpIndex]['dia'] = newDate.slice(8,10)+'/'+newDate.slice(5,7)+'/'+newDate.slice(0,4);
            this.dialogDate = false // desativar caixa dialog.
        },
        // HORAS.
        timeRule(value) {
            const timeFormat = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
            return timeFormat.test(value) || ('Insira uma hora válida no formato HH:mm');
        },
        changeAgHr(index,tmpFlagInit) {
            this.tmpFlagInit = tmpFlagInit
            this.tmpIndex = parseInt(index)
            this.dialogHr = true // ativar caixa dialog.
        },
        handleTimeChange(newTime) {
            // Evento disparado ao mudar o horário
            //console.log('Horário selecionado:', newTime);
            var hr = parseInt(newTime.slice(0,2))
            var minuto = parseInt(newTime.slice(3,5))
            if ( hr > 23 || minuto > 59 ) {
                console.log('Horário selecionado inválido')
                return
            }
            //console.log('hr:', hr.toString().padStart(2, '0'))
            //console.log('minuto:', minuto.toString().padStart(2, '0'))
            if (this.tmpFlagInit == 'init') {
                this.li[this.tmpIndex]['hr_init'] = hr.toString().padStart(2, '0')
                this.li[this.tmpIndex]['min_init'] = minuto.toString().padStart(2, '0')
            } else {
                this.li[this.tmpIndex]['hr_end'] = hr.toString().padStart(2, '0')
                this.li[this.tmpIndex]['min_end'] = minuto.toString().padStart(2, '0')
            }
            this.dialogHr = false // ativar caixa dialog.
        },
    },

    created() {
        this.flagLoadingDialog = true

        var self = this
        axios.get(self.$store.state.pathAxiosGetValvesAg).then(function (res) {

            console.log(res.data.result)
            self.li = res.data.result.li

            var c=0
            while (c < self.li.length) {
                //console.log('self.li[c]: ',self.li[c])

                var hr_init = parseInt(self.li[c]['hr_init']) + 1 // inc +1h sinc db<->front
                self.li[c]['hr_init'] = hr_init.toString().padStart(2, '0') // forçar 2 dígitos ao número.

                var hr_end = parseInt(self.li[c]['hr_end']) + 1 // inc +1h sinc db<->front
                self.li[c]['hr_end'] = hr_end.toString().padStart(2, '0')

                if (self.li[c]['status'] == 'on') {

                    self.li[c]['backOn'] = 'green'
                    self.li[c]['backOff'] = ''

                    if (self.li[c]['flag'] == 'agendado') { self.li[c]['corEstado'] = 'green' }
                    if (self.li[c]['flag'] == 'solicitado') { self.li[c]['corEstado'] = 'rgb(218, 83, 43)' }

                } else {

                    self.li[c]['backOn'] = ''
                    self.li[c]['backOff'] = 'rgb(218, 83, 43)'

                    self.li[c]['flag'] = 'desativado' // <---
                    self.li[c]['corEstado'] = 'rgb(218, 83, 43)'
                }

                if (self.li[c]['valve'] == 'A0') {

                    self.li[c]['vv1'] = 'rgba(7,46,79,0.8)'
                    self.li[c]['vv2'] = ''

                } else {

                    self.li[c]['vv1'] = ''
                    self.li[c]['vv2'] = 'rgba(7,46,79,0.8)'
                }

                c++
            }
            //console.log('self.li: ',self.li)
            self.flagLoadingDialog = false
        })
    }
}
</script>