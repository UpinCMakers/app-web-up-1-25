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

    props:['coord'],

    data() {
        return {
            //
            map:null,
            selectedCoord:null,
        }
    },

    methods:{
        //
        resetMap() {

            if (this.map != null) { this.map.remove(); }

            this.map = L.map('mapaidCA').setView(this.coord, 11);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

            // Adiciona um marcador no ponto registrado.
            L.marker(this.coord)
            .addTo(this.map)
            //.bindPopup(`Coordenada: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
            .openPopup();
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