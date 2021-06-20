import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from '../actions/actionTypes'
import AxiosQuiz from '../../components/axios/AxiosQuiz'

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await AxiosQuiz.post('quizes.json', getState().create.quiz)
        dispatch(resetQuizCreation())

    }
}

