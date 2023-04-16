import {ReactComponent as IconTimes} from "../assets/img/icons/times.svg";
import {ReactComponent as IconArrowRight} from "../assets/img/icons/arrow-right.svg";

export const Drawer = () => {
	return (
		<div className="overlay" >
			<div className="cart drawer">
				<div className="drawer__header section__header">
					<h3 className="section__header-title">Корзина</h3>
					<button className="drawer__close" title="Закрыть">
						<IconTimes fill="currentColor" />
					</button>
				</div>
				<div className="carts__list drawer__content">
					<div className="cart__item">
						<img className="cart__item-title" src="img/products/1.png" width={70} height={70} alt=""/>
						<div className="cart__item-info">
							<p className="cart__item-title">Мужские Кроссовки Nike Air Max 270</p>
							<span className="cart__item-price">12 999 руб.</span>
						</div>
						<button className="cart__item-btn-delete">
							<IconTimes fill="currentColor" />
						</button>
					</div>
					<div className="cart__item">
						<img className="cart__item-title" src="img/products/2.png" width={70} height={70} alt=""/>
						<div className="cart__item-info">
							<p className="cart__item-title">Мужские Кроссовки Nike Air Max 270</p>
							<span className="cart__item-price">12 999 руб.</span>
						</div>
						<button className="cart__item-btn-delete">
							<IconTimes fill="currentColor" />
						</button>
					</div>
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
					<button className="btn">
						Оформить заказ
						<IconArrowRight stroke="currentColor" />
					</button>
				</div>
			</div>
		</div>
	)
}