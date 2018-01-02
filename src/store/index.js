import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    questionData: []
  },
  mutations: {
    setName (state, name) {
      state.userName = name;
    },
    setQuestionData (state, questionData) {
      state.questionData = questionData;
    }
  }
});
