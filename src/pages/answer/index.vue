<template>
  <article class="bus-check">
    <v-options :choose-opt="chooseAnswer" :options-data="questionData[questionIndex]"></v-options>
    <div class="question-opt" v-if="questionIndex<questionData.length-1">
      <span @click="lastQuestion" :class="questionIndex===0?'disabled':''">
        上一题
      </span>
      <span @click="nextQuestion" :class="questionIndex===questionData.length-1?'disabled':''">
        下一题
      </span>
    </div>
    <div class="question-submit" v-else>
      <span @click="lastQuestion" :class="questionIndex===0?'disabled':''">
        上一题
      </span>
      <span @click="submitAnswer" :class="answerDisabled?'disabled':''">提交答案</span>
    </div>
  </article>
</template>
<script>
import { getQueryString } from '@/module/common/utils';
import { examQuestionUrl, submitQuestionUrl } from '@/module/api/api';
import { fetch } from '@/module/common/fetch';
import Options from '@/components/options';
export default {
  name: 'bus-check',
  data () {
    return {
      qs: getQueryString(),
      questionId: '',
      questionIndex: 0,
      options: [],
      title: '',
      questionData: [],
      value: '',
      answers: [],
      answerDisabled: false
    };
  },
  components: {
    'v-options': Options
  },
  created () {
    const routeParam = this.$route.params || {};
    this.questionId = routeParam.id;
    if (!this.questionIndex) {
      this.getQuestions();
    } else {
      this.setQuestion();
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    'questionIndex': 'setQuestion',
    'value': 'setAnswer'
  },
  methods: {
    getQuestions () {
      fetch(`${examQuestionUrl}/${this.questionId}`, {
        method: 'get'
      }).then(rst => {
        // this.questionData = rst.data.choice;
        const { choice } = rst.data;
        this.questionData = choice.map((data, index) => {
          const choicesKeys = Object.keys(data).filter(choice =>
            /choice/.test(choice)
          );
          this.answerDisabled = this.answerDisabled || data.answer;
          return {
            options: choicesKeys.map(choice => ({
              label: choice.replace('choice', ''),
              value: data[choice]
            })),
            question: data.question,
            rightAnswer: data.rightAnswer,
            answered: data.answer,
            answer: ''
          };
        });
        console.log(this.questionData);
        // if (this.questionData.some(question => question.answer)) { // 答过题
        //   this.answerDisabled = true;
        //   this.answers = this.questionData.map(question => question.answer);
        //   this.value = this.answers[0];
        // }
      });
    },
    setQuestion () {
      // const index = this.questionIndex;
      // const data = this.questionData[index - 1];
      // this.title = data.question;
      // const choicesKeys = Object.keys(data).filter(choice =>
      //   /choice/.test(choice)
      // );
      // this.options = choicesKeys.map(choice => ({
      //   label: data[choice],
      //   value: choice.replace('choice', ''),
      //   disabled: false
      // }));
    },
    nextQuestion () {
      if (this.questionIndex < this.questionData.length - 1) {
        console.log(this.value);
        return this.changeQuestion(1);
      }
    },
    lastQuestion () {
      if (this.questionIndex > 0) {
        return this.changeQuestion(-1);
      }
    },
    chooseAnswer (data) {
      const index = this.questionData.map(question => question.id).indexOf(data.id);
      this.questionData[index].answer = data.answer;
    },
    changeQuestion (num) {
      this.questionIndex += num;
      this.value = this.answers[this.questionIndex - 1];
    },
    setAnswer (value) {
      console.log(value);
      // if (this.questionData[this.questionIndex - 1].rightAnswer === value) {
      //   alert('正确');
      // } else {
      //   alert('错误');
      // }
      if (this.answers[this.questionIndex - 1] !== value) {
        this.answers[this.questionIndex - 1] = value;
      }
    },
    submitAnswer () {
      if (!this.answerDisabled) {
        fetch(`${submitQuestionUrl}/${this.questionId}`, {
          method: 'post',
          data: this.questionData.map((question, index) => ({
            questionId: question.id,
            right: question.rightAnswer === this.answers[index],
            answer: this.answers[index]
          }))
        }).then(rst => {
          if (rst.data) {
            this.getQuestions();
          } else {
            alert('提交失败');
          }
        });
      }
    }
  }
};
</script>
<style lang="scss">
  .question-opt, .question-submit {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #333;
    span {
      flex: 1;
      border-top: 1px solid #999;
      &:nth-child(2) {
        border-left: 1px solid #999;
      }
      &.disabled {
        color: #999;
        background: #bfbfbf;
      }
    }
  }
</style>

