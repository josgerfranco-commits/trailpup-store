'use client';

import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface CheckoutProps {
  bundle: 'single' | 'double';
  color: string;
  price: number;
  quantity: number;
  title: string;
}

export default function PayPalCheckout({
  bundle,
  color,
  price,
  quantity,
  title,
}: CheckoutProps) {
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (orderComplete) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600 mb-3" />
        <h3 className="text-xl font-bold text-slate-900">Order Confirmed!</h3>
        <p className="text-sm text-slate-600 mt-1">
          Order Reference: <span className="font-mono font-semibold">{orderNumber}</span>
        </p>
        <p className="text-sm text-slate-600 mt-3">
          We are preparing your <strong>TrailPup 2-in-1 Bottle ({color})</strong>. You will receive your USPS/UPS tracking number via email within 24–48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {errorMsg && (
        <div className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
          {errorMsg}
        </div>
      )}

      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test',
          currency: 'USD',
          intent: 'capture',
        }}
      >
        <PayPalButtons
          forceReRender={[price, color, bundle]}
          style={{
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'buynow',
            height: 48,
          }}
          createOrder={(_data, actions) => {
            setErrorMsg('');
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  description: `${title} - Color: ${color}`,
                  amount: {
                    currency_code: 'USD',
                    value: price.toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={async (_data, actions) => {
            try {
              const details = await actions.order!.capture();
              const payer = details.payer;
              const shipping = details.purchase_units?.[0]?.shipping;

              const { error } = await supabase.from('orders').insert([
                {
                  paypal_order_id: details.id,
                  customer_name:
                    shipping?.name?.full_name ||
                    `${payer?.name?.given_name || ''} ${payer?.name?.surname || ''}`.trim(),
                  customer_email: payer?.email_address || 'no-email@provided.com',
                  shipping_address: shipping?.address || {},
                  bundle_type: bundle,
                  color,
                  quantity,
                  total_usd: price,
                },
              ]);

              if (error) {
                console.error('Supabase insert error:', error);
              }

              setOrderNumber(details.id || 'TP-CONFIRMED');
              setOrderComplete(true);
            } catch (err) {
              console.error(err);
              setErrorMsg('Payment could not be completed. Please try again.');
            }
          }}
          onError={(err) => {
            console.error('PayPal Error:', err);
            setErrorMsg('There was an issue connecting to PayPal. Please refresh and try again.');
          }}
        />
      </PayPalScriptProvider>

      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
        <span>256-Bit SSL Encrypted Checkout • 30-Day Money-Back Guarantee</span>
      </div>
    </div>
  );
}