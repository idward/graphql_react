import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import AuthForm from "../authForm/AuthForm";
import {current} from "../layout/Header";

class LoginForm extends Component {
    state = {
        errors: []
    }

    onHandleSubmitForm = ({email, password}) => {
        this.props.mutate({
            variables: {email, password}
        }).then(res => {
            window.location.replace("/");
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({errors});
        });
    }

    render() {
        const {loading, user} = this.props.data;
        if (loading) return null;

        if (user) this.props.history.push('/');

        return (
            <div>
                <h3>Login</h3>
                <AuthForm handleSubmitForm={this.onHandleSubmitForm}
                          errors={this.state.errors}/>
            </div>
        );
    }

    // componentWillUpdate(nextProps) {
    //     if (!nextProps.data.loading && nextProps.data.user) {
    //         this.props.history.push('/');
    //     }
    // }
}

const mutation = gql`
    mutation Login($email:String!,$password:String!){
        login(email:$email,password:$password){
            id
            email
        }
    }
`;

export default graphql(current)(graphql(mutation)(LoginForm));