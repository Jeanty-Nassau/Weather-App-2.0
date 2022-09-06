import sunImage from './icons/day,sunny,clear.svg';
import Icon50d from './icons/50d.svg';

import { unixToDay, unixToTime, airQuality, weatherIcon, unixToDate, returnTemp } from './utilities';

const isCelcius = true;

const ResultsPage = ({ weatherData, pollutionData, locationData }) => {
  console.log('Inside ResultsPage');
  const resultsPage = document.createElement('div');
  resultsPage.setAttribute('id', 'resultsPage');
  const resultsTop = document.createElement('div');
  resultsTop.setAttribute('id', 'resultsTop');

  const resultsTopLeft = document.createElement('div');
  resultsTopLeft.setAttribute('id', 'resultsTopLeft');

  const resultsTopRight = document.createElement('div');
  resultsTopRight.setAttribute('id', 'resultsTopRight');

  const resultsMiddle = document.createElement('div');
  resultsMiddle.setAttribute('id', 'resultsMiddle');

  const resultsBottom = document.createElement('div');
  resultsBottom.setAttribute('id', 'resultsBottom');

  resultsTopLeft.appendChild(todayWidget(locationData[0].name, weatherData.current.feels_like, weatherData.current.weather[0].description, weatherData.current.humidity, weatherData.current.pressure, weatherData.current.wind_speed, weatherData.current.weather[0].icon));
  resultsTop.appendChild(resultsTopLeft);

  console.log(weatherData.daily[0].weather[0].description);
  resultsTopRight.appendChild(weekWidget(weatherData.daily));
  resultsTop.appendChild(resultsTopRight);

  resultsMiddle.appendChild(detailWidget(weatherData.current, weatherData.daily));

  resultsBottom.appendChild(pollutionWidget(pollutionData.list));

  resultsPage.appendChild(resultsTop);
  resultsPage.appendChild(resultsMiddle);
  resultsPage.appendChild(resultsBottom);

  return resultsPage;
}

const todayWidget = (location, feelsLike, condition, humidity, pressure, windSpeed, icon) => {
  console.log('Inside todayWidget');
  const todayWidget = document.createElement('div');
  todayWidget.setAttribute('id', 'todayWidget');

  const todayWidgetTop = document.createElement('div');
  todayWidgetTop.setAttribute('id', 'todayWidgetTop');

  todayWidgetTop.innerHTML = `<div><p>${new Date().toDateString()}</p><p>${location}</p></div>`;

  const todayWidgetMiddle = document.createElement('div');
  todayWidgetMiddle.setAttribute('id', 'todayWidgetMiddle');

  todayWidgetMiddle.innerHTML =
    `<div>
      <img src="${weatherIcon(icon)}" alt="" />
      <h2>${condition}</h2>
      <h1>${returnTemp(isCelcius, feelsLike)}</h1>
      <p>feels like</p>
    </div>`;

  const todayWidgetBottom = document.createElement('div');
  todayWidgetBottom.setAttribute('id', 'todayWidgetBottom');

  todayWidgetBottom.innerHTML =
    `<div>
    <p>${humidity}%</p>
    <p>humidity</p>
    ${progressBar(76, 100).outerHTML}
  </div>
    <div>
    <p>${pressure}hPa</p>
    <p>atmospheric pressure</p>
    ${progressBar(76, 100).outerHTML}
  </div>
    <div>
    <p>${Math.round(windSpeed * 3.6)}km/h</p>
    <p>wind speed</p>
    ${progressBar(76, 100).outerHTML}
  </div>`;

  todayWidget.appendChild(todayWidgetTop);
  todayWidget.appendChild(todayWidgetMiddle);
  todayWidget.appendChild(todayWidgetBottom);

  return todayWidget;
}

const progressBar = (amount, max) => {
  const percentage = (amount / max) * 100;

  const progressBar = document.createElement('div');
  progressBar.setAttribute('id', 'progressBar');

  const progressBarInner = document.createElement('div');
  progressBarInner.setAttribute('id', 'progressBarInner');

  progressBarInner.style = `width:${percentage}%`;

  progressBar.appendChild(progressBarInner);
  return progressBar;
}

const weekWidget = (data) => {
  const weekWidget = document.createElement('div');
  weekWidget.setAttribute('id', 'weekWidget');

  weekWidget.innerHTML = `
    <div id = "weekWidgetHeadings">
      <p>day</p>
      <p>weather</p>
      <p>temp</p>
      <p>humidity</p>
    </div>
    <div id = "weekWidgetContentContainer">
    <div class = "weekWidgetContent">
      <p class="date">${unixToDate(data[1].dt)}</p>
      <div>
        <img src="${weatherIcon(data[1].weather[0].icon)}" alt="" />
        <p>${data[1].weather[0].description}</p>
      </div>
      <p class="temp">${returnTemp(isCelcius, data[1].feels_like.day)}</p>
      <div class = "weekWidgetHumidity">
        <p>${data[1].humidity}%</p>
        ${progressBar(73, 100).outerHTML}
      </div>
    </div>

    <div class = "weekWidgetContent">
      <p class="date">${unixToDate(data[2].dt)}</p>
      <div>
        <img src="${weatherIcon(data[2].weather[0].icon)}" alt="" />
        <p>${data[2].weather[0].description}</p>
      </div>
      <p class="temp">${returnTemp(isCelcius, data[2].feels_like.day)}</p>
      <div class = "weekWidgetHumidity">
        <p>${data[2].humidity}%</p>
        ${progressBar(73, 100).outerHTML}
      </div>
    </div>

    <div class = "weekWidgetContent">
      <p class="date">${unixToDate(data[3].dt)}</p>
      <div>
        <img src="${weatherIcon(data[3].weather[0].icon)}" alt="" />
        <p>${data[3].weather[0].description}</p>
      </div>
      <p class="temp">${returnTemp(isCelcius, data[3].feels_like.day)}</p>
      <div class = "weekWidgetHumidity">
        <p>${data[3].humidity}%</p>
        ${progressBar(73, 100).outerHTML}
      </div>
    </div>

    <div class = "weekWidgetContent">
      <p class="date">${unixToDate(data[4].dt)}</p>
      <div>
        <img src="${weatherIcon(data[4].weather[0].icon)}" alt="" />
        <p>${data[4].weather[0].description}</p>
      </div>
      <p class="temp">${returnTemp(isCelcius, data[4].feels_like.day)}</p>
      <div class = "weekWidgetHumidity">
        <p>${data[4].humidity}%</p>
        ${progressBar(73, 100).outerHTML}
      </div>
    </div>
    </div>
    `;

  return weekWidget;
}

const detailWidget = (data, daily) => {
  const detailWidget = document.createElement('div');
  detailWidget.setAttribute('id', 'detailWidget');
  detailWidget.innerHTML = `<h2>Today’s detailed weather report</h2>`;

  const detailWidgetContainer = document.createElement('div');
  detailWidgetContainer.setAttribute('id', 'detailWidgetContainer');

  const detailWidgetLeft = document.createElement('div');
  detailWidgetLeft.setAttribute('id', 'detailWidgetLeft');
  detailWidgetLeft.innerHTML = `
    <img src="${weatherIcon(data.weather[0].icon)}" alt="" />
    <div>
      <div>
        <p>low</p>
        <p>${returnTemp(isCelcius, daily[0].temp.min)}</p>
      </div>
      <div>
        <p>hi</p>
        <p>${returnTemp(isCelcius, daily[0].temp.max)}</p>
      </div>
    </div>`;

  const detailWidgetRight = document.createElement('div');
  detailWidgetRight.setAttribute('id', 'detailWidgetRight');
  detailWidgetRight.innerHTML = `
    <div>
      <p>UV Index</p>
      <div>
        <p>${data.uvi}</p>
        ${progressBar(11, 100).outerHTML}
      </div>
    </div>
    <div>
      <p>atmospheric pressure</p>
      <div>
        <p>${data.pressure}hPa</p>
        ${progressBar(76, 100).outerHTML}
      </div>
    </div>
    <div>
      <p>sunrise</p>
      <div>
        <p>${unixToTime(data.sunrise)}</p>
        ${progressBar(76, 100).outerHTML}
      </div>
    </div>
    <div>
      <p>sunset</p>
      <div>
        <p>${unixToTime(data.sunset)}</p>
        ${progressBar(76, 100).outerHTML}
      </div>
    </div>
    <div>
      <p>cloudiness</p>
      <div>
        <p>${data.clouds}</p>
        ${progressBar(28, 100).outerHTML}
      </div>
    </div>
    <div>
      <p>humidity</p>
      <div>
        <p>${data.humidity}%</p>
        ${progressBar(55, 100).outerHTML}
      </div>
    </div>
    <div>
      <p>visibility</p>
      <div>
        <p>${data.visibility}</p>
        ${progressBar(45, 100).outerHTML}
      </div>
    </div>
    <div>
      <p>wind speed</p>
      <div>
        <p>${Math.round(data.wind_speed * 3.6)}km/h</p>
        ${progressBar(76, 100).outerHTML}
      </div>
    </div>`;

  detailWidgetContainer.appendChild(detailWidgetLeft);
  detailWidgetContainer.appendChild(detailWidgetRight);

  detailWidget.appendChild(detailWidgetContainer);
  return detailWidget;
}

const pollutionWidget = (data) => {
  const pollutionWidget = document.createElement('div');
  pollutionWidget.setAttribute('id', 'pollutionWidget');

  const pollutionWidgetLeft = document.createElement('div');
  pollutionWidgetLeft.setAttribute('id', 'pollutionWidgetLeft');

  const pollutionWidgetRight = document.createElement('div');
  pollutionWidgetRight.setAttribute('id', 'pollutionWidgetRight');

  pollutionWidgetLeft.innerHTML = `
    <h2>Today’s air quality</h2>
    <img src="${Icon50d}" alt="" />
    <div>
      <h3>${airQuality(data[0].main.aqi)}</h3>
      <div>
        <p>${data[0].main.aqi}</p>
        ${progressBar(4, 5).outerHTML}
      </div>
    </div>`;

  pollutionWidgetRight.innerHTML = `
    <h2>All Polutants</h2>
    <div>
    <div>
    <p>concentration of CO</p>
    <div>
      <p>${data[0].components.co}µg/m3</p>
      ${progressBar(11, 100).outerHTML}
    </div>
  </div>
  <div>
    <p>concentration of S02</p>
    <div>
      <p>${data[0].components.so2}µg/m3</p>
      ${progressBar(76, 100).outerHTML}
    </div>
  </div>
  <div>
    <p>concentration of NO</p>
    <div>
      <p>${data[0].components.no}µg/m3</p>
      ${progressBar(5.35, 24).outerHTML}
    </div>
  </div>
  <div>
    <p>concentration of PM2.5</p>
    <div>
      <p>${data[0].components.pm2_5}µg/m3</p>
      ${progressBar(28, 100).outerHTML}
    </div>
  </div>
  <div>
    <p>concentration of NO2</p>
    <div>
      <p>${data[0].components.no2}µg/m3</p>
      ${progressBar(17.5, 24).outerHTML}
    </div>
  </div>
  <div>
    <p>concentration of PM10</p>
    <div>
      <p>${data[0].components.pm10}µg/m3</p>
      ${progressBar(55, 100).outerHTML}
    </div>
  </div>
  <div>
    <p>concentration of O3</p>
    <div>
      <p>${data[0].components.o3}µg/m3</p>
      ${progressBar(45, 100).outerHTML}
    </div>
  </div>
  <div>
    <p>concentration of NH3</p>
    <div>
      <p>${data[0].components.nh3}µg/m3</p>
      ${progressBar(76, 100).outerHTML}
    </div>
  </div>
  </div>`;

  pollutionWidget.appendChild(pollutionWidgetLeft);
  pollutionWidget.appendChild(pollutionWidgetRight);

  return pollutionWidget;
}


export { ResultsPage }