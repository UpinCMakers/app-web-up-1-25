<style scoped>
    @import url("../../../styles/contadorAguaPage/v3/medidores.scss");
</style>

<template>
    <div class="box_targetSearchCA">

        <div class="label"><span class="ml-2">Grupo</span></div>

        <div class="boxTitGeralConsumidor">
            <span class="ml-2" v-if="!flagEditNome">{{ nomeA }}</span>

            <v-form v-if="!flag_loading_A && flagEditNome" class=""
            ref="form"
            v-model="valid"
            lazy-validation
            >
                <v-text-field 
                color="orange"
                v-model="nomeMalhaEditing"
                :rules="nameRules"
                :label="nomeA"
                required
                style="width: 300px;"
                ></v-text-field>
            </v-form>

            <v-btn color="success" x-small v-if="flagEditNome" @click="changeName()">Atualizar nome</v-btn>
        
            <span v-if="flagError_A && !flag_loading_A"
            :style="{'margin-top':'10px','color':'red','font-size':'0.8rem'}">
                {{ msgError_A }}
            </span>
        </div>

        <v-btn block small class="mt-1" v-if="!flagEditNome" @click="flagEditNome = true">
            <span>Editar nome grupo</span>
            <v-icon class="ml-1">mdi-square-edit-outline</v-icon>
        </v-btn>

        <div class="titGeral mt-4">
            <v-icon :style="{'color':'rgb(31,122,177)'}">mdi-counter</v-icon>
            <span class="ml-2">Medidores</span>
        </div>

        <!-- Caixa de diálogo: input string | USADO PARA LIST IN E TAMBÉM PARA LIST OUT -->
        <v-dialog v-model="flagDialog" max-width="250px">
            <div class="">
                <!-- O componente form -->
                <DialogA :flagStrTipoDialog="flagStrTipoDialog" :t="titDinamInput" :icon="'mdi-counter'" 
                @fromInput="desableDialog($event)" 
                />
            </div>
        </v-dialog>

        <v-btn block small class="mt-4" @click="openDialog('IN')">
            <span>Adicionar nova entrada</span>
            <v-icon class="ml-1">mdi-plus-box-outline</v-icon>
        </v-btn>

        <!-- PAINEL ENTRADAS -->
        <div class="label mt-2"><span class="ml-2">Todas as entradas</span></div>

        <div class="painelGeralConsumidor">

            <div class="headersClasses" :style="{'border':'1px solid rgba(7,46,79,0.8)'}">
                <div class="hCard">ID</div>
                <div class="hCard">Medidor</div>
                <div class="hCard">Última leitura [m3]</div>
                <div class="hCard">Status</div>
                <div class="hCard">Alarmes</div>
                <div class="hCard" :style="{'justify-self':'flex-end'}">Ação</div>
            </div>

            <div class="boxLi">
                <div class="liClasses" v-for="(cont,r) in liIN" :key="r"
                :style="{'background':cont.b}"
                @mouseover="changeBtn(r,'on','liIN')"
                @mouseleave="changeBtn(r,'off','liIN')"
                @click="callTarget(r,'IN')"
                >
                    <div class="hCard">{{ cont.idd }}</div>
                    <div class="hCard">{{ cont.t }}</div>
                    <div class="hCard">{{ cont.lastR }}</div>
                    <div class="hCard">{{ cont.status }}</div>
                    <div class="hCard">{{ cont.alarme }}</div>

                    <v-icon class="hCard">mdi-square-edit-outline</v-icon>
                </div>
            </div>

        </div>

        <v-btn block small class="mt-4" @click="openDialog('OUT')">
            <span>Adicionar nova saída</span>
            <v-icon class="ml-1">mdi-plus-box-outline</v-icon>
        </v-btn>

        <!-- PAINEL SAIDAS -->
        <div class="label mt-2"><span class="ml-2">Todas as saídas</span></div>

        <div class="painelGeralConsumidor">

            <div class="headersClasses" :style="{'border':'1px solid rgba(7,46,79,0.8)'}">
                <div class="hCard">ID</div>
                <div class="hCard">Medidor</div>
                <div class="hCard">Última leitura [m3]</div>
                <div class="hCard">Status</div>
                <div class="hCard">Alarmes</div>
                <div class="hCard" :style="{'justify-self':'flex-end'}">Ação</div>
            </div>

            <div class="boxLi">
                <div class="liClasses" v-for="(cont,r) in liOUT" :key="r"
                :style="{'background':cont.b}"
                @mouseover="changeBtn(r,'on','liOUT')"
                @mouseleave="changeBtn(r,'off','liOUT')"
                @click="callTarget(r,'OUT')"
                >
                    <div class="hCard">{{ cont.idd }}</div>
                    <div class="hCard">{{ cont.t }}</div>
                    <div class="hCard">{{ cont.lastR }}</div>
                    <div class="hCard">{{ cont.status }}</div>
                    <div class="hCard">{{ cont.alarme }}</div>

                    <v-icon class="hCard">mdi-square-edit-outline</v-icon>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import DialogA from './DialogA'

export default {

    components:{DialogA},

    props:['idMalha','idGrupo'],

    data() {
        return {
            //
            liIN:[
                {
                    'idd':0,
                    't':'UP/6541668',
                    'lastR':1052.5, // m3.
                    'initDate':'01/11/2024', // instalação do contador.
                    'endDate':'-',
                    'status':'Ligado',
                    'alarme':'-',
                    'b':''
                }
            ],
            liOUT:[
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

            // dialog dinamico (entrada ou saida)
            flagDialog:false,
            titDinamInput:'',

            //
            items:[], // init empty then is it filled by loop on created.
            hoverSearch:'rgb(247,215,46)',
            valueSelected: '',
            fullContInfo:'', // preenchido após selected value by autocomplete search.

            // edit nome titulo
            nomeA:'Grupo X', // nome init
            flagEditNome:false,
            nomeMalhaEditing:'',
            valid: false, // btn 'entrar' inicia desabilitado.
            nameRules: [
                v => !!v || 'Preenchimento obrigatório',
            ],
            flag_loading_A:false,
            flagError_A:false,
            msgError_A:'Nome inválido',
        }
    },

    methods:{

        desableDialog(flagLi) { 

            this.flagDialog = flagLi[0]
            var flagStrTipoDialog = flagLi[2] // 'IN' or 'OUT' rcv from emit

            // Obter data de hoje.
            const { getDataAtualGMT, getHoraAtualGMT } = require('../../../ferramentas/dataHoraGMT.js');

            var idM = 0
            if (flagStrTipoDialog == 'IN') { idM = this.liIN.length } else { idM = this.liOUT.length }

            var novoMedidor = {
                'id':idM,
                'nome':flagLi[1], // nome recebido via evento component child.
                'ultima_leitura':0, // init
                'instalacao':getDataAtualGMT(),
                'desinstalacao':'-',
                'status':'Desativado', // init
                'coord':[40.27899076267598,-7.504206597805024], // tornar dinam
                'eventos':[
                  {
                    'data':getDataAtualGMT(),
                    'hora':getHoraAtualGMT(),
                    'origem':flagStrTipoDialog,
                    'tipo':'Criação', // init
                    'nota':'-'
                  },
                ],
                'leituras':[],
            }
            if (flagStrTipoDialog == 'IN') {
                this.$store.state.liMalhas[this.idMalha].grupos[this.idGrupo].entradas.push(novoMedidor)
                //this.liIN.push(novoMedidor) // update local page é feito no init()
            } else {
                this.$store.state.liMalhas[this.idMalha].grupos[this.idGrupo].saidas.push(novoMedidor)
                //this.liOUT.push(novoMedidor) // update local page é feito no init()
            }

            this.init() // remontar página com novo medidor adiconado.
        },

        openDialog(flagStrTipoDialog)  {

            if (flagStrTipoDialog == 'IN') { this.titDinamInput = 'Nova Entrada' }
            else { this.titDinamInput = 'Nova Saída' }
            this.flagStrTipoDialog = flagStrTipoDialog
            this.flagDialog = true
        },

        changeName() {
            this.flag_loading_A = true // iniciar loading...

            if (this.nomeMalhaEditing.length >= 2) {

                if (this.$refs.form.validate()) {

                    // EDITAR NOME DO GRUPO AQUI !!! ALTERAR 30/01/2025

                    this.flag_loading_A = false // desabilitar loading
                    this.flagError_A = false // reset flag error

                    this.nomeA = this.nomeMalhaEditing
                    this.nomeMalhaEditing = '' // reset var input

                    // up store
                    this.$store.state.liMalhas[this.idMalha].grupos[this.idGrupo].grupo = this.nomeA

                    this.flagEditNome = false // desable edit.
                }

            } else {
                
                this.flag_loading_A = false // desabilitar loading
                this.flagError_A = true

                //this.flagEditNome = false // desable edit.
                return
            }
        },

        // -- change background color when mouse over and leave.
        changeBtn(index,strFlag,strFlagLiTipo) { 
            if (strFlag == 'on') { 
                if (strFlagLiTipo == 'liOUT') {
                    this.liOUT[index].b = 'rgb(247,215,46)' 
                } else {
                    this.liIN[index].b = 'rgb(247,215,46)' 
                }
            }
            else { 
                if (strFlagLiTipo == 'liOUT') {
                    this.liOUT[index].b = '' 
                } else {
                    this.liIN[index].b = '' 
                }
            }
        },

        callTarget(index,flagStrMedidor) { 

            //var idMalhaSelected = this.$store.state.jTmpMalha.idMalha // via store.
            var idMalha = this.idMalha // via props rota aninhada.
            var idGrupo = this.idGrupo // via props rota aninhada.
            //console.log('[medidores] idGrupo: ',idGrupo)

            if (flagStrMedidor == 'OUT') {
                //console.log('Medidor de saída selecionado: ',index)
                var idOUT = index
                this.$router.push(`/ca/malhas/${idMalha}/grupos/${idGrupo}/medidores/saida/${idOUT}`);

            } else {
                //console.log('Medidor de entrada selecionado: ',index)
                var idIN = index
                this.$router.push(`/ca/malhas/${idMalha}/grupos/${idGrupo}/medidores/entrada/${idIN}`);
            }
        },

        init() {

            // reset (limpar)
            this.liIN = []
            this.liOUT = []

            // init lista IN
            var tmpLiIN = this.$store.state.liMalhas[this.idMalha].grupos[this.idGrupo].entradas
            var tam = this.$store.state.liMalhas[this.idMalha].grupos[this.idGrupo].entradas.length
            var c = 0
            while (c < tam) {

                // Contar qnts alarmes ativos. Por enquanto contar todos existentes. 30/01/25
                let a=0
                let countAlarmes=0
                while (a < tmpLiIN[c].eventos.length) {
                    if (tmpLiIN[c].eventos[a].tipo == 'Alarme') { countAlarmes++ }
                    a++
                }

                this.liIN.push({
                    'idd':tmpLiIN[c].id,
                    't':tmpLiIN[c].nome,
                    'lastR':tmpLiIN[c].ultima_leitura, // m3.
                    'initDate':tmpLiIN[c].instalacao, // instalação do contador.
                    'endDate':tmpLiIN[c].desinstalacao,
                    'status':tmpLiIN[c].status,
                    'alarme':countAlarmes,
                    'b':''
                    }
                ) 
                c++
            }

            // init lista OUT
            var tmpLiOUT = this.$store.state.liMalhas[this.idMalha].grupos[this.idGrupo].saidas
            tam = this.$store.state.liMalhas[this.idMalha].grupos[this.idGrupo].saidas.length
            c = 0
            while (c < tam) {

                // Contar qnts alarmes ativos. Por enquanto contar todos existentes. 30/01/25
                let a=0
                let countAlarmes=0
                while (a < tmpLiOUT[c].eventos.length) {
                    if (tmpLiOUT[c].eventos[a].tipo == 'Alarme') { countAlarmes++ }
                    a++
                }

                this.liOUT.push({
                    'idd':tmpLiOUT[c].id,
                    't':tmpLiOUT[c].nome,
                    'lastR':tmpLiOUT[c].ultima_leitura, // m3.
                    'initDate':tmpLiOUT[c].instalacao, // instalação do contador.
                    'endDate':tmpLiOUT[c].desinstalacao,
                    'status':tmpLiOUT[c].status,
                    'alarme':countAlarmes,
                    'b':''
                    }
                ) 
                c++
            }

            this.nomeA = this.$store.state.liMalhas[this.idMalha].grupos[this.idGrupo].grupo
        },
    },

    created() {
        window.scrollTo(0,0)

        this.init()
    }
}
</script>