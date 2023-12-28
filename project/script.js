const div = document.getElementById("divWeNeed");


// Получение данных с сервера. 
// Обратите внимание, обработка данных происходит в 2 этапа:

// 1) Мы используем .then для обработки promise, который принимает ответ от запроса
// Обратите внимание: несмотря на то, что метод назван json(), 
// результатом является не JSON, а результат приема JSON в качестве входных данных и его анализа 
// для создания объекта JavaScript.

// 2) Мы обрабатываем объект JavaScript, 
// который получили в результате преобразования JSON объекта
// и передаем его в функцию, где мы уже можем с этими данными работать

const getJsonData = () => {
  fetch("http://localhost:3000/users", {
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data, 'Это нам пришло с БД'), processData(data);
    })
    .catch((error) => console.error("ошибка запроса:", error))
    .finally(console.log("Сработал запрос на сервер"));
};
//Вызываем функцию => отправляем запрос
getJsonData();


//Функция для обработки полученных данных, которую мы передаем в .then для fetch в функции getJsonData
function processData(massivDannyh) {
  for (let i = 0; i < massivDannyh.length; i++) {
    const newElementPerIteration = document.createElement("div");
    newElementPerIteration.innerHTML = `<div class='personCard'> <h1>${massivDannyh[i].name}</h1>
        <h2>${massivDannyh[i].email}</h2>
        <h3>${massivDannyh[i].number}</h3>
        <button id='like' data-id=${massivDannyh[i].id}>Узнай мой id в консоли</button> </div>`;
    newElementPerIteration.addEventListener("click", clickFunc);
    div.appendChild(newElementPerIteration);
  }
}



// Простой GET запрос (БЕЗ JSON-SERVER)
// const getData2 =() => {
//     fetch('https://jsonplaceholder.typicode.com/users',{
//         method:'GET'
//     })
//     .then((res)=>res.json())
//     .then((yt)=> console.log(yt))
// }
// getData2()


//POST Запрос на добавление элемента

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dataForPost = {
    name: `${e.target.name.value}`,
    email: `${e.target.email.value}`,
    number: `${e.target.number.value}`
  }

    fetch(`http://localhost:3000/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForPost),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res, "Ответ сервера на POST запрос");
      createElement(res);
    });
});

//Функция, которая выполняется при клике на кнопку
function clickFunc(e){
  console.log("Это id записи этих данных в БД:", e.target.dataset.id);
};

//Функция для создания элементов на основе ответа POST запроса
function createElement(data){
  const newElement = document.createElement("div");
  newElement.innerHTML = `<div class='personCard'> <h1>${data.name}</h1>
  <h2>${data.email}</h2>
  <h3>${data.number}</h3>
  <button id='like' data-id=${data.id}>Узнай мой id в консоли</button> </div>`;
  newElement.addEventListener("click", clickFunc);
  div.appendChild(newElement);
  form.reset();
};
