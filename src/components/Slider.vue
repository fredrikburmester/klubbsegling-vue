<template>
    <div id="article-slider" class="my-4 w-screen lg:max-w-lg justify-self-center">
        <div ref="slider" class="keen-slider mb-4">
            <div v-for="(image, index) in article.images.data" :key="index" :class="`keen-slider__slide number-slide${index}`">
                <img :src="`https://cms.klubbsegling.se${image.attributes.formats.small.url}`" alt="" />
            </div>
        </div>
        <p class="italic text-sm text-center">{{ current }} / {{ numberOfSlides }}</p>
    </div>
</template>

<script>
import 'keen-slider/keen-slider.min.css'
import KeenSlider from 'keen-slider'

export default {
    name: 'Slider',
    props: {
        article: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            current: 1,
            numberOfSlides: this.article.images.data.length,
        }
    },
    mounted() {
        this.slider = new KeenSlider(this.$refs.slider, {
            created: s => {
                this.numberOfSlides = s.track.details.slides.length
            },
            slideChanged: s => {
                this.current = s.track.details.rel + 1
            },
        })
    },
    beforeDestroy() {
        if (this.slider) this.slider.destroy()
    },
}
</script>

<style>
[class^='number-slide'],
[class*=' number-slide'] {
    background: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    color: #fff;
    font-weight: 500;
    height: 400px;
    max-height: 100vh;
}
</style>
