import { useState } from 'react';
import { Button } from './shadcn/Button';
import { useCheckout } from '@stripe/react-stripe-js/checkout';

export const PayButton = () => {
  const checkoutState = useCheckout();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleClick = () => {
    if (checkoutState.type !== 'success') return;

    setLoading(true);

    checkoutState.checkout
      .confirm()
      .then((result) => {
        if (result.type === 'error') {
          setError(result.error.message);
        }
        setLoading(false);
      })
      .catch(console.log);
  };

  return (
    <div className="m-4 flex justify-center">
      <Button disabled={loading} onClick={handleClick} size="lg">
        pay
      </Button>
      {error && <div>{error}</div>}
    </div>
  );
};
