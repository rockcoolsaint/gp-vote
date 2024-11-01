'use client';

import React, { useState } from "react";
import { BaseButtonAction, BaseCard, BaseInput, BaseText } from "@shuriken-ui/react";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string().required().label("Confirm Password")
})

export default function SignUp() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  // const [confirmPassword, setConfirmPassword] = useState<string>();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <BaseCard color="default-contrast" className="p-6 w-6/12 mt-6 mr-0 mb-0 ml-0 relative space-y-8">
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}
        >
          {({values, handleChange, handleSubmit, errors}) => (
            <>
            <BaseInput
              value={email}
              onChange={e => handleChange}
              rounded="sm"
              label="Email"
              placeholder="Ex: example@email.com"
            />
            <BaseText size="md" weight="normal" lead="normal">
              <ErrorMessage name={`${errors.email}`} />
            </BaseText>
            <BaseInput
              value={password}
              onChange={handleChange}
              rounded="sm"
              label="Password"
              placeholder="password"
              type="password"
            />
            <BaseText size="md" weight="normal" lead="normal">
              <ErrorMessage name={`${errors.password}`} />
            </BaseText>
            {/* <BaseInput
              value={confirmPassword}
              onChange={handleChange}
              rounded="sm"
              label="Confirm Password"
              placeholder="password"
              type="password"
            />
            <BaseText size="md" weight="normal" lead="normal">
              {errors.confirmPassword}
            </BaseText> */}
            <div>
              <BaseButtonAction onClick={() => handleSubmit} type="submit" color="primary">Register</BaseButtonAction>
            </div>
            </>
          )}
        </Formik>
      </BaseCard>
    </div>
  )
}
