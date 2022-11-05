import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import './districtInfo.scss'

const DistrictInfo = () => {
    
    const activeDistrictObj = useSelector(state => state.activeDistrictInfo);

    if(!activeDistrictObj) return;

    const {name, square, population, automatic_post_office_stats : post_office} = activeDistrictObj;

    return(
        <Link to="/postamats" className="district-card">
            <div className="title district-card__header">
            {`${name} административный округ`}
            </div>
            <div className="district-card__info">
                <div className="district-card__info-item">
                    <div className="text">
                        Площадь
                    </div>
                    <div className="text_bold">
                    {`${square} км²`}
                    </div>
                </div>
                <div className="district-card__info-item">
                    <div className="text">
                        Население
                    </div>
                    <div className="text_bold">
                    {`${population}`}
                    </div>
                </div>
                <div className="district-card__info-item">
                    <div className="text">
                        Постаматов
                    </div>
                    <div className="text_bold">
                    {post_office.placed}
                    </div>
                </div>
                <div className="district-card__info-item">
                    <div className="text">
                          Прогноз
                    </div>
                    <div className="text_bold">
                    {post_office.not_placed}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default DistrictInfo;