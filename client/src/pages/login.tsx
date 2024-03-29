// Importing necessary components and hooks
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logoitem from "../assets/images/full-logo.png";
import vector from "../assets/images/auth-img.png";

interface FormValues {
  email: string;
  password: string;
}
// Component for the Login page
const Login = () => {
  const { login } = useAuth();
  const [isPasswordHide, setIsPasswordHide] = useState(false);
  // Accessing the login function from the AuthContext
  const formInititalState : FormValues = {
    email: '',
    password: ''
  };

  const LoginSchema = Yup.object({
      email: Yup.string().email("Invalid Email").required('Email is required'),
      password: Yup.string().required('Password is required'),
    });  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formInititalState,
    validationSchema:LoginSchema,
    onSubmit: async (values) => {
      // Handle the form submission here
    await login(values);

    },
  });
const handlePasswordHide = () => {
    setIsPasswordHide(!isPasswordHide)
}

  return (
    <div className="w-full justify-between items-stretch h-screen flex flex-shrink-0 overflow-hidden g-0 login-page" >
      <div className="w-1/3 relative px-0 bg-success p-4 align-center">
        <div className="logo">
        <img src={logoitem}/>
        </div>  

      </div>
      <div className="w-2/3">
          <div className="flex justify-center items-center flex-col h-screen bg-white rounded-xl relative"> 
            <h1 className="text-3xl font-bold">Wolfpack Chat</h1>

            <div className="p-8 flex justify-center items-center gap-5 flex-col shadow-md rounded-2xl my-5 border-[1px] login bg-white">
              <h1 className="inline-flex items-center text-2xl mb-4 flex-col">
                <LockClosedIcon className="h-8 w-8 mb-2 text-success" /> Login
              </h1>
              {/* Input for entering the email */}
            <form onSubmit={formik.handleSubmit}>

              <Input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                // value={data.email}
                // onChange={handleDataChange("email")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                                <div className='error-msg'>{formik.errors.email}</div>
                                ) : null}
              {/* Input for entering the password */}
              <Input
                placeholder="Password"
                type={ isPasswordHide ? "text" : "password"}
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="mt-2"
                // value={data.password}
                // onChange={handleDataChange("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                                <div className='error-msg'>{formik.errors.password}</div>
                                ) : null}
              {/* <Button
                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                type="button"
                                onClick={handlePasswordHide}
                            >
                                <i className="ri-eye-fill align-middle" />
                            </Button> */}

              {/* Button to initiate the login process */}
              <Button
                // disabled={Object.values(data).some((val) => !val)}
                fullWidth
                className="mt-3"
                type="submit"
                disabled={!formik.dirty || formik.isSubmitting}
              >
                Login
              </Button>

              {/* Link to the registration page */}
              <small className="text-zinc-300 pl-12">
                Don&apos;t have an account?{" "}
                <a className="text-primary hover:underline" href="/register">
                  Register
                </a>
              </small>
            </form>
            </div>
            <div className="auth-img">
              <img src={vector} alt="" />
            </div>
          </div>
      </div>
    </div>
  );
};

export default Login;
