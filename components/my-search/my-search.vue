<template>
	<view>
		<!-- 自定义搜索组件 -->
		 <view class="my-search-container" :style="{'background-color':bgcolor}">
		    <!-- 使用 view 组件模拟 input 输入框的样式 -->
		    <view class="my-search-box" :style="{'border-radius':radius+'px'}" @click="searchBoxHandler">
		      <uni-icons type="search" size="17"></uni-icons>
		      <text class="placeholder">搜索</text>
		    </view>
		  </view>
	</view>
</template>

<script>
	export default {
	
		name:"my-search",
		data() {
			return {
				
			};
		},
		props:{
			bgcolor:{
				type:String,
				default:'#c00000'
			},
			radius:{
				type:Number,
				default:18
			}
		},
		methods: {
			searchBoxHandler() {
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	
 .my-search-container{
	 height: 50px;
	 // background-color: #c00000;
	 display: flex;
	 align-items: center;
	 padding: 0 10px;
	.my-search-box{
		height: 36px;
		width: 100%;
		line-height: 36px;
		
		background-color: #ffffff;
		// border-radius: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	 .placeholder{
		 margin-left: 5px;
		 font-size: 15px;
	 }
 }
</style>