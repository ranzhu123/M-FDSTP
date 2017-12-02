<template>
  <article class="material-detail">
    {{info}}
    <section>
      <v-camera>
        <div class="take-photo">拍照</div>
      </v-camera>
      <div class="sign" @click="sign">签到</div>
    </section>
  </article>
</template>
<script>
import { materialDetailUrl, signUrl } from '@/module/api/api';
import Camera from '@/components/camera';
import axios from 'axios';
import { getQueryString } from '@/module/common/utils';
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
    'v-camera': Camera
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
    sign () {
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
  .take-photo, .sign {
    cursor: pointer;
    line-height: 40px;
    background-color: #b18f5a;
    color: white;
    margin: 5px 50px;
    border-radius: 4px;
  }
</style>

