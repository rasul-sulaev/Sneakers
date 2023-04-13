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
				</section>
      </main>
    </div>
  );
}

export default App;
