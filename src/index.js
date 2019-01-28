const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote');

// let links = [{
//     id: 'link-0',
//     url: 'www.howtographql.com',
//     description: 'Fullsatck tutorial for GraphQL'
// }];

// let idCount = links.length;

// const resolvers = {
//     Query: {
//         info: () => `This is the API of a links`,
//         // info: () => null,
//         feed: (root, args, context, info) => {
//             return context.prisma.links();
//         },
//         link: (parent, args) => {
//             return links.find(elem => args.id === elem.id);
//         },
//     },
//     Mutation: {
//         post: (root, args, context) => {
//             // const link = {
//             //     id: `link-${idCount++}`,
//             //     description: args.description,
//             //     url: args.url,
//             // };
//             // links.push(link);

//             // return link;

//             return context.prisma.createLink({
//                 url: args.url,
//                 description: args.description,
//             });
//         },
//         // updateLink: (parent, args) => {
//         //     let link = links.find(elem => args.id === elem.id);

//         //     link.id = args.id;
//         //     if (typeof args.url !== 'undefined') link.url = args.url;
//         //     if (typeof args.description !== 'undefined') link.description = args.description;

//         //     return link;
//         // },
//         // deleteLink: (parent, args) => {
//         //     let linkIndex = links.findIndex(elem => args.id === elem.id);

//         //     if(linkIndex === -1) throw new Error("Link not found !");
            
//         //     return links.splice(linkIndex, 1)[0];
//         // }
//     },
//     // Link: {
//     //     id: (parent) => parent.id,
//     //     description: (parent) => parent.description,
//     //     url: (parent) => parent.url,
//     // }
// };

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote,
  }

const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        }
    },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));