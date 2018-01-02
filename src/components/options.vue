<template>
  <article class="options">
    <header class="question-name">{{question}}</header>
    <section class="options-item" v-for="(option, index) in options" :key="index">
      <div class="options-check"><span class="checkbox" :class="checkBoxStyle(option.status)"></span></div>
      <div class="options-value">{{option.value}}</div>
    </section>
  </article>
</template>
<script>
const classesMap = {
  'correct': 'correct',
  'wrong': 'wrong',
  'unchecked': 'unchecked',
  'disabled': 'disabled'
};
export default {
  name: 'app',
  props: {
    question: {
      type: String,
      required: true,
      default: '题目'
    },
    options: {
      type: Array,
      required: true,
      default: []
    }
  },
  methods: {
    checkBoxStyle (status) {
      return classesMap[status];
    }
  },
  data () {
    return {
    };
  }
};
</script>
<style lang="scss" scoped>
  .question-name {
    min-height: 150px;
    margin: 30px 15px 30px;
    font-size: 20px;
    align-items: center;
    display: flex;
    justify-content: center;
    color: #888;
  }
  .options {
    &-item {
      display: flex;
    }
    &-check {
      width: 80px;
    }
    &-value {
      flex: 1;
      text-align: left;
    }
  }
</style>

