import React, { Component } from 'react';
import Layout from './hoc/loyout/Layout';
import Quiz from './containers/quiz/Quiz';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import QuizList from './containers/quizList/QuizList';
import QuizCreator from './containers/quizCreator/QuizCreator';
import Auth from './containers/auth/Auth';
import { connect } from 'react-redux';
import Logout from './components/logout/Logout';
import { autoLogin } from './store/actions/auth';

class App extends Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' exact component={QuizList} />
        <Redirect to='/' />
      </Switch>
    )
    if (this.props.isAutenticated) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={QuizList} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

library.add(fab, faCheckSquare, faCoffee)

function mapStateToProps(state) {
  return {
    isAutenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
