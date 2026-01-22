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
        <div className="m-4">
          <PaymentElement />
          <div className="mt-2">
            <ShippingAddressElement />
          </div>
          <div className="flex justify-center mt-2">
            Total: {checkoutState.checkout.total.total.amount}
          </div>
          <PayButton />
        </div>
      );
  }
};
