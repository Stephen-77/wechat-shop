<template>
	<view>
		<view class="search-box">
			<my-search></my-search>
		</view>
		
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" current="true">
			<swiper-item v-for="swiper in swiperList" :key="swiper.goods_id">
				<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?id=${swiper.goods_id}`"><image :src="swiper.image_src"></image></navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)"><image :src="item.image_src" class="nav-img"></image></view>
		</view>

		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- 楼层 item 项 -->
			<view class="floor-item" v-for="(item, i) in floorList" :key="i">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧大图片的盒子 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }" mode="widthFix"></image>
					</navigator>
					<!-- 右侧 4 个小图片的盒子 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{ width: item2.image_width + 'rpx' }"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
export default {
	mixins:['badgeMix'],
	data() {
		return {
			swiperList: [],
			navList: [],
			floorList: []
		};
	},
	onLoad() {
		this.getSwiperList();
		this.getNavList();
		this.getFloorList();
	},
	methods: {
		async getSwiperList() {
			const res = await uni.$http.get('/api/public/v1/home/swiperdata');
			if (res.data.meta.status != 200) {
				return uni.$showMsg();
			} else {
				this.swiperList = res.data.message;
			}
		},
		async getNavList() {
			const res = await uni.$http.get('/api/public/v1/home/catitems');
			if (res.data.meta.status != 200) return uni.$showMsg();
			else this.navList = res.data.message;
		},
		async getFloorList() {
			const res = await uni.$http.get('/api/public/v1/home/floordata');
			if (res.data.meta.status != 200) return uni.$showMsg();
			res.data.message.forEach(floor => {
				floor.product_list.forEach(item => {
					item.url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1];
				});
			});

			this.floorList = res.data.message;
		},
		navClickHandler(item) {
			if (item.name == '分类') {
				uni.switchTab({
					url: '/pages/cate/cate'
				});
			}
		}
	}
};
</script>

<style lang="scss" >
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
}
swiper {
	height: 330rpx;

	.swiper-item,
	image {
		width: 100%;
		height: 100%;
	}
}
.nav-list {
	display: flex;
	justify-content: space-around;
	margin: 15rpx 0;
	.nav-img {
		width: 128rpx;
		height: 140rpx;
	}
}
.floor-title {
	height: 60rpx;
	width: 100%;
	display: flex;
}
.right-img-box {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.floor-img-box {
	display: flex;
	padding-left: 10rpx;
}
</style>
