<template>
  <article class="bus-check-upload">
    <h1>车辆检查</h1>
    <p>请提供车辆各方位照片</p>
    <section class="bus-item" v-for="(pic, index) in truckList" :key="'pic' + pic.flag">
      <span class="bus-title">{{pic.name}}</span>
      <section class="bus-content">
        <img class="bus-img" :src="pic.photo || defaultImg"/>
        <v-camera :callback="getUrl">
          <div @click="chooseBus(index)">上传</div>
        </v-camera>
      </section>
    </section>
    <div class="bus-submit" @click="submit">提交</div>
  </article>
</template>
<script>
import Camera from '@/components/camera';
import { truckCheckListUrl, truckPhotoUploadUrl } from '@/module/api/api';
import { fetch } from '@/module/common/fetch';
const defaultImg = require('../../assets/car.jpg');
export default {
  name: 'bus-check-upload',
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
      ],
      truckList: []
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
      fetch(truckCheckListUrl, {
        method: 'get'
      }).then(rst => {
        this.truckList = rst.data || [];
      });
    },
    getUrl (url) {
      this.truckList[this.curPic].photo = url;
    },
    submit () {
      const files = document.querySelectorAll('.fileinput-button');
      let formData = new FormData();
      files.forEach(file => {
        formData.append('file', file.files[0]);
      });
      fetch(truckPhotoUploadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }).then(data => {
        console.log(data);
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

