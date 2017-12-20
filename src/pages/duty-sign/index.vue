<template>
  <article class="material">
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
        value: '日期'
      }],
      materials: []
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
      fetch(`${materialListUrl}/3`, {
        method: 'get'
      }).then(rst => {
        this.materials = rst.data || [];
      });
    },
    clickEvent (id) {
      this.$router.push({path: `/duty-sign/detail?id=${id}`});
    }
  }
};
</script>
<style lang="scss">
  
</style>

