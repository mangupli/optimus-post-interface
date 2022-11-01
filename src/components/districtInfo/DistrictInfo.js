import { useSelector } from 'react-redux';

import './districtInfo.scss'

const DistrictInfo = () => {
    
    const activeDistrictObj = useSelector(state => state.activeDistrictInfo);

    if(!activeDistrictObj) return;


    return(
        <div className="district-card">
            <div className="title district-card__header">
            {`${activeDistrictObj.name} административный округ`}
            </div>
            <div className="district-card__info">
                <div className="district-card__info-item">
                    <div className="text">
                        Площадь
                    </div>
                    <div className="text_bold">
                    {`${activeDistrictObj.square} км²`}
                    </div>
                </div>
                <div className="district-card__info-item">
                    <div className="text">
                        Население
                    </div>
                    <div className="text_bold">
                    {`${activeDistrictObj.population}`}
                    </div>
                </div>
                <div className="district-card__info-item">
                    <div className="text">
                        Постаматов
                    </div>
                    <div className="text_bold">
                        1000
                    </div>
                </div>
                <div className="district-card__info-item">
                    <div className="text">
                        Постаматов
                    </div>
                    <div className="text_bold">
                        1000
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DistrictInfo;