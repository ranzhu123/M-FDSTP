<template>
  <article class="bus-check">
    <div>
      前左侧
      <img :src="imgUrl"/>
      <v-camera :callback="getUrl"></v-camera>
    </div>
  </article>
</template>
<script>
import Camera from '@/components/camera';
import { materialListUrl } from '@/module/api/api';
import axios from 'axios';
export default {
  name: 'bus-check',
  data () {
    return {
      imgUrl: ''
    };
  },
  created () {
    this.getMaterialList();
  },
  components: {
    'v-camera': Camera
  },
  methods: {
    getMaterialList () {
      axios.get(materialListUrl).then(rst => {
        this.materials = rst.data.data || [];
      });
    },
    clickEvent (id) {
      this.$router.push({path: `/material/detail?id=${id}`});
    },
    getUrl (url) {
      console.log(url);
      this.imgUrl = url;
    }
  }
};
</script>
<style lang="scss">
  
</style>

