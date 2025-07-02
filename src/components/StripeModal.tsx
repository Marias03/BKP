import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm"; 

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function StripeModal({ open, onClose, onSuccess }: { open: boolean, onClose: () => void, onSuccess: () => void }) {
  if (!open) return null;

  return (
  <div>
      <div className="stripe-modal-overlay">
      <div className="stripe-modal-content">
        <button onClick={onClose} className="stripe-modal-close" aria-label="Закрыть">&times;</button>
        <h2 style={{marginBottom: "18px"}}>Оплата визы</h2>
        <Elements stripe={stripePromise}>
          <StripeForm onClose={onClose} onSuccess={onSuccess} />
        </Elements>
      </div>
      <style jsx global>{`
        .stripe-modal-overlay {
          position: fixed; inset:0; z-index:9999;
          background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center;
        }
        .stripe-modal-content {
          background: #fff;
          padding: 2rem;
          min-width: 350px;
          border-radius: 13px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.17);
          position: relative;
        }
        .stripe-modal-close {
          position: absolute; top: 10px; right: 18px;
          font-size: 2rem; background: none; border: none; cursor: pointer; color: #888;
        }
      `}</style>
    </div>
  </div>

  );
}
