import {ReactComponent as IconTimes} from "../../assets/img/icons/times.svg";
import {ReactComponent as IconArrowRight} from "../../assets/img/icons/arrow-right.svg";
import {useContext} from "react";
import {AppContext} from "../../context";
import {DrawerInfo} from "./DrawerInfo";

export const Drawer = () => {
	const {
		cartItems,
		onAddToCart: onRemoveItem,
		setIsOpenedCart
	} = useContext(AppContext);

	return (
		<div className="overlay">
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
										<img className="cart__item-title" src={`/img/products/${item.imgUrl}`} width={70} height={70} alt={item.imgAlt}/>
										<div className="cart__item-info">
											<p className="cart__item-title">{item.title}</p>
											<span className="cart__item-price">{item.price}</span>
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
									<span className="details-list__item-key">Итого: </span>
									<span className="dashed"></span>
									<span className="details-list__item-value">21 498 руб.</span>
								</li>
								<li className="details-list__item">
									<span className="details-list__item-key">Налог 5%: </span>
									<span className="dashed"></span>
									<span className="details-list__item-value">1074 руб.</span>
								</li>
							</ul>
							<button className="btn btn_arrow-right">
								Оформить заказ
								<IconArrowRight stroke="currentColor" />
							</button>
						</div>
					</>
				) : (
					<DrawerInfo
						img={{
							url: '/img/cart_empty.png',
							alt: 'Cart empty',
							width: 120,
							height: 120
						}}
						titleGreen={false}
						title="Корзина пустая"
						description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
					/>
				)}
			</div>
		</div>
	)
}