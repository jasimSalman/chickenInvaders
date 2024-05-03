let chickensContainer = document.querySelector('.container')

//This functio to allow the palyer to shoot from his spaceship
const shootChicken = (event) => {
  let xAxis = event.clientX
  let yAxis = event.clientY

  let shoot = newElement(
    'div',
    "url('images/fire.png')",
    '80px',
    '400px',
    'contain',
    'no-repeat',
    `${xAxis}px`,
    `${yAxis}px`,
    'fixed'
  )
  document.body.append(shoot)
  moveShoots(shoot)
}

//This function  will append chickens randomly in the window
const repeatChicken = () => {
  let repeatCount = Math.floor(Math.random() * 11) + 5

  for (let i = 0; i < repeatCount; i++) {
    let chicken = document.createElement('div')
    chicken.classList.add(`chicken${i}`)
    chicken.style.backgroundImage =
      "url('https://mostaql.hsoubcdn.com/uploads/thumbnails/570460/378580/ab2952b5-3a7f-4c9e-8c65-52b1fd800a72.png')"
    chicken.style.width = '250px'
    chicken.style.height = '250px'
    chicken.style.display = 'inline-block'
    chicken.style.backgroundSize = 'contain'
    chicken.style.backgroundRepeat = 'no-repeat'
    chickensContainer.appendChild(chicken)
  }

  document.body.appendChild(chickensContainer)
}
repeatChicken()

//This function will creat new elemnts to appen on the window
const newElement = (
  elemType,
  backgroundImg,
  width,
  height,
  bgSize,
  bgRepeat,
  left,
  top,
  position
) => {
  let elem = document.createElement(elemType)
  elem.style.background = backgroundImg
  elem.style.width = width
  elem.style.height = height
  elem.style.backgroundSize = bgSize
  elem.style.backgroundRepeat = bgRepeat
  elem.style.left = left
  elem.style.top = top
  elem.style.position = position
  return elem
}

//This functio will check if the bullet hit the chicken
const collision = (shoot, chicken) => {
  let bulleBoundaries = shoot.getBoundingClientRect()
  let chickenBoundaries = chicken.getBoundingClientRect()

  if (
    chickenBoundaries.top <= bulleBoundaries.bottom &&
    chickenBoundaries.bottom >= bulleBoundaries.top &&
    chickenBoundaries.left <= bulleBoundaries.right &&
    chickenBoundaries.right >= bulleBoundaries.left
  ) {
    let xAxis = chickenBoundaries.left + chickenBoundaries.width / 2
    let yAxis = chickenBoundaries.top + chickenBoundaries.height / 2
    changeChiken(xAxis, yAxis)
  }
}

//This function responsible for moving the shoot
const moveShoots = (shoot) => {
  setInterval(function () {
    shoot.style.top = shoot.offsetTop - 10 + 'px'
    let chickenElements = Array.from(chickensContainer.children)
    console.log(chickenElements)
    // chickenElements.forEach((element) => {
    //   collision(shoot, element)
    // })
  }, 10)
}

//This function will remove the chicken once hit by a shoot and place a cooked chicken in his place
const changeChiken = (xAxis, yAxis) => {
  let deathChicken = newElement(
    'div',
    "url('images/cooked_chicken.png')",
    '100px',
    '50px',
    'contain',
    'no-repeat',
    `${xAxis}px`,
    `${yAxis}px`,
    'fixed'
  )

  document.body.append(deathChicken)
  cookedChickenMove(deathChicken)
  chicken.style.display = 'none'
}

//This function make the deathChicken to fall-down
const cookedChickenMove = (deathChicken) => {
  setInterval(function () {
    deathChicken.style.top = deathChicken.offsetTop + 20 + 'px'
  }, 25)
}

document.addEventListener('click', shootChicken)

////////////////////////////////////////////////////////////////

// let interval = setInterval(function () {
//   let moveRight = true
//   let stepSize = 10
//   let currentLeft = chicken.offsetLeft
//   let currentTop = chicken.offsetTop

//   if (moveRight) {
//     if (currentLeft + chicken.offsetWidth + stepSize <= window.innerWidth) {
//       chicken.style.left = currentLeft + stepSize + 'px'
//     }
//   } else {
//     if (currentLeft - stepSize >= 0) {
//       chicken.style.left = currentLeft - stepSize + 'px'
//     }
//   }

//   if (currentLeft + chicken.offsetWidth >= window.innerWidth) {
//     moveRight = false
//   } else if (currentLeft <= 0) {
//     moveRight = true
//   }
// }, 100)

// const getPosition = (event) => {
//   let xAxis = event.clientX
//   let yAxis = event.clientY
// }
// document.addEventListener('mousemove', getPosition)

// setInterval(function () {
//   let div = document.querySelector('.chicken')
//   div.style.top = div.offsetTop + 4 + 'px'
//   div.style.left = div.offsetLeft + 4 + 'px'
// }, 400)
