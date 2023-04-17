import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import "./Form.scss";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const loginSchema =  yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}

const Form = () => {
    const [page, setPage] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = page === "login";
    const isRegister = page === "register";

    const register = async (values, onSubmitProps) => {
        const formdata = new FormData();
        for (let value in values) {
            formdata.append(value, values[value])
        }
        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formdata
            }
        );
        const savedUser = await savedUserResponse.json();
        console.log("savedUser:", savedUser)
        onSubmitProps.resetForm();
        if (savedUser) {
            setPage("login");
        }
    }

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            }
        )
        const loggedIn = await loggedInResponse.json();
        console.log(loggedIn)
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            );
            navigate("/home");
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    }
    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}>
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm
            }) => (
                <form className="form" 
                    onSubmit={handleSubmit}>
                    <div>
                        {isRegister &&
                        (<>
                            <div>
                                <label for="firstName">First name:</label>
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    onBlur={handleBlur} 
                                    onChange={handleChange} 
                                    value={values.firstName} 
                                    required placeholder="Enter your first name"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}/>
                            </div>
                            <div>
                                <label for="last-name">Last name</label>
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    onBlur={handleBlur} 
                                    onChange={handleChange} 
                                    value={values.lastName} 
                                    required placeholder="Enter your last name"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}/>
                            </div>
                        </>)}               
                        <div>
                            <label for="email">Email</label>
                            <input 
                                    type="email" 
                                    name="email" 
                                    onBlur={handleBlur} 
                                    onChange={handleChange} 
                                    value={values.email} 
                                    required placeholder="Enter your email"
                                    error={Boolean(touched.email) && Boolean(errors.email)}/>
                        </div>
                        <div>
                            <label for="password">Password</label>
                            <input 
                                    type="password" 
                                    name="password" 
                                    onBlur={handleBlur} 
                                    onChange={handleChange} 
                                    value={values.password} 
                                    required placeholder="Enter your password"
                                    error={Boolean(touched.password) && Boolean(errors.password)}/>
                        </div>
                    </div>
                    <button type="submit" className="btn submit-btn">
                            {isLogin ? "Login" : "Register"}
                    </button>
                    <p>
                        {isLogin 
                            ? "Don't have an account? "
                            : "Have an account? "
                            }
                            <span
                                onClick={() => {
                                    isLogin ? setPage("register") : setPage("login");
                                    resetForm();
                                    }}>
                                {isLogin 
                                ? "Create one here"
                                : "Log in here"
                                }
                            </span>
                    </p>
                </form>
            )}
        </Formik>
    )
}
export default Form