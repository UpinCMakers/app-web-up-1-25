<style scoped>
    @import url("../../styles/dashMain/loginPageTipoA.scss");
</style>

<template>
    <div class="box_loginPageTipoA">

        <div class="colunaLoginTipoA">

            <PainelLoginTipoA @openPainel="resultLogin($event)" />

            <!-- 3 imagens em círculos -->
            <div class="linhaBaloes">

                <div class="imgBalao">
                    <v-img cover :style="{'border-radius':'100px','cursor':'pointer'}" :src="require('../../assets/fabr1.png')" />
                </div>

                <div class="imgBalao">
                    <v-img cover :style="{'border-radius':'100px','cursor':'pointer'}" :src="require('../../assets/lora_p.png')" />
                </div>

                <div class="imgBalao">
                    <v-img cover :style="{'border-radius':'100px','cursor':'pointer'}" :src="require('../../assets/agro_p.png')" />
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import PainelLoginTipoA from './PainelLoginTipoA'

export default {

    components:{PainelLoginTipoA},

    data() {
        return {
            //
        }
    },

    methods:{
        // -- neto (PainelLogin) -> filho (LoginPage) -> pai (DashMain)
        resultLogin(objUser) { this.$emit('openPainel',objUser) }
    },

    created() {
        //window.scrollTo(0,0)
    }
}
</script>