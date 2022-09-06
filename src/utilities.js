import Icon01d from './icons/01d.svg';
import Icon01n from './icons/01n.svg';
import Icon02d from './icons/02d.svg';
import Icon02n from './icons/02n.svg';
import Icon03d from './icons/03d.svg';
import Icon03n from './icons/03n.svg';
import Icon04d from './icons/04d.svg';
import Icon04n from './icons/04n.svg';
import Icon09d from './icons/09d.svg';
import Icon09n from './icons/09n.svg';
import Icon10d from './icons/10d.svg';
import Icon10n from './icons/10n.svg';
import Icon11d from './icons/11d.svg';
import Icon11n from './icons/11n.svg';
import Icon13d from './icons/13d.svg';
import Icon13n from './icons/13n.svg';
import Icon50d from './icons/50d.svg';
import Icon50n from './icons/50n.svg';

export const returnTemp = (isCelcius, temp) => {
  if (!isCelcius) {
    return `${Math.round((temp * 9 / 5) + 32)}°F`;
  }
  else {
    return `${Math.round(temp)}°C`;
  }
};

export const unixToDate = (unix) => {
  return `${new Date(unix * 1000).toDateString()}`;
}

export const unixToDay = (unix) => {
  return `${new Date(unix * 1000).toLocaleString("en-US", { weekday: "long" })}`;
}

export const unixToTime = (unix) => {
  return `${new Date(unix * 1000).toLocaleTimeString()}`;
}

export const airQuality = (aqi) => {
  switch (aqi) {
    case 1:
      return 'Good';
      break;

    case 2:
      return 'Fair';
      break;

    case 3:
      return 'Moderate';
      break;

    case 4:
      return 'Poor';
      break;

    case 5:
      return 'Very Poor';
      break;

    default:
      break;
  }
}

export const weatherIcon = (icon) => {
  let weatherIcon;
  //night and day
  //weather condition
  switch (icon) {
    case '01d':
      weatherIcon = Icon01d;
      break;
    case '01n':
      weatherIcon = Icon01n;
      break;
    case '02d':
      weatherIcon = Icon02d;
      break;
    case '02n':
      weatherIcon = Icon02n;
      break;
    case '03d':
      weatherIcon = Icon03d;
      break;
    case '03n':
      weatherIcon = Icon03n;
      break;
    case '04d':
      weatherIcon = Icon04d;
      break;
    case '04n':
      weatherIcon = Icon04n;
      break;
    case '09d':
      weatherIcon = Icon09d;
      break;
    case '09n':
      weatherIcon = Icon09n;
      break;
    case '10d':
      weatherIcon = Icon10d;
      break;
    case '10n':
      weatherIcon = Icon10n;
      break;
    case '11d':
      weatherIcon = Icon11d;
      break;
    case '11n':
      weatherIcon = Icon11n;
      break;
    case '13d':
      weatherIcon = Icon13d;
      break;
    case '13n':
      weatherIcon = Icon13n;
      break;
    case '50d':
      weatherIcon = Icon50d;
      break;
    case '50n':
      weatherIcon = Icon50n;
      break;
    default:
      break;
  }
  return weatherIcon;
}

