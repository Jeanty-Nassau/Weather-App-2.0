class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
};

const LoadJson = async (url) => {
  const response = await fetch(url);
  if (response.status == 200) {
    const json = await response.json();
    return json;
  } else {
    throw new HttpError(response);
  }
}

const Results = async (location) => {
  // let unit;
  // if (isFahrenheit) {
  //   unit = 'imperial';
  // } else {
  //   unit = 'metric';
  // }

  const OPENWEATHER_API_TOKEN = 'b8fc5a5724435de481e04767af01ef0e';
  let weatherData, pollutionData, locationData;
  try {
    if (!OPENWEATHER_API_TOKEN) {
      throw new Error('You forgot to set the OPENWEATHER_API_TOKEN');
    }
    locationData = await LoadJson(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${OPENWEATHER_API_TOKEN}`);
    pollutionData = await LoadJson(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${locationData[0].lat}&lon=${locationData[0].lon}&appid=${OPENWEATHER_API_TOKEN}&units=metric`);
    weatherData = await LoadJson(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData[0].lat}&lon=${locationData[0].lon}&exclude=minutely,alerts&units=metric&appid=20f7632ffc2c022654e4093c6947b4f4`)
  } catch (error) {
    console.log(error);
  }
  console.log({ weatherData, pollutionData, locationData });
  return { weatherData, pollutionData, locationData };
}

export { Results }