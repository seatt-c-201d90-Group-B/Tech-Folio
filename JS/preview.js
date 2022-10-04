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
  let name = document.getElementById('aboutMeName');
  name.textContent = bioStored[0].name;
  let position = document.getElementById('aboutPosi');
  position.textContent = bioStored[0].position;
  let aboutMe = document.getElementById('aboutMeP');
  aboutMe.textContent = bioStored[0].aboutMe;
}
rendBio();
function displayRandCardNum() {
  if (cardsStored.length > 6) {
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
    let li = document.createElement('li');
    cardsList.appendChild(li);
    let h3 = document.createElement('h3');
    h3.innerText = cardsStored[cardDisplay[i]].title;
    li.appendChild(h3);
    let p = document.createElement('p');
    p.innerText = cardsStored[cardDisplay[i]].info;
    li.appendChild(p);
    let a = document.createElement('a');
    a.href = cardsStored[cardDisplay[i]].link;
    a.innerText = 'Project';
    li.appendChild(a);
  }
}
rendCard();
function restartAll(){
  localStorage.clear();
  location.href='index.html';
}
resetButton.addEventListener('click', restartAll);
