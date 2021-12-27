import { TRIVIA, TRIVIA_FAIL, INDEX, LOADING_TRIVIA } from '../actions';

const INITIAL_STATE = {
  response_code: 0,
  questions: [],
  error: '',
  questionIndex: 0,
  isLoading: false,
  asserts: 0,
};

function triviaReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING_TRIVIA:
    return {
      ...state,
      isLoading: !state.isLoading,
    };

  case TRIVIA:
    return {
      ...state,
      questions: action.payload,
    };
  case TRIVIA_FAIL:
    return {
      ...state,
      error: 'Not found',
    };
  case INDEX:
    return {
      ...state,
      questionIndex: state.questionIndex + 1,
    };
  default:
    return state;
  }
}

export default triviaReducer;
