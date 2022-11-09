const initialState = {
	//login
	loginLoadingStatus: 'idle',
	user: false,

	//districts filters
	districts: [],
	activeDistrictId: undefined,
	activeDistrictInfo: undefined,
	activeDistrictFilter: {value: 'all', label: 'Все округа'},
	districtOptions: [],
	
	//areas filters
	areasLoadingStatus: 'idle',
	areas: [],
	activeAreaId: undefined,
	activeAreaInfo: undefined,
	activeAreaFilter: {value: 'all', label: 'Все районы'},
	areaOptions: [],
	numberOfAreas: 0,
	mapCenter: [37.624716, 55.750965],
	renderedPolygon: undefined,		

	//sublmitted filters
	filters: undefined,

	//other filters
	locationOptions: [],
	
	//postamats
	postamats: [],
	postamatsLoadingStatus: 'idle',
	oldPostamats: [],
	newPostamats: [],
	selectedPostamats: [],

	//heatmap
	heatmap: false,

	//form
	selectedIds: []

}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case 'LOGOUT': 
		return {
			...state,
			user: false,
		}
		case 'LOGIN_LOADING': 
		return {
			...state,
			loginLoadingStatus: 'loading',
		}
		case 'LOGIN_SUCCESS': 
		return {
			...state,
			loginLoadingStatus: 'idle',
			user: true
		}
		case 'LOGIN_ERROR': 
		return {
			...state,
			loginLoadingStatus: 'error',
			user: false
		}
		case 'ACTIVE_DISTRICT_CHANGED':{
			return {
				...state,
				activeDistrictId: action.payload,
				activeDistrictFilter: state.districtOptions.filter(districtOption => districtOption.value === action.payload)[0],				
			}
		}
		case 'ACTIVE_AREA_CHANGED':{
			return {
				...state,
				activeAreaId: action.payload,
				activeAreaFilter: state.areaOptions.filter(areaOption => areaOption.value === action.payload)[0],				
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
		case 'SET_LOCATION_OPTIONS':
			return{
				...state,
				locationOptions: action.payload
			}

		case 'POSTAMATS_LOADING':
			return{
				...state,
				postamatsLoadingStatus: 'loading'
			}

		case 'POSTAMATS_FETCHED':
			const postamats = action.payload;
			let oldPostamats = [];
			let newPostamats = [];
			for(let postamat of postamats){
				if (postamat.is_placed === true){
					oldPostamats.push(postamat);
				}
				else {
					newPostamats.push(postamat);
				}
			}
			return {
				...state,
				postamatsLoadingStatus: 'idle',
				postamats,
				oldPostamats,
				newPostamats		
			}

		case 'RESET_POSTAMATS':
			return{
				...state,
				oldPostamats: [],
				newPostamats: [],
				postamats: []			
			}
		case 'POSTAMATS_FETCHING_ERROR':
			return{
				...state,
				postamatsLoadingStatus: 'error'
			}
		case 'SUBMIT_FILTERS':
			return{
				...state,
				filters: action.payload
			}
		case 'RESET_FILTERS':
			return{
				...state,
				filters: undefined
			}
		case 'SWITCH_HEATMAP':{
			return {
				...state,
				heatmap: !state.heatmap,				
			}
		}
		case 'GET_IDS_FROM_FORM_VALUES':
			return{
				...state,
				selectedIds: action.payload
			}
		case 'RESET_SELECTED_IDS':
			return{
				...state,
				selectedIds: [],
				selectedPostamats: []
			}
		case 'SELECT_ID':
			const selectedId = action.payload;
			const alreadySelected = state.selectedIds.includes(selectedId);
			const moreSelectedIds = alreadySelected ? state.selectedIds : [...state.selectedIds, selectedId];
			let moreSelectedPostamats = state.selectedPostamats;
			if(!alreadySelected){
				const newPostamat = state.newPostamats.filter(postamat => postamat.id === selectedId)[0];
				moreSelectedPostamats = [...state.selectedPostamats, newPostamat]
			}
			return{
				...state,
				selectedPostamats: moreSelectedPostamats,
				selectedIds: moreSelectedIds				
			}
		case 'DESELECT_ID':
			const lessSelectedIds = state.selectedIds.filter(id => id != action.payload);
			const lessSelectedPostamats = state.selectedPostamats.filter(postamat => postamat.id != action.payload);
			return{
				...state,
				selectedIds: lessSelectedIds,
				selectedPostamats: lessSelectedPostamats
			}			
		default:{
			return state;
		}
	}
}

export default reducer;