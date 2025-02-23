import UserLayout from "@/Layouts/UserLayout";
import HomeTriage from "@/containers/Home/Home";
import React from "react";

const Home = ({ ...props }) => {
    return (
        <>
            <HomeTriage {...props} />
        </>
    );
};

Home.layout = (page) => <UserLayout children={page} title="Daftar Triase" />;

export default Home;
