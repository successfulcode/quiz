import React from 'react'
import styles from './QuizList.module.css'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/loader/Loader'
import { fetchQuizes } from '../../store/actions/quiz'
import { connect } from 'react-redux'

class QuizList extends React.Component {

    renderQuizes() {
        return this.props.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )

        }
        )
    }
    componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        return (

            <div className={styles.QuizList}>
                <div>
                    <div><h1>Testų sąrašas</h1></div>
                    {
                        this.props.loading && this.props.quizes.length !== 0
                            ? <Loader />
                            : <ul>
                                {this.renderQuizes()}
                            </ul>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)

