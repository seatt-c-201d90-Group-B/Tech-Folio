// grabbing local storage
let bioStored = JSON.parse(localStorage.getItem('userInfo')) || [];
let cardsStored = JSON.parse(localStorage.getItem('cards')) || [];

let cardsList = document.getElementById('flipCardList');
let resetButton = document.getElementById('resetBtn');
let cardDisplay = [];
function randNum() {
  return Math.floor(Math.random() * cardsStored.length);

}
randNum();
function rendBio() {
  let names = document.getElementById('aboutMeName');
  names.textContent = bioStored[0].name;
  names.className = 'previewName';
  let positions = document.getElementById('aboutPosi');
  positions.textContent = bioStored[0].position;
  positions.className = 'previewPos';
  let aboutMes = document.getElementById('aboutMeP');
  aboutMes.textContent = bioStored[0].aboutMe;
  aboutMes.className = 'previewAbout';
}
rendBio();
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
displayRandCardNum();
function rendCard(){
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
rendCard();
function restartAll(){
  localStorage.clear();
  location.href='index.html';
}
resetButton.addEventListener('click', restartAll);
