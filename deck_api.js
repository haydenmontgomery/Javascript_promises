function get(url) {
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      request.onload = function () {
        if (request.readyState !== 4) return;

        // Check status code
        if (request.status >= 200 && request.status < 300) {
          resolve({
            data: JSON.parse(request.response),
            status: request.status,
            request: request,
          })
        } else {
          reject({
            msg: 'Server Error',
            status: request.status,
            request: request
          })
        }
      }
      request.onerror = function handleError() {
        reject({
          msg: 'NETWORK ERROR!'
        })
      };
      request.open('GET', url);
      request.send();
    })
}
let div = document.getElementById('cards')


get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(res => {
      console.log(res.data);
      let deck_id = res.data.deck_id
      return get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    })
    .then(res => {
      console.log(res.data)
      let deck_id = res.data.deck_id
      console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
      return get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    })
    .then(res => {
      console.log(res.data)
      console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
    })
    .catch(err => console.log(err))
    
let newDeck = true

let deck = ''
let newDeckId = ''
document.getElementById('click').addEventListener('click', () => {
  if (newDeck == true) {
    newDeck = false;
    get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
      console.log(res.data);
      newDeckId = res.data.deck_id
      return get(`https://deckofcardsapi.com/api/deck/${newDeckId}/draw/?count=1`)
    })
    .then(res => {
      console.log(res.data)
      addCard(res.data.cards[0].image);
    })
  } else {
    get(`https://deckofcardsapi.com/api/deck/${newDeckId}/draw/?count=1`)
    .then(res => {
      console.log(res.data);
      addCard(res.data.cards[0].image);
    })

  }
})

function addCard(url){
  img = document.createElement('img');
  img.src = url;
  img.classList.add('position-absolute', 'w-100', 'h-100');
  const randomAngle = Math.floor(Math.random() * 361);
  img.style.transform = `rotate(${randomAngle}deg)`;
  div.appendChild(img);
}