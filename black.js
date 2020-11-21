const c = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 'TY', 'TY', 'TY', 'TY',];
function shuffle(array) {
  const copy = [...array]
  return copy.sort(() => Math.random() - 0.5);
}

let looses = 0;
let wins = 0;
let draw = 0;

const playerTarget = 15;
const casinoTarget = 17;
const winTarget = 21;

let x = 0
while (x != 10000) {
  x++;
  let cards = shuffle(c);

  let playerCards = [];
  let casinoCards = [];

  function nextCard() {
    let nextCard = cards[0];
    cards.splice(0, 1);
    return nextCard;
  }

  casinoCards.push(nextCard());
  casinoCards.push(nextCard());
  playerCards.push(nextCard());
  playerCards.push(nextCard());

  function play() {
    if (checkT(playerCards).length == 2) {
      let playerOne = [...playerCards];
      let playerEleven = [...playerCards];

      const copyOne = [...cards];
      const copyEleven = [...cards];

      while (checkT(playerOne)[0] <= playerTarget) {
        playerOne.push(copyOne[0]);
        copyOne.splice(0, 1);
      }

      while (checkT(playerEleven)[1] <= playerTarget) {
        playerEleven.push(copyEleven[0]);
        copyEleven.splice(0, 1);
      }

      playerOne = playerOne.map(x => {
        if (x === "TY") {
          return 1;
        }
        return x;
      })

      playerEleven = playerEleven.map(x => {
        if (x === "TY") {
          return 11;
        }
        return x
      })

      let sumOne = playerOne.reduce((x, y) => x + y);
      let sumEleven = playerEleven.reduce((x, y) => x + y);

      if (sumOne > winTarget && sumEleven > winTarget) {
        playerCards = [100, 100];
        cards = copyOne;
      } else if (sumOne <= winTarget && sumEleven <= winTarget) {
        if (sumOne > sumEleven) {
          playerCards = playerOne
          cards = copyOne
        } else {
          playerCards = playerEleven
          cards = copyEleven
        }
      } else if (sumOne <= winTarget && sumEleven > winTarget) {
        playerCards = playerOne;
        cards = copyOne
      } else {
        playerCards = playerEleven;
        cards = copyEleven
      }
    } else {
      if (checkT(playerCards)[0] < playerTarget) {
        playerCards.push(nextCard());
        play();
      }
    }
  }
  play();

  function playCasino() {
    if (checkT(casinoCards).length == 2) {
      let casinoOne = [...casinoCards];
      let casinoEleven = [...casinoCards];

      const copyOne = [...cards];
      const copyEleven = [...cards];

      while (checkT(casinoOne)[0] <= casinoTarget) {
        casinoOne.push(copyOne[0]);
        copyOne.splice(0, 1);
      }

      while (checkT(casinoEleven)[1] <= casinoTarget) {
        casinoEleven.push(copyEleven[0]);
        copyEleven.splice(0, 1);
      }

      casinoOne = casinoOne.map(x => {
        if (x === "TY") {
          return 1;
        }
        return x;
      })

      casinoEleven = casinoEleven.map(x => {
        if (x === "TY") {
          return 11;
        }
        return x
      })

      let sumOne = casinoOne.reduce((x, y) => x + y);
      let sumEleven = casinoEleven.reduce((x, y) => x + y);

      if (sumOne > winTarget && sumEleven > winTarget) {
        casinoCards = [100, 100];
        cards = copyOne;
      } else if (sumOne <= winTarget && sumEleven <= winTarget) {
        if (sumOne > sumEleven) {
          casinoCards = casinoOne
          cards = copyOne
        } else {
          casinoCards = casinoEleven
          cards = copyEleven
        }
      } else if (sumOne <= winTarget && sumEleven > winTarget) {
        casinoCards = casinoOne;
        cards = copyOne
      } else {
        casinoCards = casinoEleven;
        cards = copyEleven
      }
    } else {
      if (checkT(casinoCards)[0] < casinoTarget) {
        casinoCards.push(nextCard());
        playCasino();
      }
    }
  }
  playCasino();

  const playerSum = playerCards.reduce((x, y) => x + y);
  const casinoSum = casinoCards.reduce((x, y) => x + y); 

  if (playerSum > winTarget) {
    looses++;
  } else if (casinoSum > winTarget) {
    wins++;
  } else if (casinoSum > playerSum) {
    looses++;
  } else if (casinoSum < playerSum) {
    wins++;
  } else if (casinoSum === playerSum) {
    draw++;
  }
}

console.log(`Победы: ${wins}`)
console.log(`Поражения: ${looses}`)
console.log(`Ничьи: ${draw}`)


function checkT(cards) {
  let arr = [];

  if (cards.includes('TY')) {
    arr.push(sumWithOne(cards));
    arr.push(sumWithEleven(cards));
  } else {
    arr.push(sum(cards));
  }

  return arr
}

function sum(cards) {
  return cards.reduce((x, y) => x + y);
}

function sumWithOne(cards) {
  return cards.map(x => {
    if (x === 'TY') {
      return 1;
    }
    return x
  }).reduce((x, y) => x + y);
}

function sumWithEleven(cards) {
  return cards.map(x => {
    if (x === 'TY') {
      return 11;
    }
    return x
  }).reduce((x, y) => x + y);
}