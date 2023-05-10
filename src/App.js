import './style.sass'
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Favorites} from "./pages/Favorites";
import {Drawer} from "./components/Drawer/Drawer";
import {useEffect, useState} from "react";
import {Wrapper} from "./components/Wrapper";
import axios from "axios";
import {AppContext} from "./context";
import {Orders} from "./pages/Orders";

const ordersData = [];

function App() {
	const [isOpenedCart, setIsOpenedCart] = useState(false);
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favoriteItems, setFavoriteItems] = useState(localStorage.getItem(['favoritesItems']) ? JSON.parse(localStorage.getItem(['favoritesItems'])) : []);
	const [orders, setOrders] = useState(ordersData);
	const [isLoading, setIsLoading] = useState(true);


	/** Загрузка данных с серера **/
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const [responseItems, responseCartItems] = await Promise.all([
					axios.get(`${process.env.REACT_APP_API_URL}/products`),
					axios.get(`${process.env.REACT_APP_API_URL}/cart`)
				]);

				setItems(responseItems.data);
				setCartItems(responseCartItems.data);
				setIsLoading(false)
			} catch (error) {
				alert(`Ошибка при загрузке данных :(`)
				console.error(error)
			}
		})()
	}, [])

	/** Функция Добавления/Удаления товара в Корзину **/
	const onAddToCart = async (card) => {
		try {
			if (cartItems.some(cartItem => cartItem.id_product === card.id_product)) {
				const cardSelect = cartItems.find(cartItem => cartItem.id_product === card.id_product);
				await axios.delete(`${process.env.REACT_APP_API_URL}/cart/${cardSelect.id}`)
					.then(res => setCartItems(prevState => prevState.filter(cartItem => cartItem.id_product !== res.data.id_product)))
					.catch(err => alert(err.message))
			} else {
				axios.post(`${process.env.REACT_APP_API_URL}/cart`, card)
					.then(res => setCartItems(prevState => [...prevState, res.data]))
					.catch(err => alert(err.message))
			}
		} catch (error) {
			alert(`Ошибка при добавление/удалении товара :(`)
			console.error(error)
		}
	}

	/** Функция Добавление/Удаления товаров в Избранные **/
	const onFavorite = (cardIdProduct) => {
		if (favoriteItems.some(item => item === cardIdProduct)) {
			const updated = favoriteItems.filter(item => item !== cardIdProduct);
			setFavoriteItems(updated);
			localStorage.setItem('favoritesItems', JSON.stringify(updated));
		} else {
			const updated = [...favoriteItems, cardIdProduct];
			setFavoriteItems(updated)
			localStorage.setItem('favoritesItems', JSON.stringify(updated));
		}
	}


  return (
		<AppContext.Provider value={{
			items,
			cartItems,
			setCartItems,
			favoriteItems,
			onFavorite,
			onAddToCart,
			orders,
			setOrders,
			isLoading,
			isOpenedCart,
			setIsOpenedCart
		}}>
			<Routes>
				<Route path="/" element={<Wrapper	setIsOpenedCart={setIsOpenedCart} />} >
					<Route index path="/" element={<Home />} />
					<Route path="/*" element={<h1>404 NOT FOUND</h1>} />
					<Route path="favorites" element={<Favorites />} />
					<Route path="orders" element={<Orders />} />
				</Route>
			</Routes>
			<Drawer />
		</AppContext.Provider>
	)
}

export default App;
