'use strict';
// creating global variables
let userInfo = [];
let cards = [];
let formBio = document.getElementById('formBio');
let projectForm = document.getElementById('projectForm');


// creating constructor for cards objects
function Bio(name, aboutMe, position){
  this.name = name;
  this.aboutMe = aboutMe;
  this.position = position;
  userInfo.push(this);
}

function Cards(title, info, link){
  this.title = title;
  this.info = info;
  this.link = link;
  cards.push(this);
}
function loadBio(){
  const bioString = JSON.stringify(userInfo);
  localStorage.setItem('userInfo', bioString);
}
function loadCards(){
  const cardsString = JSON.stringify(cards);
  localStorage.setItem('cards', cardsString);
}
function addBio(){
  let name = document.getElementById('name').value;
  let aboutMe = document.getElementById('aboutMe').value;
  let position = document.getElementById('position').value;
  new Bio(name, aboutMe, position);
  loadBio();
  // if(userInfo.length !== 0){
  //   formBio.removeEventListener('submit', addBio);
  // }
}
function addCard(event){
  event.preventDefault();
  let title = document.getElementById('title').value;
  let info = document.getElementById('info').value;
  let link = document.getElementById('link').value;
  new Cards(title, info, link);
  loadCards();
  projectForm.reset();
}
formBio.addEventListener('submit' , addBio);
projectForm.addEventListener('submit', addCard);
