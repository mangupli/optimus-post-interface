import { useCallback, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import {useHttp} from '../../hooks/http.hook';
import { MapContext } from "../../contexts/MapContext";


import { updateRenderedPolygon, updateMapCenter } from '../../actions/'

import '../../style/button.scss'

const MoveMapButton = ({classNames, areaId}) => {

    const api_base = 'http://188.72.109.162:3000/api/v1';

    const [mapInstance] = useContext(MapContext);

    const [areaInfo, setAreaInfo] = useState(null);

    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(()=>{
        request(`${api_base}/areas/${areaId}`)
        .then(data => {
            setAreaInfo(data);
        })
        .catch((e) => console.log(e));
    }, []);

/*     const setDistrictCenter = useCallback(() => {
        if (mapInstance) {
            const {center_coord, polygon} = areaInfo;
            dispatch(updateMapCenter(center_coord));
            mapInstance.setCenter(center_coord);

            dispatch(updateRenderedPolygon(polygon));
        }
    }, [mapInstance, areaInfo]); */

    const setDistrictCenter = () => {
        if (mapInstance) {
            const {center_coord, polygon} = areaInfo;
            console.log(areaInfo);

            dispatch(updateMapCenter(center_coord));
            mapInstance.setCenter(center_coord);
            mapInstance.setZoom(13);

            dispatch(updateRenderedPolygon(polygon));
        }
    };



    return (
        <button className={classNames} onClick={setDistrictCenter}>
            На карте
        </button>
    );
};

export default MoveMapButton;