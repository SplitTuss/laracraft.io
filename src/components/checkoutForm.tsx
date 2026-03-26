import {
  PaymentElement,
  ShippingAddressElement,
  useCheckout,
} from '@stripe/react-stripe-js/checkout';
import { Spinner } from '@/components/shadcn/Spinner';
import { PayButton } from './payButton';

export const CheckoutForm = () => {
  const checkoutState = useCheckout();

  switch (checkoutState.type) {
    case 'loading':
      return (
        <div className="flex flex-row gap-4 items-center justify-center mt-80 sm:mt-100">
          <Spinner />
          Loading...
        </div>
      );
    case 'error':
      return <div>Error: {checkoutState.error.message}</div>;
    case 'success':
      return (
        <div className="flex flex-col m-20">
          <PaymentElement />
          <div className="mt-6">
            <ShippingAddressElement />
          </div>
          <div className="flex justify-center mt-8">
            Total: {checkoutState.checkout.total.total.amount}
          </div>
          <PayButton />
        </div>
      );
  }
};
