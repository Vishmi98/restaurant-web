"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi';

import { RegisterFormType } from '../auth.types';
import { getRegisterFormValidationSchema, registerFormInitialValues } from '../auth.utils';
import { handleUserRegister } from '../auth.service';

import CommonButton from '@/components/CommonButton';
import { handleSaveCookieEmail } from '@/utils/cookie.util';


const RegisterForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const inputClasses = "w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-gray-600 text-sm";

    const handleSubmit = async (values: RegisterFormType, { resetForm }: { resetForm: () => void }) => {
        try {
            setIsLoading(true)
            const res = await handleUserRegister(values);
            if (res.success && res?.email) {
                handleSaveCookieEmail(res?.email)
                toast.success(res.message);
                router.push("/verify_email");
                resetForm();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error("Error register a teacher:", error);
            toast.error("An error occurred during registration.");
        }
        finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 1000)
        }
    };

    return (
        <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-5 rounded-2xl shadow-2xl">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Create Account</h2>
                <p className="text-muted text-sm mt-1">Join us today! Please enter your details.</p>
            </div>

            <Formik
                initialValues={registerFormInitialValues}
                validationSchema={getRegisterFormValidationSchema()}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit }) => (
                    <Form className="flex flex-col gap-4">
                        {/* Name Group */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">First Name</label>
                                <Field name="firstName" placeholder="John" className={inputClasses} />
                                <ErrorMessage name="firstName" component="div" className="text-red-500 text-[10px] mt-1" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Last Name</label>
                                <Field name="lastName" placeholder="Doe" className={inputClasses} />
                                <ErrorMessage name="lastName" component="div" className="text-red-500 text-[10px] mt-1" />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Email Address</label>
                            <Field type="email" name="email" placeholder="john@example.com" className={inputClasses} />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-[10px] mt-1" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Phone Field */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Phone Number</label>
                                <Field type="text" name="phone" placeholder="+1 234 567 890" className={inputClasses} />
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-[10px] mt-1" />
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">Password</label>
                                <div className="relative">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        className={inputClasses}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-primary transition-colors"
                                    >
                                        {showPassword ? <HiOutlineEye size={18} /> : <HiOutlineEyeOff size={18} />}
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-[10px] mt-1" />
                            </div>
                        </div>
                        <div>
                            <CommonButton
                                title={isLoading ? "Registering..." : "Register"}
                                onPress={handleSubmit}
                                backgroundColor="bg-primary"
                                shadowColor="rgba(255, 255, 255, 0.1)"
                                className="w-full"
                            />
                        </div>

                        <div className="text-center text-sm text-muted">
                            <span>Already have an account? </span>
                            <Link
                                href='/login'
                                className="font-semibold text-primary hover:text-white transition-colors cursor-pointer"
                            >
                                Sign In
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;