import "./postamatCard.scss"

import classNames from 'classnames';

import store from '../../store';

const PostamatCard = ({postamat, choosen}) => {
	if(!postamat) return <h5>Карточка постамата, которого не существует</h5>

	const cardClass = classNames('postamat-card', {
		'postamat-card_active': choosen
	});

	const {id, district_id, area_name, address, distance_to_bus, distance_to_metro, predict_a, predict_b, predict_c, people_in_range, placement_object_type_id, is_placed} = postamat;

	const districts = store.getState().districts;
	const districtShortName = districts.filter(district => district.id === district_id)[0].short_name;

	const locations = store.getState().locationOptions;
	const locationType = locations.filter(location => location.value == placement_object_type_id)[0].label;


	return(
		<div className={cardClass}>
			<div className="postamat-card__header">
				<div className="postamat-card__geo">
					<div className="postamat-card__geo-name">
						<span>{districtShortName}</span>
					</div>
					<div className="postamat-card__geo-name">
						<span>{area_name}</span>
					</div>
				</div>
				<div className="postamat-card__address">
					{address}
				</div>
				<div className="postamat-card__transport">
					<div className="postamat-card__transport-item">
						<i className="icon-metro"></i>					
						{` ${distance_to_metro} м`}
					</div>
					<div className="postamat-card__transport-item">
						<i className="icon-bus"><i className="icon-path1"></i><i className="icon-path2"></i></i>	
						{` ${distance_to_bus} м`}
					</div>
				</div>
			</div>
			<div className="postamat-card__info">
				<div className="postamat-card__value">
					<div className="postamat-card__subtitle text_bold">
						Оценка модели
					</div>
					<div className="postamat-card__result text text_color_accent">
						{`А - ${predict_a}`}
					</div>
					<div className="postamat-card__result text text_color_accent">
						{`B - ${predict_b}`}
					</div>
					<div className="postamat-card__result text text_color_accent">
						{`C - ${predict_c}`}
					</div>
				</div>
				<div className="postamat-card__value">
					<div className="postamat-card__subtitle text_bold">
						Кол-во жителей в радиусе 5км
					</div>
					<div className="postamat-card__result text text_color_accent">
						{`~${people_in_range * 2} чел`}
					</div>
				</div>
				<div className="postamat-card__value">
					<div className="postamat-card__subtitle text_bold">
						Объект размещения
					</div>
					<div className="postamat-card__result text text_color_accent">
						{locationType}
					</div>
				</div>
				<div className="postamat-card__value">
					<div className="postamat-card__subtitle text_bold">
						ID постамата
					</div>
					<div className="postamat-card__result text text_color_accent">
						{id}
					</div>
				</div>
				<div className="postamat-card__value">
					<div className="postamat-card__subtitle text_bold">
						Статус
					</div>
					<div className="postamat-card__result text text_color_accent">
						{is_placed ? 'Размещен' : 'Не размещен'}
					</div>
				</div>

			</div>
		</div>
	);
}

export default PostamatCard;