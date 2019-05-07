import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import requireAuth from './hoc/requireAuth/RequireAuth';
import SongList from "./components/songList/SongList";
import SongCreate from "./components/songCreate/SongCreate";
import SongDetail from "./components/songDetail/SongDetail";
import Layout from "./components/layout/Layout";
import LoginForm from "./components/loginForm/LoginForm";
import SignupForm from "./components/signupForm/SignupForm";

class App extends Component {
    render() {
        return (
            <Layout>
                <div>
                    <Switch>
                        <Route path="/songs/new" exact component={SongCreate}/>
                        <Route path="/songs/:id" component={SongDetail}/>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/signup" component={SignupForm}/>
                        <Route path="/" exact component={requireAuth(SongList)}></Route>
                    </Switch>
                </div>
            </Layout>
        );
    }
}

export default App;
