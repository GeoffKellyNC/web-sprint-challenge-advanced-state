import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  const { form, inputChange, postQuiz, resetForm } = props
  const [disabled, setDisabled] = useState(true)

  const onChange = evt => {
    const { name, value } = evt.target
    inputChange(name, value)

    const newTrueAnswer = document.querySelector('#newTrueAnswer')
    const newQuestionAnswer = document.querySelector('#newQuestion')
    const newFalseAnswer = document.querySelector('#newFalseAnswer')


    if (newTrueAnswer.value.trim().length > 1 && newQuestionAnswer.value.trim().length > 1 && newFalseAnswer.value.trim().length > 1){
      setDisabled(false)
      return
    }else{
      setDisabled(true)
    }
  }

  const onSubmit = evt => {
    evt.preventDefault()
    const { newQuestion, newTrueAnswer, newFalseAnswer } = form
    const message = postQuiz(newQuestion, newTrueAnswer, newFalseAnswer)
    resetForm()
    setDisabled(true)
  } 

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input 
        maxLength={50} 
        onChange={onChange} 
        id="newQuestion" 
        placeholder="Enter question"
        name = 'newQuestion' 
        value = {form.newQuestion}
        />
      <input 
        maxLength={50} 
        onChange={onChange} 
        id="newTrueAnswer" 
        placeholder="Enter true answer"
        name = 'newTrueAnswer'
        value = {form.newTrueAnswer} />
      <input 
        maxLength={50} 
        onChange={onChange} 
        id="newFalseAnswer" 
        placeholder="Enter false answer" 
        name = 'newFalseAnswer'
        value = {form.newFalseAnswer} 
        />

        <button id="submitNewQuizBtn" disabled = {disabled}>Submit new quiz</button>

    </form>
  )
}

const mapStateToProps = state => {
  return {
    form: state.form
  }
}

export default connect(mapStateToProps, actionCreators)(Form)
