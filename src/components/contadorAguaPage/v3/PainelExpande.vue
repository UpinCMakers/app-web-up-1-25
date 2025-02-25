<style scoped>
    @import url("../../../styles/contadorAguaPage/v3/painelExpande.scss");
</style>

<template>
    <div class="box_painelExpande">

        <div class="painelCardExpansor">
            <!--<div class="tit_faq">FAQ</div>-->
            <v-expansion-panels class="cardExpansor">
                
                <v-expansion-panel v-for="(item,i) in liContent" :key="i" class="el_cardExpansor mt-1">
                    
                    <!-- TITULO -->
                    <v-expansion-panel-title class="titCardExpansor"
                    :style="{'width':'100%'}"
                    >{{ item.pergunta }}</v-expansion-panel-title>

                    <!-- TEXT -->
                    <v-expansion-panel-text class="respCardExpansor">

                        <div class="linhaTitResp">
                            <div class="hCard" v-for="(t,i) in item.liSubTit" :key="i">{{ t }}</div>
                        </div>

                        <div class="linhaResp">
                            <div class="subLiResp" v-for="(r,j) in item.liResp" :key="j">
                                <div class="rCard" v-for="(rc,k) in r" :key="k">
                                    {{ rc }}
                                </div>
                            </div>
                        </div>
                    </v-expansion-panel-text>

                </v-expansion-panel>
            </v-expansion-panels>
        </div>

    </div>
</template>

<script>
export default {

    props:['name','liKeys','liValues'],

    data() {
        return {

            liContent: [
                /*
                {
                    pergunta:'Leituras', 
                    liSubTit:['Data','Hora','Leitura','RSSI','SNR'],
                    liResp:[
                        ['03/11/2024','15:23','125.28','0','0'],
                    ],
                }*/
                {
                    pergunta:'', 
                    liSubTit:[],
                    liResp:[],
                }
            ],
        }
    },
    methods: {
        //
        init() {
            //console.log('this.name: ',this.name)
            //console.log('this.liKeys: ',this.liKeys)
            //console.log('this.liValues: ',this.liValues)

            this.liContent[0]['pergunta'] = this.name // props
            this.liContent[0]['liSubTit'] = this.liKeys // props
            this.liContent[0]['liResp'] = this.liValues // props
            if (this.liValues.length > 0) { this.liContent[0]['liResp'] = this.liContent[0]['liResp'].reverse() }

            //console.log('this.liContent: ',this.liContent)
            //console.log('init [ok]')
        }
    },

    created() {
        window.scrollTo(0,0)

        this.init()
    }
}
</script>