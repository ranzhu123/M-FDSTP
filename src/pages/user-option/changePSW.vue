<template>
  <article class="html-container user-option">
    <h1>密码修改</h1>
    <section class="password-option">
      <div class="input-container">
        <label class="input-desc">旧密码</label><input placeholder="请输入旧密码" v-model="lastPassword" type="password"/>
      </div>
      <div class="input-container">
        <label class="input-desc">新密码</label><input placeholder="请输入新密码" v-model="newPassword" type="password"/>
      </div>
    </section>
    <section class="change-password">
      <button class="beautiful-btn" @click="changePSW">确认修改</button>
      <button class="beautiful-btn" @click="closePop">取消</button>
    </section>
  </article>
</template>
<script>
import { modifyPwd } from '@/module/api/api';
import { fetch } from '@/module/common/fetch';
export default {
  name: 'change-password',
  data () {
    return {
      lastPassword: '',
      newPassword: ''
    };
  },
  methods: {
    closePop () {
      this.$emit('close-pop');
    },
    changePSW () {
      console.log(this.lastPassword);
      const param = `?oldPassword=${this.lastPassword}&newPassword=${this.newPassword}`;
      fetch(modifyPwd + param).then(rst => {
        const {data = {}} = rst;
        if (data.code === 1) {
          alert('修改密码成功');
          this.closePop();
        } else {
          alert(data.content);
        }
      });
    }
  }
};
</script>
<style lang="scss">
  .password-option {
    margin: 20px 0;
  }
  .input {
    &-container {
      display: flex;
      padding: 8px 25px 8px 0;
      margin-left: 10px;
      border-bottom: 1px solid #eee;
      input {
        appearance: none;
        border-radius: 0;
        border: 0;
        flex: 1;
        outline: 0;
        line-height: 1.6;
        font-size: inherit;
        width: 100%;
      }
    }
    &-desc {
      width: 100px;
      padding-right: 10px;
      text-align: left;
    }
  }
  .change-password {
    margin: 0 60px;
    .beautiful-btn {
      margin-bottom: 10px;
      box-shadow: 0 0 0 0;
      background: linear-gradient(180deg, #23a2ec, #2676c8 70%);
      &:first-child {
        margin-top: 30px;
      } 
    }
  }
</style>

