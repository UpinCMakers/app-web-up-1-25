<style scoped>
    @import url("../../styles/automation/servs.scss");
</style>

<template>
    <div class="box_servs">

        <div class="tit">
            <v-icon class="mt-2" :style="{'color':'rgb(31,122,177)'}">{{ elLocal.icon }}</v-icon>
            <span>{{ elLocal.nome }}</span>
        </div>

        <div class="linha1">
            <!--<span>{{ el.txtBody }}</span>-->
            <div class="frase">
                <span class="palavra" v-for="(p, i) in elLocal.txtBody" :key=i>{{ p }}</span>
            </div>

            <span class="mt-4" :style="{'font-size':'1.6rem'}">{{ elLocal.txtBody2 }}</span>
        </div>

        <div class="linha2">
            <v-btn block color="#092D4F" :style="{'cursor':'pointer'}" @click="callPage(elLocal.rota)">
                <span :style="{'color':'rgba(247,215,46,1)'}">Ver Mais</span>
            </v-btn>
        </div>

    </div>
</template>

<script>
export default {

    props:['el'],

    data() {
        return {
            //
            elLocal:null,
        }
    },

    methods: {
        //
        callPage(rota) {
            this.$router.push(rota)
        }
    },

    created() {
        //this.$store.commit('init') // despertar api.
        //window.scrollTo(0,0)
        //console.log('el.txtBody: ',this.el.txtBody)
        this.elLocal.el.txtBody = this.el.txtBody.split(" ");
    }
}
</script>