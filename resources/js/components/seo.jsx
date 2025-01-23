import { Head } from "@inertiajs/react";
import React from "react";

const Seo = ({ title, description }) => {
    return (
        <Head title={title} description={description}>
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        </Head>
    );
};

export default Seo;
