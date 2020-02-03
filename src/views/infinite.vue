<template>
    <div class="box" :style="{'position': 'relative'}">
        <div  
            class="box-item"
            v-for="(item,index) in comList" 
            :id="index === 0 ? 'top' : (index === lastIndex ? 'bottom' : '')" 
            :ref="getReference(index,index === lastIndex)" 
            :style="{'top': item.top+'px'}" 
            :key="index">
            <slot name="item" v-bind:item="item"></slot>
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
            end: this.THRESHOLD
        }
    },
    computed: {
        comList () {
            return this.list.slice(this.start,this.end);
        },
        lastIndex () {
            return this.comList.length -1;
        },
        maxStartIndex () {
            return  this.list.length - 1 - this.THRESHOLD;
        },
        maxEndIndex () {
            return  this.list.length - 1;
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.intiateScrollObserver();
        });
    },
    methods: {
        intiateScrollObserver () {
            const options = {
                root: null,
                rootMargin: '100px',
                threshold: 0.1
            };
            this.observer = new IntersectionObserver(this.callback, options);
            
            if (this.$refs.topRef) this.observer.observe(this.$refs.topRef[0]);
            if (this.$refs.bottomRef) this.observer.observe(this.$refs.bottomRef[0]);
        },
        getReference (index, isLastIndex) {
            if (index === 0) return 'topRef';
            if (isLastIndex) return 'bottomRef';
            return null;
        },
        callback (entries, observer) {
            entries.forEach((entry, index) => {
                const {start, end} = this;
                let startSpac = this.space;
                let endSpac = this.space*2;
                
                if (entry.isIntersecting && entry.target.id === "top") {
                    let newStart = start === 0 ? 0 : (start - this.space > 0 ? start - this.space : 0);
                    const newEnd = end === this.THRESHOLD ? this.THRESHOLD : (end - this.space > this.THRESHOLD ? end - this.space : this.THRESHOLD);
                    this.start = newStart;
                    this.end = newEnd;
                }

                if (entry.isIntersecting && entry.target.id === "bottom") {

                    const newStart = (end - this.space) <= this.maxStartIndex ? end - this.space : this.maxStartIndex;
                    const newEnd = (end + this.space*2) <= this.maxEndIndex ? end + this.space*2 : this.maxEndIndex;

                    if (newEnd === this.maxEndIndex) this.$emit('load-more');
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
