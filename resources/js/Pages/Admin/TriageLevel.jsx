import Seo from "@/components/seo";
import TriageLevel from "@/containers/TriageLevel";
import React from "react";

const TriageLevelPage = ({ ...props }) => {
    return (
        <>
            <Seo title="Triage Level" />
            <TriageLevel {...props} />
        </>
    );
};

export default TriageLevelPage;
