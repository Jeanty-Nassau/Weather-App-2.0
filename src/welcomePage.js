import { Results } from "./Results";
import { ResultsPage } from "./resultsPage";

const WelcomePage = () => {
	const welcomePage = document.createElement("div");
	welcomePage.setAttribute("id", "welcomePage");

	const welcomeTitle = document.createElement("h1");
	welcomeTitle.setAttribute("id", "welcomeTitle");
	welcomeTitle.innerText =
		"Welcome to your favorite weather forecasting website";

	const searchCTA = document.createElement("div");
	searchCTA.setAttribute("id", "searchCTA");
	const searchCTAInput = document.createElement("input");
	searchCTAInput.setAttribute("id", "searchCTAInput");
	searchCTAInput.setAttribute("placeholder", "Search for a city...");
	searchCTA.innerHTML = `<button><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_117_263" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
  <rect width="24" height="24" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_117_263)">
  <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.371 4.888 14.113C3.62933 12.8543 3 11.3167 3 9.5C3 7.68333 3.62933 6.14567 4.888 4.887C6.146 3.629 7.68333 3 9.5 3C11.3167 3 12.8543 3.629 14.113 4.887C15.371 6.14567 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5627 11.8127 14 10.75 14 9.5C14 8.25 13.5627 7.18733 12.688 6.312C11.8127 5.43733 10.75 5 9.5 5C8.25 5 7.18733 5.43733 6.312 6.312C5.43733 7.18733 5 8.25 5 9.5C5 10.75 5.43733 11.8127 6.312 12.688C7.18733 13.5627 8.25 14 9.5 14Z" fill="#1C1B1F"/>
  </g>
  </svg></button>`;
	searchCTA.insertBefore(searchCTAInput, searchCTA.firstChild);

	welcomePage.appendChild(welcomeTitle);
	welcomePage.appendChild(searchCTA);

	searchCTA.lastChild.onclick = (e) => {
		if (searchCTAInput.value !== "") {
			let location = searchCTAInput.value;
			document.querySelector("#searchBar").style = "display:flex";
			console.log(
				document.querySelector("#searchBar").classList.contains("active")
			);
			document.querySelector("#content").innerHTML = "";
			Results(location)
				.then((response) => {
					document.querySelector("#content").appendChild(ResultsPage(response));
				})
				.catch(() => {
					console.log("anonumous function failure");
				});
		}
	};

	searchCTAInput.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			// alert('enter clicked');
			console.log(e.key);
			searchCTA.lastChild.click();
		}
	});

	return welcomePage;
};

export { WelcomePage };
