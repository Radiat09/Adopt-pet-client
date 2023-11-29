import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
// import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth/useAuth";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const CheckoutForm = ({ refetch, campaignDetails }) => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [donated, setDonated] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  // const [transactionId, setTransactionId] = useState("");
  const axi = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const handleClientIntent = (e) => {
    // console.log("amount value", e.target.value);
    const amount = e.target.value;
    if (amount) {
      setDonated(amount);
      axiosSecure
        .post("create-payment-intent", { amount: parseFloat(amount) })
        .then((res) => {
          // console.log(res.data);
          setClientSecret(res.data?.clientSecret);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!stripe || !elements) {
      return console.log("1st error", setError("1st error"));
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return console.log("2nd error", setError("1st error"));
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[Error]", error, setError(error.message));
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      // setError(confirmError);
    } else {
      console.log("payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // setTransactionId(paymentIntent.id);
        console.log(paymentIntent.id);
        setError("");

        // Now save the payment in the database
        const donation = {
          email: user?.email,
          name: user?.displayName,
          date: new Date(),
          amount: donated,
          campaignDetails,
        };
        console.log("from 81", donation);

        const res = await axiosSecure.post("/donations", donation);
        // console.log("donation saved", res.data);
        const toastId = toast.loading("Processing...");
        if (res.data?.donationResult?.insertedId) {
          console.log(res.data);
          refetch();
          toast.success("Donation Success...", { id: toastId });
        } else {
          toast.error("Sorry! Something went worng!");
          // window.location.reload(true);
        }
      }
    }
  };
  return (
    <form className="w-full" method="dialog" onSubmit={handleSubmit}>
      <input
        onBlur={handleClientIntent}
        className="input input-bordered input-warning w-full mb-4"
        type="number"
        placeholder="enter amount"
        name="amount"
        id="amount"
      />
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex flex-col justify-start items-center">
        <p className="text-red-600">{error && error}</p>
        <button
          className="btn btn-secondary mt-10"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Donate
        </button>
        <p className="text-center text-green-500 mt-3">Press ESC to close</p>
      </div>
    </form>
  );
};

CheckoutForm.propTypes = {
  campaignDetails: PropTypes.object,
  refetch: PropTypes.func,
};
export default CheckoutForm;
