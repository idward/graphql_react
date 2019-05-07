import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';

// const client = new ApolloClient({
//     networkInterface: createNetworkInterface({
//         uri: 'http://localhost:4000/graphql',
//         opts: {
//             credentials: 'same-origin'
//         }
//     }),
//     dataIdFromObject: o => o.id
// });
const client = new ApolloClient({
    link: new HttpLink({
        uri: '/graphql',
        credentials: 'same-origin'
    }),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'));
