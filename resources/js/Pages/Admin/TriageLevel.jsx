import Seo from "@/components/seo";
import TriageLevel from "@/containers/TriageLevel";
import React from "react";

const TriageLevelPage = ({ data }) => {
    return (
        <>
            <Seo title="Triage Level" />
            <TriageLevel data={data} />
        </>
    );
};

export default TriageLevelPage;
