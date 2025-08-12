import React, { useContext, useState } from "react";
import "./CartSummary";
import { AppContext } from "../../context/AppContext";
import ReceiptPopup from "../receipt-popup/ReceiptPopup";
import { createOrder, deleteOrder } from "../../service/orderService";
import toast from "react-hot-toast";
import {
  createRazorpayOrder,
  verifyPayment,
} from "../../service/paymentService";
import { AppConstants } from "../../utils/constants";

const CartSummary = ({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
}) => {
  const { cartItems, clearCart } = useContext(AppContext);

  const [isProcessing, setIsProcessing] = useState(false);

  const [orderDetails, setOrderDetails] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = totalAmount * 0.01;

  const grandTotal = totalAmount + tax;

  const clearAll = () => {
    setCustomerName("");
    setMobileNumber("");
    clearCart();
  };

  const placeOrder = () => {
    setShowPopup(true);
    clearAll();
  };

  const handlePaymentReceipt = () => {
    window.print();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const deleteOrderOrFailure = async (orderId) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const completePayment = async (paymentMode) => {
    if (!customerName || !mobileNumber) {
      toast.error("Please enter customer details");
      return;
    }

    if (cartItems.length == 0) {
      toast.error("your cart is empty");
      return;
    }

    const orderData = {
      customerName,
      phoneNumber: mobileNumber,
      cartItems,
      subTotal: totalAmount,
      tax,
      grandTotal,
      paymentMethod: paymentMode.toUpperCase(),
    };

    setIsProcessing(true);

    try {
      const response = await createOrder(orderData);

      const savedData = response.data;

      if (response.status === 201 && paymentMode === "cash") {
        toast.success("Cash Received");
        setOrderDetails(savedData);
      } else if (response.status === 201 && paymentMode === "upi") {
        const razorpayLoaded = await loadRazorpayScript();

        if (!razorpayLoaded) {
          toast.error("unable to load razorpay");
          await deleteOrderOrFailure(savedData.orderId);
          return;
        }

        const razorpayResponse = await createRazorpayOrder({
          amount: grandTotal,
          currency: "INR",
        });

        const options = {
          key: AppConstants.RAZORPAY_KEY_ID,
          amount: razorpayResponse.data.amount,
          currency: razorpayResponse.data.currency,
          order_id: razorpayResponse.data.id,
          name: "My Retail Shop",
          description: "Order payment",
          handler: async function (response) {
            await verifyPaymentHandler(response, savedData);
          },
          prefill: {
            name: customerName,
            contact: mobileNumber,
          },
          theme: {
            color: "#3399cc",
          },
          model: {
            ondismiss: async () => {
              await deleteOrderOrFailure(savedData.orderId);
              toast.error("Payment cancelled");
            },
          },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment failed", async (response) => {
          await deleteOrderOrFailure(savedData.orderId);
          toast.error("payment failed");
          console.error(response.error.description);
        });

        rzp.open();
      }
    } catch (error) {
      console.log(error);
      toast.error("Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPaymentHandler = async (response, savedOrder) => {
    const paymentData = {
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature,
      orderId: savedOrder.orderId,
    };

    try {
      const verificationResponse = await verifyPayment(paymentData);

      if (verificationResponse.status === 200) {
        toast.success("Payment successful");
        setOrderDetails({
          ...savedOrder,
          paymentDetails: {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            status: verificationResponse.status,
          },
        });
      } else {
        toast.error("Payment processing order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }
  };

  return (
    <div>
      <div className="cart-summary-details">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Item: </span>
          <span className="text-light">{totalAmount.toFixed(2)}</span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Tax (1%)</span>
          <span className="text-light">{tax.toFixed(2)}</span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span className="text-light">Total: </span>
          <span className="text-light">{grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-success flex-grow-1"
          onClick={() => completePayment("cash")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing" : "CASH"}
        </button>

        <button
          className="btn btn-primary flex-grow-1"
          onClick={() => completePayment("upi")}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing" : "UPI"}
        </button>
      </div>

      <div className="d-flex gap-3 mt-1">
        <button
          className="btn btn-warning flex-grow-1"
          onClick={placeOrder}
          disabled={isProcessing || !orderDetails}
        >
          Place Order
        </button>
      </div>

      {showPopup && (
        <ReceiptPopup
          orderDetails={{
            ...orderDetails,
            razorpayOrderId: orderDetails.paymentDetails?.razorpayOrderId,
            razorpayPaymentId: orderDetails.paymentDetails?.razorpayPaymentId,
          }}
          onClose={() => setShowPopup(false)}
          onPrint={handlePaymentReceipt}
        />
      )}
    </div>
  );
};

export default CartSummary;
