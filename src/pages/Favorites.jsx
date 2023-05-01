import {Card} from "../components/Card/Card";
import {useState} from "react";

export const Favorites = ({
		items,
		cartItems,
		favoriteItems,
		onFavorite,
		onAddToCart
	}) => {
	const [searchValue, setSearchValue] = useState('');

	return (
		<section className="section">
			<div className="section__header">
				<h2 className="section__header-title">{searchValue ? `Поиск по запросу: "${searchValue}"`: 'Избранные товары'}</h2>
				<form className="search" action="">
					<input className="search__input" type="text" placeholder="Поиск..." onInput={(e) => setSearchValue(e.target.value)} value={searchValue}/>
				</form>
			</div>
			<div className="cards__list">
				{items.filter(item => item.title?.toLowerCase().includes(searchValue.toLowerCase()))
					.filter(item => favoriteItems.some(el => el === item.id))
					.map((item) => {
						return (
							<Card
								key={item.id}
								{...item}
								price={`${item.price} руб.`}
								isFavorite={true}
								onFavorite={(cardCode) => onFavorite(cardCode)}
								isAddedToCart={cartItems.some(cartItem => cartItem.code === item.code)}
								onAddToCart={(card) => onAddToCart(card)}
							/>
						)
					}
				)}
			</div>
		</section>
	)
}