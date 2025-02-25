<style scoped>
    @import url("../../../styles/dashagro/smartfarm/lineAnalisePeriodo.scss");
</style>

<template>
    <div class="box_lineAnalisePeriodo mt-3">

        <div class="painel_volat">

            <span class="tit animate__animated animate__flash">Análise comparativa por período</span>

            <div class="display_volat">
                
                <div class="box_periodo">
                    <!-- linha -->
                    <div class="linhaSeletores">
                        
                        <div class="seletor">
                            <div class="tit mb-2">Início</div>
                            <v-autocomplete
                            v-model="selectedDate"
                            :items="$store.state.li_labels_processed"
                            class=""
                            color="orange"
                            :height="20"
                            label="Data inicial"
                            ></v-autocomplete>
                        </div>

                        <div class="seletor">
                            <div class="tit mb-2">Fim</div>
                            <v-autocomplete
                            v-model="selectedDate2"
                            :items="$store.state.li_labels_processed"
                            class=""
                            color="orange"
                            :height="20"
                            label="Data final"
                            ></v-autocomplete>
                        </div>
                    </div>
                    
                    <v-btn class="btn mt-2" width="90%" outlined dense @click="buscar()">buscar</v-btn>

                    <span v-if="flagMsgErroDate" class="mt-2" :style="{'font-size':'0.7rem','color':'red'}">{{ msgDate }}</span>
                </div>

                <div class="box_central" v-if="!flagGraphShow">
                    <div>Aguardando seleção</div>
                </div>

                <!-- graph -->
                <apexchart v-if="flagGraphShow"
                class="mt-2"
                width="200"
                height="300" 
                type="bar" 
                :options="dict_labels" 
                :series="series"
                ></apexchart>

                <div class="infoPainel">
                    <!-- coluna -->
                    <div class="colunaResultado">
                        
                        <div class="tit mb-2">Resultados</div>

                        <div class="linha_result">
                            <span class="mr-1">Período:</span>
                            <span>{{liResult[0]}}</span>
                        </div>

                        <v-divider :thickness="5" :style="{'align-self':'center','width':'95%'}"></v-divider>

                        <div class="linha_result">
                            <span class="mr-1">Variação:</span>
                            <span>{{liResult[1]}}</span>
                        </div>

                        <div class="linha_result">
                            <span class="mr-1">Variação percentual:</span>
                            <span>{{liResult[2]}}</span>
                        </div>

                        <v-divider :thickness="5" :style="{'align-self':'center','width':'95%'}"></v-divider>

                        <div class="linha_result">
                            <span class="mr-1">Amplitude:</span>
                            <span>{{liResult[3]}}</span>
                        </div>

                        <div class="linha_result">
                            <span class="mr-1">Amplitude percentual:</span>
                            <span>{{liResult[4]}}</span>
                        </div>

                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            flagGraphShow:false,

            //liDate:['12/04/2024','13/04/2024','14/04/2024','15/04/2024','16/04/2024'],
            selectedDate:'', // init
            selectedDate2:'',
            flagMsgErroDate:false,
            msgDate:'',
            liResult:[],

            series: [
                {
                    name: '12/04/2024',
                    data: [44]
                }, 
                {
                    name: '16/04/2024',
                    data: [76]
                }
            ],

            dict_labels: {
                'labels':['uS/cm'], // media
                'chart':{'type':"line"},
                'stroke':{'width':[0,4]},
                'yaxis':[{'title':{'text':"VALOR COMPARADO"}}]
            }
        }
    },

    methods:{
        buscar() {
            // condicionar ordem de seleção date.

            //
            if (this.selectedDate != '' && this.selectedDate2 != '') {
                
                this.flagGraphShow = false // reset exibição.

                let c = 0
                var liLabel = this.$store.state.li_labels_processed
                var DataDate1 = ''
                var DataDate2 = ''
                var minimo1 = ''
                var maximo1 = ''
                var minimo2 = ''
                var maximo2 = ''
                var indexInit = 0
                var indexFim = 0
                
                while (c < liLabel.length) {
                    if (this.selectedDate == liLabel[c]) {
                        DataDate1 = this.$store.state.li_data_processed[c] // recortar dados do index.
                        minimo1 = this.$store.state.seriesB[0]['data'][c]['y'][0] // min
                        maximo1 = this.$store.state.seriesB[0]['data'][c]['y'][1] // max
                        indexInit = c
                    }
                    if (this.selectedDate2 == liLabel[c]) {
                        DataDate2 = this.$store.state.li_data_processed[c] // recortar dados do index.
                        minimo2 = this.$store.state.seriesB[0]['data'][c]['y'][0] // min
                        maximo2 = this.$store.state.seriesB[0]['data'][c]['y'][1] // max
                        indexFim = c
                    }
                    c++
                }
                this.flagMsgErroDate = false // reset flag.

            } else {
                this.flagMsgErroDate = true
                this.msgDate = 'Selecione as datas corretamente'
                return
            }

            // -- processar dados.
            //console.log('DataDate1: ',DataDate1)
            //console.log('DataDate2: ',DataDate2)

            // diferença de tempo.
            // dias == index final - index inicial
            var periodo = indexFim - indexInit
            periodo = `${periodo} dias`
            // diferença de valor cru.
            var difValue = parseFloat(DataDate2) - parseFloat(DataDate1)
            // diferença/variação percentual.
            var difValuePerc = parseFloat(100-(DataDate1*100)/DataDate2).toFixed(2)
            difValuePerc = `${difValuePerc}%`
            //var difMax = maximo2 - maximo1
            //var difMin = minimo1 - minimo2
            //console.log('(maximo1 - minimo1): ',(maximo1 - minimo1))
            //console.log('(maximo2 - minimo2): ',(maximo2 - minimo2))
            var difAmplitude = (maximo2 - minimo2) - (maximo1 - minimo1)
            //console.log('(difAmplitude*100)/(maximo1 - minimo1): ',(difAmplitude*100)/(maximo1 - minimo1))
            var difAmpPerc = (difAmplitude*100)/(maximo1 - minimo1).toFixed(2)
            difAmpPerc = `${difAmpPerc}%`
            
            //
            this.liResult = [
                periodo,
                difValue.toFixed(2),
                difValuePerc,
                difAmplitude.toFixed(2),
                difAmpPerc
            ]

            // series local recebe o processamento.
            this.series[0]['data'] = [DataDate1]
            this.series[0]['name'] = this.selectedDate
            this.series[1]['data'] = [DataDate2]
            this.series[1]['name'] = this.selectedDate2

            setTimeout(() => {
                this.flagGraphShow = true // habilitar exibição do gráfico.
            },500)
            
        }
    },

    created() {
        //this.$store.state.li_labels_processed
        //this.$store.state.li_data_processed

        this.dict_labels['labels'] = [this.$store.state.un_param_selected] // encaixe no molde.
    }
}
</script>