<style scoped>
    @import url("../../styles/dashMain/cardServDashMain.scss");
</style>

<template>
    <div class="box_cardServDashMain" 
    @click="callPageServ(rota)"
    @mouseover="shadowCardServ = '0px 3px 6px rgb(247,215,46)'"
    @mouseleave="shadowCardServ = '0px 1px 2px black'"
    :style="{'box-shadow':shadowCardServ}"
    >

        <div class="cardDashImg"
        :style="{
        backgroundImage:img,
        backgroundSize: 'cover', // contain cover
        backgroundPosition: 'bottom' // center
        }"
        ></div>

        <div class="cardDashTit" :style="{'font-weight':'400'}">
            <span class="cardDashElTit" v-for="(p, j) in liServs" :key=j>{{ p }}</span>
        </div>

    </div>
</template>

<script>
export default {

    props:['serv','img','content','rota'],

    //components:{CardUserDashMain},

    data() {
        return {
            //
            shadowCardServ:'0px 1px 2px black',
            liServs:[],
        }
    },

    methods:{
        //
        callPageServ(rota) {

            //console.log('rota [serv]: ', rota)
            this.$router.push(rota)

            /*console.log('content [serv]: ', content)

            if (this.serv == 'Contador Água') { 
                console.log('contador agua encontrado')
                this.$router.push('/ca')
            }

            if (this.serv == 'Contador Água') { 
                console.log('contador agua encontrado')
                this.$router.push('/ca')
            }*/
        }
    },

    created() {
        //window.scrollTo(0,0)
        this.liServs = this.serv
        this.liServs = this.liServs.split(" ");
    }
}
</script>