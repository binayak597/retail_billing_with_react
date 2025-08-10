import React, { useContext, useState } from "react";
import "./Explore.css";
import { AppContext } from "../../context/AppContext";
import DisplayCategory from "../../components/display-category/DisplayCategory";
import DisplayItems from "../../components/display-items/DisplayItems";
import CustomerForm from "../../components/cutomer-form/CustomerForm";
import CartItems from "../../components/cart-items/CartItems";
import CartSummary from "../../components/cart-summary/CartSummary";

const Explore = () => {
  const { categories } = useContext(AppContext);

  const [ selectedCategory, setSelectedCategory ] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  return (
    <div className="explore-container text-light">
      <div className="left-column">
        <div className="first-row" style={{ overflowY: "auto" }}>
          <DisplayCategory
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <hr className="horizontal-line" />

        <div className="second-row" style={{ overflowY: "auto" }}>
          <DisplayItems selectedCategory={selectedCategory} />
        </div>
      </div>

      <div className="right-column d-flex flex-column">
        <div className="customer form-container" style={{ height: "15%" }}>
          <CustomerForm
            customerName={customerName}
            setCustomerName={setCustomerName}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
          />
        </div>
        <hr className="mt-4 text-light" />

        <div
          className="cart-items-container"
          style={{ height: "38%", overflowY: "auto" }}
        >
          <CartItems
            customerName={customerName}
            setCustomerName={setCustomerName}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
          />
        </div>

        <div className="cart-summary-container" style={{ height: "30%"}}>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Explore;
