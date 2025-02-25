<style scoped>
    @import url("../../../styles/dashagro/smartfarm/menufarm.scss");
</style>

<template>
    <div class="box_menuFarm">

        <div class="el_menuFarm">

            <div class="item_el" @click="select_item(el)" v-for="(el,i) in li_itens" :key="i">{{ el.tit }}</div>
            
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            li_itens:[
                {'tit':'Nitrogênio [N] (Azoto) [mg/kg]','get':'info_n_farm','img':require('../../../assets/krigN_show.png'),'un':'mg/kg','img_s':require('../../../assets/krigN_show_ss.png')},
                {'tit':'Fósforo [P] [mg/kg]','get':'info_p_farm','img':require('../../../assets/h-beta0-error.png'),'un':'mg/kg','img_s':require('../../../assets/h-beta0-error.png')},
                {'tit':'Potássio [K] [mg/kg]','get':'info_k_farm','img':require('../../../assets/h-beta0-error.png'),'un':'mg/kg','img_s':require('../../../assets/h-beta0-error.png')},
                {'tit':'pH','get':'info_ph_farm','img':require('../../../assets/h-beta0-error.png'),'un':'pH','img_s':require('../../../assets/h-beta0-error.png')},
                {'tit':'Humidade [%]','get':'info_h_farm','img':require('../../../assets/krigH_show.png'),'un':'%','img_s':require('../../../assets/krigH_show_s.png')},
                {'tit':'Temperatura [°C]','get':'info_t_farm','img':require('../../../assets/krigT_show.png'),'un':'ºC','img_s':require('../../../assets/krigT_show_s.png')},
                {'tit':'Condutividade elétrica [uS/cm]','get':'info_ce_farm','img':require('../../../assets/krigCE_show.png'),'un':'uS/cm','img_s':require('../../../assets/krigCE_show_s.png')}
            ],
        }
    },

    methods:{
        select_item(item){ 
            this.$store.state.flag_loading_param_farm = true // habilitar loading. deixar page em espera de dados.
            
            //console.log('rota atual: ')
            //console.log(this.$router.currentRoute.value.path) // vue3
            //console.log(this.$router.history.current.path) // vue2
            
            if(this.$router.currentRoute.value.path != '/param') {

                this.$router.push('/param')
            }

            // 22/11/2024
            this.$store.state.farm_name = this.$store.state.farm_li_names[this.$store.state.global_indexFarm]
            var banco = ''
            if (this.$store.state.global_indexFarm == 0) {
                banco = 'farm'
            } else {
                banco = 'farm2'
            }
            
            var self = this

            // new 01/10/2024
            // chamar info param => item.get
            //console.log('item.get: ',item.get)
            //var payload = {'data':item.get}
            var payload = {'data':item.get,'banco':banco} // 22/11/2024
            axios.post(self.$store.state.pathAxiosGetParamFarmV2, payload).then(function (res) {
                //console.log(res.data.result)
                //console.log('tam: ',res.data.result.length)

                self.$store.state.param_selected = item.tit // nome local do param.

                var liTmpValues = []
                var liTmpDates = []
                var c=0
                while (c < res.data.result.length) {

                    liTmpValues.push(res.data.result[c].param)
                    
                    if (c == 0 || c == res.data.result.length-1) {

                        liTmpDates.push(res.data.result[c].date.slice(0,5))
                    
                    } else {

                        liTmpDates.push('')
                    }
                    c++
                }
                self.$store.state.param_values = liTmpValues
                self.$store.state.param_dates = liTmpDates
                //console.log('self.$store.state.param_values: ',self.$store.state.param_values)

                // tempo de carregamento também atribuído no ParamFarm.vue
                self.$store.state.flag_loading_param_farm = false // desabilitar loading. Abrir page.
            })

            // chamar info param => item.get
            /*var payload = {'data':item.get}
            axios.post(self.$store.state.pathAxiosGetParamFarm, payload).then(function (res) {

                //console.log(res.data.result)
                //console.log(res.data.result.processed_day)
                //.reverse()

                var li_labels_processed = []
                var li_labels_init = res.data.result.processed_day
                let c = 1
                while (c < li_labels_init.length || c < 6) {
                    if (li_labels_init[li_labels_init.length - c]) {
                        li_labels_processed.push(li_labels_init[li_labels_init.length - c]['dia'])
                    }
                    c++
                }
                //console.log('li_labels_processed: ',li_labels_processed)

                // colocar no mesmo loop. Pois as arrays têm as mesmas dimensões.
                var li_data_processed = []
                var seriesB_max = []
                var seriesB_min = []
                var li_data_init = res.data.result.processed_day
                //console.log('tam li_data_init.length: ',li_data_init.length)
                let i = 1
                while (i < li_data_init.length || i < 6) {
                    if (li_data_init[li_data_init.length - i]) {
                        //`${parseFloat(valor).toFixed(2)}`
                        li_data_processed.push(li_data_init[li_data_init.length - i]['media'].toFixed(2))
                        seriesB_max.push(li_data_init[li_data_init.length - i]['max'].toFixed(2))
                        seriesB_min.push(li_data_init[li_data_init.length - i]['min'].toFixed(2))
                    }
                    i++
                }
                //console.log('li_data_processed: ',li_data_processed)
                //console.log('seriesB_min: ',seriesB_min)
                //console.log('seriesB_min: ',seriesB_max)
                //console.log('li_labels_processed: ',li_labels_processed)
                //console.log('li_labels_processed[0]: ',li_labels_processed[0])
                //console.log('li_labels_processed[-1]: ',li_labels_processed[-1])

                var data1SeriesB = []
                var data2SeriesB = []
                var indexAux = 0
                let k = 1 // inicia pelo último (last date) | indexAux inverte o sentido na contagem.
                //console.log('(li_labels_processed.length*-1): ',(li_labels_processed.length*-1))
                while (k <= li_labels_processed.length) { // loop decrescente.
                    indexAux = li_labels_processed.length-k
                    // min max
                    data1SeriesB.push({'x':li_labels_processed[indexAux],'y':[seriesB_min[indexAux], seriesB_max[indexAux]]})
                    //console.log('data1SeriesB: ',data1SeriesB[indexAux])
                    // media
                    data2SeriesB.push({'x':li_labels_processed[indexAux],'y':li_data_processed[indexAux]})
                    //console.log('data2SeriesB: ',data2SeriesB[indexAux])
                    k++
                }

                var seriesB = [
                    {
                        type: 'rangeArea',
                        name: 'Área de alcance',
                        data: data1SeriesB.slice(data1SeriesB.length-5) // apenas os ultimos 5.
                    },
                    {
                        type: 'line',
                        name: 'Média',
                        data: data2SeriesB.slice(data2SeriesB.length-5)
                    }
                ]
                //console.log('seriesB: ',seriesB)

                /*var seriesB = [
                    {
                        type: 'rangeArea',
                        name: 'Área de alcance',
                        data: [
                            {
                                x: li_labels_processed[4],
                                y: [seriesB_min[4], seriesB_max[4]]
                            },
                            {
                                x: li_labels_processed[3],
                                y: [seriesB_min[3], seriesB_max[3]]
                            },
                            {
                                x: li_labels_processed[2],
                                y: [seriesB_min[2], seriesB_max[2]]
                            },
                            {
                                x: li_labels_processed[1],
                                y: [seriesB_min[1], seriesB_max[1]]
                            },
                            {
                                x: li_labels_processed[0],
                                y: [seriesB_min[0], seriesB_max[0]]
                            }
                        ]
                    },
                
                    {
                        type: 'line',
                        name: 'Média',
                        data: [
                            {
                                x: li_labels_processed[4],
                                y: li_data_processed[4]
                            },
                            {
                                x: li_labels_processed[3],
                                y: li_data_processed[3]
                            },
                            {
                                x: li_labels_processed[2],
                                y: li_data_processed[2]
                            },
                            {
                                x: li_labels_processed[1],
                                y: li_data_processed[1]
                            },
                            {
                                x: li_labels_processed[0],
                                y: li_data_processed[0]
                            }
                        ]
                    }
                ] // <------------------------- * /

                var li_data_processed_graph = li_data_processed.reverse()
                li_data_processed_graph = li_data_processed_graph.slice(li_data_processed_graph.length-5) // apenas os ultimos 5.

                var li_data = [{'name':"Valor atual",'type':"column",'data':li_data_processed_graph}]
                //var li_data = [{'name':"Valor atual",'type':"column",'data':[10,20,30]}]

                var li_labels_processed_graph = li_labels_processed.reverse()
                li_labels_processed_graph = li_labels_processed_graph.slice(li_labels_processed_graph.length-5) // apenas os ultimos 5.

                var li_labels = {
                    'labels':li_labels_processed_graph, // media
                    'chart':{'type':"line"},
                    'stroke':{'width':[0,4]},
                    'yaxis':[{'title':{'text':"VALOR ATUAL"}}]
                }

                self.$store.state.param_distrib = item.img// imagem krig. (tmp LOCAL)
                self.$store.state.param_distrib_s = item.img_s
                self.$store.state.param_z_manejo = res.data.result.series_z // series heat map (zonas de manejo).
                self.$store.state.param_z_op_manejo = res.data.result.options_z // options heat map (zonas de manejo).
                self.$store.state.param_hist_bar = li_data // series bar graph (media).
                self.$store.state.param_hist_op_bar = li_labels // series bar graph (media).
                self.$store.state.param_chat_log = res.data.result.chatLog // list

                self.$store.state.seriesB = seriesB
                self.$store.state.li_labels_processed = li_labels_processed
                //console.log('li_labels_processed: ',li_labels_processed)
                self.$store.state.li_data_processed = li_data_processed
                //console.log('li_data_processed: ',li_data_processed)

                self.$store.state.param_selected = item.tit // nome.
                self.$store.state.un_param_selected = item.un // unidade de medida.

                //console.log('series_m: ',self.$store.state.param_hist_bar)
                
                // tempo de carregamento também atribuído no ParamFarm.vue
                self.$store.state.flag_loading_param_farm = false // desabilitar loading. Abrir page.
            })*/
            
        }
    },

    created() {
        //
    }
}
</script>