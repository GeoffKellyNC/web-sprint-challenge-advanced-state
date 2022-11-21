import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../state/action-creators'

 function Quiz(props) {
  const { 
    selectedAnswer, 
    quiz, 
    setQuiz,
    postAnswer,
    setSelectedAnswer,
    setInfoMessage} = props

    const [quizSet, setQuizSet] = useState(false)
    const [answerChoose, setAnswerChoose] = useState(false)

    const setUp = async () => {
      if (quiz){
        setQuizSet(true)
        return
      }
      await setQuiz()
      setQuizSet(true)
    }

    useEffect(() => {
        setUp()


    }, [])

    const handleSubmit = async () => {
      postAnswer(quiz.quiz_id, selectedAnswer)
      setQuizSet(false)
      await setQuiz()
      setQuizSet(true)
      // setInfoMessage()
    }

    
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quizSet ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className= {`answer ${selectedAnswer === quiz.answers[0].answer_id ? 'selected' : ''}`}>
                {quiz.answers[0].text}

                <button onClick={() => {
                  setSelectedAnswer(quiz.answers[0].answer_id)
                  setAnswerChoose(true)
                }}>
                  {selectedAnswer === quiz.answers[0].answer_id ? 'SELECTED' : 'select'}
                </button>
              </div>

              <div  className= {`answer ${selectedAnswer === quiz.answers[1].answer_id ? 'selected' : ''  }`}>
                {quiz.answers[1].text}
                <button onClick = {(e) => {
                  e.preventDefault()
                  setSelectedAnswer(quiz.answers[1].answer_id)
                  setAnswerChoose(true)
                }}>
                  {selectedAnswer === quiz.answers[1].answer_id ? 'SELECTED' : 'select'}
                </button>
              </div>
            </div>

            {
              answerChoose ? (
                <button id="submitAnswerBtn" onClick = {handleSubmit}>Submit answer</button>
              ) : (
                <button id="submitAnswerBtn" disabled>Submit answer</button>
              )
            }
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return ({
    selectedAnswer: state.selectedAnswer,
    quiz: state.quiz,

  })
}

export default connect(mapStateToProps, actions)(Quiz)
