
import { useSelector } from 'react-redux';
import { useRequestService } from '../../services/RequestService';


import { Formik, Form, Field, useField, useFormikContext} from "formik";
import Select from 'react-select';

import MainMapWrapper from "../mainMap/MainMap";
import PostamatCard from "../postamatCard/PostamatCard";

import './postForm.scss'

const MyCheckbox = ({children, ...props}) => {
  
	//field — объект с пропсами + onBlur + onChange...
	//meta — метаданные с ошибками, и был ли использован этот инпут
	const [field, meta] = useField({...props, type: 'checkbox'});

	return(
		<>
			<label style={{display: 'flex', gap: '10px'}}>
				<input type="checkbox" {...props} {...field} /> 
					{children}
			</label>
		   {meta.touched && meta.error ? (
				<div className='error'>{meta.error}</div>
		   ) : null}
		</>
	);
}

const customStyles = {
/* 	placeholder: () => ({
		color: 'red'
	}) */
}

const sortOptions = [
	{
		value: 'asc',
		label: 'A->Я'
	},
	{
		value: 'desc',
		label: 'Я->А'
	},

];

const locationOptions = [
	{
		value: 'good',
		label: 'Хорошая'
	},
	{
		value: 'best',
		label: 'Очень хорошая'
	},
];

const postamatTypeOptions = [
	{
		value: 'fact',
		label: 'Поставленные'
	},
	{
		value: 'predict',
		label: 'Прогнозируемые'
	},

];


const PostForm = () => {

	const activeDistrictId = useSelector(state => state.activeDistrictId);
	const districtOptions = useSelector(state => state.districtOptions);
	const activeDistrictFilter = useSelector(state => state.activeDistrictFilter);
	const areaOptions = useSelector(state => state.areaOptions);
	const activeAreaFilter = useSelector(state => state.activeAreaFilter);

	const {loadAreas, pickAndShowDistrict, pickAndShowArea} = useRequestService();


	const  onChangeDistrictFilter = (option, setFieldValue) => {
		pickAndShowDistrict(option.value);
		loadAreas(option.value);
		setFieldValue("districtFilter", option);
		setFieldValue("areaFilter", {value: 'all', label: 'Все районы'});
	}

	const  onChangeAreaFilter = (option, setFieldValue) => {
		pickAndShowArea(option.value);
		setFieldValue("areaFilter", option);
	}

	console.log('render form');

	return(
		<Formik
			initialValues={{
				districtFilter: activeDistrictFilter,
				areaFilter: activeAreaFilter,
				sortFilter: '',
				locationFilter: '',
				methodFilter: '',
				postamatTypeFilter: ''
			}}
			onSubmit={values => console.log(JSON.stringify(values, null, 2))}
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
								<Select
									placeholder={'Выберите округ'}
									styles={customStyles}
									value={values.districtFilter}
									id={"disrictFilter"}
									onChange={option => onChangeDistrictFilter(option, setFieldValue)}
									options={districtOptions}
									onBlur={handleBlur}
								/>
								<Select
									placeholder={'Район'}
									id={"areaFilter"}
									value={values.areaFilter}
									onChange={option => onChangeAreaFilter(option, setFieldValue)}
									options={areaOptions}
									onBlur={handleBlur}
								/> 

								<Select
									placeholder={'Сортировать по'}
									id="sortFilter"
									value={values.sortFilter}
									onChange={option => setFieldValue("sortFilter", option)}
									options={sortOptions}
									onBlur={handleBlur}
								/>

								<Select
									placeholder={'Локация'}
									id="locationFilter"
									value={values.locationFilter}
									onChange={option => setFieldValue("locationFilter", option)}
									options={locationOptions}
									onBlur={handleBlur}
								/>

								<Select
									placeholder={'Модель расчета'}
									id="methodFilter"
									value={values.methodFilter}
									onChange={option => setFieldValue("methodFilter", option)}
									options={locationOptions}
									onBlur={handleBlur}
								/>
								<Select
									placeholder={'Тип постамата'}
									id="postamatTypeFilter"
									value={values.postamatTypeFilter}
									onChange={option => setFieldValue("postamatTypeFilter", option)}
									options={postamatTypeOptions}
									onBlur={handleBlur}
								/>
							</div>
						
		                    <MainMapWrapper/> 

							<div className="postamats-list" style={{marginTop: '20px'}}>
								<MyCheckbox name="postamat">
									<PostamatCard/>
								</MyCheckbox>
							</div>

							<button type="submit" className="button button_small postamats__button">Выбрать</button>
						</div>				
					</Form>
			)}}		
		</Formik>
		
	);
}

export default PostForm;