<template>
  <article class="bus-check">
    <h1>车辆检查</h1>
    <p>请提供车辆各方位照片</p>
    <section class="bus-item" v-for="pic in position" :key="'pic' + pic.flag">
      <span class="bus-title">{{pic.title}}</span>
      <section class="bus-content">
        <img class="bus-img" :src="pic.imgUrl || defaultImg"/>
        <v-camera :callback="getUrl">
        <div @click="chooseBus(pic.flag)">上传</div>
      </v-camera>
      </section>
    </section>
    <div class="bus-submit" @click="submit">提交</div>
  </article>
</template>
<script>
import Camera from '@/components/camera';
import { materialListUrl, truckPhotoUploadUrl } from '@/module/api/api';
import { fetch } from '@/module/common/fetch';
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
    chooseBus (flag) {
      this.curPic = flag;
    },
    getMaterialList () {
      fetch(`${materialListUrl}/1`, {
        method: 'get'
      }).then(rst => {
        this.materials = rst.data.data || [];
      });
    },
    clickEvent (id) {
      this.$router.push({path: `/material/detail?id=${id}`});
    },
    getUrl (url) {
      this.position[this.curPic].imgUrl = url;
    },
    submit () {
      fetch(`${truckPhotoUploadUrl}/1`, {}).then(() => {
        console.log();
      });
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
    &-item {
      display: flex;
      margin-top: 30px;
    }
    &-title {
      width: 130px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: #333;
    }
  }
</style>

