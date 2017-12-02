<template>
  <article class="bus-check">
    <section v-for="pic in position" :key="'pic' + pic">
      {{pic.title}}
      <img class="bus-img" :src="pic.imgUrl || defaultImg"/>
      <v-camera :callback="getUrl">
        <div>上传</div>
      </v-camera>
    </section>
    <div class="bus-submit">提交</div>
  </article>
</template>
<script>
import Camera from '@/components/camera';
import { materialListUrl } from '@/module/api/api';
import axios from 'axios';
const defaultImg = require('../../assets/car.jpg');
export default {
  name: 'bus-check',
  data () {
    return {
      defaultImg,
      curPic: 0,
      position: [
        {
          title: '前左侧45',
          flag: 0,
          imgUrl: ''
        }, {
          title: '前右侧45',
          flag: 1,
          imgUrl: ''
        }, {
          title: '后左侧45',
          flag: 2,
          imgUrl: ''
        }
      ]
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
      this.position[this.curPic].imgUrl = url;
    }
  }
};
</script>
<style lang="scss">
  .bus{
    &-img {
      width: 200px;
      height: 170px;
    }
    &-submit {
      width: 200px;
      margin: 20px auto;
      background: #ca7c13;
      font-size: 16px;
      color: white;
      border-radius: 4px;
      line-height: 40px
    }
  }
</style>

