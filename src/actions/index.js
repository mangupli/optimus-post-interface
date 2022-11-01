import {useContext} from 'react';
import { MapContext } from "../contexts/MapContext";

export const activeDistrictChanged = (id) => {
    return {
        type: 'ACTIVE_DISTRICT_CHANGED',
        payload: id
    }
}

export const updateActiveDistrictInfo = (distObj) => {
    return {
        type: 'UPDATE_ACTIVE_DISTRICT_INFO',
        payload: distObj
    }
}

export const updateMapCenter = (coord) => {
    return {
        type: 'UPDATE_MAP_CENTER',
        payload: coord
    }
}

export const updateRenderedPolygon = (polygon) => {
    return {
        type: 'UPDATE_RENDERED_POLYGON',
        payload: polygon
    }
}


export const districtsFetched = (districts) => {
    return {
        type: 'DISTRICTS_FETCHED',
        payload: districts
    }
}

export const updateActiveDistrict = (districts, districtId) => {
    const district = districts.filter(district => district.id === districtId)[0];
    return {
        type: 'UPDATE_ACTIVE_DISTRICT',
        payload: district
    }
}

export const areasLoading = () => {
    return {
        type: 'AREAS_LOADING',
    }
}

export const areasFetched = (areas) => {
    return {
        type: 'AREAS_FETCHED',
        payload: areas
    }
}

export const areasFetchingError = () => {
    return {
        type: 'AREAS_FETCHING_ERROR'
    }
}