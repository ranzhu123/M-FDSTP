<template>
  <table class="v-table" cellspacing="0">
    <tr v-if="columns.length">
      <th></th>
      <th v-for="(column, index) in columns" :key="'table' + index" :value="column" @click="columnEvent(column)">
        {{column.value}}
      </th>
    </tr>
    <tr v-for="(list, index) in tableData" :key="'list' + index" @click="event(list.id)">
      <td class="read-flag" v-if="list.isRead"></td>
      <td class="read-flag" v-else><span class="circle"></span></td>
      <td :class="list.isRead?'':'important'" v-for="(column,index) in columns" :key="'data' + index">
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
    .circle {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #666;
      top: 12px;
      left: 11px;
    }
    tr {
      line-height: 30px;
      vertical-align: bottom;
      height: 30px;
    }
    th, td {
      border-bottom: 1px solid #e6ebf5;
      position: relative;
    }
    th {
      color: #878d99;
    }
    td {
      color: #5a5e66;
      &.important {
        font-weight: bold;
      }
      &.read-flag {
        width: 30px;
      }
    }
  }
</style>

