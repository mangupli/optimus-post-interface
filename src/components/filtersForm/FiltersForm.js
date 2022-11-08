import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRequestService } from '../../services/RequestService';

import { Formik, Form} from "formik";
import Select from 'react-select';

import { methodOptions,sortOptions } from '../../constants';

import {sumbitFilters, resetFilters, resetPostamats, resetSelectedIds } from '../../actions'

import './filtersForm.scss';

const FiltersForm = () => {

	const activeDistrictId = useSelector(state => state.activeDistrictId);
	const districtOptions = useSelector(state => state.districtOptions);
	const activeDistrictFilter = useSelector(state => state.activeDistrictFilter);
	const areaOptions = useSelector(state => state.areaOptions);
	const activeAreaFilter = useSelector(state => state.activeAreaFilter);
	const locationOptions = useSelector(state => state.locationOptions);

	const {loadAreas, pickAndShowDistrict, pickAndShowArea, loadLocations, loadDistricts} = useRequestService();

	const dispatch = useDispatch();

	useEffect(()=>{
		loadLocations();
		loadDistricts();
	}, []);

	//to show on the map while changing filters
	const  onChangeDistrictFilter = (option, setFieldValue) => {;
		const districtId = option.value;
		pickAndShowDistrict(districtId);
		loadAreas(districtId);
		setFieldValue("areaFilter", {value: 'all', label: 'Все районы'});
		onFilterChange("districtFilter", option, setFieldValue);
	}

	const  onChangeAreaFilter = (option, setFieldValue) => {
		const areaId = option.value;
		pickAndShowArea(areaId);
		onFilterChange("areaFilter", option, setFieldValue);
	}

/* 	console.log('render form'); */

	const setFilters = (values) => {
/* 		console.log(JSON.stringify(values, null, 2)) */
		dispatch(sumbitFilters(values));
	}

	const onFilterChange = (id, option, setFieldValue) => {
		setFieldValue(id, option);
		dispatch(resetFilters());
		dispatch(resetPostamats());
		dispatch(resetSelectedIds());
	}

	return(
		<Formik
			initialValues={{
				districtFilter: activeDistrictFilter,
				areaFilter: activeAreaFilter,
				sortFilter: {
					"value": "predict",
					"label": "По перспективности выбранной модели"
				  },
				locationFilter: '',
				methodFilter: {
					"value": "predict_a",
					"label": "Модель А"
				  }
			}}
			onSubmit={values => setFilters(values)}
			>
			{props => {
				const {
					values,
					handleSubmit,
					handleBlur,
					setFieldValue
				} = props;
				return(
					<Form className="form">
						<div className="container">
							<div className="filters">
								<div className="filters__item">
									<div className='filters__label'>Округ</div>
									<Select
										placeholder={'Выбрать'}
										value={values.districtFilter}
										id={"disrictFilter"}
										onChange={option => onChangeDistrictFilter(option, setFieldValue)}
										options={districtOptions}
										onBlur={handleBlur}
									/>
								</div>
								<div className="filters__item">
									<div className='filters__label'>Район</div>
									<Select
										placeholder={'Выбрать'}
										id={"areaFilter"}
										value={values.areaFilter}
										onChange={option => onChangeAreaFilter(option, setFieldValue)}
										options={areaOptions}
										onBlur={handleBlur}
									/> 
								</div>

								<div className="filters__item">
									<div className='filters__label'>Сортировать по</div>
									<Select
										placeholder={'Выбрать'}
										id="sortFilter"
										value={values.sortFilter}
										onChange={option => onFilterChange("sortFilter", option, setFieldValue)}
										options={sortOptions}
										onBlur={handleBlur}
									/>
								</div>
								<div className="filters__item">
									<div className='filters__label'>Локация</div>
									<Select
									placeholder={'Выбрать'}
									id="locationFilter"
									value={values.locationFilter}
									onChange={option => onFilterChange("locationFilter", option, setFieldValue)}
									options={locationOptions}
									onBlur={handleBlur}
									/>
								</div>
								<div className="filters__item">
									<div className='filters__label'>Модель расчета</div>
									<Select
									placeholder={'Выбрать'}
									id="methodFilter"
									value={values.methodFilter}
									onChange={option => onFilterChange("methodFilter", option, setFieldValue)}
									options={methodOptions}
									onBlur={handleBlur}
									/>
								</div>
								<button type="submit" className="button button_xs postamats__button">Показать</button>
							</div>
						
						</div>				
					</Form>
			)}}		
		</Formik>		
	);
}


export default FiltersForm;