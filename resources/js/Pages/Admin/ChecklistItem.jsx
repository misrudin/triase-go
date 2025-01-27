import Seo from "@/components/seo";
import ChecklistItem from "@/containers/ChecklistItem";
import React from "react";

const ChecklistItemPage = ({ ...props }) => {
    return (
        <>
            <Seo title="Checklist Item" />
            <ChecklistItem {...props} />
        </>
    );
};

export default ChecklistItemPage;
