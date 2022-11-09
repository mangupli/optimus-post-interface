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

    const loginError = loginLoadingStatus === 'error' ? <div style={{color: '#F62E46'}}>Неправильный логин/Пароль</div> : '';

    return (
            <div className="login-form__container">
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
                        {loginError}
                        <Input name="email" placeholder="Логин" />
                        <Input name="password" placeholder="Пароль" type="password"/>
                        <div className="">
                            <button
                                className="button_form button_form_big login-form__button"
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
        style={{marginTop: '5px', color: '#F62E46'}}
    />
    </div>
);
};


export default LoginForm;