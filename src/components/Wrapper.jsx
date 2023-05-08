import {Header} from "./Header";
import {Outlet} from "react-router-dom"

export const Wrapper = ({
	// totalPrice,
	setIsOpenedCart
}) => {
	return (
	<div className="wrapper">
		<Header
			// totalPrice={totalPrice}
			onClickBasket={() => setIsOpenedCart(true)}
		/>
		<main className="content">
			<Outlet/>
		</main>
	</div>
	)
}