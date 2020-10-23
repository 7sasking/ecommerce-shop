import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import Rating from '../Components/Rating'
import {Row,Col,ListGroup,Card,Image,Button, Form} from 'react-bootstrap'
import {listProductDetails} from '../actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
//import axios from 'axios'


const ProductScreen = ({match,history}) => {
const [qty,setQty] = useState(1)
    
    const dispatch = useDispatch()

    const productDetails= useSelector(state => state.productDetails)
    const {loading,product,error} = productDetails
    
    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
    },[dispatch,match])
    
    const addToCartHandler = ()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    /*useEffect( () => {
        const fetchProduct = async() => {
          const {data} = await axios.get(`/api/products/${match.params.id}`)
    
          setProduct(data)
          
        }
        fetchProduct()
      },[match])*/
      

    return (
        <>  
            <Link className='btn btn-dark my-3' to='/'><i className="fas fa-arrow-left"></i> Back</Link>
            {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} title={product.title} fluid></Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price:${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                    <strong>{`$${product.price}`}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                    <strong>{product.countInStock > 0 ? 'InStock' : 'Out Of Stock'}</strong>
                                    </Col>
                                </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && 
                                    (<ListGroup.Item>
                                        <Row>
                                            <Col>Qty:</Col>
                                            <Col>
                                                <Form.Control as ='select' value={qty} onChange={(e)=>{
                                                    setQty(e.target.value)}}>

                                                    {[...Array(product.countInStock).keys()].map(x=>(
                                                        <option key={x+1} value={x+1}>
                                                            {x+1}
                                                        </option>
                                                    ))}
                                                </Form.Control>

                                            </Col>
                                        </Row>
                                    </ListGroup.Item>)
                                 }
                                <ListGroup.Item>
                                    <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>Add to Cart</Button>
                                </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            }
        </>
    )
}

export default ProductScreen
