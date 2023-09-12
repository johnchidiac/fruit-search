const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const search = (match, inputVal) => {
	const listItem = document.createElement('li');
	const regexString = `(.*)(${inputVal})(.*)`;
	const regex = RegExp(regexString, 'gi');
	const [str, prefix, matchedStr, suffix] = regex.exec(match);

	if (prefix) {
		listItem.innerHTML = `${prefix}<b>${matchedStr}</b>${suffix}`;
	} else {
		listItem.innerHTML = `<b>${matchedStr}</b>${suffix}`;
	}
	return listItem;
}

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];


function searchHandler(e) {
	showSuggestions(input.value);
}

function highlightResult(e) {
	if (e.target === e.currentTarget) {
		e.target.classList.add('hover');
	} else {
		e.target.parentElement.classList.add('hover');
	}
}

function clearHighlights() {
	suggestions.querySelectorAll('li').forEach((element) => {element.classList.remove('hover')});
}

function useSuggestion(e) {
	const isBoldTag = e.target.tagName === 'B';
	input.value = (isBoldTag) ? e.target.parentElement.innerText : selectionText = e.target.innerText;
}

function showSuggestions(inputVal) {
	let maxResults = 5;
	let count = 0;
	if (inputVal.length > 0) {
		const htmlListItems = fruit
			.filter((type) => {
				return type.toLowerCase().includes(inputVal);
			})
			.filter((type) => {
				if (count < maxResults) {
					count++;
					return type;
				}
			})
			.map((match) => {
				return search(match, inputVal);
			});
		suggestions.replaceChildren(...htmlListItems);
		htmlListItems.map((listItem) => {
			listItem.addEventListener('mouseover', highlightResult);
			listItem.addEventListener('mouseout', clearHighlights);
			listItem.addEventListener('click', useSuggestion);
		});
	} else {
		suggestions.replaceChildren('');
	}
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);
