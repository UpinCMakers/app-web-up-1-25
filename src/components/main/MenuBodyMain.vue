<style scoped>
    @import url("../../styles/main/menuBodyMain.scss");
</style>

<template>
    
    <div class="box_menuBodyMain">

        <div class="painelMenuMainDrop">

            <div class="lineDrop mt-2" v-for="(el,i) in liMenuDrop" :key="i" @click="callPage(el.rota)">
                
                
                <div class="imgLineDrop">
                    <v-img :style="{'border-radius':'100px'}" :src="el.img" />
                </div>

                <span class="nameLineDrop ml-2">{{ el.name }}</span>

            </div>
        </div>
            
    </div>

</template>

<script>
export default {
    data() {
        return {
            flagMenuSup:false,

            liMenuDrop:[
                {'rota':'/quemSomos','name':'Quem Somos','img':require('../../assets/group11.png')},
                {'rota':'/lora','name':'UPinC.LoRaWAN','img':require('../../assets/map-marker-path-v2.png')},
                {'rota':'/makers','name':'UPinC.Makers','img':require('../../assets/maker_p.png')},
                {'rota':'/loja','name':'UPinC.Fabricação','img':require('../../assets/fabr1.png')},
                {'rota':'/agro','name':'UPinC.Agro','img':require('../../assets/agro_p.png')},
            ],
        }
    },

    methods: {
        callPage(rota) {
            if(rota != '/') {
                this.$router.push(rota)
            }
        },

        returnFromMenu(flagStringMenuSmall) {

            if (flagStringMenuSmall == 'open') {

                console.log('abrir menu')
            
            } else {
                console.log('fechar menu')
            }
        },
    },

    created() {
        //this.$store.commit('srcIP') // without param. Initial main GET Req.
    }
}

</script>