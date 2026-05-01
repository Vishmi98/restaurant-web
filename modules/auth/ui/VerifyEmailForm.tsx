"use client";

import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';

import { emailModalInitialValues, getEmailModalValidationSchema } from '../auth.utils';
import { handleVerifyUser } from '../auth.service';

import { UserStoreUserType } from '@/constants/types';
import { getCookieEmail, handleRemoveCookieEmail, handleSaveCookieToken, handleSaveCookieUser } from '@/utils/cookie.util';
import CommonButton from '@/components/CommonButton';

const VerifyEmailForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const emailModalValidationSchema = getEmailModalValidationSchema();
    const email = getCookieEmail();

    const inputClasses = "w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-all duration-300 placeholder:text-gray-600 text-center tracking-[0.5em] text-lg font-bold";

    const handleSubmit = async (values: { code: string }, { resetForm, setSubmitting }: any) => {
        try {
            setIsLoading(true);
            const res = await handleVerifyUser({ email, code: values.code });

            if (res.success && res?.token) {
                const decoded = jwt.decode(res?.token) as { user: UserStoreUserType };

                handleSaveCookieToken(res?.token);
                handleSaveCookieUser(JSON.stringify(decoded.user));
                handleRemoveCookieEmail();

                toast.success(res.message || "Email verified successfully!");
                window.location.href = "/";
            } else {
                toast.error(res.message || "Invalid verification code");
            }
        } catch (error) {
            console.error(error);
            toast.error("Verification failed");
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-zinc-900 border border-white/10 p-6 rounded-2xl shadow-2xl">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Verify Email</h2>
                <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                    We&apos;ve sent a six-digit code to <span className="text-primary font-medium">{email}</span>. Please enter it below to continue.
                </p>
            </div>

            <Formik
                initialValues={emailModalInitialValues}
                validationSchema={emailModalValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit: formikSubmit }) => (
                    <Form className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
                                Verification Code
                            </label>
                            <Field
                                type="text"
                                name="code"
                                placeholder="000000"
                                className={inputClasses}
                            />
                            <ErrorMessage name="code" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <div className="mt-2">
                            <CommonButton
                                title={isLoading ? "Verifying..." : "Verify Account"}
                                onPress={formikSubmit}
                                backgroundColor="bg-primary"
                                shadowColor="rgba(255, 255, 255, 0.1)"
                                className="w-full"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default VerifyEmailForm;