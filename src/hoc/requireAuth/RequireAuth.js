import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose, graphql} from 'react-apollo';
import {current} from "../../components/layout/Header";
import LoginForm from "../../components/loginForm/LoginForm";
import SignupForm from "../../components/signupForm/SignupForm";

export default function (WrapperComponent) {
    class RequireAuth extends Component {
        render() {
            return (
                <WrapperComponent {...this.props}/>
            );
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.current.loading && !nextProps.current.user) {
                this.props.history.push('/login');
            }
        }
    }

    return compose(graphql(current, {name: 'current'}))(withRouter(RequireAuth));
}