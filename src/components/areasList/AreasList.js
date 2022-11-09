import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { useRequestService } from '../../services/RequestService';

import MoveMapButton from '../moveMapButton/MoveMapButton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const AreasList = () => {

	const areas = useSelector(state => state.areas);
	const activeDistrictId = useSelector(state => state.activeDistrictId);
	const areasLoadingStatus = useSelector(state => state.areasLoadingStatus);

	const { loadAreas, pickAndShowArea, pickAndShowDistrict } = useRequestService();

	useEffect(() =>{
		pickAndShowDistrict(activeDistrictId);
		// eslint-disable-next-line 
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

	return (
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
			const {name, population, square, id, emblem_url, automatic_post_office_stats : post_office} = area;
			return (
				<div className="area" key={id}>
					<div className="area__header">
						<div className="area__emblem">
							<Emblem src={emblem_url}/>
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
									Установленные постаматы
								</div>
								<div className="text_bold">
									{post_office.placed}
								</div>
							</div>
{/* {							<div className="area__result">
								<div className="text">
									Постаматов
								</div>
								<div className="text_bold">
									{post_office.placed}
								</div>
							</div>} */}
							<div className="area__result">
								<div className="text">
									Рекомендованные постаматы
								</div>
								<div className="text_bold">
								{post_office.not_placed}
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
                    <span className="icon-compass2"></span>
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

const Emblem = ({src}) => {

	let image = <img src={src} alt="Герб" />;

 	if(src.substring(src.length - 3) === 'svg'){
		/*что-то сделать, чтобы грузилась svg*/
	} 
	
	return image;

}

export default AreasList;