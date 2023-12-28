"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginValuesTypes } from "@/types/common";
import { useApp } from "@/hooks/useApp";
import ButtonComponent from "@/shared/buttonComp";
import InputField from "@/shared/inputField";
import { Formik, Form } from 'formik';
import { signUpValidation } from "@/constants/validations";

const SignInForm: React.FC = () => {
  const initialValues = { email: '', password: '' };
  const { handleLogin, loading } = useApp();
  const router = useRouter();

  const handleSubmit = async (values: LoginValuesTypes, setSubmitting: (arg: boolean) => void) => {
    const isLogin = await handleLogin(values);
    if (isLogin) {
      router.push("/");
      setSubmitting(false)
    }
    setSubmitting(false)
  };

  return (
    <>
        <div className="w-full">
          <div className="flex justify-center flex-col signin">
            <div className="text-center">
              <h1 className=" w-full font-semibold text-6xl text-white mb-10">
                Sign in 
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center mt-5 w-full">
              <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit(values, setSubmitting)
                }}
                validationSchema={signUpValidation}
                className="space-y-4 flex flex-col w-full text-sm"
              >
                {({ isSubmitting }) => (
                  <Form
                    className="space-y-4 flex flex-col w-full text-sm items-center"
                  >
                    <InputField
                      name="email"
                      type="email"
                      placeholder="Email"
                      classes=""
                    />
                    <InputField
                      name="password"
                      type="password"
                      placeholder="Password"
                      classes=""
                    />
                    <div className="form-control">
                      <label className="cursor-pointer label remebercheck">
                        <input type="checkbox" className="checkbox checkbox-success" />
                        <span className="label-text text-white text-sm font-normal leading-6">Remember me</span>
                      </label>
                    </div>
                    <ButtonComponent
                      loading={loading}
                      type="submit"
                      buttonName="Sign In"
                      disabled={isSubmitting}
                      btnclass="buttonlogin group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white  bg-emerald-400 focus:outline-none"
                    />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
    </>
  );
};

export default SignInForm;
