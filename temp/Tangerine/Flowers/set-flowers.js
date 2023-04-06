const flowers = [
  {
		name: "Астроид",
    count: 2,
	},
	{
		name: "Хризантема сорт Сноун",
	},
	{
		name: "Хризантема сорт Бигуди",
	},
	{
		name: "Хризантема сорт Авиньон",
	},
	{
		name: "Хризантема сорт Том Перс",
	},
];

const defaultValue = {
  name: "",
  price: "30 руб / саженец",
  count: 1,
}

const table = document.querySelector("#flowers-tbody");
table.innerHTML = flowers.reduce((acc, el, i) => {
  const name = el.name || defaultValue.name;
  const price = el.price || defaultValue.price;
  const count = el.count || defaultValue.count;
  return acc + `
    <tr>
      <td>${
        Array(count).fill(0).reduce((acc2, _, j)=>{
          return acc2 + `
            <img src="assets/flower${i + 1}_${j + 1}.jpg" alt="${name}" />
          `;
        }, "")
      }</td>
      <td>${name}</td>
      <td>${price}</td>
    </tr>
  `;
}, "");
