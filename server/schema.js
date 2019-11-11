var { buildSchema } = require("graphql");
var schema = buildSchema(`
  type Product {
    name: String,
    id: Int
  },
  type Query {
    hello: String,
    products: [Product],
    product(id:Int!):Product
  },
  input ProductInput {
    name: String
  },
  type Mutation {
    createProduct(input: ProductInput): Product
    updateProduct(id: Int!, input: ProductInput): Product
  },
  
`);

module.exports =  schema;