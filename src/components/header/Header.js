import { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {useHttp} from '../../hooks/http.hook';
import { logout } from '../../actions/'

import './header.scss'

const Header = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const onLogout = () => {
        dispatch(logout());
    }

    return(
        <header>
            <div className="container">
                <div className="header__wrapper">
                    <Link to="/" className="logo header__logo">
                        <div className="logo__img"></div>
                        <h1 className="logo__title">Московский постамат</h1>                    
                    </Link>
                    {user ? <button className='button_form button_form_xs' onClick={onLogout}>Выйти</button> : null}
                </div>
            </div>      
        </header>
    );
}

export default Header;
