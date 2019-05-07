const mongoose = require('mongoose');
const graphql = require('graphql');
const {GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull} = graphql;
const SongType = require('./song_type');
const LyricType = require('./lyric_type');
const UserType = require('./user_type');
const Lyric = mongoose.model('lyric');
const Song = mongoose.model('song');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        songs: {
            type: new GraphQLList(SongType),
            resolve() {
                return Song.find({});
            }
        },
        song: {
            type: SongType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parentValue, {id}) {
                return Song.findById(id);
            }
        },
        lyric: {
            type: LyricType,
            args: {id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parentValue, {id}) {
                return Lyric.findById(id);
            }
        },
        user: {
            type: UserType,
            resolve(parentValue, args, req) {
                console.log(req.user);
                debugger;
                return req.user;
            }
        }
    })
});

module.exports = RootQuery;
