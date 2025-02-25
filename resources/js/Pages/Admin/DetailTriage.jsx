import Seo from "@/components/seo";
import React from "react";

const DetailTriagePage = ({ ...props }) => {
    console.log(props.data);
    return (
        <>
            <Seo title="Detail Triage" />
        </>
    );
};

export default DetailTriagePage;
