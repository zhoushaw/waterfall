<template>
    <div class="box" :style="{'position': 'relative'}">
        <div  
            class="box-item"
            v-for="(item,index) in comList" 
            :id="index === 0 ? 'top' : (index === lastIndex ? 'bottom' : '')" 
            :ref="getReference(index,index === lastIndex)" 
            :style="{'top': item.top+'px'}" 
            :key="index">
            <slot name="header" v-bind:item="item"></slot>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        list: {
            type: Array,
            required: true
        },
        height: {
            type: Number,
            default: 360
        },
        THRESHOLD: {
            type: Number,
            default: 15
        },
        space: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            observer: {},
            start: 0,
            end: 15
        }
    },
    computed: {
        comList () {
            return this.list.slice(this.start,this.end);
        },
        lastIndex () {
            return this.comList.length -1;
        }
    },
    mounted () {
        this.$nextTick(function (){
            this.intiateScrollObserver();
        });
    },
    methods: {
        top (index) {
            return  (this.height * (index + this.start)) + 'px';
        },
        intiateScrollObserver () {
            const options = {
                root: null,
                rootMargin: '300px',
                threshold: 0.4
            };
            this.observer = new IntersectionObserver(this.callback, options);
            
            if (this.$refs.topElement) this.observer.observe(this.$refs.topElement[0]);
            if (this.$refs.bottomElement) this.observer.observe(this.$refs.bottomElement[0]);
        },
        getReference (index, isLastIndex) {
            if (index === 0) return 'topElement';
            if (isLastIndex) return 'bottomElement';
            return null;
        },
        callback (entries, observer) {
            entries.forEach((entry, index) => {
                const listLength = this.list.length;
                const {start, end} = this;
                if (entry.isIntersecting && entry.target.id === "bottom") {
                    const maxStartIndex = listLength - 1 - this.THRESHOLD;     // Maximum index value `start` can take
                    const maxEndIndex = listLength - 1;                   // Maximum index value `end` can take
                    const newEnd = (end + 10) <= maxEndIndex ? end + 10 : maxEndIndex;
                    const newStart = (end - 5) <= maxStartIndex ? end - 5 : maxStartIndex;
                    this.start = newStart;
                    this.end = newEnd;
                }

                if (entry.isIntersecting && entry.target.id === "top") {
                    const newEnd = end === this.THRESHOLD ? this.THRESHOLD : (end - 10 > this.THRESHOLD ? end - 10 : this.THRESHOLD);
                    let newStart = start === 0 ? 0 : (start - 10 > 0 ? start - 10 : 0);
                    this.start = newStart;
                    this.end = newEnd;
                }
            });
        }
    }
}
</script>

<style >

.box-item {
    position: absolute;
    width: 100%;
}
</style>
