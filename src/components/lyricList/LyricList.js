import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class LyricList extends Component {

    addLikeToLyric = (id) => {
        this.props.mutate({
            variables: {id}
        });
    }

    renderLyrics = () => {
        return this.props.lyrics.map(lyric => {
            return (
                <li key={lyric.id} className="collection-item">
                    {lyric.content}
                    <span className="new badge">{lyric.likes}</span>
                    <i className="material-icons right" style={{cursor: 'pointer'}}
                       onClick={this.addLikeToLyric.bind(this, lyric.id)}>thumb_up</i>
                </li>
            );
        });
    }

    render() {
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        );
    }
}

const mutation = gql`
    mutation LikeLyric($id:ID){
        likeLyric(id:$id){
            id
            likes
        }
    }
`;

export default graphql(mutation)(LyricList);