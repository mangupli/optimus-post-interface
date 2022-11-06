import "./postamatCard.scss"

import classNames from 'classnames';

const PostamatCard = ({postamat, choosen}) => {
	if(!postamat) return <h5>Карточка постамата, которого не существует</h5>

	const cardClass = classNames('postamat-card', {
		'postamat-card_active': choosen
	});

	return(
		<div className={cardClass}>
			<div>
				<div> Постамат №{postamat.id}</div>
				<div>{postamat.address}</div>
				<div>{postamat.is_placed ? 'Поставлен': 'Прогноз'}</div>
			</div>
			<div>
				<div>Оценка модели</div>
				<div>{postamat.predict_a}</div>
			</div>
			<div>
				<div>Расстояние</div>
				<div>до метро:{postamat.distance_to_metro}</div>
				<div>до автобусной остановки:{postamat.distance_to_bus}</div>
				<div>Жителей в радиусе: {postamat.people_in_range}</div>
			</div>

		</div>
	);
}

export default PostamatCard;