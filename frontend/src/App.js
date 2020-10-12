import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'

const App = ()=> {
  return (
    <Router>
      <Header/>
      <main>
        <Container>
        <Route path='/' component={HomeScreen} exact></Route>
        <Route path='/product/:id' component={ProductScreen} ></Route>
        </Container>
      </main>
      <Footer/>
    </Router>
  )
}

export default App;
