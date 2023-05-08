import { ReactComponent as IconUser } from "../assets/img/icons/user.svg";
import { ReactComponent as IconFavorite } from "../assets/img/icons/favorite.svg";
import { ReactComponent as IconBasket } from "../assets/img/icons/basket.svg";
import {Link} from "react-router-dom";
import {useTotalPriceBasket} from "../hooks/useTotalPriceBasket";

export const Header = ({
	// totalPrice,
	onClickBasket
}) => {
	const {totalPriceWithTax} = useTotalPriceBasket();

	return (
		<header className="header">
			<Link className="header__logo" to="/">
				<img className="header__logo-img" src="/img/logo.png" width={40} height={40} alt="Лого"/>
				<div>
					<p className="header__logo-title">REACT SNEAKERS</p>
					<span className="header__logo-description">Магазин лучших кроссовок</span>
				</div>
			</Link>
			<div className="header__links">
				<button
					className="header__link"
					onClick={onClickBasket}
				>
					<IconBasket width={20} height={20} stroke="currentColor" />
					{/*{!!totalPrice && (<span>{totalPrice} руб.</span>)}*/}
					{totalPriceWithTax ? (<span>{totalPriceWithTax} руб.</span>) : null}
				</button>
				<Link className="header__link" to="/favorites">
					<IconFavorite width={20} height={20} fill="currentColor" />
				</Link>
				<Link className="header__link" to="/profile">
					<IconUser width={20} height={20} fill="currentColor" />
				</Link>
			</div>
		</header>
	)
}