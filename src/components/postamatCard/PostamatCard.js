import "./postamatCard.scss"

const PostamatCard = ({postamat}) => {
	return(
		<div className="postamat-card">
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