'use client';

import React, { useState } from "react";
import { BaseButtonAction, BaseCard, BaseInput } from "@shuriken-ui/react";
import { Formik } from "formik";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Page() {
  // const [email, setEmail] = useState<string>();
  // const [password, setPassword] = useState<string>();
  // const [confirmPassword, setConfirmPassword] = useState<string>();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <BaseCard color="default-contrast" className="p-6 w-6/12 mt-6 mr-0 mb-0 ml-0 relative space-y-8">
        <Formik
        initialValues={{email: '', password: '', confirmPassword: ''}}
        onSubmit={values => console.log(values)}
        >
          {({values, handleChange, handleSubmit}) => (
            <>
            <BaseInput
              value={values.email}
              onChange={handleChange}
              rounded="sm"
              label="Email"
              placeholder="Ex: example@email.com"
            />
            <BaseInput
              value={values.password}
              onChange={handleChange}
              rounded="sm"
              label="Password"
              placeholder="password"
              type="password"
            />
            <BaseInput
              value={values.confirmPassword}
              onChange={handleChange}
              rounded="sm"
              label="Confirm Password"
              placeholder="password"
              type="password"
            />
            <div>
              <BaseButtonAction color="primary">Register</BaseButtonAction>
            </div>
            </>
          )}
        </Formik>
      </BaseCard>
    </div>
  )
}
