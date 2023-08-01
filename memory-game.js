/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    // missing code here ...
    const card = document.createElement('div');
    card.classList.add(color);
    card.addEventListener('click', handleCardClick);
    gameBoard.append(card);
  }
  return gameBoard;
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  card.classList.add('flip');
}

/** Flip a card face-down. */

function unFlipCard(card1, card2) {
  // ... you need to write this ...
  lockBoard = true;
  setTimeout(() => {
    card1.classList.remove('flip');
    card2.classList.remove('flip');
    lockBoard = false;
  }, FOUND_MATCH_WAIT_MSECS);
}

/** Handle clicking on a card: this could be first-card or second-card. */

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function handleCardClick(evt) {
  // ... you need to write this ...
  if (lockBoard) return; //prevent spam clicks, returns function until cards are unflipped
  if (evt.target === firstCard) return; //prevent clicking on same card twice
  flipCard(evt.target)

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = evt.target;
  } else {
    hasFlippedCard = false;
    secondCard = evt.target;
    if (firstCard.className === secondCard.className) {
      console.log('You found a match');
      firstCard.removeEventListener('click', handleCardClick);
      secondCard.removeEventListener('click', handleCardClick);
    } else {
      unFlipCard(firstCard, secondCard);
    }
  }
}