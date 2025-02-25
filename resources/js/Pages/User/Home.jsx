import Seo from "@/components/seo";
import HomeTriage from "@/containers/Home/Home";
import React from "react";

const Home = ({ ...props }) => {
    return (
        <>
            <Seo title="Daftar Triase" />
            <HomeTriage {...props} />
        </>
    );
};

export default Home;
