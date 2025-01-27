import Seo from "@/components/seo";
import MedicalStaff from "@/containers/MedicalStaff";
import React from "react";

const MedicalStaffPage = ({ ...props }) => {
    return (
        <>
            <Seo title="Medical Staff" />
            <MedicalStaff {...props} />
        </>
    );
};

export default MedicalStaffPage;
