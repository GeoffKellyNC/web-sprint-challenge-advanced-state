import axios from 'axios';
import * as types from './action-types';
// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return {
    type: types.MOVE_CLOCKWISE
  }

}

export function moveCounterClockwise() { 
  return {
    type: types.MOVE_COUNTERCLOCKWISE
  }
}

export const setSelectedAnswer = (id) => (dispatch) => {

  if (id === null) {
    dispatch({
      type: types.SET_SELECTED_ANSWER,
      payload: null
    })
    return
  }


  dispatch({
    type: types.SET_SELECTED_ANSWER,
    payload: id
  })
}

export function setMessage() { }

export const setQuiz = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:9000/api/quiz/next')

    
    dispatch({
      type: types.SET_QUIZ_INTO_STATE,
      payload: res.data
    })
    localStorage.setItem('quizData', JSON.stringify(res.data))


    return


  } catch (error) {
    console.log(error);
  }
}

export const inputChange = (name, value) => (dispatch) => {
  dispatch({
    type: types.INPUT_CHANGE,
    payload: { name, value }
  })
}

export function resetForm() { }



export const postAnswer = (quiz_id, answer_id) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:9000/api/quiz/answer', {
      quiz_id, answer_id })

    dispatch({
      type: types.SET_INFO_MESSAGE,
      payload: res.data.message
    })

    return

  } catch (error) {
    console.log(error);
  }
}

export const setInfoMessage = () => (dispatch) => {
  dispatch({
    type: types.SET_INFO_MESSAGE,
    payload: ''
  })
}

export const postQuiz = (newQuestion, newTrueAnswer, newFalseAnswer) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:9000/api/quiz/new', {
      question_text: newQuestion,
      true_answer_text: newTrueAnswer,
      false_answer_text: newFalseAnswer
    })

    console.log('res', res) //! remove

    dispatch({
      type: types.SET_INFO_MESSAGE,
      payload: `Congrats: ${res.data.question} is a great question!`
    })

    dispatch({
      type: types.RESET_FORM
    })
    return

  } catch (error) {
    console.log(error);
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
