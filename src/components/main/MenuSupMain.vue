<style scoped>
    @import url("../../styles/main/menuSupMain.scss");
</style>

<template>
    
    <div class="box_menuSupMain">

        <div class="barra_util">
            <div class="el_menuSupMain">

                <!-- MENU SMALL -->
                <div @click="openMenuSupMain()"
                class="hidden-md-and-up menuSupMain mr-1"
                >
                    <v-icon large :style="{'color':'rgba(247,215,46,1)','transform':'rotate(90deg)'}"
                    >{{ iconMenu }}</v-icon>
                </div>
                
                <!-- LOGO MENU SUP MAIN -->
                <div class="el_img">
                    <v-img :src="require('../../assets/0t.png')"/>
                </div>
            </div>
        </div>
            
    </div>

</template>

<script>
export default {

    data() {
        return {
            flagIconMenuOpened:true,
            iconMenu:'mdi-menu-close',
        }
    },

    methods: {
        //
        openMenuSupMain() {
            this.flagIconMenuOpened = !this.flagIconMenuOpened

            if (this.flagIconMenuOpened == true) { // fechar menu drop.
                
                this.iconMenu = 'mdi-menu-close' 
                this.$emit('callByMenu','close') // return emit String.

            } else { // abrir menu drop.
                
                this.iconMenu = 'mdi-menu-open'
                this.$emit('callByMenu','open') // return emit String.
            }
        },
    },

    created() {
        //this.$store.commit('srcIP') // without param. Initial main GET Req.
    }
}

</script>