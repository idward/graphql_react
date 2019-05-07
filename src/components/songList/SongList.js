import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class SongList extends Component {
    onSongDelete = (songId) => {
        this.props.mutate({
            variables: {id: songId}
        }).then(() => {
            window.alert(`${songId} has been deleted successfully`);
            this.props.data.refetch();
        });
    }

    renderSongs() {
        return this.props.data.songs.map(song => (
            <li key={song.id} className="collection-item">
                <Link to={`/songs/${song.id}`}>{song.title}</Link>
                <i className="material-icons right" style={{cursor: 'pointer'}}
                   onClick={this.onSongDelete.bind(this, song.id)}>
                    delete
                </i>
            </li>
        ));
    }

    render() {
        if (this.props.data.loading) {
            return null;
        }
        return (
            <div>
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link to="/songs/new" className="btn-floating btn-large red right">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

export const query = gql`
    {
        songs {
            id
            title
        }
    }
`;

const mutation = gql`
    mutation DeleteSong($id:ID){
        deleteSong(id:$id){
            id
        }
    }
`;

export default graphql(mutation)(graphql(query, {
    options: {
        //pollInterval: 500
    }
})(SongList));