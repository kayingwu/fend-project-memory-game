/*
References: Udacity, W3Schools, MDN web docs, Slack
Udacity, W3Schools, MDN web docs, Slack
Former Udacity Content Developer, Mike Wales : https://www.youtube.com/watch?v=_rUH-sEs68Y
Project Coach, Ryan Waite : https://www.youtube.com/watch?v=oECVwum-7Zc
*/

/*
 * Create a list that holds all of your cards
 */

var cards = ['fa-diamond','fa-diamond',
              'fa-paper-plane-o','fa-paper-plane-o',
              'fa-anchor','fa-anchor',
              'fa-bolt','fa-bolt',
              'fa-cube','fa-cube',
              'fa-leaf','fa-leaf',
              'fa-bicycle','fa-bicycle',
              'fa-bomb','fa-bomb'];

// Template card
function generateCard(card) {
  return `<li class="card" data-card="${card}">
            <i class="fa ${card}"></i>
          </li>`;
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Set up game
 function initGame() {
   var deck = document.querySelector('.deck');
   var moveCounter = document.getElementById('moves');

   var cardHTML = shuffle(cards).map(function(card) {
     return generateCard(card);
   });

   moves = 0;
   moveCounter.innerText = moves;

   deck.innerHTML = cardHTML.join('');

 }

 initGame()

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



var openCards = [];
var moves = 0;
var match = 0;
var time = 0;
var timer;
var moveCounter = document.getElementById('moves');
var timeCounter = document.getElementById('timer');
var modal = document.getElementById('modal');
var close = document.getElementsByClassName('close')[0];



// Timer
function setTimer() {
  timer = setInterval(function() {
  time++;
  timeCounter.innerText = time;
  },1000);
}

function stopTimer() {
  clearInterval(timer);
}

var deck = document.querySelector('ul.deck');
deck.addEventListener('click', function() {
  if (!timer){
    setTimer();
  }
})

// Star rating
var numOfStart = 3;
var allStars = [...document.querySelectorAll('li > i.fa-star')];

function starRate(){

    if (moves === 12) {
      numOfStart --;
      allStars[0].classList.remove('fa-star');

    } else if (moves === 24) {
      numOfStart --;
      allStars[1].classList.remove('fa-star');

    }
}

function refillStar() {
  allStars[0].classList.add('fa-star');
  allStars[1].classList.add('fa-star');
}

// Congratulations Popup
function endGame() {
  var result = `<p>You won the game in ${time} seconds and ${numOfStart} star(s)</p>`;
  var addResult = document.querySelector('.modal-in > p');
  modal.style.display = 'block';
  addResult.insertAdjacentHTML('afterend',result);

  close.onclick = (function() {
    modal.style.display = 'none';
  })
}

// Card matching
function matchCard() {
  match += 2;
  openCards[0].classList.add('match');
  openCards[0].classList.remove('open','show');
  openCards[1].classList.add('match');
  openCards[1].classList.remove('open','show');
  openCards = [];

  if (match === 16) {
    stopTimer();
    endGame();
  }
}




//Game Logic
function gameLogic() {
  var allCards = document.querySelectorAll('.card');

  allCards.forEach(function(card){
    card.addEventListener('click',function(event) {

      if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match'))
        openCards.push(card);
        card.classList.add('open','show');

        if (openCards.length === 2) {
          if (openCards[0].dataset.card == openCards[1].dataset.card){
            matchCard();

          } else {

            //if no match, hide
            setTimeout(function() {
              openCards.forEach(function(card) {
                card.classList.remove('open','show');
              });

              openCards = [];
            },500);
          }
          moves += 1;
          moveCounter.innerText = moves;

          starRate();
        }
    });
});
}

gameLogic()

function reset(){
  initGame();

  stopTimer();
  setTimer();
  time = 0;

  timeCounter.innerText = time;

  while (numOfStart < 3) {
    refillStar();
    numOfStart++;
  }
  gameLogic();
  match = 0;

}
