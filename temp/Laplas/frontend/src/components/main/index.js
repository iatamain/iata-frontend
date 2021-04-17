import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./style.css";

let timerScroll = null;
let position = "top";
function scrollTo(y) {
	if (!timerScroll) {
		window.scroll(0, y);
		timerScroll = setTimeout(() => {
			timerScroll = null;
			if (y >= window.innerHeight) {
				position = "bottom";
			} else {
				position = "top";
			}
			console.log(position);
		}, 1000);
	}
}
const Main = () => {
	let vmid = (window.innerWidth + window.innerHeight) / 300;
	let r = Math.round(Math.min(17 * vmid, window.innerWidth / 9));
	if (window.scrollY < window.innerHeight && position === "bottom") {
		scrollTo(0);
	} else if (window.scrollY > 0 && position === "top") {
		scrollTo(window.innerHeight + 40);
	}
	return (
		<Fragment>
			<div id="first_main">
				<div id="laplas">
					<h1>
						БУДУЩЕЕ НАЧИНАЕТСЯ СЕЙЧАС.
						<br />
						НАЧНИ С LAPLAS!
					</h1>
					<div>
						<Link id="button" to="/course">
							Выбрать курс
						</Link>
					</div>
				</div>
				<div id="circles">
					{Array(5)
						.fill(r)
						.map((r, i) => {
							return Math.floor(r * 1.2 ** i);
						})
						.map((r, i) => {
							return (
								<svg
									key={i}
									height={r * 2 + "px"}
									width={r * 2 + "px"}
									style={{
										bottom: r ** 1.6 / 30 - 40 + "px",
										margin: -Math.floor(r / 2) + "px",
									}}
								>
									<circle
										strokeDasharray={2 * Math.PI * r - r / 4 + " 1000"}
										cx="50%"
										cy="50%"
										r="50%"
										stroke="white"
										strokeWidth="1"
										fill="none"
										style={{
											animation: `${i % 2 ? "rotate" : "revertRotate"} ${
												9 - i
											}s linear infinite`,
										}}
									/>
								</svg>
							);
						})}
				</div>
			</div>
			<div id="second_main">
				<p>
					LAPLAS – это сообщество прогрессивных специалистов, задающих новые
					тенденции в образовании и объединённых общей целью – дать качественные
					и полные знания всем желающим. Наша задача, в первую очередь,
					заключается в развитии аналитических способностей у обучающихся.
					Поэтому мы разработали авторские online-курсы по высшей математике,
					физике, программированию и техническому английскому языку, позволяющие
					не только повысить текущий уровень подготовки, но и приобрести
					необходимые компетенции и навыки для успешного освоения новых
					профессий.
					<br />
					Выбирая любой наш курс, Вы получите:
					<br />• глубокое и полное изучение предмета;
					<br />• доступное изложение материала;
					<br />• индивидуальное курирование каждого ученика;
					<br />• множество практических заданий на закрепление изученных тем;
					<br />• возможность просматривать занятия в записи, если присутствие
					online по какой-либо причине не представляется возможным.
					<br />
					Также студентам и школьникам предлагаются индивидуальные занятия,
					направленные на качественную подготовку к сессии или к ОГЭ/ЕГЭ.
					<br />
					Работа в live-формате позволяет обучаться из любой точки мира, не
					теряя при этом связь с преподавателями, и сохраняет возможность
					задавать интересующие вопросы, обсуждать пройденный материал,
					разбирать задачи и общаться с единомышленниками. Помимо всего
					вышеперечисленного, LAPLAS предоставляет следующие услуги:
					<br /> — создание цифровых продуктов по доступным ценам: сайты и
					веб-приложения, боты, мобильные приложения, игры;
					<br /> — разработка графического дизайна для цифровой и
					полиграфической продукции:
					<br />
					дизайн интерфейсов, логотип, фирменный стиль, оформление социальных
					сетей, брендбук и др. С нами работают высококвалифицированные и
					опытные специалисты, наилучшим образом выполняющие любые виды заказов.
					Выбирай качество – выбирай LAPLAS!
				</p>
			</div>
		</Fragment>
	);
};

export { Main };
