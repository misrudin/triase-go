import Seo from "@/components/seo";
import Category from "@/containers/Category";
import React from "react";

const CategoryPage = ({ ...props }) => {
    return (
        <>
            <Seo title="Category" />
            <Category {...props} />
        </>
    );
};

export default CategoryPage;
