import React, {useState, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import gql from 'graphql-tag'
import {useQuery, useMutation} from '@apollo/react-hooks';

const GET_QUERY = gql `
{
  products {
    id,
    name
  }
}

`
const ADD_Product = gql `
mutation Mutation($input:ProductInput!){
  createProduct(
    input:$input
  ) {
    name,
    id
  }
}

`
function App() {
    let inputProduct = ''
    const [products, setProduct] = useState([])
    const {loading, error, data, refetch} = useQuery(GET_QUERY);
    // const inputProduct = useRef(null)
    const [addProductMutation, { addResponse}] = useMutation(ADD_Product);
    useEffect(() => {
        console.log("addResponse:",addResponse)
        if (data && data.products) {
            setProduct(data.products);
        }
    }, [data,products])

    const addProduct = async (node, inputProduct) => {
      await addProductMutation({
          variables: {
              input:{ "name" : inputProduct} 
          }
      })
      node.value = ''
      refetch()
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }

    return (
        <div>
            <ul>
                {products.map(product => <li key={product.id}>{product.name}</li>)}
            </ul>
            <input type="text" ref={node => inputProduct = node} />
            <button onClick={() => addProduct(inputProduct, inputProduct.value)}>Add Product</button>
        </div>
    )

}

export default App;
