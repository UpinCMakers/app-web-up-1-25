<style scoped>
    @import url("../../styles/contadorAguaPage/medidor.scss");
</style>

<template>
    <div class="box_medidor">

        <div class="painel">

            <!-- INFO -->
            <div class="subPainel">
                <div class="label"><span class="ml-2">Malha</span></div>
                
                <div class="boxTitGeral">
                    <span class="ml-2">{{ this.$store.state.jTmpMalha.malha }}</span>
                </div>

                <div class="label mt-2"><span class="ml-2">Grupo</span></div>
                
                <div class="boxTitGeral">
                    <span class="ml-2">{{ this.$store.state.jTmpMalha.grupo }}</span>
                </div>

                <div class="label mt-2"><span class="ml-2">Medidor</span></div>

                <div class="boxTitGeralMain">
                    <span class="ml-2" v-if="!flagEditNome">{{ this.$store.state.jTmpMalha.medidor }}</span>

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
                    <span>Editar nome</span>
                    <v-icon>mdi-square-edit-outline</v-icon>
                </v-btn>
            </div>

            <!-- MAPA -->
            <div class="painelMap">

                <span class="label">Coordenada geográfica</span>

                <div class="boxCoord"><!--@coordFromClick="coordRcvedFromClick($event)" -->
                    <MapLeafExib 
                    :coord="coordA"
                    :style="{'z-index':'1'}"
                    />
                    <div class="aux_boxCoord"></div>
                </div>
            </div>
        </div>

        <!-- Selecionar informações medidor -->
        <div class="painelSelect mt-4">

            <div class="boxT" v-for="(info,n) in liTit" :key="n"
            :style="{'background':info.b}"
            @mouseover="changeBtnMenuTit(n)"
            @mouseleave="changeBtnMenuTit(n)"
            >
                <span :style="{'color':info.c}">{{ info.t }}</span>
            </div>
        </div>

        <!-- Informações selecionadas -->

        <MGeral v-if="flagTitSelected == 'Geral'" :geralM="geralM" />

        <MConsumo v-if="flagTitSelected == 'Consumo'" :consumoM="consumoM" />

        <MLeituras v-if="flagTitSelected == 'Leituras'" :leiturasM="leiturasM" />

        <MAlarmes v-if="flagTitSelected == 'Eventos'" :eventosM="eventosM" />

    </div>
</template>

<script>
import MGeral from './MGeral'
import MConsumo from './MConsumo'
import MLeituras from './MLeituras'
import MAlarmes from './MAlarmes'

import MapLeafExib from './MapLeafExib'

export default {

    components:{MGeral,MConsumo,MLeituras,MAlarmes,MapLeafExib},

    data() {
        return {
            //
            liTit:[
                {'t':'Geral','b':'rgb(247,215,46)','c':'black'},
                {'t':'Consumo','b':'','c':'bisque'},
                {'t':'Leituras','b':'','c':'bisque'},
                {'t':'Eventos','b':'','c':'bisque'}
            ],
            flagTitSelected:'Geral',

            coordA:[],
            nomeA:'UP/6541668',
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

            // props
            geralM:{},
            consumoM:{},
            leiturasM:{},
            eventosM:{},
        }
    },

    methods:{
        changeBtnMenuTit(index) { 
            var auxCounter = 0
            while (auxCounter < this.liTit.length) { // desabilita todos os não selecionados via hover.
                if (auxCounter != index) {
                    this.liTit[auxCounter].b = '' 
                    this.liTit[auxCounter].c = 'bisque' 
                }
                auxCounter++
            }

            this.liTit[index].b = 'rgb(247,215,46)' // habilita apenas o hover index.
            this.liTit[index].c = 'black'
            this.flagTitSelected = this.liTit[index].t
        },

        changeBtn(strFlag) { 
            if (strFlag == 'on') { this.fullContInfo.b = 'rgb(247,215,46)' }
            else { this.fullContInfo.b = '' }
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

                    this.flagEditNome = false // desable edit.
                }

            } else {
                
                this.flag_loading_A = false // desabilitar loading
                this.flagError_A = true

                //this.flagEditNome = false // desable edit.
                return
            }
        },
    },

    created() {
        window.scrollTo(0,0)

        var idMalha = this.$store.state.jTmpMalha.idMalha
        var idGrupo = this.$store.state.jTmpMalha.idGrupo
        var idMedidor = this.$store.state.jTmpMalha.idMedidor
        var nomeMedidor = this.$store.state.jTmpMalha.medidor

        var medidor = this.$store.state.liMalhas[idMalha].grupos[idGrupo].medidores[idMedidor]
        
        this.nomeA = nomeMedidor
        this.coordA = medidor.coord

        // geral
        this.geralM = {
            'idd':idMedidor,
            't':nomeMedidor,
            'lastR':medidor.ultima_leitura/1000, // m3.
            'initDate':medidor.instalacao, // instalação do contador.
            'endDate':medidor.desinstalacao,
            'status':medidor.status,
            'coord':medidor.coord,
            'alarme':medidor.eventos.length,
            'b':''
        }

        // todas as leituras
        var readingsInfo = []
        var i=medidor.leituras.length-1
        while (i >= 0) {
            readingsInfo.push(medidor.leituras[i])
            i--
        }
        this.leiturasM = readingsInfo

        // todos os eventos
        var readingsE = []
        var j=medidor.eventos.length-1
        while (j >= 0) {
            readingsE.push(medidor.eventos[j])
            j--
        }
        this.eventosM = readingsE
        
        // todas as leituras
        var leituras = []
        i=medidor.leituras.length-1
        while (i >= 0) {
            leituras.push(medidor.leituras[i])
            i--
        }

        // exibição do consumo
        var r24 = medidor.ultima_leitura // ultimas 24h | init com ultima leitura
        var flag24 = true
        var r7 = medidor.ultima_leitura // ultimos 7 dias
        var countDay = 0
        var r30 = medidor.ultima_leitura // ultimos 30 dias
        //var leituras = medidor.leituras //.reverse() // list
        var dateA = leituras[0].data // data da ultima leitura para comparação.
        //console.log('data mais recente: ',dateA)
        var c=1
        while (c < leituras.length) {

            var dateB = leituras[c].data

            if (dateA != dateB && flag24) { // apenas 1 vez nesse if.
                //
                r24 = (leituras[0].leitura - leituras[c-1].leitura)/1000
                flag24 = false // terminou as 24h.
            }

            if (dateA != dateB) {
                //
                countDay++ // a cada mudança de dia conta+1
            }

            if (countDay == 7 || c == leituras.length-1) {
                if (c == leituras.length-1) {
                    r7 = medidor.ultima_leitura/1000
                } else {
                    r7 = (leituras[0].leitura - leituras[c].leitura)/1000
                }
            }

            if (countDay == 30 || c == leituras.length-1) {
                if (c == leituras.length-1) {
                    r30 = medidor.ultima_leitura/1000
                } else {
                    r30 = (leituras[0].leitura - leituras[c].leitura)/1000
                }
            }

            c++
        }
        this.consumoM = {
            'lastR':medidor.ultima_leitura/1000, // litros para m3.
            'lastD':r24,
            'lastW':r7,
            'lastM':r30, // m3
        }
    }
}
</script>