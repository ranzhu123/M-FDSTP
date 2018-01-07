<template>
  <article class="question">
    <header class="question-name">{{optionsData.question}}</header>
    <section class="question-item" @click="chooseOption(option)" v-for="(option, index) in optionsData.options" :key="index">
      <div class="question-check"><span class="checkbox" :class="boxStyles[index]">{{option.label}}</span></div>
      <div class="question-value">{{option.value}}</div>
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
    chooseOpt: {
      type: Function,
      required: true
    }
  },
  watch: {
    changeOpt () {
      this.setBoxStyles();
    },
    optionsData () {
      this.setBoxStyles();
    }
  },
  data () {
    return {
      changeOpt: 0,
      boxStyles: this.optionsData.options.map(option => this.checkBoxStyle(option))
    };
  },
  methods: {
    setBoxStyles () {
      this.boxStyles = this.optionsData.options.map(option => this.checkBoxStyle(option));
    },
    checkBoxStyle (option) {
      const { answered, answer, rightAnswer } = this.optionsData;
      const label = option.label;
      if (answered) {
        if (label === rightAnswer) {
          return classesMap['correct'];
        } else if (label !== rightAnswer && label === answered) {
          return classesMap['wrong'];
        }
      } else if (answer && answer === label) {
        return classesMap['checked'];
      }
      return classesMap['unchecked'];
    },
    chooseOption (option) {
      if (this.optionsData.answered) {
        return;
      }
      this.changeOpt += 1;
      return this.chooseOpt(option);
    }
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
  .question {
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
        &.correct {
          background-color: #037231;
        }
        &.wrong {
          background-color: #c20707;
        }
        &.checked {
          background-color: #1296db;
        }
        &.unchecked {
          background-color: #424744;
        }
      }
    }
    &-value {
      flex: 1;
      text-align: left;
    }
  }
</style>

