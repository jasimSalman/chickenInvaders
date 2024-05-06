let chickensContainer = document.querySelector('.container')
let moveChickenRightInterval
let moveChickenLeftInterval
let xAxis
let yAxis
let mouseX
let mouseY
let score = document.querySelector('span')
let scorePoints = 0
let remainingLife = 3

//This function to initiate the game
const init = () => {
  repeatChicken()
  dropEggs()
  moveChickenRight()
}

//This fucntion to reset the game after each round
const reset = () => {
  chickensContainer.style.top = '0'
  chickensContainer.style.left = '0'
  clearInterval(moveChickenLeftInterval)
  clearInterval(moveChickenRightInterval)
  init()
}

//This functio to allow the palyer to shoot from his spaceship
const shootChicken = (event) => {
  xAxis = event.clientX
  yAxis = event.clientY

  let shoot = newElement(
    'div',
    "url('images/fire.png')",
    '40px',
    '200px',
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
    chicken.style.width = '110px'
    chicken.style.height = '110px'
    chicken.style.display = 'inline-block'
    chicken.style.backgroundSize = 'contain'
    chicken.style.backgroundRepeat = 'no-repeat'
    chickensContainer.appendChild(chicken)
  }

  document.body.appendChild(chickensContainer)
}

//This function will creat new elemnts to append on the window
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
const chickenShootCollision = (shoot, chick) => {
  let chickenBoundaries = chick.getBoundingClientRect()
  let bulleBoundaries = shoot.getBoundingClientRect()
  if (
    chickenBoundaries.top <= bulleBoundaries.bottom &&
    chickenBoundaries.bottom >= bulleBoundaries.top &&
    chickenBoundaries.left <= bulleBoundaries.right &&
    chickenBoundaries.right >= bulleBoundaries.left
  ) {
    let xAxis = chickenBoundaries.left + chickenBoundaries.width / 2
    let yAxis = chickenBoundaries.top + chickenBoundaries.height / 2
    scorePoints += 20
    score.innerHTML = scorePoints

    chick.remove()
    shoot.remove()
    changeChiken(xAxis, yAxis)
  }
}

const isCollison = (shoot) => {
  let chickenElements = Array.from(chickensContainer.children)
  let collisionOccurred = false
  chickenElements.forEach((element) => {
    if (!collisionOccurred) {
      collisionOccurred = chickenShootCollision(shoot, element)
    }
  })
}

//This function responsible for moving the shoot
const moveShoots = (shoot) => {
  let shootInterval = setInterval(function () {
    shoot.style.top = shoot.offsetTop - 10 + 'px'

    if (shoot.getBoundingClientRect().top <= 0) {
      clearInterval(shootInterval)
      shoot.remove()
    }
    isCollison(shoot)
  }, 10)
}

//This function will remove the chicken once hit by a shoot and place a cooked chicken in his place
const changeChiken = (xAxis, yAxis) => {
  let deathChicken = newElement(
    'div',
    "url('images/cooked_chicken.png')",
    '50px',
    '25px',
    'contain',
    'no-repeat',
    `${xAxis}px`,
    `${yAxis}px`,
    'fixed'
  )

  document.body.append(deathChicken)
  cookedChickenMove(deathChicken)
}

//This function make the deathChicken to fall-down
const cookedChickenMove = (deathChicken) => {
  let moveInterval = setInterval(function () {
    deathChicken.style.top = deathChicken.offsetTop + 20 + 'px'

    if (
      deathChicken.offsetTop + deathChicken.offsetHeight >=
      document.body.offsetHeight
    ) {
      setTimeout(() => {
        clearInterval(moveInterval)
        deathChicken.remove()
      }, 1000)
    }
  }, 25)
}

const moveChickenLeft = () => {
  moveChickenLeftInterval = setInterval(function () {
    chickensContainer.style.left = chickensContainer.offsetLeft - 10 + 'px'

    //Stop the chicek once reach right side
    if (chickensContainer.offsetLeft <= 0) {
      clearInterval(moveChickenLeftInterval)
      chickensContainer.style.top = chickensContainer.offsetTop + 20 + 'px'

      //Stopt he chicken once reach the bottom
      if (
        chickensContainer.offsetTop + chickensContainer.offsetHeight >=
        document.body.offsetHeight
      ) {
        clearInterval(moveChickenLeftInterval)
      }
      moveChickenRight()
    }
    if (chickensContainer.children.length === 0) {
      reset()
    }
  }, 50)
}

const moveChickenRight = () => {
  moveChickenRightInterval = setInterval(function () {
    chickensContainer.style.left = chickensContainer.offsetLeft + 10 + 'px'

    //To stop the chicken once reach the left
    if (
      chickensContainer.offsetLeft + chickensContainer.offsetWidth >=
      document.body.offsetWidth
    ) {
      clearInterval(moveChickenRightInterval)
      chickensContainer.style.top = chickensContainer.offsetTop + 20 + 'px'

      //To stop the chicken once reach the bottom
      if (
        chickensContainer.offsetTop + chickensContainer.offsetHeight >=
        document.body.offsetHeight
      ) {
        clearInterval(moveChickenRightInterval)
      }
      moveChickenLeft()
    }

    if (chickensContainer.children.length === 0) {
      reset()
    }
  }, 50)
}

//Create egg elemnet and append it to the window randomly
const dropEggs = () => {
  let containerBounds = chickensContainer.getBoundingClientRect()
  let randomX =
    Math.floor(Math.random() * containerBounds.width) + containerBounds.left

  let egg = newElement(
    'div',
    "url('images/egg.png')",
    '40px',
    '80px',
    'contain',
    'no-repeat',
    `${randomX}px`,
    `${containerBounds.bottom}px`,
    'fixed'
  )
  egg.classList.add('egg')

  document.body.appendChild(egg)
  moveEggs(egg)

  let delay = Math.floor(Math.random() * 5000) + 1000

  setTimeout(dropEggs, delay)
}

//This function responsible for moving the eggs downward
const moveEggs = (egg) => {
  let eggInterval = setInterval(function () {
    egg.style.top = egg.offsetTop + 10 + 'px'

    setTimeout(() => {
      clearInterval(eggInterval)
      egg.remove()
    }, 3000)
  }, 50)
}

const eggPlayerCollision = () => {
  let eggs = document.querySelectorAll('.egg')
  let lifePoints = document.querySelectorAll('.lifepoints .point')

  for (let i = 0; i < eggs.length; i++) {
    let eggBoundaries = eggs[i].getBoundingClientRect()

    if (
      eggBoundaries.top <= mouseY &&
      eggBoundaries.bottom >= mouseY &&
      eggBoundaries.left <= mouseX &&
      eggBoundaries.right >= mouseX
    ) {
      if (remainingLife > 0) {
        lifePoints[remainingLife - 1].style.display = 'none'
        remainingLife--
        console.log('Life point removed. Remaining life points:', remainingLife)
        eggs[i].remove()
      }
    }
  }
}

const chickenPlayerCollision = () => {
  let lifePoints = document.querySelectorAll('.lifepoints .point')

  let conatinerBoundaries = chickensContainer.getBoundingClientRect()

  if (
    conatinerBoundaries.top <= mouseY &&
    conatinerBoundaries.bottom >= mouseY &&
    conatinerBoundaries.left <= mouseX &&
    conatinerBoundaries.right >= mouseX
  ) {
    if (remainingLife > 0) {
      lifePoints[remainingLife - 1].style.display = 'none'
      console.log('Life point removed. Remaining life points:', remainingLife)
    }
  }
}

document.addEventListener('click', shootChicken)

document.addEventListener('mousemove', function (event) {
  mouseX = event.clientX
  mouseY = event.clientY
  eggPlayerCollision()
  chickenPlayerCollision()
})
// window.addEventListener('load', init)
