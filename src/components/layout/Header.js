import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import {graphql, compose} from 'react-apollo';

class Header extends Component {
    onLogoutHandler = () => {
        this.props.logout().then(res => {
            window.location.replace('/');
        });
    }

    renderButtons = () => {
        const {loading, user} = this.props.current;
        console.log('Header:', this.props);

        if (loading) return null;

        if (user) {
            return <li><a href="#" onClick={this.onLogoutHandler}>Logout</a></li>;
        } else {
            return (
                <Fragment>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </Fragment>
            );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left" style={{marginLeft: '10px'}}>Home</Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        );
    }
}

export const current = gql`
    query Current {
        user {
            id
            email
        }
    }
`;

const logout = gql`
    mutation {
        logout {
            id
            email
        }
    }
`;

export default compose(
    graphql(current, {name: "current"}),
    graphql(logout, {name: 'logout'})
)(Header);