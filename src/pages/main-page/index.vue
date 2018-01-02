<template>
  <article class="main">
    <v-camera :callback="uploadImg">
      <section class="header info">
        <img v-if="headPortrait" class="info-img" :src="headPortrait">
        <i v-else class="info-img iconfont icon-add_pic"></i>
        <span class="info-name">{{userName || 123}}</span>
        <div class="info-setting">
          <i>箭头</i>
        </div>
      </section>
    </v-camera>
    <section class="main-option">
      <div class="options" @click="jumpRoute('/material')">
        <i slot="icon" :style="{color: '#dc137f'}" class="iconfont icon-huiyi"></i>
        <span>安全会议</span>
      </div>
      <div class="options" @click="jumpRoute('/meeting')">
        <i slot="icon" :style="{color: '#dc137f'}" class="iconfont icon-xunlianpeiyang"></i>
        <span>教育培训</span>
      </div>
      <div class="options" @click="jumpRoute('/bus-check')">
        <i slot="icon" :style="{color: '#dc137f'}" class="iconfont icon-huoche"></i>
        <span>车辆检查</span>
      </div>
      <div class="options" @click="jumpRoute('/duty-sign')">
        <i slot="icon" :style="{color: '#dc137f'}" class="iconfont icon-zerenzhuang"></i>
        <span>责任状签订</span>
      </div>
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
      password: '',
      headPortrait: ''
    };
  },
  components: {
    'v-camera': Camera
  },
  computed: mapState({
    userName: 'userName'
  }),
  created () {
    this.getHeadPortrait();
  },
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
        console.log(rst);
        this.headPortrait = rst.data;
      });
    },
    uploadImg () {
      const file = document.querySelector('.fileinput-button').files[0];
      let formData = new FormData();
      formData.append('pic', file);
      console.log(file, formData);
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
  .main {
    padding: 20px 0;
    background-color: #eee;
    height: 100%;
    .header {
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 120px;
      .info {
        &-img {
          font-size: 75px;
          width: 100px;
          height: 100px;
          border: 1px solid #999;
          border-radius: 15px;
        }
        &-name {
          margin-left: 20px;
          width: 100px;
          text-align: left;
        }
        &-setting {
          flex: 1;
          text-align: right;
        }
      }
    }
    .iconfont {
      font-size: 26px;
    }
  }
  .main-option {
    margin-top: 25px;
    border: 1px solid #ccc;
    border-left: 0;
    border-right: 0;
    background-color: white;
  }
  .info {
    background: white;
    height: 150px;
    .mint-cell-wrapper {
      padding: 0;
    }
    .mint-cell-value {
      flex: 1;
      justify-content: center;
      align-items: flex-end;
    }
    &-img {
      height: 100px;
      width: 100px;
    }
  }
  .options {
    height: 70px;
    display: flex;
    align-items: center;
    margin: 0 15px;
    border-top: 1px solid #ccc;
    &:first-child {
      border-top: 0;
    }
    i {
      width: 30px;
    }
    span {
      flex: 1;
      text-align: left;
      margin-left: 15px;
      font-weight: 600;
    }
  }
</style>

