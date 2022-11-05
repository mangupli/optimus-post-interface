import "./postamatCard.scss"

const PostamatCard = ({postamat}) => {
	return(
		<div className="postamat-card">
			<div>id {postamat.id}</div>
			<div>{postamat.address}</div>
		</div>
	);
}

export default PostamatCard;