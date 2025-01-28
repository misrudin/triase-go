import UserLayout from "@/Layouts/UserLayout";
import React from "react";

const Home = () => {
    return (
        <>
            <h1>Test</h1>
        </>
    );
};

Home.layout = (page) => <UserLayout children={page} />;

export default Home;
