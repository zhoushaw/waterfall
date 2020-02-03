<template>
    <div class="box" :style="{'position': 'relative'}">
        <InfiniteScroll 
            :list="list"
            :THRESHOLD="THRESHOLD"
            :height="height"
        >
            <template slot="header"  scope="props">
                <div class="li-card" >{{props.item.value}}</div> 
            </template>
        </InfiniteScroll>
    </div>
</template>

<script>
import InfiniteScroll from './infinite.vue';
import list from './list.js';

export default {
    components: {
        InfiniteScroll
    },
    data() {
        return {
            list: list,
            THRESHOLD: 15,
            height: 190

        }
    }
}
</script>

<style>
body,html{
    height: 100%;
}
.box {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
}

.box {
    font-family: sans-serif;
    text-align: center;
}

.li-card {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    list-style: none;
    box-shadow: 2px 2px 9px 0px #bbb;
    padding: 70px 0;
    margin-bottom: 20px;
    border-radius: 10px;
    width: 80%;
}
</style>
