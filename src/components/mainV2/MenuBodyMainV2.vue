<style scoped>
    @import url("../../styles/mainV2/menuBodyMainV2.scss");
</style>

<template>
    
    <div class="box_menuBodyMain"
    :style="{
        backgroundImage:'url(' + require('../../assets/fundo_t.png') + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
        }">

        <div class="painelMenuMainDrop">

            <div class="lineDrop mt-2" 
            v-for="(el,i) in liMenuDrop" :key="i" 
            @click="callPage(el.rota)"
            @mouseover="el.cor = 'rgb(31,122,177)'"
            @mouseleave="el.cor = ''"
            :style="{'background':'rgba(255,255,255,0.7)'}"
            >
                <div class="imgLineDrop">
                    <v-img :style="{'border-radius':'100px'}" :src="el.img" />
                </div>

                <span class="nameLineDrop ml-2" :style="{'color':el.cor}">{{ el.name }}</span>

            </div>
        </div>
            
    </div>

</template>

<script>
export default {
    propos:['flagBackground'],

    data() {
        return {
            //flagMenuSup:false,

            liMenuDrop:[
                {'rota':'/quemSomos','name':'Quem somos','img':require('../../assets/group11.png'),'cor':''},
                //{'rota':'/makers','name':'UPinC.Makers','img':require('../../assets/maker_p.png'),'cor':''},
                {'rota':'/automation','name':'Serviços','img':require('../../assets/fabr1.png'),'cor':''},
                //{'rota':'/lora','name':'Comunicação LoRaWAN','img':require('../../assets/lora_p.png'),'cor':''},
                //{'rota':'/agro','name':'Agricultura de precisão','img':require('../../assets/agro_p.png'),'cor':''},
                //{'rota':'/loja','name':'Fabricação Digital','img':require('../../assets/fabr1.png'),'cor':''},
                {'rota':'/dashmain','name':'Área do usuário','img':require('../../assets/userImgt0.png'),'cor':''},
                {'rota':'/','name':'Fale conosco','img':require('../../assets/contactImgt1.png'),'cor':''},
            ],

            backgroundDinam:'',
        }
    },

    methods: {
        callPage(rota) {
            if(rota != '/') {
                
                this.$router.push(rota)

                this.$emit('callByMenuBody','close') // return emit String. (trocar icon menu)

                //this.$store.state.flagMenuSup = false
            }
        },

        /*returnFromMenu(flagStringMenuSmall) {

            if (flagStringMenuSmall == 'open') {

                console.log('abrir menu')
            
            } else {
                console.log('fechar menu')
            }
        },*/
    },

    created() {
        //this.$store.commit('srcIP') // without param. Initial main GET Req.
    }
}

</script>