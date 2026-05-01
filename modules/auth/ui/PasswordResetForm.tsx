"use client";

import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi';

import { LoginFormType, PasswordResetFormType } from '../auth.types';
import { handleUserLogin, restPassword } from '../auth.service';
import { getLoginFormValidationSchema, getPasswordResetFormValidationSchema, loginFormInitialValues, passwordResetFormInitialValues } from '../auth.utils';

import { LOCAL_STORE } from '@/constants/key';
import { UserStoreUserType } from '@/constants/types';
import { handleSaveCookieToken, handleSaveCookieUser } from '@/utils/cookie.util';
import CommonButton from '@/components/CommonButton';
import { MdArrowRightAlt, MdDone } from 'react-icons/md';


const PasswordResetForm = () => {
    const router = useRouter();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const passwordResetFormValidationSchema = getPasswordResetFormValidationSchema();

    const handleSubmit = async (values: PasswordResetFormType) => {
        setIsLoading(true);
        try {
            const response = await restPassword(values.email, values.firstName);
            if (response.success) {
                setIsSuccess(true);
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-8 rounded-2xl shadow-2xl text-center flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in duration-300">
                {/* Animated Check Icon Container */}
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                    <div className="relative flex items-center justify-center w-16 h-16 bg-primary text-black rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]">
                        <MdDone size={35} className="animate-bounce-short" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Check Your Inbox
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                        We've sent a new password to your email. Please check your inbox (and spam folder) to log back into your account.
                    </p>
                </div>

                {/* Action Button */}
                <CommonButton
                    title="Go to Login"
                    onPress={() => router.push('/login')}
                    backgroundColor="bg-primary"
                    shadowColor="rgba(255, 255, 255, 0.1)"
                    className="w-full"
                />
            </div>
        );
    }

    const inputClasses = "w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-gray-600";

    return (
        <>
            <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-5 rounded-2xl shadow-2xl">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white">Reset Password</h2>
                    <p className="text-zinc-400 text-sm mt-1">Please enter your email and first name to reset your password.</p>
                </div>
                <Formik
                    initialValues={passwordResetFormInitialValues}
                    validationSchema={passwordResetFormValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, setFieldValue, values }) => (
                        <Form className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs md:text-sm font-medium text-zinc-300 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    className={inputClasses}
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs md:text-sm font-medium text-zinc-300 uppercase tracking-wider">
                                    First Name
                                </label>
                                <Field
                                    type="text"
                                    name="firstName"
                                    placeholder="Your First Name"
                                    className={inputClasses}
                                />
                                <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div>
                                <CommonButton
                                    title={isLoading ? "Resetting..." : "Reset Password"}
                                    onPress={handleSubmit}
                                    backgroundColor="bg-primary"
                                    shadowColor="rgba(255, 255, 255, 0.1)"
                                    className="w-full"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default PasswordResetForm;
