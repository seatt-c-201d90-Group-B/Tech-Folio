'use strict';
// creating global variables
let userInfo = [];
let cards = [];
let formBio = document.getElementById('formBio');
let projectForm = document.getElementById('projectForm');
let cardList = document.getElementById('cardList');
let cardsStored = [];
let clearButton = document.getElementById('resetBtn');
// creating constructor for cards objects
function Bio(name, aboutMe, position) {
  this.name = name;
  this.aboutMe = aboutMe;
  this.position = position;
  userInfo.push(this);
}

function Cards(title, info, link) {
  this.title = title;
  this.info = info;
  this.link = link;
  cards.push(this);
}
// setting local storage
function loadBio() {
  const bioString = JSON.stringify(userInfo);
  localStorage.setItem('userInfo', bioString);
}
function loadCards() {
  const cardsString = JSON.stringify(cards);
  localStorage.setItem('cards', cardsString);

}
function addBio(event) {
  event.preventDefault();
  let name = document.getElementById('name').value;
  let aboutMe = document.getElementById('aboutMe').value;
  let position = document.getElementById('position').value;
  new Bio(name, aboutMe, position);
  if (userInfo.length > 1) {
    userInfo.shift();
  }
  loadBio();

}
function cardsParsed() {
  cardsStored = JSON.parse(localStorage.getItem('cards')) || [];

}


function addCard(event) {
  event.preventDefault();
  let title = document.getElementById('title').value;
  let info = document.getElementById('info').value;
  let link = document.getElementById('link').value;
  new Cards(title, info, link);
  loadCards();
  while (ul.firstChild) {
    ul.removeChild(ul.lastChild);
  }
  cardsParsed();
  renderCards();
  projectForm.reset();
}

// creating render function
function renderBio() {

}
let ul = document.createElement('ul');

cardList.appendChild(ul);
function renderCards() {
  cardsParsed();
  for (let i = 0; i < cardsStored.length; i++) {
    let li = document.createElement('li');
    ul.appendChild(li);
    let h3 = document.createElement('h3');
    h3.innerText = cardsStored[i].title;
    li.appendChild(h3);
    let deleteProject = document.createElement('p');
    deleteProject.innerText = 'X';
    deleteProject.id = i;
    li.appendChild(deleteProject);
    let p = document.createElement('p');
    p.innerText = cardsStored[i].info;
    li.appendChild(p);
    let a = document.createElement('a');
    a.href = cardsStored[i].link;
    a.innerText = 'Project';
    li.appendChild(a);
  }
}
// add remove project function
function removeProject(event) {
  if (event.target.textContent === 'X') {
    cardsStored.splice(event.target.id, 1);
    cards.splice(event.target.id, 1);
    while (ul.firstChild) {
      ul.removeChild(ul.lastChild);
    }
    localStorage.setItem('cards', JSON.stringify(cardsStored));
    renderCards();
  }
}
function restartPage() {
  localStorage.clear();
  location.href = 'index.html';
}
cardsParsed();
renderCards();


























clearButton.addEventListener('click', restartPage);
ul.addEventListener('click', removeProject);
formBio.addEventListener('submit', addBio);
projectForm.addEventListener('submit', addCard);
