import Seo from "@/components/seo";
import CreateTriage from "@/containers/CreateTriage";
import UserLayout from "@/Layouts/UserLayout";
import React from "react";

const Triage = ({ ...props }) => {
    return (
        <>
            <Seo title="Buat Triase Baru" />
            <CreateTriage {...props} />
        </>
    );
};

Triage.layout = (page) => <UserLayout children={page} />;

export default Triage;
