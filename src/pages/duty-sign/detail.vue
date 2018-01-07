<template>
  <article class="duty-detail">
    <section class="duty-content">
      <h2 class="title">
        标题
      </h2>
      <div v-html="info" class="html-container"></div>
    </section>
    <section id="writing-pad">
      <div class="sign" @click="showPad"><i class="iconfont icon-qiandao"></i>签到</div>
      <v-writing-pad v-if="showWritePad" ref="write-pad">
        <div class="option">
          <mt-button v-on:click="clear">清除</mt-button>
          <mt-button v-on:click="submit">提交</mt-button>
        </div>
      </v-writing-pad>
    </section>
  </article>
</template>
<script>
import { materialDetailUrl, trainLearnSignUrl } from '@/module/api/api';
import writingPad from '@/components/writing-pad';
import { fetch } from '@/module/common/fetch';
import { getQueryString } from '@/module/common/utils';
import eventbus from '@/module/common/EventBus';
export default {
  name: 'material-detail',
  data () {
    return {
      qs: getQueryString(),
      info: null,
      signInfo: '',
      eventbus,
      showWritePad: false
    };
  },
  created () {
    this.getMaterialDetail({
      id: this.qs.id
    });
  },
  components: {
    'v-writing-pad': writingPad
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
    getSignInfo (data) {
      this.signInfo = data;
    },
    showPad () {
      this.showWritePad = true;
    },
    async submit () {
      const data = this.$refs['write-pad'].draw.save();
      console.log(data);
      fetch(trainLearnSignUrl, {
        method: 'POST',
        query: {
          id: this.qs.id
        },
        data: {
          base64Data: data
        }
      }).then(data => {
        console.log(data);
      });
    },
    clear () {
      this.$refs['write-pad'].clear();
    }
  }
};
</script>
<style lang="scss">
  .duty {
    &-content {
      padding: 20px;
    }
    &-title {
      margin-bottom: 10px; 
    }
  }
</style>

