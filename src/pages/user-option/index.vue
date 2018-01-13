<template>
  <article class="user-option">
    <section class="option-item head-img">
      <span class="option-desc">
        头像
      </span>
      <div class="option-content img-container">
        <img :src="userInfo.photo"/>
      </div>
    </section>
    <section class="option-item">
      <span class="option-desc">
        密码修改
      </span>
      <div class="option-content">
        已设置
      </div>
    </section>
    <section>
      <div></div>
    </section>
  </article>
</template>
<script>
import { mapState } from 'vuex';
import Camera from '@/components/camera';
import { updatePhoto, getPhoto } from '@/module/api/api';
import { fetch } from '@/module/common/fetch';
export default {
  name: 'main-page',
  data () {
    return {
      username: '',
      password: ''
    };
  },
  components: {
    'v-camera': Camera
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
        this.headPortrait = rst.data;
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
      }
      &-desc {
        width: 150px;
      }
      &-content {
        flex: 1;
        img {
          width: 100%;
        }
      }
    }
    .head-img {
      height: 100px;
    }
    body {
      background-color: #eee;
    }
  }
</style>

