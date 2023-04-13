import { ReactComponent as IconUser } from "../assets/img/icons/user.svg";
import { ReactComponent as IconFavorite } from "../assets/img/icons/favorite.svg";
import { ReactComponent as IconBasket } from "../assets/img/icons/basket.svg";


export const Header = () => {
	return (
		<header className="header">
			<a className="header__logo" href="/">
				<img className="header__logo-img" src="/img/logo.png" width={40} height={40} alt="Лого"/>
				<div>
					<p className="header__logo-title">REACT SNEAKERS</p>
					<span className="header__logo-description">Магазин лучших кроссовок</span>
				</div>
			</a>
			<div className="header__links">
				<button className="header__link">
					<IconBasket width={20} height={20} stroke="currentColor" />
					<span>1205 руб.</span>
				</button>
				<a className="header__link" href="">
					<IconFavorite width={20} height={20} fill="currentColor" />
				</a>
				<a className="header__link" href="">
					<IconUser width={20} height={20} fill="currentColor" />
				</a>
			</div>
		</header>
	)
}