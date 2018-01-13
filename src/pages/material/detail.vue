<template>
  <article class="material-detail">
    <section class="material-content">
      <h2 class="title">
        {{title}}
      </h2>
      <div v-html="info" class="html-container"></div>
    </section>
    <section>
      <div class="sign" @click="showPad">
        <i class="iconfont icon-qiandao"></i>
        <span class="font">签到</span>
      </div>
      <v-writing-pad v-if="showWritePad" ref="write-pad">
        <div class="option">
          <div class="option-item" @click="clear">清除</div>
          <div class="option-item" @click="submit">提交</div>
        </div>
      </v-writing-pad>
      <div class="sign" :class="timeover?'':'disabled'" @click="answer">
        <v-countdown v-if="!timeover" content="可答题" :over-callback="()=>{this.timeover = true}" :during=1></v-countdown>
        <div v-else>
          <i class="iconfont icon-639"></i><span class="font">答题</span>
        </div>
      </div>
    </section>
  </article>
</template>
<script>
import { materialDetailUrl, trainLearnSignUrl } from '@/module/api/api';
import CountDown from '@/components/countdown';
import writingPad from '@/components/writing-pad';
import { fetch } from '@/module/common/fetch';
import { getQueryString } from '@/module/common/utils';
export default {
  name: 'material-detail',
  data () {
    return {
      qs: getQueryString(),
      info: '',
      timeover: false,
      showWritePad: false
    };
  },
  created () {
    this.title = this.qs.title;
    this.getMaterialDetail({
      id: this.qs.id
    });
  },
  components: {
    'v-countdown': CountDown,
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
    showPad () {
      this.showWritePad = true;
    },
    submit () {
      const data = this.$refs['write-pad'].draw.save();
      fetch(trainLearnSignUrl, {
        method: 'post',
        query: {
          id: this.qs.id
        },
        body: {
          base64Data: data
        }
      }).then(rst => {
        if (rst.data === 'success') {
          alert('签到成功');
        }
      });
    },
    clear () {
      this.$refs['write-pad'].clear();
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
    background-color: #1f92d7;
    color: white;
    margin: 10px 50px;
    border-radius: 4px;
    &.disabled {
      background-color: #bfbfbf;
    }
  }
  .option {
    display: flex;
    padding: 10px 50px;
    &-item {
      flex: 1;
      padding: 10px;
      background-color: #1f92d7;
      margin-left: 20px;
      color: white;
      border-radius: 4px;
    }
  }
  .font {
    margin-left: 10px;
  }
  .material {
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

