//References: Udacity, W3Schools, MDN web docs
//References: Former Udacity Content Developer, Mike Wales : https://www.youtube.com/watch?v=_rUH-sEs68Y

/*
 * Create a list that holds all of your cards
 */

const cards = ['fa-diamond','fa-diamond',
              'fa-paper-plane-o','fa-paper-plane-o',
              'fa-anchor','fa-anchor',
              'fa-bolt','fa-bolt',
              'fa-cube','fa-cube',
              'fa-leaf','fa-leaf',
              'fa-bicycle','fa-bicycle',
              'fa-bomb','fa-bomb'];

//Template card
function generateCard(card){
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
//Restart game
const restart = document.querySelector('.restart');
restart.addEventListener('click',function(event){


  allStars[0].classList.add('fa-star');
  allStars[1].classList.add('fa-star');
  initGame();
})


//Set up game
 function initGame(){
   const deck = document.querySelector('.deck');
   const moveCounter = document.getElementById('moves');

   const cardHTML = shuffle(cards).map(function(card){
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

const allCards = document.querySelectorAll('.card');
let openCards = [];
var moves = 0;
let match = 0;
let time = 0;
const moveCounter = document.getElementById('moves');
const timeCounter = document.getElementById('timer');
const modal = document.getElementById('modal');
const close = document.getElementsByClassName('close')[0];


let timeId = 0;
//Timer
function timeInter(){
  timeId = setInterval(times, 1000);
}

function times(){
  time += 1;
  timeCounter.innerText = time;
}

function stopTimer(){
  clearInterval(timeId);
}

//Star rating
const allStars = [...document.querySelectorAll('li > i.fa-star')];
function starRate(){

    if (moves == 12) {
      allStars[0].classList.remove('fa-star');
      allStars.splice(0,1);

    } else if (moves == 24) {
      allStars[0].classList.remove('fa-star');
      allStars.splice(0,1);

    } else {
      allStars.splice(0,0);
    }
}


//Congratulations Popup
function endGame(){
  const result = `<p>You win the game in ${time} seconds and ${allStars.length} star(s)</p>`;
  const addResult = document.querySelector('.modal-in > p');
  modal.style.display = 'block';
  addResult.insertAdjacentHTML('afterend',result);

  close.onclick = (function(){
    modal.style.display = 'none';
  })
}

//Card matching
function matchCard(){
  match += 2;
  openCards[0].classList.add('match');
  openCards[0].classList.remove('open','show');
  openCards[1].classList.add('match');
  openCards[1].classList.remove('open','show');
  openCards = [];
}

//Game Logic
  allCards.forEach(function(card){
    card.addEventListener('click',function(event){

      if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match'))
        openCards.push(card);
        card.classList.add('open','show');


        if (openCards.length == 2){
          if (openCards[0].dataset.card == openCards[1].dataset.card){
            matchCard();

            if (match == cards.length){
              stopTimer();
              endGame();

            }
          } else {

            //if no match, hide
            setTimeout(function(){
              openCards.forEach(function(card){
                card.classList.remove('open','show');
              });

              openCards = [];
            },500);
          }
          moves += 1;
          moveCounter.innerText = moves;
          timeInter();
          starRate();
        }
    });
});
