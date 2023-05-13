import {ReactComponent as IconTimes} from "../../assets/img/icons/times.svg";
import {ReactComponent as IconArrowRight} from "../../assets/img/icons/arrow-right.svg";
import {useContext, useState} from "react";
import {AppContext} from "../../context";
import {DrawerInfo} from "./DrawerInfo";
import axios from "axios";
import {useTotalPriceBasket} from "../../hooks/useTotalPriceBasket";
import {useNumberWithSpaces} from "../../hooks/useNumberWithSpaces";

let orderId = 0;

export const Drawer = () => {
	const {
		cartItems,
		setCartItems,
		setOrders,
		onAddToCart: onRemoveItem,
		isOpenedCart,
		setIsOpenedCart
	} = useContext(AppContext);

	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
	const {totalPriceWithTax, priceTax} = useTotalPriceBasket();
	const [totalPriceWithTaxWithSpaces, priceTaxWithSpaces] = [useNumberWithSpaces(totalPriceWithTax), useNumberWithSpaces(priceTax)];

	const onCheckout = async () => {
		setIsLoadingCheckout(true);
		try {
			for (let card of cartItems) {
				await axios.delete(`${process.env.REACT_APP_API_URL}/cart/${card.id}`)
					.then(res => setIsOrderComplete(true))
					.catch(err => alert(err.message))
			}

			orderId++;
			setOrders(prev => [...prev, {
				id: orderId,
				items: cartItems
			}]);
			setCartItems([]);
		} catch (error) {
			alert(`Не удалось создать заказ :(`)
			console.log(error)
		}
		setIsLoadingCheckout(false);
	}

	return (
		<div className={`overlay ${isOpenedCart ? 'overlay_visible' : ''}`} onClick={(e) => e.target.classList.contains('overlay') && setIsOpenedCart(false)}>
			<div className="cart drawer">
				<div className="drawer__header section__header">
					<h3 className="section__header-title">Корзина</h3>
					<button className="drawer__close" title="Закрыть" onClick={() => setIsOpenedCart(false)}>
						<IconTimes fill="currentColor" />
					</button>
				</div>
				{cartItems.length ? (
					<>
						<div className="carts__list drawer__content">
							{cartItems.map(item => {
								return (
									<div key={item.id} className="cart__item">
										<img className="cart__item-title" src={`./img/products/${item.imgUrl}`} width={70} height={70} alt={item.imgAlt}/>
										<div className="cart__item-info">
											<p className="cart__item-title">{item.title}</p>
											{/* eslint-disable-next-line react-hooks/rules-of-hooks */}
											<span className="cart__item-price">{useNumberWithSpaces(item.price)}</span>
										</div>
										<button className="cart__item-btn-delete" onClick={() => onRemoveItem(item)}>
											<IconTimes fill="currentColor" />
										</button>
									</div>
								)
							})}
						</div>
						<div className="cart__total drawer__bottom">
							<ul className="details-list">
								<li className="details-list__item">
									<span className="details-list__item-key">Налог 5%: </span>
									<span className="dashed"></span>
									<span className="details-list__item-value">{priceTaxWithSpaces}</span>
								</li>
								<li className="details-list__item">
									<span className="details-list__item-key">Итого: </span>
									<span className="dashed"></span>
									<span className="details-list__item-value">{totalPriceWithTaxWithSpaces}</span>
								</li>
							</ul>
							<button
								className="btn btn_arrow-right"
								onClick={onCheckout}
								disabled={isLoadingCheckout}
							>
								Оформить заказ
								<IconArrowRight stroke="currentColor" />
							</button>
						</div>
					</>
				) : (
					isOrderComplete ? (
						<DrawerInfo
							img={{
								url: './img/complete-order.png',
								alt: 'Complete order',
								width: 83,
								height: 120
							}}
							titleGreen={true}
							title="Заказ оформлен!"
							description={`Ваш заказ №${orderId} скоро будет передан курьерской доставке`}
						/>
						) : (
							<DrawerInfo
								img={{
									url: './img/cart_empty.png',
									alt: 'Cart empty',
									width: 120,
									height: 120
								}}
								titleGreen={false}
								title="Корзина пустая"
								description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
							/>
						)
				)}
			</div>
		</div>
	)
}