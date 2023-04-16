import './style.sass'
import {Header} from "./components/Header";
import {ReactComponent as IconTimes} from "./assets/img/icons/times.svg";
import {ReactComponent as IconArrowRight} from "./assets/img/icons/arrow-right.svg";
import {Card} from "./components/Card";

function App() {
  return (
    <div className="wrapper">
			<Header />
      <main className="content">

				<div className="overlay" style={{ display: 'none' }}>
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
						{[...Array(12)].map((item) => {
							return (
								<Card
									img={'/img/products/2.png'}
									imgAlt={''}
									title={'Название'}
									price={'12 999 руб.'}
									favorited={false}
									added={false}
								/>
							)
						})}


						{/*<div className="card">*/}
						{/*	<div className="card__img-block">*/}
						{/*		<button className="card__btn-favorite">*/}
						{/*			<img src="img/icons/heart-outline.png" width={16} height={15} alt=""/>*/}
						{/*		</button>*/}
						{/*		<img className="card__img" src="/img/products/1.png" width={133} height={112}></img>*/}
						{/*	</div>*/}
						{/*	<p className="card__title">Мужские Кроссовки Nike Blazer Mid Suede</p>*/}
						{/*	<div className="card__bottom">*/}
						{/*		<div>*/}
						{/*			<span className="card__price-text">ЦЕНА:</span>*/}
						{/*			<span className="card__price">12 999 руб.</span>*/}
						{/*		</div>*/}
						{/*		<button className="card__btn-add"></button>*/}
						{/*	</div>*/}
						{/*</div>*/}

					</div>
				</section>
      </main>
    </div>
  );
}

export default App;
