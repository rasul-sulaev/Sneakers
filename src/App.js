import './style.sass'
import {Header} from "./components/Header";

function App() {
  return (
    <div className="wrapper">
			<Header />
      <main className="content">
        <section className="slider section">

        </section>
				<section className="section">
					<h2 className="section__title">Все кроссовки</h2>
					<div className="cards__list">
						<div className="card">
							<div className="card__img-block">
								<button className="card__btn-favorite"></button>
								<img className="card__img" src="/img/products/1.png" width={133} height={112}></img>
							</div>
							<p className="card__title">Мужские Кроссовки Nike Blazer Mid Suede</p>
							<div className="card__bottom">
								<div>
									<span className="card__price-text">ЦЕНА:</span>
									<span className="card__price">12 999 руб.</span>
								</div>
								<button className="card__btn-add"></button>
							</div>
						</div>
						<div className="card">
							<div className="card__img-block">
								<button className="card__btn-favorite card__btn-favorite_active"></button>
								<img className="card__img" src="/img/products/2.png" width={133} height={112}></img>
							</div>
							<p className="card__title">Мужские Кроссовки Nike Blazer Mid Suede</p>
							<div className="card__bottom">
								<div>
									<span className="card__price-text">ЦЕНА:</span>
									<span className="card__price">12 999 руб.</span>
								</div>
								<button className="card__btn-add card__btn-add_active"></button>
							</div>
						</div>
					</div>
				</section>
      </main>
    </div>
  );
}

export default App;
