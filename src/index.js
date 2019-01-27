const { GraphQLServer } = require('graphql-yoga');

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullsatck tutorial for GraphQL'
}];

let idCount = links.length;

const resolvers = {
    Query: {
        info: () => `This is the API of a links`,
        // info: () => null,
        feed: () => links,
        link: (parent, args) => {
            return links.find(elem => args.id === elem.id);
        },
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            };
            links.push(link);

            return link;
        },
        updateLink: (parent, args) => {
            let link = links.find(elem => args.id === elem.id);

            link.id = args.id;
            if (typeof args.url !== 'undefined') link.url = args.url;
            if (typeof args.description !== 'undefined') link.description = args.description;

            return link;
        },
        deleteLink: (parent, args) => {
            let linkIndex = links.findIndex(elem => args.id === elem.id);

            if(linkIndex === -1) throw new Error("Link not found !");
            
            return links.splice(linkIndex, 1)[0];
        }
    },
    // Link: {
    //     id: (parent) => parent.id,
    //     description: (parent) => parent.description,
    //     url: (parent) => parent.url,
    // }
};

const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));