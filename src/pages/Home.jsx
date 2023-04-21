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
				{items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item) => {
					return (
						<Card
							key={item.id}
							id={item.id}
							code={item.code}
							imgUrl={item.imgUrl}
							imgAlt={item.imgAlt}
							title={item.title}
							price={`${item.price} руб.`}
							isFavorite={favoriteItems.some(el => el === item.code)}
							onFavorite={(cardCode) => onFavorite(cardCode)}
							isAddedToCart={cartItems.some(cartItem => cartItem.code === item.code)}
							onAddToCart={(card) => onAddToCart(card)}
						/>
					)
				})}
			</div>
		</section>
	)
}