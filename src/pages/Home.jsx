import {useState} from "react";
import {Card} from "../components/Card/Card";

export const Home = ({
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
				<h2 className="section__header-title">{searchValue ? `Поиск по запросу: "${searchValue}"`: 'Все кроссовки'}</h2>
				<form className="search" action="">
					<input className="search__input" type="text" placeholder="Поиск..." onInput={(e) => setSearchValue(e.target.value)} value={searchValue}/>
				</form>
			</div>
			<div className="cards__list">
				{items.filter(item => item.title?.toLowerCase().includes(searchValue.toLowerCase()))
					.map(item => {
						return (
							<Card
								key={item.id}
								{...item}
								price={`${item.price} руб.`}
								isFavorite={favoriteItems.some(el => el === item.id)}
								onFavorite={(cardIdProduct) => onFavorite(cardIdProduct)}
								isAddedToCart={cartItems.some(cartItem => cartItem.id_product === item.id)}
								onAddToCart={(card) => onAddToCart(card)}
							/>
						)
					}
				)}
			</div>
		</section>
	)
}