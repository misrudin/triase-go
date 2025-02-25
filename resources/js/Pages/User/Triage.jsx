import Seo from "@/components/seo";
import CreateTriage from "@/containers/CreateTriage";
import React from "react";

const Triage = ({ ...props }) => {
    return (
        <>
            <Seo title="Buat Triase Baru" />
            <CreateTriage {...props} />
        </>
    );
};

export default Triage;
