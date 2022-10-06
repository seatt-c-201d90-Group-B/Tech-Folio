// grabbing local storage
let bioStored = JSON.parse(localStorage.getItem('userInfo')) || [];
let cardsStored = JSON.parse(localStorage.getItem('cards')) || [];

//global card display
let cardDisplay = [];

// grabbing html elements by id
let cardsList = document.getElementById('flipCardList');
let resetButton = document.getElementById('resetBtn');

// Random number function
function randNum() {
  return Math.floor(Math.random() * cardsStored.length);

}


// renders User's about me information
function rendBio() {

  let name = document.getElementById('aboutMeName');
  name.textContent = bioStored[0].name;
  let position = document.getElementById('aboutPosi');
  position.textContent = bioStored[0].position;
  let aboutMe = document.getElementById('aboutMeP');
  aboutMe.textContent = bioStored[0].aboutMe;

}


// chooses at most 6 random numbers to display different indexes of cardsstored array so that no cards are the same and are random on each load
function displayRandCardNum() {
  if (cardsStored.length >= 6 ) {
    while (cardDisplay.length < 6) {
      let numRand = randNum();
      if (!cardDisplay.includes(numRand)) {
        cardDisplay.push(numRand);
      }
    }
  } if (cardsStored.length < 6) {
    while (cardDisplay.length < cardsStored.length) {
      let numRand = randNum();
      if (!cardDisplay.includes(numRand)) {
        cardDisplay.push(numRand);
      }
    }
  }
}

// renders cards on page
function rendCard() {
  for (let i = 0; i < cardDisplay.length; i++) {
    let flipCard = document.getElementById(`${i}`);
    let cardFront = document.createElement('section');
    cardFront.className = `obj${i}Front`;
    flipCard.appendChild(cardFront);
    let cardBack = document.createElement('section');
    cardBack.className = `obj${i}Back`;
    flipCard.appendChild(cardBack);
    let h3 = document.createElement('h3');
    h3.innerText = cardsStored[cardDisplay[i]].title;
    cardFront.appendChild(h3);
    h3.className = 'title';
    li.appendChild(h3);
    let p = document.createElement('p');
    p.className = 'prjInfo';
    p.innerText = cardsStored[cardDisplay[i]].info;
    cardFront.appendChild(p);
    let div = document.createElement('div');
    div.className = 'iframeContainer';
    cardBack.appendChild(div);
    let a = document.createElement('iframe');
    a.src = cardsStored[cardDisplay[i]].link;
    a.alt = 'Project';
    div.appendChild(a);
    let b = document.createElement('a');
    b.href = cardsStored[cardDisplay[i]].link;
    b.className = 'previewLink';
    b.target = '_blank';
    b.innerText = 'Project';
    cardBack.appendChild(b);

  }
}


// completely restarts page, clears local storage and takes user back to home page
function restartAll() {
  localStorage.clear();
  location.href = 'index.html';
}
resetButton.addEventListener('click', restartAll);

//functions called on load
displayRandCardNum();
rendCard();
rendBio();
randNum();
