import React, { Component } from 'react'
import Rave from 'react-flutterwave-rave'

class RavePayment extends Component {
   constructor(props) {
      super(props)
      this.state = {
         key: 'FLWPUBK_TEST-1698436ccb9a38d881340a6c01559c12-X', // RavePay PUBLIC KEY
         amount: this.props.toPay,
         name: '',
         email: '',
      }
      this.onSuccess = this.onSuccess.bind(this)
      this.onCancel = this.onCancel.bind(this)
   }
   componentDidMount() {
      if (
         (this.props.userInfo && this.props.userInfo.email,
         this.props.userInfo.name)
      ) {
         this.setState({
            email: this.props.userInfo.email,
            name: this.props.userInfo.name,
         })
      }
   }
   onSuccess = (response) => {
      console.log('The paymesnt was succesful', response)
      this.props.onSuccess(response)
   }

   onCancel = () => {
      console.log('Payment cancel')
      this.props.transactionCanceled()
   }

   render() {
      return (
         <div className='App'>
            <Rave
               pay_button_text='Pay With Rave'
               class='ravebutton'
               payment_method='card'
               customer_name={this.state.name}
               customer_email={this.state.email}
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
