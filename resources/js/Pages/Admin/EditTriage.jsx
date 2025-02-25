import Seo from "@/components/seo";
import React from "react";

const EditTriagePage = ({ ...props }) => {
    console.log(props.data);
    console.log(props.checklist);
    return (
        <>
            <Seo title="Edit Triage" />
        </>
    );
};

export default EditTriagePage;
