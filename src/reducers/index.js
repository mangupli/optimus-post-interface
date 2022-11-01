const initialState = {
    activeDistrictId: undefined,
    activeDistrictInfo: undefined,
    mapCenter: [37.624716, 55.750965],
    renderedPolygon: undefined,
    districts: [],
    areas: [],
    numberOfAreas: 0,
    areasLoadingStatus: 'idle',
    postamats: [],
    postamatsLoadingStatus: 'idle',
    filteredPostamats: [],
    activeFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'ACTIVE_DISTRICT_CHANGED':{
            return {
                ...state,
                activeDistrictId: action.payload
            }
        }
        case 'UPDATE_ACTIVE_DISTRICT_INFO':{
            return {
                ...state,
                activeDistrictInfo: action.payload,
            }
        }
        case 'UPDATE_MAP_CENTER':{
            return {
                ...state,
                mapCenter: action.payload
            }
        }
        case 'UPDATE_RENDERED_POLYGON': {
            return{
                ...state,
                renderedPolygon: action.payload
            }
        }

        case 'DISTRICTS_FETCHED':
            return {
                ...state,
                districts: action.payload
            }
        case 'AREAS_LOADING': 
            return {
                ...state,
                areasLoadingStatus: 'loading',
                areas: []
            }
        case 'AREAS_FETCHED': 
            return {
                ...state,
                areas: action.payload,
                areasLoadingStatus: 'idle',
                numberOfAreas: action.payload.length
            }
        case 'AREAS_FETCHING_ERROR':
            return {
                ...state,
                areasLoadingStatus: 'error'
            }
        default:{
            return state;
        }
    }
}

export default reducer;