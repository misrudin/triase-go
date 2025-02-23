import CreateTriage from "@/containers/CreateTriage";
import UserLayout from "@/Layouts/UserLayout";
import React from "react";

const Triage = ({ ...props }) => {
    return (
        <>
            <CreateTriage {...props} />
        </>
    );
};

Triage.layout = (page) => (
    <UserLayout children={page} title="Buat Triase Baru" />
);

export default Triage;
