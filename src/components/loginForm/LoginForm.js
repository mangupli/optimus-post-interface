import React from 'react';

import { Formik, useField, Form, ErrorMessage } from 'formik';

import { useSelector, useDispatch } from 'react-redux';

import { useRequestService } from '../../services/RequestService';

import * as Yup from 'yup';

import './loginForm.scss'

const LoginForm = () => {

    const { authenticate } = useRequestService();
    
    const loginLoadingStatus = useSelector(state => state.loginLoadingStatus);

    const handleSubmit = (values) => {
        authenticate(values);
    };

    const loginError = loginLoadingStatus === 'error' ? <div className=''>Неправильный логин/Пароль</div> : '';

    return (
            <div className="login-form__container">
                {loginError}
                <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={LoginValidation}
                >
                {() => {
                    return (
                    <Form className="login-form">
                        <Input name="email" placeholder="Логин" />
                        <Input name="password" placeholder="Пароль" type="password"/>
                        <div className="">
                            <button
                                className="button_form button_form_big"
                                type="submit"
                            >
                                Войти
                            </button>
                        </div>
                    </Form>
                    );
                }}
            </Formik>
        </div>
    );

};

const LoginValidation = Yup.object().shape({
    email: Yup.string()
      .required("Введите логин")
      .email("Введите корректный email"),
    password: Yup.string().required("Введите пароль"),
  });
  
const Input = ({ name, placeholder, ...props }) => {
const [field, meta] = useField(name);
return (
    <div className="">
    <input
        placeholder={placeholder}
        className={`${
        meta.error && meta.touched ? "login-form__input_danger" : ""
        } login-form__input`}
        {...field}
        {...props}
    />
    <ErrorMessage
        name={field.name}
        component="div"
        className=""
    />
    </div>
);
};


export default LoginForm;