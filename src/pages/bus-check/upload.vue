<template>
  <article class="html-container bus-check-upload">
    <h1>车辆检查</h1>
    <p>请提供车辆各方位照片</p>
    <section class="bus-item" v-for="(pic, index) in truckList" :key="'pic' + pic.id">
      <span class="bus-title">{{pic.name}}</span>
      <section class="bus-content">
        <img class="bus-img" :src="pic.photo || defaultImg"/>
      </section>
      <v-camera style="flex: 1;display: flex;align-items: center;justify-content: center;" :callback="getFile">
          <div @click="chooseBus(index)">
            <!-- <span v-if="pic.fileName">{{pic.fileName}}</span> -->
            <span>上传</span>
          </div>
        </v-camera>
    </section>
    <div class="beautiful-btn bus-submit" @click="submit">提交</div>
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
    getFile (file) {
      Object.assign(this.truckList[this.curPic], file);
    },
    submit () {
      let formData = new FormData();
      let hasFile = false;
      this.truckList.forEach(tructItem => {
        hasFile = hasFile || !!tructItem.url;
        formData.append('file', tructItem.url, 'image.png');
      });
      if (!hasFile) {
        alert('请选择文件');
        return '';
      }
      return fetch(truckPhotoUploadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData,
        extractData: true
      }).then(data => {
        if (data.code === 0) {
          alert('上传成功');
          this.$router.back(-1);
        }
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
      margin: 30px auto;
      width: 250px;
    }
    &-item {
      display: flex;
      margin-top: 30px;
    }
    &-title {
      width: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      color: #333;
    }
  }
</style>

