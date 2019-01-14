const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector("#toy-collection")

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => toys.forEach(toy => {
     toyCollection.append(renderToy(toy))
  }))

  document.querySelector(".add-toy-form").addEventListener("submit", handleSubmit)
  toyCollection.addEventListener("click", increaseLike)
})

function renderToy(toy){
  const div = document.createElement("div")
  div.classList.add("card")
  const h2 = document.createElement("h2")
  h2.innerText = toy.name
  const img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")
  const p = document.createElement("p")
  const span = document.createElement('span')
  span.innerText = toy.likes
  p.append(span)
  p.innerHTML += " Likes"
  const button = document.createElement("button")
  button.classList.add("like-btn")
  button.innerText = "Like <3"
  button.setAttribute("data-id", toy.id)
  div.append(h2, img, p, button)
  return div
}

function handleSubmit(e){
  e.preventDefault()
  const {name, image} = e.target
  const toy = {name: name.value, image: image.value, likes: 0}
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(toy => {
    document.querySelector("#toy-collection").append(renderToy(toy))
  })
}

function increaseLike(event){
  if (event.target.classList.contains("like-btn")) {
    const id = event.target.getAttribute("data-id")
    const likeSpan = event.target.parentElement.querySelector("span")
    let likeNumber = parseInt(likeSpan.innerText)
    likeNumber++
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({likes: likeNumber})
    })
    .then(res => res.json())
    .then(toy => {
      likeSpan.innerText = toy.likes
    })
  }
}
// OR HERE!
