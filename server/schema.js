var { buildSchema } = require("graphql");
var schema = buildSchema(`
  type Product {
    name: String,
    id: ID
  },
  type Query {
    hello: String,
    products: [Product],
    product(id:ID!):Product
  },
  input ProductInput {
    name: String
  },
  type Mutation {
    createProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id:ID!):String
  },
  
`);

module.exports =  schema;