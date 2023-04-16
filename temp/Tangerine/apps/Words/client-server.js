const API_KEY = "AIzaSyDe3IdIU1SyDXLBCtocMHJVo2ytdRd04Rc";
const SPREADSHEET_ID = "1YnfrcmOgEfbcRZe5OZUENYq5kMWxjT13xSosvq-Zbe8";

const fetchGoogleSheetData = async (range) => {
	const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		if (response.ok) {
			// console.log(data);
			return data;
		} else {
			console.error(`Ошибка: ${data.error.message}`);
		}
	} catch (error) {
		console.error("Ошибка при выполнении запроса:", error);
	}
};

// arg: [["ru", "en"]]
// res: [{ru: "ru", en: "en"}]
function translator(data) {
	return data
		.map((el, i) => {
			return {
				ru: el[2] || el[1],
				en: el[0],
				key: i,
			};
		})
		.filter((el) => !!el.ru && !!el.en);
}

async function getWords() {
	const RANGE = "Words!A3:C1000";
	const data = await fetchGoogleSheetData(RANGE);
	return translator(shuffle(data.values));
}
