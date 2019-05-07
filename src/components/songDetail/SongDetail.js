import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import LyricCreate from "../lyricCreate/LyricCreate";
import LyricList from "../lyricList/LyricList";

class SongDetail extends Component {
    render() {
        const {song} = this.props.data;

        if (!song) {
            return null;
        }

        return (
            <div>
                <Link to="/">Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics}/>
                <LyricCreate songId={song.id}/>
            </div>
        );
    }
}

export const query = gql`
    query Song($id:ID!){
        song(id:$id){
            id
            title
            lyrics {
                id
                content
                likes
            }
        }
    }
`;

export default graphql(query, {
    options: ({match: {params}}) => {
        return {
            variables: {
                id: params.id
            }
        };
    }
})(SongDetail);