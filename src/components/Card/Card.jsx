import styles from "./Card.module.sass";

export const Card = ({
	code,
	imgUrl,
	imgAlt,
	title,
	price,
	isFavorite,
	onFavorite,
	isAddedToCart,
	onAddToCart}) => {
	return (
		<div className={styles.card}>
			<div className={styles.card__imgBlock}>
				<button
					className={isFavorite ? styles.card__btnFavorite : `${styles.card__btnFavorite} ${styles.card__btnFavoriteActive}`}
					style={isFavorite ? {backgroundColor: '#FEF0F0'} : null}
					onClick={() => onFavorite(code)}
				>
					<img src={isFavorite ? "/img/icons/heart.svg" : "/img/icons/heart-outline.png"} width={16} height={15} alt=""/>
				</button>
				<img className={styles.card__img} src={`/img/products/${imgUrl}`} width={133} height={112} alt={imgAlt}/>
			</div>
			<p className={styles.card__title}>{title}</p>
			<div className={styles.card__bottom}>
				<div>
					<span className={styles.card__priceText}>ЦЕНА:</span>
					<span className={styles.card__price}>{price}</span>
				</div>
				<button
					className={isAddedToCart ? `${styles.card__btnAdd} ${styles.card__btnAddActive}` : `${styles.card__btnAdd}`}
					onClick={() => onAddToCart({code, imgUrl, imgAlt, title, price})}
				/>
			</div>
		</div>
	)
}