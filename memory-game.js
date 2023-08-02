const deckOfCards = [
  {id: 1, imgPath: 'assets/bassoon.png'},
  {id: 2, imgPath: 'assets/cello.png'},
  {id: 3, imgPath: 'assets/clarinet.png'},
  {id: 4, imgPath: 'assets/double-bass.png'},
  {id: 5, imgPath: 'assets/flute.png'},
  {id: 6, imgPath: 'assets/french-horn.png'},
  {id: 7, imgPath: 'assets/grand-piano.png'},
  {id: 8, imgPath: 'assets/harp.png'},
  {id: 9, imgPath: 'assets/marimba.png'},
  {id: 10, imgPath: 'assets/oboe.png'},
  {id: 11, imgPath: 'assets/timpani.png'},
  {id: 12, imgPath: 'assets/triangle.png'},
  {id: 13, imgPath: 'assets/trombone.png'},
  {id: 14, imgPath: 'assets/trumpet.png'},
  {id: 15, imgPath: 'assets/violin.png'},
  {id: 16, imgPath: 'assets/xylophone.png'}
]
const cardBackImgPath = 'assets/music-notes.png'

const gameArea = document.querySelector('.game-area')
const gameDeck = []
let gameSize = 20 //may add way to change dynamically in future

createGame();

function createGame() {
  shuffle(deckOfCards);
  makeGameDeck(deckOfCards, gameSize);
  for (let i = 0; i < gameDeck.length; i++) {
    createCards(gameDeck[i].imgPath, cardBackImgPath, gameDeck[i].id)
  }
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function makeGameDeck(deck, numOfCards){
  const drawCards = deck.slice(0, numOfCards/2)
  for (let card of drawCards) {
    gameDeck.push(card)
    gameDeck.push(card)
  }
  shuffle(gameDeck)
  return gameDeck
}

function createCards(frontImgSrc, backImgSrc, instrumentId) {
  const cardElem = createElement('div')
  const cardInner = createElement('div')
  const cardFront = createElement('div')
  const cardBack = createElement('img')
  const cardImg = createElement('img')

  addClassToElement(cardElem, 'game-card')
  addClassToElement(cardInner, 'game-card-inner')
  addClassToElement(cardFront, 'front-face')
  addClassToElement(cardBack, 'back-face')
  addClassToElement(cardImg, 'card-img')

  addDataAttribute(cardElem, instrumentId)

  addImgSrc(cardImg, frontImgSrc)
  addImgSrc(cardBack, backImgSrc)

  addChildElement(cardFront, cardImg)
  addChildElement(cardInner, cardFront)
  addChildElement(cardInner, cardBack)
  addChildElement(cardElem, cardInner)
  addChildElement(gameArea, cardElem)
}

function createElement(elemType) {
  return document.createElement(elemType)
}

function addClassToElement(elem, className) {
  elem.classList.add(className)
}

function addDataAttribute(elem, instrumentId) {
  elem.setAttribute('data-instrument', instrumentId)
}

function addImgSrc(elem, src) {
  elem.src = src
}

function addChildElement(parentElem, childElem) {
  parentElem.append(childElem)
}

const cards = document.querySelectorAll('.game-card')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.firstChild.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  hasFlippedCard = false;
  secondCard = this;

  checkCardsForMatch();
}

function checkCardsForMatch() {
  let isMatch = firstCard.dataset.instrument === secondCard.dataset.instrument

  isMatch ? disableMatchedCards() : unFlipCards();
}

function disableMatchedCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  firstCard.classList.add('match')
  secondCard.classList.add('match')

  resetEvents();
}

function unFlipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.firstChild.classList.remove('flipped');
    secondCard.firstChild.classList.remove('flipped');

    resetEvents();
  }, 1000);
}

function resetEvents() {
  lockBoard = false;
  hasFlippedCard = false;
  firstCard = null;
  secondCard = null;
}

cards.forEach(card => card.addEventListener('click', flipCard))