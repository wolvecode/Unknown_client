import React, { Component } from 'react'
import Rave from 'react-flutterwave-rave'

class RavePayment extends Component {
   constructor(props) {
      super(props)
      this.state = {
         key: 'FLWPUBK_TEST-1698436ccb9a38d881340a6c01559c12-X', // RavePay PUBLIC KEY
         phone: '0000000000000',
         amount: this.props.toPay,
         firstname: 'Oluwole',
         lastname: 'Adebiyi',
         email: this.props.user,
      }
      this.onSuccess = this.onSuccess.bind(this)
      this.onCancel = this.onCancel.bind(this)
   }
   componentDidMount() {
      console.log(this.props.info)
   }
   onSuccess = (response) => {
      console.log('The paymesnt was succesful', response)
      this.props.onSuccess(response)
   }

   onCancel = () => {
      console.log('Payment cancel')
   }

   render() {
      return (
         <div
            style={{
               width: '200rem',
               fontSize: '1rem',
               fontWeight: 'bold',
            }}
         >
            <Rave
               pay_button_text='Pay With Rave'
               class='button'
               redirect_url='http://localhost:3000/user/cart'
               payment_method='card'
               customer_firstname={this.state.firstname}
               customer_lastname={this.state.lastname}
               customer_email={this.state.email}
               customer_phone={this.state.phone}
               amount={this.state.amount}
               ravePubKey={this.state.key}
               callback={this.onSuccess}
               onclose={this.onCancel}
            />
         </div>
      )
   }
}

export default RavePayment
