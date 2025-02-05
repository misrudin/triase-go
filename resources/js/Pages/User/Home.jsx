import UserLayout from "@/Layouts/UserLayout";
import HomeTriage from "@/containers/Home/Home";
import React from "react";

const Home = () => {
    return (
        <>
            <HomeTriage />
        </>
    );
};

Home.layout = (page) => <UserLayout children={page} />;

export default Home;
