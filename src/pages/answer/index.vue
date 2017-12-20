<template>
  <article class="bus-check">
    <mt-radio
      title="radio list"
      v-model="value"
      :options="options">
    </mt-radio>
  </article>
</template>
<script>

export default {
  name: 'bus-check',
  data () {
    return {
      options: [{
        label: 'disabled option',
        value: 'valueF',
        disabled: true
      }, {
        label: 'optionA',
        value: 'valueA'
      }, {
        label: 'optionB',
        value: 'valueB'
      }]
    };
  }
};
</script>
<style lang="scss">
  
</style>

