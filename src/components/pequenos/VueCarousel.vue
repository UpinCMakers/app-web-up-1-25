<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >

        <div class="text-h2">
            {{ slide }} Slide
        </div>

        <v-sheet
        :color="colors[i]"
        height="60%"
        >
            <v-row
                class="fill-height"
                align="center"
                justify="center"
            >
            </v-row>
        </v-sheet>

    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      }
    },
  }
</script>