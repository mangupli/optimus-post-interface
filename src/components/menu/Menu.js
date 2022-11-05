import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { useRequestService } from '../../services/RequestService';

import classNames from 'classnames';

import './menu.scss'

const Menu = () => {

    const {districts, activeDistrictId} = useSelector(state => state);

    const { pickAndShowDistrict } = useRequestService();

    const onClick = (id) => {
        pickAndShowDistrict(id);
    }

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
                    onClick={() => onClick(district.id)}
                >
                        <div className="menu__name">{district.short_name}</div>
                        <div className="menu__descr">{district.name}</div>
                </button>
            );
        })
        return elems;
    }


    const elems = districts ? renderDistricts(districts) : null;

    return(
        <nav className="menu">
            <div className="container">
                <Link to="/postamats" onClick={() => pickAndShowDistrict('all')
                }>
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