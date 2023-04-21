import {Header} from "./Header";
import {Outlet} from "react-router-dom"

export const Wrapper = ({setIsOpenedCart}) => {
		return (
		<div className="wrapper">
			<Header onClickBasket={() => setIsOpenedCart(true)} />
			<main className="content">
				<Outlet/>
			</main>
		</div>
	)
}