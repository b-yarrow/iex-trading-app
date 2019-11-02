// Comment Object prototype, to make adding new objects easier
function commentObj(name, comment, id, likes, timestamp) {
    this.name = name;
    this.comment = comment;
    this.id = id;
    this.likes = likes;
    this.timestamp = timestamp;
}

//Array of the IEX data
iexArray = [];
iexArrayFiltered = [];

/**
 * displayComment builds a new comment block, creates all needed html element, assigns classes
 * and appends them together.
 * @param {*} entry - a comment object
 */
function displayCompany(entry) {
    //create comment structure
    var head = document.getElementsByClassName('card-box')[0];
    var card = document.createElement('card');
    var companySymbol = document.createElement('span');
    var companyProperties = document.createElement('ul');
    var companyName = document.createElement('li');
    var companyDate = document.createElement('li');
    // var name = document.createElement('h2');
    // var date = document.createElement('h5');
    // var comment = document.createElement('p');


    //assign classes
    card.setAttribute('class', 'card card__background--blank');
    companySymbol.setAttribute('class', 'card__title');
    companyProperties.setAttribute('class', 'card__list');
    companyName.setAttribute('class', 'card__list-item');
    companyDate.setAttribute('class', 'card__list-item');
    // header.setAttribute('class', 'card__header');
    // name.setAttribute('class', 'conversation__name');
    // date.setAttribute('class', 'conversation__date');
    // comment.setAttribute('class', 'conversation__comment');

    //add content
    companyName.innerHTML = entry.name || "no company name";
    companySymbol.innerHTML = entry.symbol;
    companyDate.innerHTML = entry.date;


    //append together
    companyProperties.appendChild(companyName);
    companyProperties.appendChild(companyDate);

    card.appendChild(companySymbol);
    card.appendChild(companyProperties);

    head.appendChild(card);
}

function compareSymbols(a, b) {
    const symbolA = a.symbol;
    const symbolB = b.symbol

    let comparison = 0;
    if (symbolA > symbolB) {
        comparison = 1;
    } else if (symbolA < symbolB) {
        comparison = -1;
    }
    return comparison;
}
var companies;
var symbolList = [];
var compList = [];

// companies = document.getElementById("1234").children.;

// Builds comments on initial page load
axios.get('https://api.iextrading.com/1.0/ref-data/symbols').then(response => {
    iexArray = response.data;
    let rand;

    for (let i = 0; i < 100; i++) {
        rand = Math.floor((Math.random() * (iexArray.length - 1)) + 1);
        console.log(rand);
        iexArrayFiltered.push(iexArray.splice(rand, 1)[0]);
    }
    iexArrayFiltered.sort(compareSymbols);

    for (let i = 0; i < iexArrayFiltered.length; i++) {
        displayCompany(iexArrayFiltered[i]);
    }
    companies = document.getElementsByClassName('card card__background--blank');
    for (var i = 0; i < companies.length; i++) {
        var sym = companies[i].firstChild.innerHTML;
        symbolList.push(sym);
    }

    for (var i = 0; i < companies.length; i++) {
        var comp = companies[i].lastChild.firstChild.innerHTML;
        compList.push(comp);
    }
});

var searchBar = document.getElementById('search-bar');
searchBar.addEventListener('keyup', function (event) {
    var text = searchBar.value.toUpperCase();

    // for (var i = 0; i < companies.length; i++) {
    //     if (symbolList[i].indexOf(text) < 0) {
    //         companies[i].style.display = 'None';
    //     } else {
    //         companies[i].style.display = 'Block';
    //     }
    // }

    for (var i = 0; i < companies.length; i++) {
        if (compList[i].indexOf(text) < 0) {
            companies[i].style.display = 'None';
        } else {
            companies[i].style.display = 'Block';
        }
    }

});










