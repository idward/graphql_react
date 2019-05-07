import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class LyricCreate extends Component {
    state = {
        content: ''
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            }
            // refetchQueries: [{query, variables: {id: this.props.songId}}]
        }).then(() => this.setState({content: ''}));
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <label>Add a lyric</label>
                <input type="text" onChange={(evt) => this.setState({content: evt.target.value})}
                       value={this.state.content}/>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

const mutation = gql`
    mutation AddLyricToSong($content:String, $songId:ID){
        addLyricToSong(content:$content, songId:$songId){
            id 
            lyrics {
                id
                content
                likes
            }
        }
    }
`;

export default graphql(mutation)(LyricCreate);