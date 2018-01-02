<template>
  <article class="duty-detail">
    <section class="duty-content">
      <h2 class="title">
        标题
      </h2>
      <div v-html="info" class="html-container"></div>
    </section>
    <section id="writing-pad">
      <v-writing-pad v-if="info" ref="write-pad">
      </v-writing-pad>
      <div class="option">
          <mt-button v-on:click="clear">清除</mt-button>
          <mt-button v-on:click="submit">提交</mt-button>
        </div>
    </section>
  </article>
</template>
<script>
import { materialDetailUrl, updateTrainLearnUrl } from '@/module/api/api';
import writingPad from '@/components/writing-pad';
import { fetch } from '@/module/common/fetch';
import { getQueryString } from '@/module/common/utils';
import eventbus from '@/module/common/EventBus';
import html2canvas from 'html2canvas';
export default {
  name: 'material-detail',
  data () {
    return {
      qs: getQueryString(),
      info: null,
      signInfo: '',
      eventbus
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
    async submit () {
      const rst = Promise.all([html2canvas(document.querySelector('.duty-content')), html2canvas(document.querySelector('.writing-pad'))]).then(arr => {
        // const a = arr[0].getContext('2d').drawImage(arr[1], 0, 0);
        console.log(arr[0], arr[1]);
        document.body.appendChild(arr[0]);
        document.body.appendChild(arr[1]);
        return arr.map(i => i.toDataURL('image/png'));
        // return arr.reduce((rst, last) => last.getContext('2d').drawImage(rst, 0, 0), document.createElement('canvas'));
      });
      // console.log(data);
      console.log(updateTrainLearnUrl);
      rst.then(d => {
        console.log(d);
      });
      // html2canvas(document.querySelector('.duty-detail'), {
      //   removeContainer: false
      // }).then(c => document.body.appendChild(c));
      // fetch(updateTrainLearnUrl, {
      //   method: 'post',
      //   query: {
      //     id: this.qs.id
      //   },
      //   body: {
      //     base64Data: data
      //   }
      // }).then(rst => {
      //   console.log(rst);
      //   if (rst.data.flag) {
      //     alert('签到成功');
      //   }
      // });
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

