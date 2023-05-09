import {CardSkeleton} from "../components/Card/CardSkeleton";
import {Card} from "../components/Card/Card";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../context";

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
			<div className="section__header">
				<h2 className="section__header-title">Мои заказы</h2>
			</div>
			{isLoading ? (
				[...[{id: 1},{id: 2}]].map((order) => {
					return (
						<div className="order" key={order.id}>
							<h3 className="order__title">Заказ №{order.id}</h3>
							<div className="cards__list">
								{[...Array(4)].map(() => <CardSkeleton />)}
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
		</section>
	)
}