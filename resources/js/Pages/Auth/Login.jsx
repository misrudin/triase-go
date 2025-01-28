import { LoginForm } from "@/components/login-form";
import Seo from "@/components/seo";
import AuthLayout from "@/Layouts/AuthLayout";
import React from "react";

const Login = () => {
    return (
        <>
            <Seo title="Login" />
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <LoginForm />
                </div>
            </div>
        </>
    );
};

Login.layout = (page) => <AuthLayout children={page} />;

export default Login;
