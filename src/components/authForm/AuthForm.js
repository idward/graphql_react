import React, {Component} from 'react';

class AuthForm extends Component {
    state = {
        email: '',
        password: ''
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        this.props.handleSubmitForm(this.state);
    }

    render() {
        return (
            <div className="row">
                <form className="col s6" onSubmit={this.onSubmitHandler}>
                    <div className="input-field">
                        <input id="email" placeholder="email" type="text"
                               onChange={(evt) => this.setState({email: evt.target.value})}/>
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-field">
                        <input id="password" type="password" placeholder="password"
                               onChange={(evt) => this.setState({password: evt.target.value})}/>
                        <label htmlFor="password">Password:</label>
                    </div>
                    {
                        this.props.errors.map((errMessage, index) => (
                            <div style={{color: 'red', marginBottom: '10px'}} key={index}>
                                {errMessage}
                            </div>
                        ))
                    }

                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default AuthForm;