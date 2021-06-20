import React from 'react';
import styles from './ActiveQuize.module.css'
import AnswersList from '../answersList/AnswersList';

const ActiveQuize = (props) => {
    return (
        <div className={styles.ActiveQuize}>
            <p className={styles.Question}>
                <span>
                    <strong>{props.answeNumber}</strong>&nbsp;
                    {props.question}
                </span>
                <small>{props.answeNumber}&nbsp;iš {props.quizLength}</small>
            </p>
            <AnswersList
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                state={props.state}
            />
        </div>
    )
}

export default ActiveQuize