import HomeTriage from "@/containers/Home/Home";
import React, { useEffect } from "react";

const Home = ({ ...props }) => {
    // useEffect(() => {
    //     history.pushState(null, "", location.href);
    //     window.onpopstate = () => {
    //         history.go(1);
    //     };
    // }, []);

    return <HomeTriage {...props} />;
};

export default Home;
