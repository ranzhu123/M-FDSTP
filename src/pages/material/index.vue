<template>
  <article class="material">
    <h2>安全会议列表</h2>
    <v-table :columns="columns" :table-data="materials" :event="clickEvent">
    </v-table>
  </article>
</template>
<script>
import vueTable from '@/components/table';
import { materialListUrl } from '@/module/api/api';
import axios from 'axios';
export default {
  name: 'material',
  data () {
    return {
      materialListUrl: materialListUrl,
      columns: [{
        key: 'title',
        value: '标题'
      }, {
        key: 'date',
        value: '日期',
        event: this.sortByDate
      }],
      materials: [],
      dateSort2before: true // true是从近到远，false从远到近
    };
  },
  components: {
    'v-table': vueTable
  },
  created () {
    this.getMaterialList();
  },
  methods: {
    getMaterialList () {
      axios.get(materialListUrl).then(rst => {
        const materials = rst.data.data || [];
        const materialsRead = materials.filter(material => material.isRead);
        const materialsNoRead = materials.filter(material => !material.isRead);
        this.materials = materialsNoRead.concat(materialsRead);
      });
    },
    clickEvent (id) {
      this.$router.push({path: `/material/detail?id=${id}`});
    },
    sortByDate () {
      const power = this.dateSort2before ? 1 : -1;
      this.materials = this.sortMaterials((a, b) => {
        return power * (new Date(b.date) - new Date(a.date));
      });
      this.dateSort2before = !this.dateSort2before;
    },
    sortMaterials (sortFunc) {
      return this.materials.sort(sortFunc);
    }
  }
};
</script>
<style lang="scss">
  .material {
    padding: 20px 10px;
    h2 {
      margin-bottom: 20px;
    }
  } 
</style>

