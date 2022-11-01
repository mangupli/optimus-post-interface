import { useSelector } from 'react-redux';

import AreasList from "../areasList/AreasList";
import DistrictInfo from "../districtInfo/DistrictInfo";

import "./areas.scss"

const Areas = () => {

    const activeDistrictId = useSelector(state => state.activeDistrictId);
    if (!activeDistrictId){
        return (
            <h3 className="text_bold" style={{textAlign: "center"}}>Выберите округ</h3>
        );
    }
    return (
        <div className="areas">
            <DistrictInfo/>
            <AreasList/>
        </div>
    );
}

export default Areas;