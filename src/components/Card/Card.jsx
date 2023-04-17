import styles from "./Card.module.sass";

export const Card = ({imgUrl, imgAlt, title, price, favorited, added}) => {

	const handleCardLike = () => {
		alert(123);
	}

	const handleCardAdd = (title) => {
		alert(title);
	}

	let btnFavorite = favorited ? (
		<button className={`${styles.card__btnFavorite} ${styles.card__btnFavoriteActive}`}>
			<img src="img/icons/heart.svg" width={16} height={15} alt=""/>
		</button>
	) : (
		<button className={styles.card__btnFavorite}>
			<img src="img/icons/heart-outline.png" width={16} height={15} alt=""/>
		</button>
	)

	return (
		<div className={styles.card}>
			<div className={styles.card__imgBlock}>
				{btnFavorite}
				<img className={styles.card__img} src={imgUrl} width={133} height={112} alt={imgAlt}></img>
			</div>
			<p className={styles.card__title}>{title}</p>
			<div className={styles.card__bottom}>
				<div>
					<span className={styles.card__priceText}>ЦЕНА:</span>
					<span className={styles.card__price}>{price}</span>
				</div>
				<button
					className={styles.card__btnAdd + (added ? ` ${styles.card__btnAddActive}` : ``)}
					onClick={() => handleCardAdd(title)}
				></button>
			</div>
		</div>
	)
}