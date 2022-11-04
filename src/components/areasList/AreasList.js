import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { useRequestService } from '../../services/RequestService';

import MoveMapButton from '../moveMapButton/MoveMapButton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import emblem from '../../assets/images/emblem1.png'

const AreasList = () => {

	const areas = useSelector(state => state.areas);
	const activeDistrictId = useSelector(state => state.activeDistrictId);
	const areasLoadingStatus = useSelector(state => state.areasLoadingStatus);

	const { loadAreas, pickAndShowArea, pickAndShowDistrict } = useRequestService();

	useEffect(() =>{
		pickAndShowDistrict(activeDistrictId);
	},[]);

	useEffect(()=>{
		loadAreas(activeDistrictId);
		// eslint-disable-next-line 
	}, [activeDistrictId]);


	const onClick = (areaId) => {
		pickAndShowArea(areaId);
	}

	const spinner = (areasLoadingStatus === "loading") ? <Spinner/> : null;
	const errorMessage = (areasLoadingStatus === "error") ?  <ErrorMessage/> : null;
	const content = (areasLoadingStatus === "idle")  ? <View areas={areas} onClick={onClick}/> : null;

	return(
		<>
			{errorMessage}
			{spinner}
			{content}        
		</>

	)
}

const View = ({areas, onClick}) => {

	const renderAreas = (areas) => {
		return areas.map(area => {
			const {name, population, square, id} = area;
			return (
				<div className="area" key={id}>
					<div className="area__header">
						<div className="area__emblem">
							<img src={emblem} alt="Emblem" />
						</div>
						<div className="area__info">
							<div className="area__population text">
								{population} тыс.чел.
							</div>
							<div className="title area__title">
								{name}
							</div>
							<div className="area__square text">
								{square} км²
							</div>
						</div> 
					</div>  
					<div className="area__results">
							<div className="area__result">
								<div className="text">
									Постаматов
								</div>
								<div className="text_bold">
									140
								</div>
							</div>
							<div className="area__result">
								<div className="text">
									Постаматов
								</div>
								<div className="text_bold">
									140
								</div>
							</div>
							<div className="area__result">
								<div className="text">
									Мест свободно
								</div>
								<div className="text_bold">
									1000
								</div>
							</div>
						</div> 
{/*                     <div className="area__divider"></div>  */}
					<div className="area__links">                       
						<MoveMapButton classNames={"button button_small distict__button"} areaId={id} />                        
						<Link to="/postamats" className="button button_small area__button" onClick={()=>onClick(id)}>
							Перейти
						</Link>     
					</div>     
				</div>           

			)
		});
	}

	const items = renderAreas(areas);
	const sum = areas.length;
	return(
		<>
			<div className="areas__caption">
				<Link to="/postamats">
						<span className="icon-buffer"></span>
						<span className="text_bold text_color_accent"> Выбрать все районы</span>
					</Link>
				<div className="areas__total text">
					{`Всего: ${sum} районов`}
				</div>
			</div>
			<div className='areas__overflow'>
				<div className="areas__wrapper">             
					{items}
				</div> 
			</div>
		</>)
}

export default AreasList;