<template>
  <article class="options">
    <header class="question-name">{{optionsData.question}}</header>
    <section class="options-item" @click="chooseOption(option)" v-for="(option, index) in optionsData.options" :key="index">
      <div class="options-check"><span class="checkbox" :class="checkBoxStyle(option)">{{option.label}}</span></div>
      <div class="options-value">{{option.value}}</div>
    </section>
  </article>
</template>
<script>
const classesMap = {
  'correct': 'correct',
  'wrong': 'wrong',
  'unchecked': 'unchecked',
  'checked': 'checked',
  'disabled': 'disabled'
};
export default {
  name: 'app',
  props: {
    optionsData: {
      type: Object,
      required: true
    },
    chooseOpt
  },
  methods: {
    checkBoxStyle (option) {
      const { answered, answer, rightAnswer } = option;
      if (answered) {
        if (answered === rightAnswer) {
          return classesMap['correct'];
        }
        return classesMap['wrong'];
      } else if (answer) {
        return classesMap['checked'];
      }
      return classesMap['unchecked'];
    },
    chooseOption (option) {
      if (option.answered) {
        return;
      }
      return this.chooseOpt(option);
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
      height: 50px;
      line-height: 50px;
      font-size: 16px;
    }
    &-check {
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      .checkbox {
        width: 35px;
        height: 35px;
        line-height: 35px;
        border-radius: 50%;
        background-color: #1296db;
        color:white;
      }
    }
    &-value {
      flex: 1;
      text-align: left;
    }
  }
</style>

