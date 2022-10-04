<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
          <image :src="item.image_src" mode=""></image>
        </navigator>
      </swiper-item>

    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav">
      <view class="navitem" v-for="(item,index) in navList" :key="index" @click="navto(item.name)">
        <image :src="item.image_src" mode=""></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="Floor">
      <view class="flool" v-for="(item,index) in flootList" :key="index">
        <image class="floolImg" :src="item.floor_title.image_src" mode=""></image>
        <view class="floolN">
          <navigator  class="floolL" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}"
              mode=""></image>
          </navigator>
          <view class="floolR">
            <navigator :url="item1.url" v-for="(item1,index1) in item.product_list" :key="index1" v-if="index1 !== 0"> 
              <image :src="item1.image_src" mode="scaleToFill" :style="{width:item1.image_width+'rpx'}"></image>
            </navigator>
          </view>

        </view>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        flootList: []
      }
    },
    methods: {
      async getlist() {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.swiperList = res.message
        uni.$showMsg('数据请求成功')
      },
      async getnavlist() {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
        uni.$showMsg('数据请求成功')
      },
      async getFoollist() {
        let {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.forEach((item) => {
          console.log('123');
          item.product_list.forEach((item1) => {
            item1.url = '/subpkg/goods_detail/goods_detail?' + item1.navigator_url.split('?')[1]
          })
         
        })
        this.flootList = res.message
        uni.$showMsg('数据请求成功')
      },
      navto(name) {
        if (name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }

      }
    },
    mounted() {
      this.getlist()
      this.getnavlist()
      this.getFoollist()
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;
  }

  .swiper-item image {
    width: 100%;
  }

  .nav {
    height: 150rpx;
    display: flex;
    margin-top: 20rpx;
    justify-content: space-around;

    .navitem {
      image {
        width: 128rpx;
        height: 140rpx;
      }
    }
  }

  .floolImg {
    width: 100%;
    height: 60rpx;
  }

  .floolN {
    display: flex;
    height: 400rpx;
    margin-bottom: 15rpx;

    .floolL {

      image {
        height: 100%;
      }
    }

    .floolR {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-content: space-between;

      navigator {
        height: 45%;

        image {
          height: 100%;
        }
      }

    }
  }
</style>
