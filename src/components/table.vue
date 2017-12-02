<template>
  <table class="v-table" cellspacing="0">
    <tr v-if="columns.length">
      <th></th>
      <th v-for="column in columns" :key="'table' + column" :value="column" @click="columnEvent(column)">
        {{column.value}}
      </th>
    </tr>
    <tr v-for="list in tableData" :key="'list' + list" @click="event(list.id)">
      <td v-if="list.isRead">已读</td>
      <td v-else>未读</td>
      <td v-for="column in columns" :key="'data' + column">
        {{list[column.key]}}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    columns: {
      default () {
        return [];
      }
    },
    tableData: {
      default () {
        return [];
      }
    },
    event: {
      type: Function
    }
  },
  methods: {
    columnEvent (column) {
      if (column.event && typeof column.event === 'function') {
        return column.event();
      }
    }
  }
};
</script>
  
<style lang="scss">
  .v-table {
    width: 100%;
    text-align: left;
    tr {
      line-height: 30px;
      vertical-align: bottom;
      height: 30px;
    }
    th, td {
      border-bottom: 1px solid #e6ebf5;
    }
    th {
      color: #878d99;
    }
    td {
      color: #5a5e66;
    }
  }
</style>

