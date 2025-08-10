import React from "react";
import "./CustomerForm.css";

const CustomerForm = ({customerName, setCustomerName, mobileNumber, setMobileNumber}) => {
  return (
    <div className="px-3">
      <div className="mb-1">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customer-name" className="col-4">
            Customer Name
          </label>

          <input
            type="text"
            className="form-control form-control-sm"
            id="customer-name"
            onChange={(ev) => setCustomerName(ev.target.value)}
            value={customerName}
          />
        </div>
      </div>

      <div className="mb-2">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="mobile-number" className="col-4">
            Mobile Number
          </label>

          <input
            type="text"
            className="form-control form-control-sm"
            id="mobile-number"
            onChange={(ev) => setMobileNumber(ev.target.value)}
            value={mobileNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
