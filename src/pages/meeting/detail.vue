<template>
  <article class="metting-detail">
    <section class="metting-content">
      <h2 class="title">
        {{title}}
      </h2>
      <div v-html="info" class="html-container"></div>
    </section>
    <section>
      <v-writing-pad v-if="showWritePad" ref="write-pad">
        <div class="option">
          <button class="beautiful-btn" v-on:click="clear">清除</button>
          <button class="beautiful-btn" v-on:click="submit">提交</button>
        </div>
      </v-writing-pad>
      <div class="sign beautiful-btn" @click="showPad"><i class="iconfont icon-qiandao"></i>签到</div>
      <div class="sign beautiful-btn" :class="timeover?'':'disabled'" @click="answer">
        <v-countdown v-if="!timeover" content="可答题" :over-callback="()=>{this.timeover = true}" :during=1></v-countdown>
        <span v-else>
          <i class="iconfont icon-639"></i>答题
        </span>
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
    },
    showPad () {
      this.showWritePad = true;
    }
  }
};
</script>
<style lang="scss">
  .take-photo, .sign {
    width: 250px;
    margin: 20px auto 0;
    &.disabled {
      background-color: #bfbfbf;
    }
  }
  .writing-pad {
    .option {
      display: flex;
      .beautiful-btn {
        flex: 1;
        margin: 0 20px;
      }
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

