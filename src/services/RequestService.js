import {useHttp} from '../hooks/http.hook';
import { useDispatch } from 'react-redux';
import { useMapContext } from "../contexts/MapContext";

import { activeDistrictChanged, activeAreaChanged,updateActiveDistrictInfo, updateMapCenter, updateRenderedPolygon, markersFetched, areasLoading, areasFetched, areasFetchingError, updateActiveAreaInfo } from '../actions/'
import { useCallback } from 'react';

export const useRequestService = () => {

    const api_base = 'http://188.72.109.162:3000/api/v1';

    const cityCenter = [37.624716, 55.750965];

    const { request } = useHttp();
    const dispatch = useDispatch();

    const [mapInstance] = useMapContext();

    const pickAndShowDistrict = (districtId) => {
        if(districtId === 'all') {
            dispatch(activeDistrictChanged('all'));
            dispatch(updateActiveDistrictInfo(undefined));
            dispatch(updateMapCenter(cityCenter));
            dispatch(updateRenderedPolygon([]));
        }
        else{
            dispatch(activeDistrictChanged(districtId))
            request(`${api_base}/districts/${districtId}`)
            .then(data => {
                dispatch(updateActiveDistrictInfo(data));
                dispatch(updateMapCenter(data.center_coord));
                dispatch(updateRenderedPolygon(data.polygon));
                dispatch(markersFetched([data.center_coord]));
                return data;
            })
            .then(data=>{
                if (mapInstance) {
                    mapInstance.setCenter(data.center_coord);
                    mapInstance.setZoom(11);                
                }
            })
            .catch(e => console.log(e))
        }
    }

    const pickAndUpdateDistrict = (districtId) => {
        if(districtId === 'all') {
            dispatch(activeDistrictChanged('all'));
            dispatch(updateActiveDistrictInfo(undefined));
        }
        else{
            dispatch(activeDistrictChanged(districtId))
            request(`${api_base}/districts/${districtId}`)
            .then(data => {
                dispatch(updateActiveDistrictInfo(data));
                return data;
            })
            .catch(e => console.log(e))
        }
    }

    const loadAreas = (districtId) => {
        dispatch(areasLoading());
		request(`${api_base}/districts/${districtId}/areas`)
		.then(data => {
			dispatch(areasFetched(data))
		})
		.catch(() => dispatch(areasFetchingError()));
    }

    const pickArea = (areaId) => {
        if(areaId === 'all') {
            dispatch(activeAreaChanged('all'));
            dispatch(updateActiveAreaInfo(undefined));
        }
        else{
            dispatch(activeAreaChanged(areaId))
            request(`${api_base}/areas/${areaId}`)
            .then(data => {
                dispatch(updateActiveAreaInfo(data));
                return data;
            })
            .catch(e => console.log(e))
        }
    }

    const pickAndShowArea = (areaId) => {
        if(areaId === 'all') {
            dispatch(activeAreaChanged('all'));
            dispatch(updateActiveAreaInfo(undefined));
        }
        else{
            dispatch(activeAreaChanged(areaId))
            request(`${api_base}/areas/${areaId}`)
            .then(data => {
                dispatch(updateActiveAreaInfo(data));
                dispatch(updateMapCenter(data.center_coord));
                dispatch(updateRenderedPolygon(data.polygon));
                dispatch(markersFetched([data.center_coord]));
                return data;
            })
            .then(data=>{
                if (mapInstance) {
                    mapInstance.setCenter(data.center_coord);
                    mapInstance.setZoom(13);                
                }
            })
            .catch(e => console.log(e))
        }
    }

    return {pickAndShowDistrict, loadAreas, pickAndUpdateDistrict, pickArea, pickAndShowArea};
    
}
