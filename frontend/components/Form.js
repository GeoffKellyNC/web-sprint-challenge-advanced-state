import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  const { form, inputChange, postQuiz } = props
  const [disabled, setDisabled] = useState(true)




  useEffect(() => {
    
  }, [])


 

 

  const onChange = evt => {
    const { name, value } = evt.target
    inputChange(name, value)
  // set button disabled if there are no values in the inputs
    const { newQuestion, newTrueAnswer, newFalseAnswer } = form
    if (newQuestion.length > 1 &&  newTrueAnswer.length > 1 && newFalseAnswer.length > 1) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }

  }
 
  const onSubmit = evt => {
    evt.preventDefault()
    const { newQuestion, newTrueAnswer, newFalseAnswer } = form
    postQuiz(newQuestion, newTrueAnswer, newFalseAnswer)
    setDisabled(true)
  }




  // console.log('render')



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
