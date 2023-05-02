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
	const [isLoading, setIsLoading] = useState(true);


	/** Загрузка данных с серера **/
	useEffect(() => {
		setIsLoading(true);
		(async () => {
			try {
				const responseItems = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
				const responseCartItems = await axios.get(`${process.env.REACT_APP_API_URL}/cart`)

				setItems(responseItems.data);
				setCartItems(responseCartItems.data);
				setIsLoading(false)
			} catch (error) {
				alert(`Ошибка при загрузке данных: ${error.name}`)
				console.log(error)
			}
		})()
	}, [])

	/** Функция Добавления/Удаления товара в Корзину **/
	const onAddToCart = (card) => {
		if (cartItems.some(cartItem => cartItem.id_product === card.id_product)) {
			const cardSelect = cartItems.find(cartItem => cartItem.id_product === card.id_product);
			axios.delete(`${process.env.REACT_APP_API_URL}/cart/${cardSelect.id}`)
				.then(res => setCartItems(prevState => prevState.filter(cartItem => cartItem.id_product !== res.data.id_product)))
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
		<>
			<Routes>
				<Route path="/" element={<Wrapper setIsOpenedCart={setIsOpenedCart} />} >
					<Route index path="/" element={<Home
						items={items}
						cartItems={cartItems}
						favoriteItems={favoriteItems}
						onFavorite={onFavorite}
						onAddToCart={onAddToCart}
						isLoading={isLoading}
					/>} />
					<Route path="/*" element={<h1>404 NOT FOUND</h1>} />
					<Route path="favorites" element={<Favorites
						items={items}
						cartItems={cartItems}
						favoriteItems={favoriteItems}
						onFavorite={onFavorite}
						onAddToCart={onAddToCart}
						isLoading={isLoading}
					/>} />
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
