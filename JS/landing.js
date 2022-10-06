'use strict';

// creating global variables
let userInfo = [];
let cardsStored = [];

// Getting html elements by id
let formBio = document.getElementById('formBio');
let projectForm = document.getElementById('projectForm');
let cardList = document.getElementById('cardList');
let clearButton = document.getElementById('resetBtn');
let ul = document.createElement('ul');
cardList.appendChild(ul);

// *****Constructor functions*******

// userinfo constructor
function Bio(name, aboutMe, position) {
  this.name = name;
  this.aboutMe = aboutMe;
  this.position = position;
  userInfo.push(this);
}

//card constructor
function Cards(title, info, link) {
  this.title = title;
  this.info = info;
  this.link = link;
  cardsStored.push(this);
}

// **** setting local storage ****
function loadBio() {
  const bioString = JSON.stringify(userInfo);
  localStorage.setItem('userInfo', bioString);
}

function loadCards() {
  localStorage.setItem('cards', JSON.stringify(cardsStored));
}


// adds userinfo to local storage and removes any old userinfo
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

// function reloadBio(){
//   let names = document.getElementById('name').value;
//   let aboutMe = document.getElementById('aboutMe').value;
//   let position = document.getElementById('position').value;
//   if(names === ''){
//     let userStored = JSON.parse(localStorage.getItem('userInfo')) || [];
//     names.value = userStored[0].name;
//     aboutMe.value = userStored[0].aboutMe;
//     position.value = userStored[0].position;

//   }
// }
// reloadBio();
// updates cardsStored array when items are added or removed
function cardsParsed() {
  cardsStored = JSON.parse(localStorage.getItem('cards')) || [];

}

// grabs form information and goes through the constructor function
// removes all child elements from ul and then rerenders them
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

// **** creating render functions ****

// renders bio preview
// function renderBio() {
//   let name = document.getElementById('aboutMeName');
//   name.textContent = userInfo[0].name;
//   let position = document.getElementById('aboutPosi');
//   position.textContent = userInfo[0].position;
//   let aboutMe = document.getElementById('aboutMeP');
//   aboutMe.textContent = userInfo[0].aboutMe;
// }

// renders all cards and creates separate li elements for each
function renderCards() {
  cardsParsed();
  for (let i = 0; i < cardsStored.length; i++) {
    let li = document.createElement('li');
    ul.appendChild(li);
    let div = document.createElement('div');
    div.id = 'xdiv';
    li.appendChild(div);
    let deleteProject = document.createElement('p');
    deleteProject.innerText = 'X';
    deleteProject.id = i;
    deleteProject.className = 'x';
    div.appendChild(deleteProject);
    let h3 = document.createElement('h3');
    h3.innerText = cardsStored[i].title;
    h3.className = 'title';
    li.appendChild(h3);
    let p = document.createElement('p');
    p.innerText = cardsStored[i].info;
    p.className = 'cardinfo';
    li.appendChild(p);
    let a = document.createElement('a');
    a.href = cardsStored[i].link;
    a.className = 'link';
    a.target = '_blank';
    a.innerText = 'Project';
    li.appendChild(a);
  }
}

// add remove project function
function removeProject(event) {
  if (event.target.textContent === 'X') {
    cardsStored.splice(event.target.id, 1);
    while (ul.firstChild) {
      ul.removeChild(ul.lastChild);
    }
    localStorage.setItem('cards', JSON.stringify(cardsStored));
    renderCards();
  }
}

// allows user to completely restart page and clear local storage
function restartPage() {
  localStorage.clear();
  location.href = 'index.html';
}

//functions called on load
cardsParsed();
renderCards();


























clearButton.addEventListener('click', restartPage);
ul.addEventListener('click', removeProject);
formBio.addEventListener('submit', addBio);
projectForm.addEventListener('submit', addCard);
