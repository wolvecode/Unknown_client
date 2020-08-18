import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Auth from '../hoc/auth'
// pages for the food
import LandingPage from './views/LandingPage/LandingPage.js'
import LoginPage from './views/LoginPage/LoginPage.js'
import RegisterPage from './views/RegisterPage/RegisterPage.js'
import NavBar from './views/NavBar/NavBar'
import Footer from './views/Footer/Footer'
import UploadProduct from './views/Upload/UploadProduct'
import DetailPage from './views/DetailFood/DetailFood'
import Cart from './views/Cart/Cart'
import HistoryPage from './views/HistoryPage/HistoryPage'

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
   return (
      <Suspense fallback={<div>Loading...</div>}>
         <NavBar />
         <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
            <Switch>
               <Route exact path='/' component={Auth(LandingPage, null)} />
               <Route exact path='/login' component={Auth(LoginPage, false)} />
               <Route
                  exact
                  path='/register'
                  component={Auth(RegisterPage, false)}
               />
               <Route exact path='/user/cart' component={Auth(Cart, true)} />
               <Route
                  exact
                  path='/history'
                  component={Auth(HistoryPage, true)}
               />
               <Route
                  exact
                  path='/product/upload'
                  component={Auth(UploadProduct, true)}
               />
               <Route
                  exact
                  path='/product/:foodId'
                  component={Auth(DetailPage, null)}
               />
            </Switch>
         </div>
         <Footer />
      </Suspense>
   )
}

export default App
