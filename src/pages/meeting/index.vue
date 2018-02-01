<template>
  <article class="material">
    <h2>教育培训列表</h2>
    <v-table :columns="columns" :table-data="materials" :event="clickEvent">
    </v-table>
  </article>
</template>
<script>
import vueTable from '@/components/table';
import { materialListUrl } from '@/module/api/api';
import { fetch } from '@/module/common/fetch';
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
      fetch(`${materialListUrl}/1`, {
        method: 'get'
      }).then(rst => {
        const materials = rst.data || [];
        const materialsRead = materials.filter(material => material.isRead);
        const materialsNoRead = materials.filter(material => !material.isRead);
        this.materials = materialsNoRead.concat(materialsRead);
      });
    },
    clickEvent (id) {
      const thisItem = this.materials.filter(material => material.id === id)[0];
      const title = thisItem.title;
      const isRead = thisItem.isRead;
      this.$router.push({path: `/meeting/detail?id=${id}&title=${title}&isRead=${isRead}`});
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

