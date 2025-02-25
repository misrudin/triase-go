import { LoginForm } from "@/components/login-form";
import AuthLayout from "@/Layouts/AuthLayout";
import React from "react";

const Login = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center">
            <LoginForm />
        </div>
    );
};

Login.layout = (page) => <AuthLayout children={page} />;

export default Login;
