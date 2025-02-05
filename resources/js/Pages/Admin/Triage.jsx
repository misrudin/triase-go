import Seo from "@/components/seo";
import Treatment from "@/containers/Treatment";
import React from "react";

const TriagePage = ({ ...props }) => {
    return (
        <>
            <Seo title="Daftar Triage" />
            <Treatment {...props} />
        </>
    );
};

export default TriagePage;
