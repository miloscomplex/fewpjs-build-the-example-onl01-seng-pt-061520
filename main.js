// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

const modal = document.getElementById('modal')
modal.classList.add("hidden")

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById('modal')
  let likes = document.getElementsByClassName('like')

  modal.classList.add("hidden")

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }

  function displayError() {
    modal.classList.remove("hidden")
    setTimeout(function() {modal.classList.add("hidden")}, 5000)
  }

  function toggleHeart(like) {
    console.log
    let heart = like.firstElementChild
    heart.classList.toggle("activated-heart")
    if (heart.innerText === FULL_HEART) {
      heart.innerText = EMPTY_HEART
    } else {
      heart.innerText = FULL_HEART
    }
  }

  for ( let like of likes ) {
    like.addEventListener('click', function(event) {
      mimicServerCall()
        .then((resp) => {resp.json()})
        .then((json) => {toggleHeart(like)})
        .catch((error) => {displayError()})
    })
  }
})

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
