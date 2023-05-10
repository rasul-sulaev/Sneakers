import {Card} from "../components/Card/Card";
import {useContext, useEffect, useState} from "react";
import {CardSkeleton} from "../components/Card/CardSkeleton";
import {AppContext} from "../context";
import {ContentInfo} from "../components/ContentInfo";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Favorites = () => {
	const [searchValue, setSearchValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const {
		items,
		favoriteItems
	} = useContext(AppContext);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				await delay(1000);
			} catch (error) {
				console.error(error)
			}

			setIsLoading(false);
		})()
	}, [])

	return (
		<section className="section">
			{favoriteItems.length ? (
				<>
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
				</>
			) : (
				<ContentInfo
					img={{
						url: './img/smiles/smile-pleading.png',
						alt: 'Pleading smile',
						width: 70,
						height: 70
					}}
					title={'Закладок нет :('}
					description={'Вы ничего не добавляли в закладки'}
				/>
			)}
		</section>
	)
}