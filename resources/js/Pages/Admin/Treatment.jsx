import Seo from "@/components/seo";
import Treatment from "@/containers/Treatment";
import React from "react";

const TreatmentPage = ({ ...props }) => {
    return (
        <>
            <Seo title="Daftar Treatment" />
            <Treatment {...props} />
        </>
    );
};

export default TreatmentPage;
