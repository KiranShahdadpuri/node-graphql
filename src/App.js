import React, {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks';


const GET_QUERY = gql`
{
  products {
    id,
    name
  }
}

`
function App() {
  const [products, setProduct] = useState([])
  const { loading, error, data } = useQuery(GET_QUERY);
  
  useEffect(() => {
    if(data && data.products) {
      setProduct(data.products);
    }
  }, [data])
   
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
      
    </div>
  )
  
}

export default App;
