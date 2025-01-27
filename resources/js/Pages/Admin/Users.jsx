import Seo from "@/components/seo";
import Users from "@/containers/Users";
import React from "react";

const UsersPage = ({ ...props }) => {
    return (
        <>
            <Seo title="Data User" />
            <Users {...props} />
        </>
    );
};

export default UsersPage;
