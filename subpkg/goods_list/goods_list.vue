<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 请求参数对象
			queryObj: {
				// 查询关键词
				query: '',
				// 商品分类Id
				cid: '',
				// 页码值
				pagenum: 1,
				// 每页显示多少条数据
				pagesize: 10
			},
			// 页面数据条数
			total: 0,
			// 数据
			goodsList: [],
		};
	},
	onLoad(opitons) {
		this.queryObj.cid = opitons.cid || '';
		this.queryObj.query = opitons.query || '';
		this.getGoodsList();
	},

	methods: {
		async getGoodsList() {
			const res = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
			if (res.data.meta.status != 200) return uni.$showMsg();
			this.goodsList = [...this.goodsList,...res.data.message.goods];
			
			this.total = res.data.message.total;
		},
		gotoDetail(item){
			uni.navigateTo({
				url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
			})
		}
	},
	onReachBottom(){
		if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg('数据加载完毕了...')
		this.queryObj.pagenum+=1,
		this.getGoodsList()
	},
	onPullDownRefresh() {
		this.queryObj.pagenum=1,
		this.total=0,
			this.goodsList=[],
			this.getGoodsList(),
			uni.stopPullDownRefresh()
	}
};
</script>

<style lang="scss">
	
</style>
