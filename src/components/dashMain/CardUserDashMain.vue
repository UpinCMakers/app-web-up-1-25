<style scoped>
    @import url("../../styles/dashMain/cardUserDashMain.scss");
</style>

<template>
    <div class="box_cardUserDashMain">

        <div class="cardDashTit" :style="{'font-weight':'400'}">Informações do usuário</div>

        <div class="painelDashContent">
            
            <div class="linhaColInfo">
                <span>E-mail</span>
                <span :style="{'font-weight':'400'}">Não identificado ainda.</span>
                <v-icon class="iconEdit" small>mdi-account-edit</v-icon>
            </div>
            
            <div class="linhaColInfo">
                <span>Palavra passe</span>
                <span>*****</span>
                <v-icon class="iconEdit" small>mdi-account-edit</v-icon>
            </div>

        </div>

    </div>
</template>

<script>
export default {

    props:['objUser'],

    //components:{CardUserDashMain},

    data() {
        return {
            //
        }
    },

    methods:{
        //
    },

    created() {
        //window.scrollTo(0,0)
    }
}
</script>