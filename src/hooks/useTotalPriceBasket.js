import {useContext} from "react";
import {AppContext} from "../context";

export const useTotalPriceBasket = () => {
	const {cartItems} = useContext(AppContext);
	const tax = 5;
	const totalPrice = cartItems.reduce((acc, obj) => obj.price + acc, 0);
	const priceTax = Math.ceil(totalPrice / 100 * tax);
	const totalPriceWithTax = totalPrice + priceTax;

	return {totalPriceWithTax, priceTax}
}


