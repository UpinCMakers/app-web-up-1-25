<style scoped>
    @import url("../../styles/animSmartGarden.scss");
</style>

<template>

    <div class="box_animSmartGarden">
        
        <div class="linha_anim">

            <div v-for="(pic,i) in liAnim[0]" :key="i" class="col_anim">

                <v-img v-if="pic.flagShowIcon"
                :style="pic.estilo" 
                :src="pic.img" 
                />

            </div>
        </div>
        
        <div class="linha_anim">
            <div v-for="(pic,i) in liAnim[1]" :key="i" class="col_anim">

                <v-img v-if="pic.flagShowIcon"
                :style="pic.estilo" 
                :src="pic.img" 
                />

            </div>
        </div>

        <div class="linha_anim">
            <div v-for="(pic,i) in liAnim[2]" :key="i" class="col_anim">

                <v-img v-if="pic.flagShowIcon"
                :style="pic.estilo" 
                :src="pic.img" 
                />

            </div>
        </div>

        <div class="linha_anim">
            <div v-for="(pic,i) in liAnim[3]" :key="i" class="col_anim">

                <v-img v-if="pic.flagShowIcon"
                :style="pic.estilo" 
                :src="pic.img" 
                />

            </div>
        </div>

    </div>

</template>

<script>
export default {

    methods: {
        operadorTempo() {
            setTimeout(() => {
                //console.log('conjunto1')
                this.liAnim[2][2].flagShowIcon = true
                this.liAnim[1][1].flagShowIcon = true
            }, 1000);
            setTimeout(() => {
                //console.log('conjunto2')
                this.liAnim[2][3].flagShowIcon = true
                this.liAnim[1][4].flagShowIcon = true
            }, 3000);
            setTimeout(() => {
                //console.log('conjunto3')
                this.liAnim[0][5].flagShowIcon = true
                this.liAnim[1][5].flagShowIcon = true
            }, 5000);
            /*setTimeout(() => {
                //console.log('conjunto4')
                this.liAnim[0][6].flagShowIcon = true
                this.liAnim[1][6].flagShowIcon = true
                this.liAnim[2][6].flagShowIcon = true
            }, 7000);*/
            setTimeout(() => {
                //console.log('zerar')
                this.liAnim[3][0].flagShowIcon = false
                this.liAnim[2][2].flagShowIcon = false
                this.liAnim[1][1].flagShowIcon = false
                this.liAnim[2][3].flagShowIcon = false
                this.liAnim[1][4].flagShowIcon = false
                this.liAnim[0][5].flagShowIcon = false
                this.liAnim[1][5].flagShowIcon = false

                this.operadorTempoP2()
            }, 9000);
        },
        operadorTempoP2() {
            setTimeout(() => {
                //console.log('conjunto1')
                this.liAnim[0][5].flagShowIcon = true
                this.liAnim[1][5].flagShowIcon = true
            }, 1000);
            setTimeout(() => {
                //console.log('conjunto2')
                this.liAnim[2][3].flagShowIcon = true
                this.liAnim[1][4].flagShowIcon = true
            }, 3000);
            setTimeout(() => {
                //console.log('conjunto3')
                this.liAnim[2][2].flagShowIcon = true
                this.liAnim[1][1].flagShowIcon = true

                this.liAnim[3][0].flagShowIcon = true
            }, 5000);
            setTimeout(() => {
                //console.log('zerar2')
                //this.liAnim[3][0].flagShowIcon = false
                this.liAnim[2][2].flagShowIcon = false
                this.liAnim[1][1].flagShowIcon = false
                this.liAnim[2][3].flagShowIcon = false
                this.liAnim[1][4].flagShowIcon = false
                this.liAnim[0][5].flagShowIcon = false
                this.liAnim[1][5].flagShowIcon = false
                this.liAnim[0][6].flagShowIcon = false
                this.liAnim[1][6].flagShowIcon = false
                this.liAnim[2][6].flagShowIcon = false

                this.operadorTempo()
            }, 7000);
        }
    },
    
    data() {
        return {

            liAnim: [
                [   
                    '','','','','',
                    {
                        estilo:{'max-width':'40px','max-height':'40px'},
                        img:require('../../assets/ff5.png'),
                        flagShowIcon: false,
                    },
                    {
                        estilo:{'max-width':'40px','max-height':'40px'},
                        img:require('../../assets/ff7.png'),
                        flagShowIcon: false,
                    }
                ],
                [
                    '',
                    {
                        estilo:{'max-width':'40px','max-height':'40px'},
                        img:require('../../assets/ff2.png'),
                        flagShowIcon: false,
                    },
                    '',
                    {
                        estilo:{'max-width':'40px','max-height':'40px'},
                        img:require('../../assets/ff4.png'),
                        flagShowIcon: false,
                    },
                    {
                        estilo:{'max-width':'40px','max-height':'40px'},
                        img:require('../../assets/ff4.png'),
                        flagShowIcon: false,
                    },
                    {
                        estilo:{'max-width':'40px','max-height':'40px'},
                        img:require('../../assets/ff6.png'),
                        flagShowIcon: false,
                    },
                    {
                        estilo:{'max-width':'40px','max-height':'40px'},
                        img:require('../../assets/ff7.png'),
                        flagShowIcon: false,
                    }
                ],
                [
                    '','',
                    {
                        estilo:{'max-width':'40px','max-height':'40px'},
                        img:require('../../assets/ff1.png'),
                        flagShowIcon: false,
                    },
                    {
                        estilo:{'max-width':'40px','max-height':'40px'},
                        img:require('../../assets/ff3.png'),
                        flagShowIcon: false,
                    },
                    '','',
                    {
                        estilo:{'max-width':'40px','max-height':'40px'},
                        img:require('../../assets/ff5.png'),
                        flagShowIcon: false,
                    }
                ],
                [
                    {
                        estilo:{'max-width':'100px','max-height':'40px'},
                        img:require('../../assets/ff0.png'),
                        flagShowIcon: true,
                    }                    
                ]
            ]
        }
    },

    mounted () {

        this.operadorTempo()
    }
}
</script>