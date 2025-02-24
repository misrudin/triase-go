import Seo from "@/components/seo";
import Treatment from "@/containers/Treatment";
import TriageList from "@/containers/Triage/TriageList";
import React from "react";

const TriagePage = ({ ...props }) => {
    return (
        <>
            <Seo title="Daftar Triage" />
            <TriageList {...props} />
        </>
    );
};

export default TriagePage;
