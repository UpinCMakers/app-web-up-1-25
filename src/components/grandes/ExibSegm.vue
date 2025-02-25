<style>
    @import url("../../styles/exibSegm.scss");
</style>

<template>
    
    <div class="box_exibSegm">

        <!-- passar sob for -->
        <div class="box_tit_exibSegm">
            <div class="img_tit_exibSegm">

                <v-img :style="{'border-radius':'100px'}"
                :src="infoSegmSelected.img"
                />
            </div>

            <div class="tit_exibSegm">

                <span>{{ infoSegmSelected.tit }}</span>
            </div>
        </div>

        <div class="txt_exibSegm">
            <span
            v-for="(word,i) in txtSegm" :key="i" 
            class="words_txt_exibSegm"
            >
                {{ word }}</span>
        </div>

    </div>


</template>

<script>
export default {
    props: ['infoSegmSelected'],
}
</script>