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
let div = document.getElementById('facts')
get('http://numbersapi.com/1..10,89?json')   
    .then(res => {
    for (key in res.data){
        let p = document.createElement('p')
        p.innerText = res.data[key]
        div.appendChild(p)
    }
    console.log(res.data)
    })
    .catch(err => console.log(err))


get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
      console.log(res.data);
      deck_id = res.data.deck_id
      return get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    })
    .then(res => {
      console.log(res.data)
      console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
      return get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    })
    .then(res => {
      console.log(res.data)
      console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
    })
    .catch(err => console.log(err))