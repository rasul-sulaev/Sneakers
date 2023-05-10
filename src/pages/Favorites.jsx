import {Card} from "../components/Card/Card";
import {useContext, useState} from "react";
import {CardSkeleton} from "../components/Card/CardSkeleton";
import {AppContext} from "../context";

export const Favorites = () => {
	const [searchValue, setSearchValue] = useState('');

	const {
		items,
		favoriteItems,
		isLoading
	} = useContext(AppContext);

	return (
		<section className="section">
			<div className="section__header">
				<h2 className="section__header-title">{searchValue ? `Поиск по запросу: "${searchValue}"`: 'Избранные товары'}</h2>
				{favoriteItems.length > 4 && (
					<form className="search" action="">
						<input className="search__input" type="text" placeholder="Поиск..." onInput={(e) => setSearchValue(e.target.value)} value={searchValue}/>
					</form>
				)}
			</div>
			<div className="cards__list">
				{isLoading ? (
					[...Array(8)].map((_, index) => <CardSkeleton key={index} />)
				) : (
					items.filter(item => item.title?.toLowerCase().includes(searchValue.toLowerCase()))
						.filter(item => favoriteItems.some(el => el === item.id))
						.map((item) => {
							return (
								<Card
									key={item.id}
									{...item}
									price={item.price}
								/>
							)
						})
					)
				}
			</div>
		</section>
	)
}