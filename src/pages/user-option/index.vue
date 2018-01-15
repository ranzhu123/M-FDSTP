<template>
  <article class="user-option">
    <section class="option-item head-img">
      <span class="content-center option-desc">
        头像
      </span>
        <div class="option-content img-container content-center">
          <v-camera :callback="uploadImg">
            <img :src="userInfo.photo"/>
            <i class="camera-icon iconfont icon-jiantou"></i>
          </v-camera>
        </div>
    </section>
    <section class="option-item">
      <span class="content-center option-desc">
        密码修改
      </span>
      <div class="option-content" @click="passwordVisible=true">
        <span>已设置</span>
        <i class="iconfont icon-jiantou"></i>
      </div>
    </section>
    <mt-popup
      v-model="passwordVisible"
      popup-transition="popup-fade"
      position="right"
      >
      <v-changePSW @close-pop="passwordVisible=false"></v-changePSW>
    </mt-popup>
    <div @click="logout" class="logout-btn beautiful-btn">退出登录</div>
  </article>
</template>
<script>
import { mapState } from 'vuex';
import Camera from '@/components/camera';
import { updatePhoto, getPhoto, logoutUrl } from '@/module/api/api';
import { fetch } from '@/module/common/fetch';
import changePSW from './changePSW';
export default {
  name: 'main-page',
  data () {
    return {
      username: '',
      password: '',
      passwordVisible: false
    };
  },
  components: {
    'v-camera': Camera,
    'v-changePSW': changePSW
  },
  computed: mapState({
    userInfo: 'userInfo'
  }),
  methods: {
    login () {
      this.jumpRoute('/main-page');
    },
    jumpRoute (name) {
      this.$router.push(name);
    },
    getHeadPortrait () {
      fetch(getPhoto, {
        method: 'GET'
      }).then(rst => {
        this.$store.commit('setUserInfo', Object.assign({}, this.userInfo, {
          photo: rst.data
        }));
      });
    },
    uploadImg () {
      const file = document.querySelector('.fileinput-button').files[0];
      let formData = new FormData();
      formData.append('pic', file);
      // axios.post(updatePhoto, formData);
      fetch(updatePhoto, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }).then(flag => {
        if (flag) {
          this.getHeadPortrait();
        }
      });
    },
    logout () {
      fetch(logoutUrl, {ignoreError: true}).then(d => {
        this.$router.push('/login');
      }).catch(() => {
        alert('退出失败，请重试');
      });
    }
  }
};
</script>
<style lang="scss">
  .user-option {
    background-color: white;
    .option {
      &-item {
        display: flex;
        border-bottom: 1px solid #eee;
        padding: 10px 0;
        margin-left: 20px;
      }
      &-desc {
        width: 120px;
        padding-left: 3px;
        justify-content: flex-start;
      }
      &-content {
        flex: 1;
        position: relative;
        text-align: right;
        justify-content: flex-end;
        padding-right: 40px;
        img {
          height: 80px;
          width: 80px;
        }
      }
    }
    .head-img {
      height: 100px;
    }
    body {
      background-color: #eee;
    }
    .icon-jiantou {
      position: absolute;
      right: 5px;
      &.camera-icon {
        right: -35px;
        top: -35px;
      }
    }
    .mint-popup {
      width: 100%;
      height: 100%;
    }
    .logout-btn {
      bottom: 20px;
      left: 37px;
      margin: 450px auto 0 ;
      width: 300px;
    }
  }
</style>

