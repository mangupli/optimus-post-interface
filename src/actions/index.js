export const loginLoading = () => {
    return {
        type: 'LOGIN_LOADING'
    }
}

export const loginSuccess = () => {
    return {
        type: 'LOGIN_SUCCESS'
    }
}

export const loginError = () => {
    return {
        type: 'LOGIN_ERROR'
    }
}

export const logout = () => {
    localStorage.clear();
    return {
        type: 'LOGOUT'
    }
}

export const activeDistrictChanged = (id) => {
    return {
        type: 'ACTIVE_DISTRICT_CHANGED',
        payload: id
    }
}

export const activeAreaChanged = (id) => {
    return {
        type: 'ACTIVE_AREA_CHANGED',
        payload: id
    }
}

export const updateActiveAreaInfo = (areaObj) => {
    return {
        type: 'UPDATE_ACTIVE_AREA_INFO',
        payload: areaObj
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

export const markersFetched = (coords) => {
    const markers = coords.map(coord => {
        return {coordinates: coord}
    });
    return{
        type: 'MARKERS_FETCHED',
        payload: markers
    }
}

export const districtsFetched = (districts) => {
    return {
        type: 'DISTRICTS_FETCHED',
        payload: districts
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

export const setLocationOptions = (locationOptions) => {
    const allOption = {value: 'all', label: 'Все'};
    return {
        type: 'SET_LOCATION_OPTIONS',
        payload: [allOption, ...locationOptions]
    }
}


export const postamatsLoading = () => {
    return {
        type: 'POSTAMATS_LOADING'
    }
}

export const postamatsFetched = (postamats) => {
    return {
        type: 'POSTAMATS_FETCHED',
        payload: postamats
    }
}

export const postamatsFetchingError = () => {
    return {
        type: 'POSTAMATS_FETCHING_ERROR'
    }
}

export const resetPostamats = () => {
    return {
        type: 'RESET_POSTAMATS'
    }
}

export const resetFilters = () => {
    return {
        type: 'RESET_FILTERS'
    }
}

export const sumbitFilters = (filtersObj) => {

    let filters = undefined;

    if(filtersObj){
        filters = {};

        filters.area_id = filtersObj.areaFilter.value;
        if(filters.area_id === 'all')
            filters.area_id = null;
    
        filters.district_id = filtersObj.districtFilter.value;
        if(filters.district_id === 'all')
            filters.district_id = null;
    
        switch(filtersObj.sortFilter.value){
            case('predict'):
                filters.sort = `-${filtersObj.methodFilter.value}`;
                break;
            case('distance_to_metro'):
                filters.sort = 'distance_to_metro';
                break;
            case('people_in_range'):
                filters.sort = '-people_in_range';
                break;
            default:
                filters.sort='-predict_a';
        }
    
        if(filtersObj.locationFilter === "" || filtersObj.locationFilter.value === "all"){
            filters.placement_object_type_id = null;
        }
        else{
            filters.placement_object_type_id = filtersObj.locationFilter.value;
        }
    
        switch(filtersObj.sortFilter.value){
            case('predict'):
                filters.sort = `-${filtersObj.methodFilter.value}`;
                break;
            case('distance_to_metro'):
                filters.sort = 'distance_to_metro';
                break;
            case('people_in_range'):
                filters.sort = '-people_in_range';
                break;
            default:
                filters.sort='-predict_a';
        }
    }

    return{
        type: 'SUBMIT_FILTERS',
        payload: filters
    }
}

export const switchHeatmap = () => {
    return{
        type: 'SWITCH_HEATMAP',
    }
}

export const getIdsFromFormValues = (values) => {
    let selectedIds = [];

    for(let key in values){
        if(values[key] === true){
            selectedIds.push(+key);
        }
    }
    return{
        type: 'GET_IDS_FROM_FORM_VALUES',
        payload: selectedIds
    }

}

export const selectId = (id) =>{
    return{
        type: 'SELECT_ID',
        payload: +id
    }
}

export const deselectId = (id) =>{
    return{
        type: 'DESELECT_ID',
        payload: +id
    }
}

export const resetSelectedIds = () => {
    return{
        type: 'RESET_SELECTED_IDS'
    }
}
