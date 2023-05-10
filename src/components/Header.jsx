import { ReactComponent as IconUser } from "../assets/img/icons/user.svg";
import { ReactComponent as IconFavorite } from "../assets/img/icons/favorite.svg";
import { ReactComponent as IconBasket } from "../assets/img/icons/basket.svg";
import {NavLink} from "react-router-dom";
import {useTotalPriceBasket} from "../hooks/useTotalPriceBasket";
import {useNumberWithSpaces} from "../hooks/useNumberWithSpaces";

export const Header = ({
	onClickBasket
}) => {
	const {totalPriceWithTax} = useTotalPriceBasket();
	const totalPriceWithTaxWithSpaces = useNumberWithSpaces(totalPriceWithTax);

	return (
		<header className="header">
			<NavLink className="header__logo" to="/">
				<img className="header__logo-img" src="/img/logo.png" width={40} height={40} alt="Лого"/>
				<div>
					<p className="header__logo-title">REACT SNEAKERS</p>
					<span className="header__logo-description">Магазин лучших кроссовок</span>
				</div>
			</NavLink>
			<div className="header__links">
				<button
					className="header__link"
					onClick={onClickBasket}
				>
					<IconBasket width={20} height={20} stroke="currentColor" />
					{!!totalPriceWithTax && (<span>{totalPriceWithTaxWithSpaces}</span>)}
				</button>
				<NavLink className="header__link" to="/favorites">
					<IconFavorite width={20} height={20} fill="currentColor" />
				</NavLink>
				<NavLink className="header__link" to="/orders">
					<IconUser width={20} height={20} fill="currentColor" />
				</NavLink>
			</div>
		</header>
	)
}