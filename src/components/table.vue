<template>
  <table>
    <tr v-if="columns.length">
      <th></th>
      <th v-for="column in columns" :key="'table' + column" :value="column">
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
  }
};
</script>

<style>
</style>

