<style scoped>
    @import url("../../styles/contadorAguaPage/mapLeaf.scss");
</style>

<template>
    <div class="box_mapLeaf" id="mapaidCA"></div>
</template>

<script>
import L from "leaflet"; // npm install --save leaflet
//import axios from 'axios'

export default {

    //props:['listaCoords'],

    data() {
        return {
            //
            listaCoords:[ [40.1622213, -7.4553607] ],

            //
            map:null,
            selectedCoord:null,
        }
    },

    methods:{
        //
        resetMap() {

            if (this.map != null) { this.map.remove(); }

            this.map = L.map('mapaidCA').setView([40.1622213, -7.4553607], 11);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

            //console.log('map init')

            // Adiciona evento de clique no mapa
            this.map.on("click", (e) => {
                const { lat, lng } = e.latlng;

                // Atualiza a coordenada selecionada
                this.selectedCoord = { lat, lng };

                this.$emit('coordFromClick', this.selectedCoord)

                // Adiciona um marcador no ponto clicado
                L.marker([lat, lng])
                .addTo(this.map)
                .bindPopup(`Coordenada: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
                .openPopup();
            });

            /*L.marker([40.279184, -7.504404]).addTo(map)
            .bindPopup('Temperatura e Humidade<br><br>(Laboratório UPinC Covilhã)')
            .openPopup();*/

            //console.log('map start')
        }
    },

    mounted() {
        this.resetMap()
    },

    created() {
        //window.scrollTo(0,0)
    }
}
</script>