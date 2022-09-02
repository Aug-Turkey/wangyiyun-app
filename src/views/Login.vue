<template>
  <div class="login">
    <div class="top">
      <svg class="icon" aria-hidden="true" @click="router.push('/')">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
    </div>
    <div class="logo">
      <img src="@/assets/logo.png">
    </div>
    <van-form @submit="onSubmit" class="loginContent">
      <!-- input -->
      <van-cell-group inset>
        <van-field v-model="data.phone" name="手机号" placeholder="请输入手机号" :rules="[{ required: true, message: '请输入手机号' }]" class="phone" />
        <van-field v-model="data.verify" type="verify" name="验证码" placeholder="请输入验证码" :rules="[{ required: true, message: '请输入验证码' }]" class="verify" />
      </van-cell-group>
      <!-- button -->
      <div class="btn">
        <van-button round block type="default" native-type="submit" class="verification" @click="getVerification">
          发送验证码
        </van-button>
        <van-button round block native-type="submit" @click="Login" color="#000000">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const data = reactive({
  phone: '',
  verify: ''
})
const store = useStore()
const router = useRouter()

// 发送验证码
async function getVerification() {
  try {
    await store.dispatch('getVerify', data.phone)
  } catch (error) {
    alert(error.message)
  }
}

// 验证验证码是否正确并登录
async function Login() {
  try {
    await store.dispatch('phoneLogin', { phone: data.phone, captcha: data.verify })
    // 修改仓库中登录状态
    store.dispatch('updateIsLogin', true)
    // 跳转到个人中心
    router.push('/user')
  } catch (error) {
    alert(error.message)
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  position: relative;
  .logo {
    margin: 0.2rem;
  }
  .icon {
    position: absolute;
    left: .2rem;
    top: .2rem;
    width: .6rem;
    height: .6rem;
  }
  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    .van-cell-group--inset {
      width: 80%;
      border-radius: 0;

      .phone {
        background-color: #ffffff;
      }

      .verify {
        background-color: #ffffff;
        position: reactive;
      }
    }

    .btn {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .van-button {
        width: 70%;
        margin-top: 0.2rem;
        color: #000000;
        font-weight: 700;
      }
    }
  }
}
</style>