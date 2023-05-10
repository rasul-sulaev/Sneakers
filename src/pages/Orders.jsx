import {CardSkeleton} from "../components/Card/CardSkeleton";
import {Card} from "../components/Card/Card";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../context";
import {ContentInfo} from "../components/ContentInfo";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Orders = () => {
	const [isLoading, setIsLoading] = useState(false);

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

	const {orders} = useContext(AppContext);

	return (
		<section className="section">
			{orders.length ? (
				<>
					<div className="section__header">
						<h2 className="section__header-title">Мои заказы</h2>
					</div>
					{isLoading ? (
						[...[{id: 1},{id: 2}]].map((order) => {
							return (
								<div className="order" key={order.id}>
									<h3 className="order__title">Заказ №{order.id}</h3>
									<div className="cards__list">
										{[...Array(4)].map((_, index) => <CardSkeleton key={index} />)}
									</div>
								</div>
							)
						})
					) : (
						orders.map((order) => {
							return (
								<div className="order" key={order.id}>
									<h3 className="order__title">Заказ №{order.id}</h3>
									<div className="cards__list">
										{order.items.map(item => {
											return (
												<Card
													key={item.id_product}
													{...item}
													hideButtonOnFavorite={true}
													hideButtonAddToCard={true}
												/>
											)}
										)}
									</div>
								</div>
							)
						})
					)}
				</>
			) : (
				<ContentInfo
					img={{
						url: './img/smiles/smile-sad.png',
						alt: 'Sad smile',
						width: 70,
						height: 70
					}}
					title={'У вас нет заказов'}
					description={<>Вы нищеброд? <br/>Оформите хотя бы один заказ.</>}
				/>
			)}
		</section>
	)
}