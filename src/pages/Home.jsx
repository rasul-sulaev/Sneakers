import {useContext, useState} from "react";
import {Card} from "../components/Card/Card";
import {CardSkeleton} from "../components/Card/CardSkeleton";
import {AppContext} from "../context";

export const Home = () => {
	const {
		items,
		isLoading
	} = useContext(AppContext);

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
				{isLoading ? (
					[...Array(12)].map((_, index) => <CardSkeleton key={index} />)
				) : (
					items.filter(item => item.title?.toLowerCase().includes(searchValue.toLowerCase()))
						.map(item => {
							return (
								<Card
									key={item.id}
									{...item}
								/>
							)
						})
					)
				}
			</div>
		</section>
	)
}