import {ReactComponent as IconArrowRight} from "../../assets/img/icons/arrow-right.svg";
import {useContext} from "react";
import {AppContext} from "../../context";

export const DrawerInfo = ({
	img,
	title,
	titleGreen,
	description
	}) => {
	const {setIsOpenedCart} = useContext(AppContext);

	return (
		<div className="drawer__content drawer__content_empty">
			<img className="drawer__content-img" width={img.width} height={img.height} src={img.url} alt={img.alt}/>
			<p className={titleGreen ? `drawer__content-title drawer__content-title_green` : `drawer__content-title`}>{title}</p>
			<p className="drawer__content-description">{description}</p>
			<button className="drawer__content-btn btn btn_arrow-left" onClick={() => setIsOpenedCart(false)}>
				<IconArrowRight stroke="currentColor" />
				Вернуться назад
			</button>
		</div>
	)
}

