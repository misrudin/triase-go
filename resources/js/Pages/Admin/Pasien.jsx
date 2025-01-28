import Seo from "@/components/seo";
import Pasien from "@/containers/Pasien";
import React from "react";

const PasienPage = ({ ...props }) => {
    return (
        <>
            <Seo title="Daftar Pasien" />
            <Pasien {...props} />
        </>
    );
};

export default PasienPage;
