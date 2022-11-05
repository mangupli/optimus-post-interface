import {useHttp} from '../hooks/http.hook';
import { useDispatch } from 'react-redux';
import { useMapContext } from "../contexts/MapContext";

import { cityCenter } from '../constants';

import { activeDistrictChanged, activeAreaChanged,updateActiveDistrictInfo, updateMapCenter, updateRenderedPolygon, markersFetched, areasLoading, areasFetched, areasFetchingError, updateActiveAreaInfo, setLocationOptions, postamatsFetched, postamatsLoading, postamatsFetchingError } from '../actions/'
import { useCallback } from 'react';

export const useRequestService = () => {

    const api_base = 'http://188.72.109.162:3000/api/v1';

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

    const loadLocations = () => {
        request(`${api_base}/placement_object_types`)
        .then(data=>{
            const options = data.map(location => ({
                value: location.id,
                label: location.name
            }))
            dispatch(setLocationOptions(options));
        })
        .catch(e => console.log(e))
    }

    const loadPostamats = (filters) => {

        console.log('load postamats');

        const{area_id, district_id, sort, predict, is_placed, placement_object_type_id: type}  = filters;

        const district_query = district_id ? `&district_id=${district_id}` : '';
        const area_query = area_id ? `&area_id=${area_id}` : '';
        const sort_query = sort? `&sort=${sort}` : '';
        const is_placed_query = is_placed ? `&is_placed=${is_placed}` : '';
        const type_query = type ? `&placement_object_type_id=${type}` : '';

        dispatch(postamatsLoading());
		request(`${api_base}/automatic_post_offices?page=1&per_page=10${area_query}${district_query}${type_query}${is_placed_query}${sort_query}`)
		.then(data => {
			dispatch(postamatsFetched(data.automatic_post_offices))
		})
		.catch(() => dispatch(postamatsFetchingError()));
    }

    return { pickAndShowDistrict, loadAreas, pickAndUpdateDistrict, pickArea, pickAndShowArea, loadLocations, loadPostamats };
    
}
