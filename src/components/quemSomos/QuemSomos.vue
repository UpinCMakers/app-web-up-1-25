<style scoped>
    @import url("../../styles/quemSomos/quemSomos.scss");
</style>

<template>
    
    <div class="box_quemSomos" v-if="!$store.state.flagMenuSup"
    :style="{
        backgroundImage:'url(' + require('../../assets/fundo_t.png') + ')',
        backgroundSize: 'cover', // contain
        backgroundPosition: 'top' // center
        }">

        <!--<MenuSupMainV2 @callByMenu="returnFromMenu($event)" />
        <MenuBodyMainV2 v-if="flagMenuSup" />-->
        
        <div class="painel_quemSomos mb-4">

            <div class="line_btnToBack" @click="backToMain()"
            @mouseover="hoverBackInit = 'rgb(31,122,177)'"
            @mouseleave="hoverBackInit = 'rgb(247,215,46)'"
            >
                <v-icon large class="mr-2" :style="{'color':hoverBackInit}">mdi-arrow-left-thick</v-icon>
                <span>Voltar</span>
            </div>

            <div class="line_tit">
                <v-icon large class="mr-2" :style="{'color':'#4B94C0'}">mdi-account-group</v-icon>
                <span>Quem somos</span>
            </div>

            <ImgLinhaBQuemSomos />

            <div class="body1 mt-6">

                <div class="col_esq_body1 mt-2">

                    <span>{{ f1 }}</span>
                    <v-icon @click="goToAutomation()"
                    small :style="{'align-self':'flex-start','color':hoverToAgro,'cursor':'pointer'}"
                    @mouseover="hoverToAgro = 'rgb(247,215,46)'"
                    @mouseleave="hoverToAgro = 'rgb(31,122,177)'"
                    >mdi-arrow-top-right-thin-circle-outline</v-icon>
                    
                    <!--<span class="mt-2">{{ f2 }}</span>
                    <v-icon @click="goToFabr()"
                    small :style="{'align-self':'flex-start','color':hoverToFabr,'cursor':'pointer'}"
                    @mouseover="hoverToFabr = 'rgb(247,215,46)'"
                    @mouseleave="hoverToFabr = 'rgb(31,122,177)'"
                    >mdi-arrow-top-right-thin-circle-outline</v-icon>-->

                    <span class="mt-2">{{ f3 }}</span>
                    <v-icon @click="goToAutomation()"
                    small :style="{'align-self':'flex-start','color':hoverToFabr,'cursor':'pointer'}"
                    @mouseover="hoverToFabr = 'rgb(247,215,46)'"
                    @mouseleave="hoverToFabr = 'rgb(31,122,177)'"
                    >mdi-arrow-top-right-thin-circle-outline</v-icon>

                </div>

                <!--<div class="col_dir_body1">
                    <v-img 
                    :style="{'min-height':'400px','border-radius':'8px'}" 
                    :src="require('../../assets/qs1.jpeg')"
                    ></v-img>
                </div>-->

            </div>

            <div class="body2" @click="callInstagram()"
            @mouseover="hoverInstagram = 'rgb(247,215,46)'"
            @mouseleave="hoverInstagram = 'rgb(31,122,177)'"
            >
                <v-icon large class="mr-2" :style="{'color':hoverInstagram}">mdi-instagram</v-icon>
                <span>UPinC.Makers</span>
            </div>

        </div>
            
    </div>

</template>

<script>
//import MenuSupMainV2 from '../mainV2/MenuSupMainV2'
//import MenuBodyMainV2 from '../mainV2/MenuBodyMainV2'

import ImgLinhaBQuemSomos from './ImgLinhaBQuemSomos'

export default {

    components:{/*MenuSupMainV2, MenuBodyMainV2,*/ ImgLinhaBQuemSomos},
    
    data() {
        return {
            // estrutural menu. via store desde 03/09/2024
            //flagMenuSup:false,

            hoverBackInit:'rgb(247,215,46)',
            hoverInstagram:'rgb(31,122,177)',
            hoverToAgro:'rgb(31,122,177)',
            hoverToFabr:'rgb(31,122,177)',

            f1:'A UPinC é uma startup portuguesa dedicada ao fornecimento de tecnologia acessível, com o objetivo de impulsionar a transição digital de cidades e explorações agrícolas inteligentes. A empresa possui especialização no desenvolvimento de dispositivos autónomos e soluções de Internet das Coisas (IoT), destacando-se pela utilização da tecnologia LoRaWAN e pela oferta de serviços de monitorização. Com uma aposta estratégica em segmentos como Smart Farm, Smart City e gateways de comunicação, a UPinC promove a inovação tecnológica para otimizar a conectividade e a eficiência nos setores agrícola e urbano.',
            //f1:'A UPinC destaca-se como uma empresa inovadora no setor de IoT, com foco especial no segmento agrícola. Desenvolvemos tecnologias de ponta para aprimorar a agricultura de precisão, atendendo à crescente demanda global por soluções eficientes nesse campo. Além disso, oferecemos serviços de monitoramento de hardware em tempo real, fundamentados em tecnologias avançadas, elevando a qualidade dos serviços oferecidos no interior de Portugal. A UPinC destaca-se como um impulsionador do progresso tecnológico, proporcionando soluções de alta qualidade no universo da alta tecnologia.',
            f2:'Adicionalmente, a startup atua na fabricação digital, desempenhando um papel fundamental no desenvolvimento e prototipagem independentes e ágeis de novas tecnologias. Em consonância com essa abordagem, oferecemos serviços de corte e gravação a laser, geralmente em lotes.',
            f3:'Podemos auxiliar o seu negócio a alcançar maior precisão por meio de decisões mais assertivas baseadas em dados coletados ao longo do tempo, além de proporcionar mais conforto na sua operação agrícola com sistemas automatizados, que abrangem desde o acionamento remoto até o controle de quantidades. Dessa forma, aumentamos a capacidade de melhorar a qualidade do seu empreendimento e gerar maior retorno, tanto para você quanto para o meio ambiente.',
        }
    },

    methods: {
        //
        backToMain() { this.$router.push('/'); },
        goToAgro() { this.$router.push('/agro'); },
        goToFabr() { this.$router.push('/loja'); },
        goToAutomation() { this.$router.push('/automation'); },
        callInstagram() { window.open("https://www.instagram.com/upinc.makers/"); },

        returnFromMenu(flagStringMenuSmall) {

            if (flagStringMenuSmall == 'open') {

                //console.log('abrir menu')
                this.flagMenuSup = true
            
            } else {
                //console.log('fechar menu')
                this.flagMenuSup = false
            }
        },
    },

    created() {
        //this.$store.commit('srcIP') // without param. Initial main GET Req.
        window.scrollTo(0,0)
    }
}

</script>