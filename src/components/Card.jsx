export const Card = ({img, imgAlt, title, price, favorited, added}) => {

	let btnFavorite = favorited ? (
		<button className="card__btn-favorite card__btn-favorite_active" style={{background: '#FEF0F0'}}>
			<img src="img/icons/heart.svg" width={16} height={15} alt=""/>
		</button>
	) : (
		<button className="card__btn-favorite">
			<img src="img/icons/heart-outline.png" width={16} height={15} alt=""/>
		</button>
	)

	return (
		<div className="card">
			<div className="card__img-block">
				{btnFavorite}
				<img className="card__img" src={img} width={133} height={112} alt={imgAlt}></img>
			</div>
			<p className="card__title">{title}</p>
			<div className="card__bottom">
				<div>
					<span className="card__price-text">ЦЕНА:</span>
					<span className="card__price">{price}</span>
				</div>
				<button className={added ? "card__btn-add card__btn-add_active" : "card__btn-add"}></button>
			</div>
		</div>
	)
}