<style scoped>
    @import url("../../../styles/contadorAguaPage/v3/painelMalhas.scss");
</style>

<template>
    <div class="box_painelMalhas">

        <div class="menuBreadcrumbs">
            <!--<v-breadcrumbs :items="items" divider=">" @click="navigate()">{{ items.title }}</v-breadcrumbs>-->
            <!--<v-breadcrumbs :items="breadcrumbItems" divider=">" />-->
            <div class="itemBC" v-for="(bc,index) in breadcrumbItems" :key="index">
                
                <span class="ml-2 mr-2" v-if="index > 0">></span>
                
                <span @click="callRouterByCrumb(bc.path,bc.disabled)"
                :style="{'color':bc.backColor}"
                >
                    {{ bc.text }}
                </span>

            </div>
        </div>
        
        <router-view></router-view>

    </div>
</template>

<script>
export default {
    data() {
        return {
            //
        }
    },

    methods:{
        callRouterByCrumb(path,disabled) {
            if (!disabled) { 
                //console.log('path [click]: ',path)
                this.$router.push(path)
            }
        }
    },

    computed: {
        
        // BREADCRUMB MANUAL
        breadcrumbItems() {
            const breadcrumbs = [];
            const matched = this.$route.matched;
            const routeParams = this.$route.params; // Captura os parâmetros da rota atual
            var flagDisable = true // habilitar todos menos o primeiro e ultimo.
            var counterRouter = 0
            var ableColor = ''
            //console.log('routeParams: ',routeParams)
            //console.log('matched: ',matched)

            //if (routeParams.idMalha) { this.idMalha = routeParams.idMalha }
            //if (routeParams.idGrupo) { this.idGrupo = routeParams.idGrupo }
            //if (routeParams.idOUT) { this.idOUT = routeParams.idOUT }
            //if (routeParams.idIN) { this.idOUT = routeParams.idIN }

            while (counterRouter < matched.length) {

                if (counterRouter > 0) {
                    flagDisable = false
                    ableColor = 'rgb(247,215,46)'
                }

                const label = matched[counterRouter].meta.label
                let path = matched[counterRouter].path

                // Substituir os placeholders da rota (:idMalha, :idGrupo, etc.) pelos valores reais dos params
                Object.keys(routeParams).forEach(param => {
                    path = path.replace(`:${param}`, routeParams[param]);
                })

                if (counterRouter < matched.length - 1 || label == 'Saída' || label == 'Entrada') {

                    if (label == 'Saída' || label == 'Entrada') { 
                        flagDisable = true
                        ableColor = '' 
                    }

                    breadcrumbs.push({
                        text: label,
                        disabled: flagDisable, // Clicável ou não.
                        path: path,
                        backColor:ableColor, // Info de Clicável ou não.
                    })
                }

                counterRouter++
            }

            //console.log('breadcrumbs [end]: ',breadcrumbs)
            return breadcrumbs;
        }
        
        // OPÇÃO DIRETAMENTE COM COMPONENTE BREADCRUMB
        /*breadcrumbItems() {
            var counterRouter = 0
            //var flagDisable = true
            const breadcrumbs = [];
            const matched = this.$route.matched;
            console.log('matched: ',matched)

            // Adiciona o primeiro item estático
            //breadcrumbs.push({
            //    text: 'Sistema',
            //    disabled: true, // Não clicável
            //});
            //console.log('init computed (breadcrumbs.length): ',breadcrumbs.length)

            // Adiciona os outros itens dinamicamente com base nas rotas
            matched.forEach((route, index) => {
                if (route.meta && route.meta.label) {
                    
                    const path = matched.slice(counterRouter, index + 1).map(r => r.path).join('');

                    //if (counterRouter != 0 || counterRouter == matched.length - 1) {
                    //    flagDisable = true
                    //    console.log('link able -----------')
                   // }
                    
                    console.log('path: ',path)

                    console.log('text: ',route.meta.label)
                    //console.log('disable: ',index === matched.length - 1)
                    //console.log('disable: ',flagDisable)
                    console.log('to: ',index !== matched.length - 1 ? path : null)

                    breadcrumbs.push({
                        text: route.meta.label,
                        //disabled: index === matched.length - 1, // Último item não clicável
                        //disabled: false, //flagDisable,
                        to: path, // Caminho para rotas intermediárias
                    });
                    console.log('-----------')

                    counterRouter+=1
                }
            });

            console.log('breadcrumbs: ',breadcrumbs)
            return breadcrumbs;
        },*/
    },

    created() {
        window.scrollTo(0,0)
    }
}
</script>