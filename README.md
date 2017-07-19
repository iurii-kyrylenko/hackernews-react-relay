### Following tutorial [React-Relay Demo](https://www.howtographql.com/react-relay/1-getting-started/)

#### Creating the GraphQL Server
```
> npm i npm i -D graphcool
> ./node_modules/.bin/graphcool init --schema https://graphqlbin.com/hn-relay.graphql --name Hackernews
```

#### Getting GraphQL schema
```
> npm i -D get-graphql-schema
> ./node_modules/.bin/get-graphql-schema __RELAY_API_ENDPOINT__ > ./schema.graphql
```
