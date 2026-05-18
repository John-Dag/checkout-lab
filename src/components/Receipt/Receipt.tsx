import type { PaymentIntent } from '@stripe/stripe-js';
import css from './Receipt.module.scss';

export const Receipt = (paymentIntent: PaymentIntent) => {
    return (
        <>
            <div className={css.receiptWrapper}>
                <div className={css.title}>
                    Thank you for your purchase
                </div>
                <div className={css.receiptContent}>
                    <div>
                        Id: {paymentIntent?.status}
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}