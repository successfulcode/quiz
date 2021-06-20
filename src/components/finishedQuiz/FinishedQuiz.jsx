import React from 'react'
import styles from './FinishedQuiz.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import Button from '../UI/button/Button'
import { Link } from 'react-router-dom'

const FinishedQuiz = (props) => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') { total++ }
        return total
    }, 0)

    return (
        <div className={styles.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const resultStatus = props.results[index] === 'error'
                    return (
                        <li key={index}>
                            <strong> {index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <FontAwesomeIcon icon={resultStatus ? faTimes : faCheck} className={resultStatus ? styles.Error : styles.Success} />
                        </li>
                    )
                })}

            </ul>
            <p>Teisingai {successCount} iš {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRetry} type='primary'>Pakartoti</Button>
                <Link to='/'>
                    <Button type='success'>Pereit prie testu sąrašo</Button>
                </Link>
            </div>
        </div >
    )
}



export default FinishedQuiz