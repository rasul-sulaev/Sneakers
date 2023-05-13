import styles from "./Card.module.sass";
import {useContext} from "react";
import {AppContext} from "../../context";
import {useNumberWithSpaces} from "../../hooks/useNumberWithSpaces";

export const Card = ({
	id,
	imgUrl,
	imgAlt,
	title,
	price,
	hideButtonOnFavorite,
	hideButtonAddToCard
}) => {

	const {
		cartItems,
		favoriteItems,
		onAddToCart,
		onFavorite
	} = useContext(AppContext);

	const isFavorite = favoriteItems.some(el => el === id);
	const isAddedToCart = cartItems.some(cartItem => cartItem.id_product === id);

	return (
		<div className={styles.card}>
			<div className={styles.card__imgBlock}>
				{hideButtonOnFavorite || (
					<button
						className={isFavorite ? styles.card__btnFavorite : `${styles.card__btnFavorite} ${styles.card__btnFavoriteActive}`}
						style={isFavorite ? {backgroundColor: '#FEF0F0'} : null}
						onClick={() => onFavorite(id)}
					>
						<img src={isFavorite ? "./img/icons/heart.svg" : "./img/icons/heart-outline.png"} width={16} height={15} alt=""/>
					</button>
				)}
				<img className={styles.card__img} src={`./img/products/${imgUrl}`} width={133} height={112} alt={imgAlt}/>
			</div>
			<p className={styles.card__title}>{title}</p>
			<div className={styles.card__bottom}>
				<div>
					<span className={styles.card__priceText}>ЦЕНА:</span>
					<span className={styles.card__price}>{useNumberWithSpaces(price)}</span>
				</div>
				{hideButtonAddToCard || (
					<button
						className={isAddedToCart ? `${styles.card__btnAdd} ${styles.card__btnAddActive}` : `${styles.card__btnAdd}`}
						onClick={() => onAddToCart({id_product: id, imgUrl, imgAlt, title, price})}
					/>
				)}
			</div>
		</div>
	)
}