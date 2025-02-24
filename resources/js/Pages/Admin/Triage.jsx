import Seo from "@/components/seo";
import Treatment from "@/containers/Treatment";
import React from "react";

const TriagePage = ({ ...props }) => {
    console.log(props);

    return (
        <>
            <Seo title="Daftar Triage" />
        </>
    );
};

export default TriagePage;
