import React from "react";
import { Link } from "react-router-dom";
import UserAvatar from "../../assets/images/UserAvatar.svg";
import ChartIcon from "../../assets/images/ChartIcon.svg";
import ROUTES from "../../constants/routes";

const { MANAGE_BENEFICIARIES } = ROUTES;

const Layout = ({ children }) => {
  return (
    <div>
      <div className="flex header justify-between">
        <div className="navigation">
          <img src={ChartIcon} alt="Chart Icon" width={20} />
          <Link to={MANAGE_BENEFICIARIES} className="text-white">
            Manage Beneficiary
          </Link>
        </div>
        <img src={UserAvatar} alt="User Avatar" width={20} />
      </div>
      <div className="container mt-20">{children}</div>
    </div>
  );
};

export default Layout;
