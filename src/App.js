import './style.sass'
import {Header} from "./components/Header";
import {Card} from "./components/Card/Card";
import {Drawer} from "./components/Drawer";
import {useEffect, useState} from "react";

function App() {
	/** Состояние Корзины **/
	const [isOpenedCart, setIsOpenedCart] = useState(false);


	// const items = [
	// 	{
	// 		title: 'Мужские Кроссовки Nike Blazer Mid Suede',
	// 		image: '1.png',
	// 		imageAlt: 'Мужские Кроссовки Nike Blazer Mid Suede',
	// 		price: 12999
	// 	},
	// 	{
	// 		title: 'Мужские Кроссовки Nike Air Max 270',
	// 		image: '2.png',
	// 		imageAlt: 'Мужские Кроссовки Nike Air Max 270',
	// 		price: 12999
	// 	},
	// 	{
	// 		title: 'Мужские Кроссовки Nike Blazer Mid Suede',
	// 		image: '3.png',
	// 		imageAlt: 'Мужские Кроссовки Nike Blazer Mid Suede',
	// 		price: 8499
	// 	},
	// 	{
	// 		title: 'Кроссовки Puma X Aka Boku Future Rider',
	// 		image: '4.png',
	// 		imageAlt: 'Кроссовки Puma X Aka Boku Future Rider',
	// 		price: 8999
	// 	},
	// 	{
	// 		title: 'Мужские Кроссовки Under Armour Curry 8',
	// 		image: '5.png',
	// 		imageAlt: 'Мужские Кроссовки Under Armour Curry 8',
	// 		price: 15199
	// 	},
	// 	{
	// 		title: 'Мужские Кроссовки Nike Kyrie 7',
	// 		image: '6.png',
	// 		imageAlt: 'Мужские Кроссовки Nike Kyrie 7',
	// 		price: 11299
	// 	},
	// 	{
	// 		title: 'Мужские Кроссовки Jordan Air Jordan 11',
	// 		image: '7.png',
	// 		imageAlt: 'Мужские Кроссовки Jordan Air Jordan 11',
	// 		price: 10799
	// 	},
	// 	{
	// 		title: 'Мужские Кроссовки Nike LeBron XVIII',
	// 		image: '8.png',
	// 		imageAlt: 'Мужские Кроссовки Nike LeBron XVIII',
	// 		price: 16499
	// 	},
	// 	{
	// 		title: 'Мужские Кроссовки Nike Lebron XVIII Low',
	// 		image: '9.png',
	// 		imageAlt: 'Мужские Кроссовки Nike Lebron XVIII Low',
	// 		price: 13999
	// 	},
	// 	{
	// 		title: 'Мужские Кроссовки Nike Blazer Mid Suede',
	// 		image: '10.png',
	// 		imageAlt: 'Мужские Кроссовки Nike Blazer Mid Suede',
	// 		price: 8499
	// 	},
	// 	{
	// 		title: 'Кроссовки Puma X Aka Boku Future Rider',
	// 		image: '11.png',
	// 		imageAlt: 'Кроссовки Puma X Aka Boku Future Rider',
	// 		price: 8999
	// 	},
	// 	{
	// 		title: 'Мужские Кроссовки Nike Kyrie Flytrap IV',
	// 		image: '12.png',
	// 		imageAlt: 'Мужские Кроссовки Nike Kyrie Flytrap IV',
	// 		price: 11299
	// 	},
	// ]


	/** Состояние массива товаров **/
	const [items, setItems] = useState([]);

	/** Отправка запроса на получение данных с сервера **/
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}`)
			.then(res => res.json())
			.then(data => setItems(data))
	}, [])


  return (
		<>
			<div className="wrapper">
				<Header onClickBasket={() => setIsOpenedCart(true)} />
				<main className="content">
					<section className="slider section">

					</section>

					<section className="section">
						<div className="section__header">
							<h2 className="section__header-title">Все кроссовки</h2>
							<form className="search" action="">
								<input className="search__input" type="text" placeholder="Поиск..."/>
							</form>
						</div>
						<div className="cards__list">
							{items.map((item) => {
								return (
									<Card
										key={Math.random()}
										imgUrl={`/img/products/${item.image}`}
										imgAlt={item.imageAlt}
										title={item.title}
										price={`${item.price} руб.`}
										favorited={false}
										added={false}
									/>
								)
							})}
						</div>
					</section>
				</main>
			</div>
			{isOpenedCart && <Drawer onClose={() => setIsOpenedCart(false)} />}
		</>
  );
}

export default App;
