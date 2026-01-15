import {
  PaymentElement,
  ShippingAddressElement,
  useCheckout,
} from '@stripe/react-stripe-js/checkout';
import { PayButton } from './payButton';

export const CheckoutForm = () => {
  const checkoutState = useCheckout();

  switch (checkoutState.type) {
    case 'loading':
      return <div>Loading ...</div>;
    case 'error':
      return <div>Error: {checkoutState.error.message}</div>;
    case 'success':
      return (
        <pre>
          <PaymentElement />
          <ShippingAddressElement />
          <PayButton />
          Total: {checkoutState.checkout.total.total.amount}
        </pre>
      );
  }
};
