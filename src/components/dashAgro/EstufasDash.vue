<style scoped>
    @import url("../../styles/dashagro/estufasDash.scss");
</style>

<template>
    <div class="box_estufasDash">

        <!-- Título da sub-página -->
        <span class="tit_estufas hidden-sm-and-down" :style="{'font-size':'2rem'}">Minhas Estufas</span>
        <span class="tit_estufas hidden-md-and-up">Minhas Estufas</span>
        
        <!-- Painel ESTUFA individual -->
        <div 
        @mouseover="el.colorHover = colorIn"
        @mouseleave="el.colorHover = colorOut"
        class="painel_estufa" 
        v-for="(el, index) in liEstufas" 
        :key="index"
        :style="{'box-shadow':el.colorHover}"
        @click="callEstufa(index)"
        >    
            <span class="item_painel">{{ el.nome }}</span>
            <div class="item_painel">
                <span>Status</span>
                <v-icon :style="{'color': el.color}">{{ el.icon }}</v-icon>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            flagEstufa:false,

            colorIn:'0px 2px 4px rgb(247,215,46)',
            colorOut:'0px 2px 4px rgba(1,1,1,0.8)',

            liEstufas:[
                {'nome':'Lab UPINC','status':'on','color':'green','icon':'mdi-map-marker-check','colorHover':'0px 2px 4px rgba(1,1,1,0.8)'},
                {'nome':'Test Client','status':'on','color':'red','icon':'mdi-map-marker-alert','colorHover':'0px 2px 4px rgba(1,1,1,0.8)'},
            ]
        }
    },

    methods: {
        callEstufa(index) {
            //console.log('this.liEstufas[index]: ',this.liEstufas[index])
            this.$emit('selectEstufa', this.liEstufas[index]) // ou passar apenas o index para sintonizar
        }
    },

    created() {
        // CHAMAR INFO DE TODAS AS ESTUFAS. SERÃO RETORNADAS A PARTIR DO callEstufa(index)

        //this.$store.commit('srcIPloja') // without param. Initial main GET Req.
    }
}
</script>