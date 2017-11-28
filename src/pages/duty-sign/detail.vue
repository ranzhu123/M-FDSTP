<template>
  <article class="material-detail">
    {{info}}
    <section>
      <v-writing-pad></v-writing-pad>
      <div @click="submit">提交</div>
    </section>
  </article>
</template>
<script>
import { materialDetailUrl, signUrl } from '@/module/api/api';
import writingPad from '@/components/writing-pad';
import axios from 'axios';
import getQueryString from '@/module/common/utils';
export default {
  name: 'material-detail',
  data () {
    return {
      qs: getQueryString(),
      info: ''
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
      axios.get(materialDetailUrl, {
        query: options
      }).then(rst => {
        console.log(rst);
        this.info = rst.data.data.info;
      });
    },
    submit () {
      axios.get(signUrl).then(rst => {
        console.log(rst);
        if (rst.data.flag) {
          alert('签到成功');
        }
      });
    }
  }
};
</script>
<style lang="scss">
  
</style>

