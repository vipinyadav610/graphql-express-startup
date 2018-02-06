import express from 'express'
import expressGraphQL from 'express-graphql'
import mongoose from 'mongoose'

const app = express();
const MONGO_URI = `mongodb://vipin10:vipin123@ds125578.mlab.com:25578/efrsgf`
mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error))

app.use('/graphql', expressGraphQL({
    graphiql: true
}));

app.listen(7001, () => {
    console.log('server is listening on port 7001')
});