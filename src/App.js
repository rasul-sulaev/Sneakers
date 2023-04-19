import './style.sass'
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

	/** Отправка запроса на получение данных с сервера **/
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}`)
			.then(res => res.json())
			.then(data => setItems(data))
			.catch(err => console.log(err))
	}, [])


	/** Функция Добавления/Удаления товара в Корзину **/
	const onAddToCart = (cartItem) => {
		if (cartItems.some(item => item.id === cartItem.id)) {
			setCartItems(cartItems.filter(item => item.id !== cartItem.id));
		} else {
			setCartItems(prev => [...prev, cartItem]);
		}
	}

  return (
		<>
			<div className="wrapper">
				<Header onClickBasket={() => setIsOpenedCart(true)} />
				<main className="content">
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
										key={item.id}
										id={item.id}
										imgUrl={`/img/products/${item.imgUrl}`}
										imgAlt={item.imgAlt}
										title={item.title}
										price={`${item.price} руб.`}
										favorite={false}
										onAdd={(cartItem) => onAddToCart(cartItem)}
									/>
								)
							})}
						</div>
					</section>
				</main>
			</div>
			{isOpenedCart && <Drawer cartItems={cartItems} onClose={() => setIsOpenedCart(false)} />}
		</>
  );
}

export default App;
