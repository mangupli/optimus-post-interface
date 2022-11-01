import { useEffect, useContext, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import {useHttp} from '../../hooks/http.hook';
import { MapContext } from "../../contexts/MapContext";


import { activeDistrictChanged, districtsFetched, updateActiveDistrictInfo, updateMapCenter, updateRenderedPolygon } from '../../actions/'

import classNames from 'classnames';

import './menu.scss'
import '../../style/button.scss'

const Menu = () => {

    const api_base = 'http://188.72.109.162:3000/api/v1';

    const districts = useSelector(state => state.districts);
    const activeDistrictId = useSelector(state => state.activeDistrictId);
    const dispatch = useDispatch();
    const { request } = useHttp();

    const [mapInstance] = useContext(MapContext);
        
    useEffect (() => {
        request(`${api_base}/districts/`)
            .then(data => {
                dispatch(districtsFetched(data));
            })
            .catch(e => console.log(e))
         // eslint-disable-next-line
    },[]);
    

    const onClick = (e, id) => {
        e.preventDefault();
        dispatch(activeDistrictChanged(id))
        request(`${api_base}/districts/${id}`)
        .then(data => {
            console.log(data);
            dispatch(updateActiveDistrictInfo(data));
            dispatch(updateMapCenter(data.center_coord));
            dispatch(updateRenderedPolygon(data.polygon));
            return data;
        })
        .then(data=>{
            if (mapInstance) {
                mapInstance.setCenter(data.center_coord);
                mapInstance.setZoom(11);
                
            }
        })
        .catch(e => console.log(e))

    };

    const renderDistricts = (districts) => {
        const elems = districts.map((district, index) => {
            const btnClass = classNames('button', 'menu__button', {
                'button_active': district.id === activeDistrictId,
                'menu__button_active':  district.id === activeDistrictId
            });
            return(
                <button
                    className={btnClass}
                    href="#"
                    key={district.id}
                    onClick={e => onClick(e, district.id)}
                >
                        <div className="menu__name">{district.short_name}</div>
                        <div className="menu__descr">{district.name}</div>
                </button>
            );
        })
        return elems;
    }

    const elems = renderDistricts(districts);

    return(
        <nav className="menu">
            <div className="container">
                <Link to="/postamats">
                    <span className="icon-buffer"></span>
                    <span className="text_bold text_color_accent"> Выбрать все округа</span>
                </Link>
                <div className="menu__wrapper">
                    {elems}
                </div>
            </div>

        </nav>
    );
}

export default Menu;