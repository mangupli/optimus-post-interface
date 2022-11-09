import {useHttp} from '../hooks/http.hook';
import { useDispatch } from 'react-redux';
import { useMapContext } from "../contexts/MapContext";

import { cityCenter } from '../constants';

import { activeDistrictChanged, activeAreaChanged,updateActiveDistrictInfo, updateMapCenter, updateRenderedPolygon,  areasLoading, areasFetched, areasFetchingError, updateActiveAreaInfo, setLocationOptions, postamatsFetched, postamatsLoading, postamatsFetchingError, loginError, loginLoading, loginSuccess, districtsFetched } from '../actions/';
import { useCallback } from 'react';

export const useRequestService = () => {

    const api_base = process.env.REACT_APP_HOST  === 'localhost' ? 'http://localhost:3000/api/v1' : 'http://188.72.109.162:3000/api/v1';

    const { request } = useHttp();
    const dispatch = useDispatch();

    const [mapInstance] = useMapContext();

    const authenticate = useCallback((values) => {

        //email: 'optimus_post@yandex.ru', password: '123456789Aa!'

        dispatch(loginLoading());

        request(`${api_base}/users/login`, 'POST', JSON.stringify(values))
		.then(data => {
            dispatch(loginSuccess());
            localStorage.setItem('auth_token', data.auth_token);
		})
		.catch((e) => {
            dispatch(loginError());
            localStorage.clear();
        });
    } , [])

    const pickAndShowDistrict = useCallback((districtId) => {
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
    }, [mapInstance]);

    const pickAndUpdateDistrict = useCallback((districtId) => {
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
    }, [])

    const loadDistricts = useCallback(()=>{
        request(`${api_base}/districts/`)
        .then(data => {
            dispatch(districtsFetched(data));
        })
        .catch(e => console.log(e))
    }, []);

    const loadAreas = useCallback((districtId) => {
        dispatch(areasLoading());
		request(`${api_base}/districts/${districtId}/areas`)
		.then(data => {
			dispatch(areasFetched(data))
		})
		.catch(() => dispatch(areasFetchingError()));
    }, [])

    const pickArea = useCallback((areaId) => {
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
    }, [])

    const pickAndShowArea = useCallback((areaId) => {
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
    }, [mapInstance] )

    const loadLocations = useCallback(() => {
        request(`${api_base}/placement_object_types`)
        .then(data=>{
            const options = data.map(location => ({
                value: location.id,
                label: location.name
            }))
            dispatch(setLocationOptions(options));
        })
        .catch(e => console.log(e))
    }, [])

    const loadPostamats = useCallback((filters) => {

        dispatch(postamatsLoading())

        const body = {
/*             page: 1,
            per_page: 10, */
            ...filters    
        }

        request(`${api_base}/automatic_post_offices`, 'POST', JSON.stringify(body))
		.then(data => {
            const postamats = data.automatic_post_offices;
			dispatch(postamatsFetched(postamats));
		})
		.catch(() => dispatch(postamatsFetchingError()));

    } , [])

    const exportPostamats = (filters, ids) => {

        const body = {
                ids,
                ...filters    
            }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        };
        
        fetch(`${api_base}/automatic_post_offices/export_xlsx`, {method: 'POST', body: JSON.stringify(body), headers})
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = "Постаматы.xlsx";
                document.body.appendChild(a);
                a.click();              
                window.URL.revokeObjectURL(url);
                a.remove();
            })
		.catch(e => console.log(e))
    };

    return { pickAndShowDistrict, loadAreas, pickAndUpdateDistrict, pickArea, pickAndShowArea, loadLocations, loadPostamats, exportPostamats, authenticate, loadDistricts };
}
