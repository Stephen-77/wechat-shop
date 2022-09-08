<template>
	<view>
		<!-- 搜索组件 -->
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length!=0">
		  <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
		    <view class="goods-name">{{item.goods_name}}</view>
		    <uni-icons type="arrowright" size="16"></uni-icons>
		  </view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
		  <!-- 标题区域 -->
		  <view class="history-title">
		    <text>搜索历史</text>
		    <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
		  </view>
		  <!-- 列表区域 -->
		  <view class="history-list">
		    <uni-tag :text="item" v-for="(item, i) in historys" :key="i"></uni-tag>
		  </view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			timer:null,
			keyword:'',
			searchResults:[],
			 // 搜索关键词的历史记录
			historyList: [],
		};
	},
	computed:{
		historys(){
			return [...this.historyList].reverse()
		}
	},
	
	methods: {
		input(e) {
			clearTimeout(this.timer)
			this.timer=setTimeout(()=>{
				this.keyword=e
				this.getSearchList()
			},500)
		},
		async getSearchList(){
			if(this.keyword===''){
				this.searchResults=[]
				return
			}
			else{
			const res=await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.keyword})	
			if(res.data.meta.status!=200) return uni.$showMsg()
			this.searchResults=res.data.message
			this.saveSearchHistory()
			}
		},
		saveSearchHistory(){
			const set=new Set(this.historyList)
			set.delete(this.keyword)
			set.add(this.keyword)
			this.historyList=Array.from(set)
			uni.setStorageSync('kw',JSON.stringify(this.historyList))
		},
		gotoDetail(id){
			uni.navigateTo({
				url:'/subpkg/goods_detail/goods_detail?goods_id='+id,
				
			})
		},
		clearHistory(){
			this.historyList=[]
			uni.setStorageSync('kw','[]')
		}
	},
	onLoad() {
		this.historyList=JSON.parse(uni.getStorageSync('kw')||'[]')
	}
};
</script>

<style lang="scss">
	.uni-searchbar{
		background-color: #c00000;
	}
	.sugg-list {
	  padding: 0 5px;
	
	  .sugg-item {
	    font-size: 12px;
	    padding: 13px 0;
	    border-bottom: 1px solid #efefef;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	
	    .goods-name {
	      // 文字不允许换行（单行文本）
	      white-space: nowrap;
	      // 溢出部分隐藏
	      overflow: hidden;
	      // 文本溢出后，使用 ... 代替
	      text-overflow: ellipsis;
	      margin-right: 3px;
	    }
	  }
	}
.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
