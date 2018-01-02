<template>
  <article class="metting-detail">
    <section class="metting-content">
      <h2 class="title">
        {{title}}
      </h2>
      <div v-html="info" class="html-container"></div>
    </section>
    <section>
      <v-camera>
        <div class="take-photo"><i class="iconfont icon-paizhao"></i>拍照</div>
      </v-camera>
      <div class="sign" @click="sign"><i class="iconfont icon-qiandao"></i>签到</div>
      <div class="sign" :class="timeover?'':'disabled'" @click="answer"><v-countdown :over-callback="()=>{this.timeover = true}" :during=10></v-countdown><i class="iconfont icon-qiandao"></i>答题</div>
    </section>
  </article>
</template>
<script>
import { materialDetailUrl, signUrl } from '@/module/api/api';
import Camera from '@/components/camera';
import CountDown from '@/components/countdown';
import { fetch } from '@/module/common/fetch';
import { getQueryString } from '@/module/common/utils';
export default {
  name: 'material-detail',
  data () {
    return {
      qs: getQueryString(),
      info: '',
      timeover: false
    };
  },
  created () {
    this.title = this.qs.title;
    this.getMaterialDetail({
      id: this.qs.id
    });
  },
  components: {
    'v-camera': Camera,
    'v-countdown': CountDown
  },
  methods: {
    getMaterialDetail (options) {
      fetch(materialDetailUrl, {
        method: 'get',
        query: options
      }).then(rst => {
        this.info = rst.data.content;
      });
    },
    sign () {
      fetch(signUrl, {
        method: 'get'
      }).then(rst => {
        console.log(rst);
        if (rst.data.flag) {
          alert('签到成功');
        }
      });
    },
    answer () {
      if (this.timeover) {
        this.$router.push(`/answer/${this.qs.id}`);
      } else {
        alert('还未到答题时间');
      }
    }
  }
};
</script>
<style lang="scss">
  .take-photo, .sign {
    cursor: pointer;
    line-height: 40px;
    background-color: #b18f5a;
    color: white;
    margin: 5px 50px;
    border-radius: 4px;
    &.disabled {
      background-color: #bfbfbf;
    }
  }
  .metting {
    &-content {
      padding: 20px;
    }
    &-title {
      margin-bottom: 10px; 
    }
  }
  .html-container {
    margin-top: 20px;
  }
</style>

