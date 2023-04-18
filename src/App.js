import './style.sass'
import {Header} from "./components/Header";
import {Card} from "./components/Card/Card";
import {Drawer} from "./components/Drawer";
import {useState} from "react";

function App() {
	/** Состояние Корзины **/
	const [isOpenedCart, setIsOpenedCart] = useState(false);


	const items = [
		{
			title: 'Заголовок1',
		},
		{
			title: 'Заголовок2',
		},
		{
			title: 'Заголовок3',
		}
	]

  return (
		<>
			<div className="wrapper">
				<Header onClickBasket={() => setIsOpenedCart(true)} />
				<main className="content">
					<section className="slider section">

					</section>

					<section className="section">
						<div className="section__header">
							<h2 className="section__header-title">Все кроссовки</h2>
							<form className="search" action="">
								<input className="search__input" type="text" placeholder="Поиск..."/>
							</form>
						</div>
						<div className="cards__list">
							{items.map((item) => {
								return (
									<Card
										key={Math.random()}
										imgUrl={'/img/products/2.png'}
										imgAlt={''}
										title={item.title}
										price={'12 999 руб.'}
										favorited={false}
										added={false}
									/>
								)
							})}
						</div>
					</section>
				</main>
			</div>
			{isOpenedCart && <Drawer onClose={() => setIsOpenedCart(false)} />}
		</>
  );
}

export default App;
