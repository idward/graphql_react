import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';
import AuthForm from "../authForm/AuthForm";

class SignupForm extends Component {
    state = {
        errors: []
    }

    onHandleSubmitForm = ({email, password}) => {
        this.props.signup({variables: {email, password}})
            .then(res => {
                window.alert('Register is successfully done');
                window.location.replace('/');
            })
            .catch(res => {
                const errors = res.graphQLErrors.map(error => error.message);
                this.setState({errors});
            });
    }

    render() {
        return (
            <div>
                <h3>Signup</h3>
                <AuthForm handleSubmitForm={this.onHandleSubmitForm}
                          errors={this.state.errors}/>
            </div>
        );
    }
}

const signup = gql`
    mutation Signup($email:String!,$password:String!){
        signup(email:$email,password:$password){
            id
            email
        }
    }
`;

export default compose(graphql(signup, {name: "signup"}))(SignupForm);