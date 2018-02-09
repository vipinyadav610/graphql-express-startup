import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} from 'graphql'
import _ from 'lodash'
const companies = [
    { id: '1', name: 'Astics', description: 'company a' },
    { id: '2', name: 'More binary', description: 'company b' },
    { id: '3', name: 'facebook', description: 'company c' },
    { id: '4', name: 'amelco', description: 'company d' },
    { id: '5', name: 'google', description: 'company e' }
]

const users = [
    { id: '1', firstName: 'gaurav', age: 26, companyID: '1', friends: ['2', '3'] },
    { id: '2', firstName: 'rishabh', age: 25, companyID: '5', friends: ['1', '3'] },
    { id: '3', firstName: 'prashant', age: 24, companyID: '2', friends: ['1', '2'] },
    { id: '4', firstName: 'ryan', age: 23, companyID: '4', friends: ['1', '5'] },
    { id: '5', firstName: 'vaidehi', age: 22, companyID: '3', friends: ['2', '5'] }
]
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
})
const FriendsType = new GraphQLObjectType({
    name: 'friends',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyID: {
            type: CompanyType,
            resolve(parentValue, args) {
                return _.find(companies, { id: parentValue.companyID })
            }
        }
    }
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        friends: {
            type: new GraphQLList(FriendsType),
            resolve(parentValue, args) {
                const friends = []
                parentValue.friends.filter((id) => {
                    friends.push(_.find(users, { id }))

                })
                return friends

            }
        },
        companyID: {
            type: CompanyType,
            resolve(parentValue, args) {
                return _.find(companies, { id: parentValue.companyID })
            }
        }
    }
})
const RootQuery = new GraphQLObjectType({
    name: 'user',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, { id }) {
                return _.find(users, { id })
            }
        }
    }
})
export default new GraphQLSchema({
    query: RootQuery

})