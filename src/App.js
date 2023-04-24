import './style.sass'
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Favorites} from "./pages/Favorites";
import {Drawer} from "./components/Drawer";
import {useEffect, useState} from "react";
import {Wrapper} from "./components/Wrapper";
import axios from "axios";


function App() {
	const [isOpenedCart, setIsOpenedCart] = useState(false);
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favoriteItems, setFavoriteItems] = useState(localStorage.getItem(['favoritesItems']) ? JSON.parse(localStorage.getItem(['favoritesItems'])) : []);



	/** Отправка запроса на получение Товаров с сервера **/
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/products`)
			.then(res => setItems(res.data))
			.catch(err => alert(err.message))
	}, [])


	/** Отправка запроса на получение Товаров в Коризне с сервера **/
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}/cart`)
			.then(res => setCartItems(res.data))
			.catch(err => alert(err.message))
	}, [])


	/** Функция Добавления/Удаления товара в Корзину **/
	const onAddToCart = (card) => {
		if (cartItems.some(cartItem => cartItem.code === card.code)) {
			const cardCode = cartItems.find(cartItem => cartItem.code === card.code);
			axios.delete(`${process.env.REACT_APP_API_URL}/cart/${cardCode.id}`)
				.then(res => setCartItems(cartItems.filter(cartItem => cartItem.code !== res.data.code)))
				.catch(err => alert(err.message))
		} else {
			axios.post(`${process.env.REACT_APP_API_URL}/cart`, card)
				.then(res => setCartItems(prevState => [...prevState, res.data]))
				.catch(err => alert(err.message))
		}
	}


	/** Функция Удаления товара товара из Drawer Корзины **/
	const onRemoveItemToCart = (id) => {
		axios.delete(`${process.env.REACT_APP_API_URL}/cart/${id}`)
			.then(res => setCartItems(prev => prev.filter(item => item.id !== res.data.id)))
	}


	/** Функция Добавление/Удаления товаров в Избранные **/
	const onFavorite = (cardCode) => {
		if (favoriteItems.some(item => item === cardCode)) {
			const updated = favoriteItems.filter(item => item !== cardCode);
			setFavoriteItems(updated);
			localStorage.setItem('favoritesItems', JSON.stringify(updated));
		} else {
			const updated = [...favoriteItems, cardCode];
			setFavoriteItems(updated)
			localStorage.setItem('favoritesItems', JSON.stringify(updated));
		}
	}

  return (
		<>
			<Routes>
				<Route path="/" element={<Wrapper setIsOpenedCart={setIsOpenedCart} />} >
					<Route index path="/" element={<Home
						items={items}
						cartItems={cartItems}
						favoriteItems={favoriteItems}
						onFavorite={onFavorite}
						onAddToCart={onAddToCart}
					/>} />
					<Route path="favorites" element={<Favorites />} />
				</Route>
			</Routes>

			{isOpenedCart && <Drawer
					cartItems={cartItems}
					onClose={() => setIsOpenedCart(false)}
					onRemoveItem={(id) => onRemoveItemToCart(id)}
			/>}
		</>
	)
}

export default App;
