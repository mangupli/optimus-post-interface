import { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {useHttp} from '../../hooks/http.hook';
import { districtsFetched } from '../../actions/'

import './header.scss'

const Header = () => {

    const api_base = process.env.REACT_APP_HOST === 'localhost' ? 'http://localhost:3000/api/v1' : 'http://188.72.109.162:3000/api/v1';

    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect (() => {
        request(`${api_base}/districts/`)
            .then(data => {
                dispatch(districtsFetched(data));
            })
            .catch(e => console.log(e))
         // eslint-disable-next-line
    },[]);

    return(
        <header>
            <div className="container">
                <div className="header__wrapper">
                    <Link to="/" className="logo header__logo">
                        <div className="logo__img"></div>
                        <h1 className="logo__title">Московский постамат</h1>                    
                    </Link>
                </div>
            </div>      
        </header>
    );
}

export default Header;
