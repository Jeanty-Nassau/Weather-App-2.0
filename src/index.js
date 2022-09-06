import './stylesheets/index.css';
import './stylesheets/welcomePage.css';
import './stylesheets/resultsPage.css';
import './stylesheets/todayWidget.css';
import './stylesheets/weekWidget.css';
import './stylesheets/detailWidget.css';
import './stylesheets/pollutionWidget.css';


import { WelcomePage } from './welcomePage';
import { Results } from './Results';
import { ResultsPage } from './resultsPage';

const Nav = () => {
  const nav = document.createElement('nav');

  const logo = document.createElement('div');
  logo.setAttribute('id', 'logo');
  const logoText = document.createElement('h1');
  logoText.innerText = 'WEATHER';
  logo.innerHTML = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="24" cy="24" r="23.5" stroke="black"/>
  <path d="M14.2832 44.2197H15.3086L23.2432 12.6035C23.3408 12.2129 23.4548 11.7246 23.585 11.1387C23.7152 10.5527 23.8291 10.0156 23.9268 9.52734H24C24.0814 10.0156 24.1872 10.5527 24.3174 11.1387C24.4639 11.7246 24.5859 12.2129 24.6836 12.6035L32.6914 44.2197H33.7168L42.2373 8.45312H41.1875L33.9121 40.1426C33.8145 40.5332 33.7249 40.9157 33.6436 41.29C33.5622 41.6481 33.4645 42.0957 33.3506 42.6328H33.2529C33.1227 42.0957 33.0169 41.6481 32.9355 41.29C32.8542 40.9157 32.7565 40.5413 32.6426 40.167L24.6836 8.45312H23.3896L15.4307 40.1914C15.333 40.5495 15.2435 40.9157 15.1621 41.29C15.0807 41.6481 14.9831 42.0957 14.8691 42.6328H14.7959C14.6657 42.0957 14.5518 41.6481 14.4541 41.29C14.3727 40.9157 14.2913 40.5495 14.21 40.1914L6.88574 8.45312H5.7627L14.2832 44.2197Z" fill="black"/>
  <line x1="2" y1="31.5" x2="46" y2="31.5" stroke="black"/>
  </svg>`;
  logo.appendChild(logoText);

  const searchBar = document.createElement('div');
  searchBar.setAttribute('id', 'searchBar');
  const searchInput = document.createElement('input');
  searchInput.setAttribute('id', 'searchInput');
  searchInput.setAttribute('placeholder', 'Search for a city...');
  searchBar.innerHTML = `<button><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_117_263" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
  <rect width="24" height="24" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_117_263)">
  <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.371 4.888 14.113C3.62933 12.8543 3 11.3167 3 9.5C3 7.68333 3.62933 6.14567 4.888 4.887C6.146 3.629 7.68333 3 9.5 3C11.3167 3 12.8543 3.629 14.113 4.887C15.371 6.14567 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5627 11.8127 14 10.75 14 9.5C14 8.25 13.5627 7.18733 12.688 6.312C11.8127 5.43733 10.75 5 9.5 5C8.25 5 7.18733 5.43733 6.312 6.312C5.43733 7.18733 5 8.25 5 9.5C5 10.75 5.43733 11.8127 6.312 12.688C7.18733 13.5627 8.25 14 9.5 14Z" fill="#1C1B1F"/>
  </g>
  </svg></button>`;
  searchBar.insertBefore(searchInput, searchBar.firstChild);

  const toggleButton = document.createElement('div');
  toggleButton.setAttribute('id', 'toggleButton');
  const celciusText = document.createElement('h3');
  celciusText.innerText = '˚C';
  const fahrenheitText = document.createElement('h3');
  fahrenheitText.innerText = '˚F';
  const toggle = document.createElement('div');
  toggle.setAttribute('id', 'toggle');
  toggleButton.appendChild(toggle);
  toggleButton.appendChild(celciusText);
  toggleButton.appendChild(fahrenheitText);

  nav.appendChild(logo);
  nav.appendChild(searchBar);
  nav.appendChild(toggleButton);

  toggleButton.addEventListener('click', () => {
    if (toggle.classList.contains('fahrenheit')) {
      toggle.classList.remove('fahrenheit');
    } else {
      toggle.classList.add('fahrenheit');
    }
  });

  searchBar.lastChild.onclick = (e) => {
    if (searchInput.value !== '') {
      let location = searchInput.value;
      document.querySelector('#searchBar').style = 'display:flex';
      console.log(document.querySelector('#searchBar').classList.contains('active'));
      document.querySelector('#content').innerHTML = '';
      Results(location).then((response) => {
        document.querySelector('#content').appendChild(ResultsPage(response));
      }).catch(() => {
        console.log('anonumous function failure');
      });
    }
  };

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      // alert('enter clicked');
      console.log(e.key);
      searchBar.lastChild.click();
    }
  })
  return nav;
}
document.body.appendChild(Nav());

window.onload = () => {
  document.querySelector('#content').appendChild(WelcomePage());

};





