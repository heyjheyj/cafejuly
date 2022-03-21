import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

export default class Payments extends React.Component {
  render() {
    const onSuccess = payment => {
      console.log("The payment was succeeded!", payment);
      this.props.onSuccess(payment);
    };

    const onCancel = data => {
      console.log("The payment was cancelled!", data);
    };

    const onError = err => {
      console.log("Error!", err);
    };

    let env = "sandbox";
    let currency = "USD"; // or you can set this value from your props or state
    let total = this.props.total;

    const client = {
      sandbox:
        "Adi__coHvRdTRFx3DQIg5LfFBqNYBc9o9XPcwz1krBkLAXvFtEsB_Pbh-phNDx5AQ8HiVXHSAd7mMNc9",
      production: "YOUR-PRODUCT-APP-ID"
    };

    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    );
  }
}
