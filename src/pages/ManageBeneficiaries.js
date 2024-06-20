import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBeneficiary } from "../store/beneficiariesSlice";
import BeneficiaryForm from "../components/BeneficiaryForm";
import Layout from "../components/common/Layout";
import { Link } from "react-router-dom";
import ROUTES from "../constants/routes";
import Modal from "../components/common/Modal";
import EditIcon from "../assets/images/EditIcon.svg";
import DeleteIcon from "../assets/images/DeleteIcon.svg";
import ViewIcon from "../assets/images/ViewIcon.svg";
import ConfirmationPopup from "../components/common/Popup/ConfirmationPopup";

const { HOME, MANAGE_BENEFICIARIES } = ROUTES;

const TABLE_HEADER_COLUMNS = [
  { id: 1, title: "#" },
  { id: 2, title: "Full Name" },
  { id: 3, title: "Address" },
  { id: 4, title: "Country" },
  { id: 5, title: "Pincode" },
  { id: 6, title: "" },
];

const ManageBeneficiaries = () => {
  const beneficiaries = useSelector(
    (state) => state.beneficiaries.beneficiaries
  );

  const dispatch = useDispatch();

  // Local States
  const [beneficiaryData, setBeneficiaryData] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [deleteBeneficiaryData, setDeleteBeneficiaryData] = useState(null);

  // Delete beneficiary handler
  const deleteHandler = (beneficiary) => {
    dispatch(removeBeneficiary(beneficiary.id));
    setDeleteBeneficiaryData(null);
  };

  return (
    <Layout>
      <div className="flex justify-between w-full items-center">
        <div className="breadcrumbs">
          <Link to={HOME}>Home</Link> /{" "}
          <Link to={MANAGE_BENEFICIARIES}>List of beneficiaries</Link>
        </div>

        <button onClick={() => setBeneficiaryData({})}>Add Beneficiary</button>
      </div>

      <table className="division-y">
        <thead>
          <tr>
            {TABLE_HEADER_COLUMNS.map(({ id, title }) => (
              <th key={id}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {beneficiaries.map((beneficiary, index) => (
            <tr key={beneficiary.id}>
              <td>{index + 1}</td>
              <td>{beneficiary.fullName}</td>
              <td>{beneficiary.address}</td>
              <td>{beneficiary.country}</td>
              <td>{beneficiary.pincode}</td>
              <td className="actions">
                <div onClick={() => setBeneficiaryData(beneficiary)}>
                  <img src={EditIcon} alt="Edit" width={25} />
                </div>
                <div
                  className="remove"
                  onClick={() => setDeleteBeneficiaryData(beneficiary)}
                >
                  <img src={DeleteIcon} alt="Delete" width={25} />
                </div>
                <div onClick={() => setViewing(beneficiary)}>
                  <img src={ViewIcon} alt="View" width={25} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {beneficiaryData?.id ? (
        <Modal onCloseModalHandler={() => setBeneficiaryData(null)}>
          <h2>{beneficiaryData.id ? "Edit Beneficiary" : "Add Beneficiary"}</h2>
          <BeneficiaryForm
            existingData={beneficiaryData}
            onClose={() => setBeneficiaryData(null)}
          />
        </Modal>
      ) : (
        ""
      )}

      {viewing && (
        <Modal onCloseModalHandler={() => setViewing(null)}>
          <h2>View Beneficiary</h2>
          <>
            <div>Full Name: {viewing.fullName}</div>
            <div>Address: {viewing.address}</div>
            <div>Country: {viewing.country}</div>
            <div>Pincode: {viewing.pincode}</div>
            <button onClick={() => setViewing(null)}>Close</button>
          </>
        </Modal>
      )}

      {deleteBeneficiaryData?.id ? (
        <ConfirmationPopup
          message={`Are you sure you want to delete the beneficiary?`}
          onCancel={() => setDeleteBeneficiaryData(null)}
          onConfirm={() => deleteHandler(deleteBeneficiaryData)}
        />
      ) : (
        ""
      )}
    </Layout>
  );
};

export default ManageBeneficiaries;
