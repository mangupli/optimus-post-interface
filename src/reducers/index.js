const initialState = {

	//districts filters
	districts: [],
	activeDistrictId: undefined,
	activeDistrictInfo: undefined,
	activeDistrictFilter: undefined,
	districtOptions: [],
	

	//areas filters
	areasLoadingStatus: 'idle',
	areas: [],
	activeAreaId: undefined,
	activeAreaInfo: undefined,
	activeAreaFilter: undefined,
	areaOptions: [],
	numberOfAreas: 0,
	mapCenter: [37.624716, 55.750965],
	renderedPolygon: undefined,
		
	renderedMarkers: [],
	
	//postamats
	postamats: [],
	postamatsLoadingStatus: 'idle',
	filteredPostamats: [],

}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case 'ACTIVE_DISTRICT_CHANGED':{
			return {
				...state,
				activeDistrictId: action.payload,
				activeDistrictFilter: state.districtOptions.filter(districtOption => districtOption.value === action.payload),
				
			}
		}
		case 'ACTIVE_AREA_CHANGED':{
			return {
				...state,
				activeAreaId: action.payload,
				activeAreaFilter: state.areaOptions.filter(areaOption => areaOption.value === action.payload),				
			}
		}
		case 'UPDATE_ACTIVE_AREA_INFO':{
			return {
				...state,
				activeAreaInfo: action.payload,
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
		case 'MARKERS_FETCHED': {
			return{
				...state,
				renderedMarkers: action.payload
			}
		}
		case 'DISTRICTS_FETCHED':
			const districts = action.payload;
			const defaultOption = {value: 'all', label: 'Все округа'};
			const otherOptions = districts.map(district => ({
				value: district.id,
				label: district.name
			}));
			return {
				...state,
				districts,
				districtOptions: [defaultOption, ...otherOptions],
				activeDistrictFilter: defaultOption
			}
		case 'AREAS_LOADING': 
			return {
				...state,
				areasLoadingStatus: 'loading',
				areas: []
			}
		case 'AREAS_FETCHED': 
			const areas = action.payload;
			const defaultAreaOption = {value: 'all', label: 'Все районы'};
			const otherAreaOptions = areas.map(area => ({
				value: area.id,
				label: area.name
			}));
			return {
				...state,
				areas,
				areaOptions: [defaultAreaOption, ...otherAreaOptions],
				areasLoadingStatus: 'idle',
				activeAreaFilter: defaultAreaOption,
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