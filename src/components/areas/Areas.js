import { useSelector } from 'react-redux';

import AreasList from "../areasList/AreasList";
import DistrictInfo from "../districtInfo/DistrictInfo";

import "./areas.scss"

const Areas = () => {

    const activeDistrictId = useSelector(state => state.activeDistrictId);
    if (!activeDistrictId || activeDistrictId==="all"){
        return (
            <h3 className="text_bold" style={{textAlign: "center"}}>Выберите округ для отображения районов</h3>
        );
    }
    return (
        <div className="areas">
            <DistrictInfo/>
            <AreasList/>
        </div>
    )
}

export default Areas;