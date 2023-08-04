gsap.fromTo('#input', {y: -100, opacity: 0}, {y: 0, duration: 1.5, delay: .5, ease: 'power1', opacity: 1})



const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "721c6b6729d8505ad81f602f1d128c33"
}

const geoKey = "eba0023fc0d748a59e39d9ddc236b8e5";

const input = document.querySelector('#input');
input.addEventListener('keydown', enter);

function enter(e) {
    if (e.keyCode === 13) {
        getInfo(input.value)
    
    }
}

async function getGeoLocation() {
    const geoLocRes = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${geoKey}`);
    const geoLocResult = await geoLocRes.json();
    getInfo(geoLocResult.city);
}

getGeoLocation()

async function getInfo(data) {
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appid=${api.key}`);
    const result = await res.json();
    resultReceived(result);
}
function resultReceived(result) {
    let city = document.querySelector('#city');
    city.textContent = `${result.name}, ${result.sys.country}`;
    getOurDate();
    let temperature = document.querySelector('#temperature');
    temperature.innerHTML = `${Math.round(result.main.temp)}<span>°C</span>`;
    let feelsLike = document.querySelector('#feelsLike');
    feelsLike.innerHTML = 'Feels like: ' + `${Math.round(result.main.feels_like)}<span>°</span>`;
    let conditions = document.querySelector('#conditions');
    conditions.innerHTML = `${result.weather[0].main}`;
    let variation = document.querySelector('#variation');
    variation.innerHTML = "Min: " + `${Math.round(result.main.temp_min)}<span>°</span>` + " " + "Max: " + `${Math.round(result.main.temp_max)}<span>°</span>`;

}

function getOurDate() {
    const myDate = new Date;
    let date = document.querySelector('#date');
    const myMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const myDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekday = myDay[myDate.getDay()];
    let dates = myDate.getDate();
    let month = myMonth[myDate.getMonth()];
    let year = myDate.getFullYear();
    date.innerHTML = `${weekday}` + " " + `${dates}` + " " + `${month}` + " " + `${year}`;
}
