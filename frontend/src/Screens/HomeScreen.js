import React,{/*useState,*/useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Row,Col} from 'react-bootstrap'
import Product from '../Components/Product'
import {listProducts} from '../actions/productActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

//import axios from 'axios'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state)=>state.productList)
  const {loading,error,products} = productList
  useEffect(()=>{
    dispatch(listProducts())
  },[dispatch])

    /*const [products,setProducts] =useState([])
  useEffect( () => {
    const fetchProducts = async() => {
      const {data} =await axios.get('/api/products')

      setProducts(data)
    }
    fetchProducts()
 
  },[])
    */

    return (
        <>
            <h1 className='py-3'>Latest Products</h1>
            {(loading) ?( <Loader/>):error?(<Message variant='danger'>{error}</Message>
            ):products?(
            <Row>
            {products.map((p)=>(
            <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={p}/>
            </Col>
            ))}
        </Row>):("")
            }
            
        </>
    )
}

export default HomeScreen
