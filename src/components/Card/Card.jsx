import styles from "./Card.module.sass";
import {useState} from "react";

export const Card = ({imgUrl, imgAlt, title, price, onAdd}) => {

	/** Состояние кнопки Favorite **/
	const [isFavorite, setIsFavorite] = useState(false);

	const handleCardFavorite = () => {
		setIsFavorite(!isFavorite);
	}

	/** Состояние кнопки CardBtnAdd **/
	const [isAdded, setIsAdded] = useState(false);
	const handleCardAdd = () => {
		setIsAdded(!isAdded);
		onAdd();
	}


	return (
		<div className={styles.card}>
			<div className={styles.card__imgBlock}>
				<button
					className={isFavorite ? styles.card__btnFavorite : `${styles.card__btnFavorite} ${styles.card__btnFavoriteActive}`}
					style={isFavorite ? {backgroundColor: '#FEF0F0'} : null}
					onClick={handleCardFavorite}
				>
					<img src={isFavorite ? "img/icons/heart.svg" : "img/icons/heart-outline.png"} width={16} height={15} alt=""/>
				</button>

				<img className={styles.card__img} src={imgUrl} width={133} height={112} alt={imgAlt}></img>
			</div>
			<p className={styles.card__title}>{title}</p>
			<div className={styles.card__bottom}>
				<div>
					<span className={styles.card__priceText}>ЦЕНА:</span>
					<span className={styles.card__price}>{price}</span>
				</div>
				<button
					className={isAdded ? `${styles.card__btnAdd} ${styles.card__btnAddActive}` : `${styles.card__btnAdd}`}
					onClick={handleCardAdd}
				></button>
			</div>
		</div>
	)
}