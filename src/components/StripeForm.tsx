import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useTranslations } from "next-intl";

export default function StripeForm({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const t = useTranslations("StripeForm");
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage(null);

    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    setLoading(false);

    if (result.error) {
      setMessage(result.error.message || t("paymentError"));
    } else if (result.paymentIntent?.status === "succeeded") {
      await fetch("/api/log-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 10000 }),
      });
      setMessage(t("paymentSuccess"));
      onSuccess();
      setTimeout(onClose, 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginTop: "16px",
      }}
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "18px",
              color: "#32325d",
              "::placeholder": { color: "#aab7c4" },
            },
          },
          hidePostalCode: true,
        }}
      />
      <label
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          gap: "8px",
        }}
      >
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          required
        />
        {t("terms")}
        <a
          href="/offer"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0a60e7", textDecoration: "underline" }}
        >
          {t("termsLink")}
        </a>
      </label>
      <button
        type="submit"
        disabled={!stripe || loading || !agree}
        style={{
          background: "#0a60e7",
          color: "#fff",
          fontWeight: "600",
          padding: "11px 0",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        {loading ? t("processing") : t("pay")}
      </button>
      {message && (
        <div
          style={{
            marginTop: "10px",
            color:
              message.includes("success") ||
              message.includes("éxito") ||
              message.includes("成功") ||
              message.includes("успешно") ||
              message.includes("نجاح")
                ? "green"
                : "crimson",
          }}
        >
          {message}
        </div>
      )}
    </form>
  );
}
