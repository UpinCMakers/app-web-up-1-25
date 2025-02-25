<style scoped>
    @import url("../../styles/contadorAguaPage/classe.scss");
</style>

<template>
    <div class="box_classe">

        <div class="label"><span class="ml-2">Malha</span></div>
        
        <div class="boxTitGeral">
            <span class="ml-2">{{ this.$store.state.jTmpMalha.malha }}</span>
        </div>

        <div class="label mt-2"><span class="ml-2">Grupo</span></div>
        
        <div class="boxTitGeralMain">
            <span class="ml-2" v-if="!flagEditNome">{{ nomeA }}</span>

            <v-form v-if="!flag_loading_A && flagEditNome" class=""
            ref="form"
            v-model="valid"
            lazy-validation
            >
                <v-text-field 
                color="orange"
                v-model="nomeEditing"
                :rules="nameRules"
                :label="nomeA"
                required
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
            <v-icon>mdi-square-edit-outline</v-icon>
        </v-btn>

        <!-- balanço hídrico da classe -->
        <div class="painelGeralConsumidor mt-4">

            <div class="boxTit">Balanço Hídrico</div>

            <!--<div class="listaVazia" v-if="this.liZMC.length == 0">
                <span class="ml-2">Indisponível no momento.</span>
            </div>-->

            <div class="controlLine">
                <div class="elControl" v-for="(control,i) in liControlTit" :key="i"
                :style="{'background':control.b}"
                @mouseover="changeBtnControl(i)"
                @mouseleave="changeBtnControl(i)"
                >{{ control.t }}</div>
            </div>

            <!-- gráficos balanço hidrico -->
            <div class="boxGraf">

                <div class="elGraf">
                    <apexchart class="" ref="chartA" :series="series" :options="options"></apexchart>
                </div>

                <div class="elGraf">
                    <apexchart class="" ref="chart" :series="seriesB" :options="optionsB"></apexchart>
                </div>

                <div class="elGraf">
                    <div class="infoGraf">
                        <span class="tit mt-4">{{ periodoSelec }}</span>

                        <div class="content">
                            <span class="content_t">Período: </span>
                            <span class="content_c">{{ p }}</span>

                            <span class="content_t">Entrada acumulada no grupo: </span>
                            <span class="content_c">{{ en }}</span>

                            <span class="content_t">Saída acumulada no grupo: </span>
                            <span class="content_c">{{ ss }}</span>

                            <span class="content_t">Desperdício acumulado: </span>
                            <span class="content_c">{{ dd }}</span>
                            <span class="content_c">{{ ddp }}</span>
                        </div>
                        
                        <!--<div class="content mt-1">
                            <span class="content_t">Desperdício acumulado: </span>
                            <span class="content_c">7 [m3]</span>
                            <span class="content_c">34%</span>
                        </div>-->
                    </div>
                </div>
            </div>

        </div>

        <!-- ZMC da classe -->
        <div class="painelGeralConsumidor mt-4">

            <div class="boxTit">ZMC (zona de medição e controlo)</div>

            <!-- Caixa de diálogo: input string -->
            <v-dialog v-model="flagDialogB" max-width="300px">
                <div class="">
                    <!-- O componente form -->
                    <DialogB :t="'Nova ZMC'" :icon="'mdi-water-plus'" 
                    @fromInput="desableDialog($event)" />
                </div>
            </v-dialog>

            <v-btn block small class="mb-1" @click="flagDialogB = true">
                <span>Adicionar ZMC</span>
                <v-icon>mdi-plus-box-outline</v-icon>
            </v-btn>

            <!-- headers da tabela abaixo -->
            <div class="headersClasses" v-if="this.liZMC.length > 0"
            :style="{'border':'1px solid rgba(7,46,79,0.8)'}">
                <div class="hCard">ID</div>
                <div class="hCard">Nome ZMC</div>
                <div class="hCard">Última leitura [m3]</div>
                <div class="hCard">Instalação</div>
                <div class="hCard">Desinstalação</div>
                <div class="hCard">Status</div>
                <div class="hCard">Alarmes</div>
                <div class="hCard" :style="{'justify-self':'flex-end'}">Ação</div>
            </div>

            <div class="boxLi" v-if="this.liZMC.length > 0">
                <div class="liClasses" v-for="(z,k) in liZMC" :key="k" :style="{'background':z.b}"
                @mouseover="changeZ(k,'on')"
                @mouseleave="changeZ(k,'off')"
                @click="callZ(k)"
                >
                    <div class="cCard">{{ z.idd }}</div>
                    <div class="cCard">{{ z.t }}</div>
                    <div class="cCard">{{ z.lastR }}</div>
                    <div class="cCard">{{ z.initDate }}</div>
                    <div class="cCard">{{ z.endDate }}</div>
                    <div class="cCard">{{ z.status }}</div>
                    <div class="cCard">{{ z.alarme }}</div>

                    <v-icon :style="{'align-items':'center','width':'100px'}">mdi-square-edit-outline</v-icon>
                </div>
            </div>

            <div class="listaVazia" v-if="this.liZMC.length == 0">
                <span class="ml-2">Nenhuma ZMC cadastrada.</span>
            </div>

        </div>

        <!-- Contadores/medidores da classe -->
        <div class="painelGeralConsumidor mt-4">

            <div class="boxTit">Medidores</div>

            <!-- Caixa de diálogo: input string -->
            <v-dialog v-model="flagDialogB2" max-width="300px">
                <div class="">
                    <!-- O componente form -->
                    <DialogB :t="'Novo Contador'" :icon="'mdi-water-pump'" 
                    @fromInput="desableDialog2($event)" />
                </div>
            </v-dialog>

            <v-btn block small class="mb-1" @click="flagDialogB2 = true">
                <span>Adicionar contador</span>
                <v-icon>mdi-plus-box-outline</v-icon>
            </v-btn>

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

            <div class="mb-1 btnResetSearch">
                <v-btn x-small @click="valueSelected = ''">
                    <span>Limpar pesquisa</span>
                    <v-icon>mdi-clean</v-icon>
                </v-btn>
            </div>

            <!-- headers da tabela abaixo -->
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
                <div class="liClasses" v-for="(cont,c) in liContadores" :key="c" :style="{'background':cont.b}"
                @mouseover="changeBtn(c,'on')"
                @mouseleave="changeBtn(c,'off')"
                @click="callContadore(cont)"
                >
                    <div class="cCard">{{ cont.idd }}</div>
                    <div class="cCard">{{ cont.t }}</div>
                    <div class="cCard">{{ cont.lastR }}</div>
                    <div class="cCard">{{ cont.initDate }}</div>
                    <div class="cCard">{{ cont.endDate }}</div>
                    <div class="cCard">{{ cont.status }}</div>
                    <div class="cCard">{{ cont.alarme }}</div>

                    <v-icon :style="{'align-items':'center','width':'100px'}">mdi-square-edit-outline</v-icon>
                </div>
            </div>
            <div class="boxLi" v-if="valueSelected != ''">
                <div class="liClasses" @click="callContadore(fullContInfo)" 
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

            <div class="listaVazia" v-if="this.liContadores.length == 0">
                <span class="ml-2">Nenhum contador cadastrado.</span>
            </div>

        </div>

    </div>
</template>

<script>
import DialogB from './DialogB'

export default {

    props:['idGrupo'],

    components:{DialogB},

    data() {
        return {
            //
            items:[], // init empty then is it filled by loop on created.
            hoverSearch:'rgb(247,215,46)',
            valueSelected: '',
            fullContInfo:'', // preenchido após selected value by autocomplete search.

            //
            liClasses:[
                {'t':'Grupo sem nome','subclasses':0,'m':3,'z':0,'b':''},
                {'t':'Laboratório','subclasses':0,'m':3,'z':0,'b':''},
            ],

            // control
            liControlTit:[
                {'t':'Últimas 24h','b':''},
                {'t':'Últimos 7 dias','b':''},
                {'t':'Últimos 30 dias','b':''},
                {'t':'Ver tudo','b':'rgb(247,215,46)'},
            ],

            periodoSelec:'Ver tudo', // init sinc com control.

            //
            liZMC:[
            {
                    'idd':0,
                    't':'UP/ZMC/301',
                    'lastR':8052.5, // m3.
                    'initDate':'03/11/2024', // instalação do contador.
                    'endDate':'-',
                    'status':'Ligado',
                    'alarme':'-',
                    'b':''
                },
            ],
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

            // chart nivel agua
            series: [
                {
                    name: 'Entrada',
                    type: 'column',
                    //data: [18, 20, 22, 20, 16, 15]
                    data: [0, 0, 0, 0, 0, 0]
                },
                {
                    name: 'Saída',
                    type: 'line',
                    data: [0, 0, 0, 0, 0, 0],
                    dashArray: 5  // Define a linha como pontilhada
                }
            ],
            options:{
                chart: {
                    type: 'line',
                    toolbar: {
                        show: false  // Desativa o menu (toolbar)
                    },
                    //width: '280px' // Pode ser um valor em pixels (px) ou percentual (%)
                },
                stroke: {
                    width: [0, 4],
                    dashArray: [0, 5]  // Faz a segunda série (linha) ser pontilhada
                },
                labels: ['', '', '', '', '', ''],
                tooltip: {
                    y: {
                        formatter: function (value) {
                            return value.toFixed(2); // Limita a 2 casas decimais
                        }
                    }
                },
            },
            // chart nivel agua
            seriesB: [
                {
                    name: 'Desperdício',
                    type: 'column',
                    data: [0, 0, 0, 0, 0, 0]
                },
                {
                    name: 'Alvo',
                    type: 'line',
                    data: [0, 0, 0, 0, 0, 0],
                    dashArray: 5  // Define a linha como pontilhada
                }
            ],
            optionsB:{
                chart: {
                    type: 'line',
                    toolbar: {
                        show: false  // Desativa o menu (toolbar)
                    },
                    //width: '280px' // Pode ser um valor em pixels (px) ou percentual (%)
                },
                stroke: {
                    width: [0, 3],
                    dashArray: [0, 5]  // Faz a segunda série (linha) ser pontilhada
                },
                labels: ['', '', '', '', '', ''],
                colors: ['#1E90FF', '#FF4500'],
            },

            nomeA:'Grupo sem nome', // init
            // edit nome
            flagEditNome:false,
            nomeEditing:'',
            valid: false, // btn 'entrar' inicia desabilitado.
            nameRules: [
                v => !!v || 'Preenchimento obrigatório',
            ],
            flag_loading_A:false,
            flagError_A:false,
            msgError_A:'Nome inválido',

            // dialog add zmc
            flagDialogB:false,

            // dialog add conatdor
            flagDialogB2:false,

            //
            p:'03/11/2024 - 10/11/2024',
            en:'1.63 [m3]',
            ss:'1.33 [m3]',
            dd:'0.3 [m3]',
            ddp:'19.88%',
        }
    },

    methods:{
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
        // -- CALL PAGE via flag local.
        callContadore(contador) { 

            this.$store.state.jTmpMalha.idMedidor = contador.idd
            this.$store.state.jTmpMalha.medidor = contador.t

            //console.log('contador requisitado: ', contador)
            this.$emit('fromClasse','medidor')
        },

        callZ(index){

            this.$store.state.jTmpMalha.idZMC = this.liZMC[index].idd
            this.$store.state.jTmpMalha.zmc = this.liZMC[index].t

            //console.log('ZMC requisitada: ', this.liZMC[index])
            this.$emit('fromClasse','zmc')
        },

        changeBtn(index,strFlag) { 
            if (this.fullContInfo != '') {
                
                if (strFlag == 'on') { this.fullContInfo.b = 'rgb(247,215,46)' }
                else { this.fullContInfo.b = '' }

            } else {

                if (strFlag == 'on') { this.liContadores[index].b = 'rgb(247,215,46)' }
                else { this.liContadores[index].b = '' }
            }
        },
        changeZ(index,strFlag) {
            if (strFlag == 'on') { this.liZMC[index].b = 'rgb(247,215,46)' }
            else { this.liZMC[index].b = '' }
        },
        changeBtnControl(index) {

            var auxCounter = 0
            while (auxCounter < this.liControlTit.length) { // desabilita todos os não selecionados via hover.
                if (auxCounter != index) {
                    this.liControlTit[auxCounter].b = ''
                }
                auxCounter++
            }

            this.liControlTit[index].b = 'rgb(247,215,46)' // habilita apenas o hover index.
            this.periodoSelec = this.liControlTit[index].t
            // trocar graf através do index
        },

        changeName() {
            this.flag_loading_A = true // iniciar loading...

            if (this.nomeEditing.length >= 2) {

                if (this.$refs.form.validate()) {

                    //console.log('input ok')

                    this.flag_loading_A = false // desabilitar loading
                    this.flagError_A = false // reset flag error

                    this.nomeA = this.nomeEditing
                    this.nomeEditing = '' // reset var input

                    var idMalha = this.$store.state.jTmpMalha.idMalha
                    var idGrupo = this.$store.state.jTmpMalha.idGrupo

                    // update current json
                    this.$store.state.jTmpMalha.grupo = this.nomeA
                    
                    // update malha/grupo final
                    this.$store.state.liMalhas[idMalha].grupos[idGrupo].grupo = this.nomeA

                    this.flagEditNome = false // desable edit.
                }

            } else {
                
                this.flag_loading_A = false // desabilitar loading
                this.flagError_A = true

                //this.flagEditNome = false // desable edit.
                return
            }
        },

        desableDialog(flagLi) { 
            //console.log('bool flagLi: ',flagLi[0])
            
            var novoEl = {
                'id':this.liZMC.length,
                'nome':flagLi[1],
                'ultima_leitura':0,
                'instalacao':'06/12/2024', // data de hoje
                'desinstalacao':'-',
                'status':'Desativado',
                'coord':flagLi[2],
                'eventos':[
                    {
                        'data':'06/12/2024',
                        'hora':'14:29',
                        'origem':'zmc',
                        'tipo':'Instalação',
                        'nota':'-'
                    },
                ],
                'leituras':[]
            }
            
            this.flagDialogB = flagLi[0] // desabilitar dialog component.

            var idMalha = this.$store.state.jTmpMalha.idMalha
            var idGrupo = this.$store.state.jTmpMalha.idGrupo
            this.$store.state.liMalhas[idMalha].grupos[idGrupo].zmc.push(novoEl)

            //this.liZMC.push(novoEl) // input novo nome string.
            this.init() // atualizar também o front/DOM atual.
        },

        desableDialog2(flagLi) { 
            //console.log('bool flagLi: ',flagLi[0])

            var novoEl = {
                'id':this.liContadores.length,
                'nome':flagLi[1],
                'ultima_leitura':0,
                'instalacao':'06/12/2024', // data de hoje
                'desinstalacao':'-',
                'status':'Desativado',
                'coord':flagLi[2],
                'eventos':[
                    {
                        'data':'06/12/2024',
                        'hora':'14:29',
                        'origem':'medidor',
                        'tipo':'Instalação',
                        'nota':'-'
                    },
                ],
                'leituras':[]
            }
            
            this.flagDialogB2 = flagLi[0] // desabilitar dialog component.

            var idMalha = this.$store.state.jTmpMalha.idMalha
            var idGrupo = this.$store.state.jTmpMalha.idGrupo
            this.$store.state.liMalhas[idMalha].grupos[idGrupo].medidores.push(novoEl)

            //this.liContadores.push(novoEl) // input novo nome string.
            this.init() // atualizar também o front/DOM atual.
        },

        entrada() {
            var idMalha = this.$store.state.jTmpMalha.idMalha
            var idGrupo = this.$store.state.jTmpMalha.idGrupo
            var idZMC = this.$store.state.jTmpMalha.idZMC
            //var nomeMedidor = this.$store.state.jTmpMalha.medidor

            var zmc = this.$store.state.liMalhas[idMalha].grupos[idGrupo].zmc[idZMC]

            // todas as leituras
            var leituras = []
            /*var i=zmc.leituras.length-1
            while (i >= 0) {
                leituras.push(zmc.leituras[i])
                i--
            }*/
            leituras = zmc.leituras

            // exibição do consumo
            var flag24 = true
            var flag7 = true
            var flag30 = true
            var countDay = 0
            //var leituras = medidor.leituras //.reverse() // list
            var dateA = leituras[0].data // data da ultima leitura para comparação.
            //console.log('data mais recente: ',dateA)
            var liL24 = []
            var liL7 = []
            var liL30 = []
            var liLall = []
            var c=0
            while (c < leituras.length) {

                var dateB = leituras[c].data

                if (dateA != dateB && flag24) { // apenas 1 vez nesse if.
                    flag24 = false // terminou as 24h.
                }

                if (flag24) { liL24.push(leituras[c].leitura.toFixed(2)/1000) }

                if (dateA != dateB) {
                    //
                    countDay++ // a cada mudança de dia conta+1
                }

                if (countDay == 7 || c == leituras.length-1) {
                    flag7 = false
                }

                if (flag7) { liL7.push(leituras[c].leitura.toFixed(2)/1000) }

                if (countDay == 30 || c == leituras.length-1) {
                    flag30 = false
                }

                if (flag30) { liL30.push(leituras[c].leitura.toFixed(2)/1000) }

                liLall.push(leituras[c].leitura.toFixed(2)/1000)

                c++
            }
            return [liL24, liL7, liL30, liLall]
        },

        saida(idMedidor) {

            var idMalha = this.$store.state.jTmpMalha.idMalha
            var idGrupo = this.$store.state.jTmpMalha.idGrupo
            //var idMedidor = this.$store.state.jTmpMalha.idMedidor
            //var nomeMedidor = this.$store.state.jTmpMalha.medidor

            var medidor = this.$store.state.liMalhas[idMalha].grupos[idGrupo].medidores[idMedidor]

            // todas as leituras
            var leituras = []
            /*var i=medidor.leituras.length-1
            while (i >= 0) {
                leituras.push(medidor.leituras[i])
                i--
            }*/
            leituras = medidor.leituras

            // exibição do consumo
            var flag24 = true
            var flag7 = true
            var flag30 = true
            var countDay = 0
            //var leituras = medidor.leituras //.reverse() // list
            var dateA = leituras[0].data // data da ultima leitura para comparação.
            //console.log('data mais recente: ',dateA)
            var liL24 = []
            var liL7 = []
            var liL30 = []
            var liLall = []
            var c=0
            while (c < leituras.length) {

                var dateB = leituras[c].data

                if (dateA != dateB && flag24) { // apenas 1 vez nesse if.
                    flag24 = false // terminou as 24h.
                }

                if (flag24) { liL24.push(leituras[c].leitura) }

                if (dateA != dateB) {
                    //
                    countDay++ // a cada mudança de dia conta+1
                }

                if (countDay == 7 || c == leituras.length-1) {
                    flag7 = false
                }

                if (flag7) { liL7.push(leituras[c].leitura) }

                if (countDay == 30 || c == leituras.length-1) {
                    flag30 = false
                }

                if (flag30) { liL30.push(leituras[c].leitura) }

                liLall.push(leituras[c].leitura)

                c++
            }
            return [liL24, liL7, liL30, liLall]
        },

        init() {
            
            var idMalha = this.$store.state.jTmpMalha.idMalha
            var malha = this.$store.state.jTmpMalha.malha
            var idGrupo = this.$store.state.jTmpMalha.idGrupo
            var medidores = this.$store.state.liMalhas[idMalha].grupos[idGrupo].medidores
            var zmc = this.$store.state.liMalhas[idMalha].grupos[idGrupo].zmc

            if (malha == 'UPinC Lda') {

                this.p = '03/11/2024 - 10/11/2024'
                this.en = '1.63 [m3]'
                this.ss = '1.33 [m3]'
                this.dd = '0.3 [m3]'
                this.ddp = '19.88%'
            } else {
                this.p = '06/12/2024'
                this.en = '0.0 [m3]'
                this.ss = '0.0 [m3]'
                this.dd = '0.0 [m3]'
                this.ddp = '0.0%'
            }

            // montar lista search para todos os contadores/medidores pertencentes ao grupo selecionado.

            var tam = medidores.length
            var liMedidores_tmp = []
            var c = 0
            var lastR = 0
            while (c < tam) {

                if (medidores[c].leituras.length > 0) {
                    lastR = medidores[c].leituras[medidores[c].leituras.length-1].leitura
                } else {
                    lastR = 0 // o medidor ainda não recebeu a sua primeira leitura.
                }

                var el = {
                    'idd':medidores[c].id,
                    't':medidores[c].nome,
                    'lastR':lastR, // m3.
                    'initDate':medidores[c].eventos[0].data, // instalação do contador.
                    'endDate':'-',
                    'status':medidores[c].status,
                    'alarme':medidores[c].eventos.length,
                    'b':''
                }
                liMedidores_tmp.push(el)

                this.items.push(el.t) 
                c++
            }
            this.liContadores = liMedidores_tmp // update front/DOM

            var tamZ = zmc.length
            var liZMC_tmp = []
            var lastRZ = 0
            c = 0 // reset
            while (c < tamZ) {

                if (zmc[c].leituras.length > 0) {
                    lastRZ = zmc[c].leituras[zmc[c].leituras.length-1].leitura
                } else {
                    lastRZ = 0 // a zmc ainda não recebeu a sua primeira leitura.
                }

                var elz = {
                    'idd':zmc[c].id,
                    't':zmc[c].nome,
                    'lastR':lastRZ, // m3.
                    'initDate':zmc[c].eventos[0].data, // instalação do contador.
                    'endDate':'-',
                    'status':zmc[c].status,
                    'alarme':zmc[c].eventos.length,
                    'b':''
                }
                liZMC_tmp.push(elz)

                c++
            }
            this.liZMC = liZMC_tmp // update front/DOM

            this.nomeA = this.$store.state.jTmpMalha.grupo

            // balanço hidrico

            // entradas
            var li = this.entrada()
            //console.log('entradas: ',li[3])
            this.series[0].data = li[3]

            // saídas
            //var medidor = this.$store.state.liMalhas[idMalha].grupos[idGrupo].medidores[mm]
            //var medidores = this.$store.state.liMalhas[idMalha].grupos[idGrupo].medidores
            var liSaidas = []
            var mm = 0
            while (mm < medidores.length) {
                liSaidas.push(this.saida(mm)) // passar idMedidor
                //console.log('liSaidas: ',liSaidas)
                mm++
            }
            //console.log('entradas: ',liS[3])
            let somaListas = liSaidas[0][3].map((num, index) => num + liSaidas[1][3][index]);
            
            //console.log('somaListas: ',somaListas)
            var s = 0
            while (s < somaListas.length) {
                somaListas[s] = somaListas[s]/1000
                somaListas[s] = somaListas[s].toFixed(2)
                //console.log('somaListas[s]: ',somaListas[s])
                s++
            }
            //console.log('somaListas: ',somaListas)

            this.series[1].data = somaListas

            // dif
            var dif = li[3].map((num, index) => num - somaListas[index]);
            var alvo20 = dif.map((num) => num * 0.8);
            this.seriesB[0].data = dif
            this.seriesB[1].data = alvo20
        }
    },

    created() {
        window.scrollTo(0,0)

        this.init()
        //console.log('init grupo/classe')
    }
}
</script>