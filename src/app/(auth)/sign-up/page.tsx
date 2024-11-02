"use client";

import InputComponent from "@/components/forms/FormElements/InputComponent";
import SelectComponent from "@/components/forms/FormElements/SelectComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { registerNewUser } from "@/services/register";
import { registrationFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormData = {
  username: "",
  email: "",
  password: "",
  role: "customer",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);

  // const context = useContext(GlobalContext);

  // // Check if context is null
  // if (!context) {
  //   // Handle the case when context is null
  //   return <div>Loading...</div>; // or any other fallback UI
  // }

  const { pageLevelLoader, setPageLevelLoader , isAuthUser } = useContext(GlobalContext);

  const router = useRouter()

  // console.log(formData);

  function isFormValid() {
    return formData &&
      formData.username &&
      formData.username.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  console.log(isFormValid());

  async function handleRegisterOnSubmit() {
    setPageLevelLoader(true);
    const data = await registerNewUser(formData);

    if (data.success) {
      toast.success(data.message, {
        position: "top-right",
      });
      setIsRegistered(true);
      setPageLevelLoader(false);
      setFormData(initialFormData);
    } else {
      toast.error(data.message, {
        position: "top-right",
      });
      setPageLevelLoader(false);
      setFormData(initialFormData);
    }

    console.log(data);
  }

  useEffect(() => {
    if (isAuthUser) router.push("/");
  }, [isAuthUser]);

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                {isRegistered
                  ? "Registration Successfull !"
                  : "Sign up for an account"}
              </p>
              {isRegistered ? (
                <button
                  className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                "
                onClick={()=>router.push('/login')}
                >
                  Login
                </button>
              ) : (
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  {registrationFormControls.map((controlItem, index) =>
                    // controlItem.componentType === "input" ? (
                      <InputComponent
                        key={index}
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id as keyof typeof formData]}
                      />
                    // ) 
                    // : controlItem.componentType === "select" ? (
                    //   <SelectComponent
                    //     options={controlItem.options}
                    //     label={controlItem.label}
                    //     onChange={(event) => {
                    //       setFormData({
                    //         ...formData,
                    //         [controlItem.id]: event.target.value,
                    //       });
                    //     }}
                    //     value={formData[controlItem.id as keyof typeof formData]}
                    //   />
                    // ) : null
                  )}
                  <button
                    className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                   text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                   "
                    disabled={!isFormValid()}
                    onClick={handleRegisterOnSubmit}
                  >
                    {pageLevelLoader ? (
                      <ComponentLevelLoader
                        text={"Registering"}
                        color={"#ffffff"}
                        loading={pageLevelLoader}
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}





















// 'use client';

// import React, { useState } from "react";
// import { BaseButtonAction, BaseCard, BaseInput, BaseText } from "@shuriken-ui/react";
// import { ErrorMessage, Formik } from "formik";
// import * as Yup from "yup";

// interface FormValues {
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// const validationSchema = Yup.object().shape({
//   email: Yup.string().required().email().label("Email"),
//   password: Yup.string().required().min(4).label("Password"),
//   confirmPassword: Yup.string().required().label("Confirm Password")
// })

// export default function SignUp() {
//   const [username, setUsername] = useState<string>();
//   const [email, setEmail] = useState<string>();
//   const [password, setPassword] = useState<string>();
//   // const [confirmPassword, setConfirmPassword] = useState<string>();

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <BaseCard color="default-contrast" className="p-6 w-6/12 mt-6 mr-0 mb-0 ml-0 relative space-y-8">
//         <Formik
//           initialValues={{username: '', email: '', password: ''}}
//           onSubmit={values => console.log(values)}
//           validationSchema={validationSchema}
//         >
//           {({values, handleSubmit, errors}) => (
//             <>
//             <BaseInput
//               value={username}
//               onChange={(e: any) => setUsername(e.target.value)}
//               rounded="sm"
//               label="Username"
//               placeholder="Username"
//             />
//             <BaseText size="md" weight="normal" lead="normal">
//               <ErrorMessage name={`${errors.username}`} />
//             </BaseText>
//             <BaseInput
//               value={email}
//               onChange={(e: string | number | React.FormEvent<HTMLInputElement> | any) => setEmail(e.target.value)}
//               rounded="sm"
//               label="Email"
//               placeholder="Ex: example@email.com"
//             />
//             <BaseText size="md" weight="normal" lead="normal">
//               <ErrorMessage name={`${errors.email}`} />
//             </BaseText>
//             <BaseInput
//               value={password}
//               onChange={(e: string | number | React.FormEvent<HTMLInputElement> | any) => setPassword(e.target.value)}
//               rounded="sm"
//               label="Password"
//               placeholder="password"
//               type="password"
//             />
//             <BaseText size="md" weight="normal" lead="normal">
//               <ErrorMessage name={`${errors.password}`} />
//             </BaseText>
//             {/* <BaseInput
//               value={confirmPassword}
//               onChange={handleChange}
//               rounded="sm"
//               label="Confirm Password"
//               placeholder="password"
//               type="password"
//             />
//             <BaseText size="md" weight="normal" lead="normal">
//               {errors.confirmPassword}
//             </BaseText> */}
//             <div>
//               <BaseButtonAction onClick={() => handleSubmit} type="submit" color="primary">Register</BaseButtonAction>
//             </div>
//             </>
//           )}
//         </Formik>
//       </BaseCard>
//     </div>
//   )
// }
