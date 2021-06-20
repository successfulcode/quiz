import React from 'react'
import styles from './QuizCreator.module.css'
import Button from '../../components/UI/button/Button'
import { createControl, validate, validateForm } from '../../form/FormFramework'
import Input from '../../components/UI/input/Input'
import Select from '../../components/UI/select/Select'
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create'
import { connect } from 'react-redux'

function createOptionControl(number) {
    return createControl({
        label: `Variantas ${number}`,
        errorMessage: 'Turi būti įvesta reikšmė',
        id: number
    }, { required: true })
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Įveskite klausimą',
            errorMessage: 'Laukas klausimas, turi būti užpildytas'
        }, { required: true }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

class QuizCreator extends React.Component {

    state = {
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    addQuestionHandler = (event, index) => {
        event.preventDefault()
        const { question, option1, option2, option3, option4 } = this.state.formControls
        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id }
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })
    }
    createQuizHandler = (event) => {
        event.preventDefault()


        this.setState({
            quiz: [],
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })
        this.props.finishCreateQuiz()

    }

    onChangeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)
        formControls[controlName] = control
        this.setState({ formControls, isFormValid: validateForm(formControls) })
    }
    renderControls() {

        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.onChangeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr /> : null}
                </>
            )
        })
    }

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        const select = <Select
            label='Pasirinkite tesingą klausimą'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 }
            ]}
        />
        return (
            <div className={styles.QuizCreator}>
                <div>
                    <h1>Testo sukūrimas</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}
                        {select}
                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >Pridėti klausimą</Button>
                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >Sukūrti testą</Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)