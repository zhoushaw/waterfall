<template>
    <ul>
        <li v-for="(column,colindex) in waterfall" :key="colindex" :ref="`waterfall`">
            <InfiniteScroll 
                :list="column.list"
                :THRESHOLD="9"
                :space="3"
            >
                <template slot="item"  scope="props">
                   <img :src="props.item.src" :width="waterfallImgWidth">
                </template>
            </InfiniteScroll>
        </li>
    </ul>
</template>


<script>
import InfiniteScroll from '../components//infinite.vue';
export default {
    components: {
        InfiniteScroll
    },
    data () {
        return {
            waterfall: {
                0: {
                    list: [],
                    height: 0
                },
                1: {
                    list: [],
                    height: 0
                }
            },
            list: [],
            height: 190,
            waterfallImgCol: 2,
            waterfallImgWidth: 150
        };
    },
    created () {
        var list = [
            "https://hbimg.huabanimg.com/c11bf0d583324f33ba8760f80f624fdd6ba985173511a-070Mc1_fw658",
            'https://hbimg.huabanimg.com/21ee055c8d9865f46658d557e7c64f62d3b6cb3177966-NBaH4e_fw658',
            "https://hbimg.huabanimg.com/c9e432e483210eec3c6bc3e2323f0091b7bdf5025fcdf-Wbux7J_fw658",
            "https://hbimg.huabanimg.com/2f134b99d83ad7b1b18181e6ec968f62300f2ff3c9638-LyiRdR_fw658",
            "https://hbimg.huabanimg.com/c290549f8b184d4370713cc95b5b109beb612084a7e83-xNbmV6_fw658",
            "https://hbimg.huabanimg.com/fcb9d97d169c575c36d3da3e9e938301365acc4caf95a-esL8Le_fw658",
            "https://hbimg.huabanimg.com/8192ae744be9564b61628b794cad04d77848f2ebb85a7-I5c5MC_fw658",
            "https://hbimg.huabanimg.com/69106d61862da7cb1c023c7ab8e1317f0bf3a80c7a945-N0SEYX_fw658",
            "https://hbimg.huabanimg.com/9c022c59b2b9a7e3067eb6ea803c8a3744f368ba6fa27-u6FuSh_fw658",
            "https://hbimg.huabanimg.com/e2417d4fe10c341ea8cc2a99de0ab2fdda6ba5d98110b-TjFHOv_fw658",
            "https://hbimg.huabanimg.com/a470862a6c438acf73ad72d10a9c1e529ee42d3368d6d-FwZT6G_fw658",
            "https://hbimg.huabanimg.com/32ec7ffc30588be2e6647b05b1d3b6db61a8bf40a4a22-gBup2t_fw658",
            "https://hbimg.huabanimg.com/2cee3cf9cbdc7b1f48d3d552e5785fb12702aee9667a4-VMTtR7_fw658",
            "https://hbimg.huabanimg.com/e82dc88817a68593b2047c3bd17d073c27e3f1aca83e8-ynrmGM_fw658",
            "https://hbimg.huabanimg.com/083045aeca89fbe9613c2e4c800b615985f7fe1c227240-odS9Pn_fw658",
            "https://hbimg.huabanimg.com/241ed13481773645a0cd7d19578d468c3de109791a7718-GK0f90_fw658",
            "https://hbimg.huabanimg.com/76f14d3d18fe15d43d1555225e259c63ddacf2351c2988-uMmcHS_fw658",
            "https://hbimg.huabanimg.com/ca0fa4c7237944715751e46231e0048e759fe46514289b-b912sp_fw658",
            "https://hbimg.huabanimg.com/8a573a413d9a94fdfaf3001568372b0e3c0dec642c73dd-lnnbBu_fw658",
            "https://hbimg.huabanimg.com/c901460511a8d7cc4c5541a963dd3f155662479a208aa6-ZaCYrd_fw658",
            "https://hbimg.huabanimg.com/1c8f48c46c1240166a59d4921adfe8b8a9c89cc5e75e5-sMOHCv_fw658",
            "https://hbimg.huabanimg.com/7083eab8c65cc07bd1c02db466348ab025bfebdf163c41-OUU3z8_fw658"
        ]
        
        let baseLen = this.list.length;
        for (let i in list) {
            let aImg = new Image();
            aImg.src = list[i];
            aImg.onload = aImg.onerror = (e)=>{

                let imgData = {};
                // 根据设定的列宽度求出图片的高度
                imgData.height = this.waterfallImgWidth/aImg.width*aImg.height;
                imgData.src = list[i];

                //找出当前最短列的索引
                let minIndex = this.waterfall[0].height <= this.waterfall[1].height? 0:1;
                //获取最短列底部高度，既下一张图片的顶部高度
                imgData.top = this.waterfall[minIndex].height;
                //将图片添加至对应列的列表中
                this.waterfall[minIndex].list.push(imgData);
                //改变当前列高度
                this.waterfall[minIndex].height += imgData.height + 10;
                this.rankEnd(baseLen,list.length);
            }
        }
    },
    methods: {
        rankEnd (baseLen,addLen) {
            if (this.list.length==(baseLen+addLen)) this.computedEnd = true;
        },
        //计算图片偏移量
        rankImg(imgData){
        }
    }
}
</script>

<style lang="less">
ul,li{
    list-style: none;
    padding: 0;
}
ul {
    display: flex;
    justify-content: center;
    li {
        position: relative;
        display: flex;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        align-content: flex-start;
        width: 45%;
        height: 10px;
        img {
            position: absolute;
            left: 0;
        }
    }
}
</style>