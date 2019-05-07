import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {query} from '../songList/SongList';

class SongCreate extends Component {
    state = {
        title: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.mutate({
            variables: {title: this.state.title},
            //refetchQueries: [{query}]
            update: (cache, {data: {addSong}}) => {
                const {songs} = cache.readQuery({query});
                cache.writeQuery({
                    query,
                    data: {songs: songs.concat([addSong])}
                });
            }
        }).then(() => {
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a new song</h3>
                <form onSubmit={this.onSubmit}>
                    <label>Song Title:</label>
                    <input type="text" onChange={evt => this.setState({title: evt.target.value})}
                           value={this.state.title}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title:String) {
        addSong(title:$title){
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);