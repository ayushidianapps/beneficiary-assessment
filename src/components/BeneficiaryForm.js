import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addBeneficiary, updateBeneficiary } from "../store/beneficiariesSlice";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import ConfirmationPopup from "./common/Popup/ConfirmationPopup";

const schema = yup
  .object({
    fullName: yup.string().trim().required('Full Name is required'),
    address: yup.string().trim().required("Address is required"),
    country: yup.string().trim().required("Country is required"),
    pincode: yup.number().required("Pincode must contain only numbers").typeError('Pincode must contain only numbers')
  })
  .required()

const BeneficiaryForm = ({ existingData, onClose }) => {
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false)
  const isEditing = existingData && Object.keys(existingData)?.length;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues: existingData || {},
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    setShowConfirmationPopup(true);
  };

  const confirmedFormSubmitHandler = () => {
    const data = getValues();
    if (isEditing) {
      dispatch(updateBeneficiary({ ...existingData, ...data }));
    } else {
      dispatch(addBeneficiary({ ...data, id: Date.now() }));
    }
    onClose();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Full Name</label>
          <input {...register("fullName")} />
          {errors.fullName && <span className="error">{errors?.fullName?.message}</span>}
        </div>
        <div>
          <label>Address</label>
          <input {...register("address")} />
          {errors.address && <span className="error">{errors?.address?.message}</span>}
        </div>
        <div>
          <label>Country</label>
          <select {...register("country")}>
            <option value="India">India</option>
            <option value="US">US</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="UK">UK</option>
          </select>
          {errors.country && <span className="error">{errors?.country?.message}</span>}
        </div>
        <div>
          <label>Pincode</label>
          <input type="tel" {...register("pincode")} />
          {errors.pincode && <span className="error">{errors?.pincode?.message}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>

      {
        showConfirmationPopup && <ConfirmationPopup 
          message={`Are you sure you want to ${isEditing ? "update" : "add"} the beneficiary?`}
          onCancel={onClose}
          onConfirm={confirmedFormSubmitHandler}
        />
      }
    </>
  );
};

export default BeneficiaryForm;
