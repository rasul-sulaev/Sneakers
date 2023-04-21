import './style.sass'
import axios from "axios";
import {Header} from "./components/Header";
import {Card} from "./components/Card/Card";
import {Drawer} from "./components/Drawer";
import {useEffect, useState} from "react";


function App() {
	/** Состояние Корзины **/
	const [isOpenedCart, setIsOpenedCart] = useState(false);

	/** Состояние массива товаров **/
	const [items, setItems] = useState([]);

	/** Массив Товаров в Корзине **/
	const [cartItems, setCartItems] = useState([]);

	/** Состояние Поля поиска **/
	const [searchValue, setSearchValue] = useState('');

	/** Отправка запроса на получение Товаров с сервера **/
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/products`)
			.then(res => setItems(res.data));
	}, [])


	/** Отправка запроса на получение Товаров в Коризне с сервера **/
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/cart`)
			.then(res => setCartItems(res.data));
	}, [])

	/** Функция Добавления/Удаления товара в Корзину **/
	const onAddToCart = (card) => {
		if (cartItems.some(cartItem => cartItem.code === card.code)) {
			const cardCode = cartItems.find(cartItem => cartItem.code === card.code);
			axios.delete(`${process.env.REACT_APP_API_URL}/cart/${cardCode.id}`)
				.then(res => setCartItems(cartItems.filter(cartItem => cartItem.code !== res.data.code)))
		} else {
			axios.post(`${process.env.REACT_APP_API_URL}/cart`, card)
				.then(res => setCartItems(prevState => [...prevState, res.data]))
		}
	}


	/** Функция Удаления товара товара из Drawer Корзины **/
	const onRemoveItemToCart = (id) => {
		axios.delete(`${process.env.REACT_APP_API_URL}/cart/${id}`)
		setCartItems(prev => prev.filter(item => item.id !== id));
	}


  return (
		<>
			<div className="wrapper">
				<Header onClickBasket={() => setIsOpenedCart(true)} />
				<main className="content">
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
										isAddedToCart={cartItems.some(cartItem => cartItem.code === item.code)}
										onAddToCart={(card) => onAddToCart(card)}
									/>
								)
							})}
						</div>
					</section>
				</main>
			</div>
			{isOpenedCart && <Drawer
				cartItems={cartItems}
				onClose={() => setIsOpenedCart(false)}
				onRemoveItem={(id) => onRemoveItemToCart(id)}
			/>}
		</>
  );
}

export default App;
