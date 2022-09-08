<template>
	<view class="container">
		<view class="login-container">
			<!-- 登录 -->
			<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
			<!-- 登录按钮 -->
			<button type="primary" class="btn-login" @click="getuserinfo">一键登录</button>
			<!-- 登录提示 -->
			<view class="tips-text">登录后尽享更多权益</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations ,mapState} from 'vuex'
export default {
	name: 'my-login',
	data() {
		return {};
	},
	computed:{
		...mapState('m_user',['redirectInfo'])
	},
	methods: {
		...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
		getuserinfo() {
			uni.getUserProfile({
				desc: '获取你的昵称、头像、地区及性别',
				success: res => {
					// console.log(res);
					// console.log(res.userInfo);
					this.updateUserInfo(res),
					this.gettoken(res)
					
				},
				fail() {
					uni.$showMsg('您取消了登录授权');
				}
			});
		},
		async gettoken(info){
			// 调用微信登录接口
			  const [err, res] = await uni.login().catch(err => err);
			  // 判断是否 uni.login() 调用失败
			  if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！');
			  // 准备参数对象
			  const query = {
			    code: res.code,
			    encryptedData: info.encryptedData,
			    iv: info.iv,
			    rawData: info.rawData,
			    signature: info.signature
			  }
			
			  // 换取 token
			  // const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
			  // if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
			  // uni.$showMsg('登录成功')
			  this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
			  this.navigateBack()
		},
		navigateBack(){
			if(this.redirectInfo&&this.redirectInfo.openType=='switchTab'){
				uni.switchTab({
					url:this.redirectInfo.from,
					complete: () => {
						this.updateRedirectInfo(null)
					}
				})
			}
		}
	}
};
</script>

<style lang="scss">
.container {
	width: 100%;
	height: 550px;
	background-color: white;
	.login-container {
		display: flex;
		height: 750rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;
		&::before {
			content: '';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}
		// 登录按钮的样式
		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		// 按钮下方提示消息的样式
		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
}
</style>
