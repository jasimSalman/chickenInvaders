let chickensContainer = document.querySelector('.container')
let moveChickenRightInterval
let moveChickenLeftInterval
let mouseX
let mouseY
let score = document.querySelector('span')
let scorePoints = 0
let remainingLife = 2
let initialInterval = 50
let intervalDecrease = 5
let currentInterval = initialInterval
let endGame = document.querySelector('.end_game')
let lifePoints = document.querySelectorAll('.lifepoints .point')
let isGameOver = false
let playAgain = document.querySelector('.playAgain')

//This function to initiate the game
const init = () => {
  chickensContainer.style.display = 'flex'
  repeatChicken()
  dropEggs()
  moveChickenRight()
}

//This function to reset the game after each round
const reset = () => {
  chickensContainer.style.top = '0'
  chickensContainer.style.left = '0'
  clearInterval(moveChickenLeftInterval)
  clearInterval(moveChickenRightInterval)
  currentInterval -= intervalDecrease
  init()
}

//This function allows the player to shoot
const shootChicken = () => {
  let shoot = newElement(
    'div',
    "url('images/fire.png')",
    '40px',
    '200px',
    'contain',
    'no-repeat',
    `${mouseX}px`,
    `${mouseY}px`,
    'fixed'
  )
  document.body.append(shoot)
  moveShoots(shoot)
}

//This function  will append chickens randomly in the document
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

//This function will create new elements
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

//This function will check if the bullet hit the chicken
const chickenShootCollision = (shoot, chicken) => {
  let chickenBoundaries = chicken.getBoundingClientRect()
  let bulletBoundaries = shoot.getBoundingClientRect()
  if (
    chickenBoundaries.top <= bulletBoundaries.bottom &&
    chickenBoundaries.bottom >= bulletBoundaries.top &&
    chickenBoundaries.left <= bulletBoundaries.right &&
    chickenBoundaries.right >= bulletBoundaries.left
  ) {
    let xAxis = chickenBoundaries.left + chickenBoundaries.width / 2
    let yAxis = chickenBoundaries.top + chickenBoundaries.height / 2
    scorePoints += 20
    score.innerHTML = scorePoints
    chicken.remove()
    shoot.remove()
    changeChiken(xAxis, yAxis)
  }
}

//This function will iterate over the chickens and check for collision
const isCollison = (shoot) => {
  let chickenElements = Array.from(chickensContainer.children)
  let collisionOccurred = false
  chickenElements.forEach((element) => {
    if (!collisionOccurred) {
      collisionOccurred = chickenShootCollision(shoot, element)
    }
  })
}

//This function responsible for moving the bullet
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

//This function will remove the chicken once hit by a shoot and place a cooked chicken in its place
const changeChiken = (xAxis, yAxis) => {
  let cookedChicken = newElement(
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
  document.body.append(cookedChicken)
  cookedChickenMove(cookedChicken)
}

//This function makes the cooked Chicken fall
const cookedChickenMove = (cookedChicken) => {
  let moveInterval = setInterval(function () {
    cookedChicken.style.top = cookedChicken.offsetTop + 20 + 'px'

    if (
      cookedChicken.offsetTop + cookedChicken.offsetHeight >=
      document.body.offsetHeight
    ) {
      setTimeout(() => {
        clearInterval(moveInterval)
        cookedChicken.remove()
      }, 1000)
    }
  }, 25)
}

//This function will move the chickens to the left side.
const moveChickenLeft = () => {
  moveChickenLeftInterval = setInterval(function () {
    chickensContainer.style.left = chickensContainer.offsetLeft - 10 + 'px'

    //Stop the chicek once reach right side
    if (chickensContainer.offsetLeft <= 0) {
      clearInterval(moveChickenLeftInterval)
      chickensContainer.style.top = chickensContainer.offsetTop + 20 + 'px'

      //Stopt the chicken once reach the bottom
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
  }, currentInterval)
}

//This function will move the chickens to the right side.
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
  }, currentInterval)
}

//Create egg elemnet and append it to the window randomly
const dropEggs = () => {
  if (isGameOver) {
    return
  }
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

//This function is responsible for moving the eggs downward
const moveEggs = (egg) => {
  let eggInterval = setInterval(function () {
    egg.style.top = egg.offsetTop + 10 + 'px'

    setTimeout(() => {
      clearInterval(eggInterval)
      egg.remove()
    }, 3000)
  }, 50)
}

//This function  will check if there is a collsion  between the player and eggs
const eggPlayerCollision = () => {
  let eggs = document.querySelectorAll('.egg')

  for (let i = 0; i < eggs.length; i++) {
    let eggBoundaries = eggs[i].getBoundingClientRect()

    if (
      eggBoundaries.top <= mouseY &&
      eggBoundaries.bottom >= mouseY &&
      eggBoundaries.left <= mouseX &&
      eggBoundaries.right >= mouseX
    ) {
      if (remainingLife > 0) {
        lifePoints[remainingLife].style.display = 'none'
        remainingLife--
        eggs[i].remove()
      } else {
        gameOver()
      }
    }
  }
}

//This function is responsible for resetting the whole game
const playAgainFunction = () => {
  isGameOver = false
  endGame.style.display = 'none'
  document.addEventListener('click', shootChicken)
  document.addEventListener('mousemove', mouseMovments)
  document.body.style.cursor = "url('images/Small_Plane.png'), auto"
  score.innerText = ''
  scorePoints = 0

  lifePoints.forEach((element) => {
    element.style.display = 'flex'
  })
  remainingLife = 2
  currentInterval = initialInterval
  chickensContainer.style.top = '0'
  chickensContainer.style.left = '0'
  clearInterval(moveChickenLeftInterval)
  clearInterval(moveChickenRightInterval)
  chickensContainer.innerHTML = ''
  init()
}

const gameOver = () => {
  isGameOver = true
  chickensContainer.style.display = 'none'
  endGame.style.display = 'flex'
  lifePoints[0].style.display = 'none'
  clearInterval(moveChickenLeftInterval)
  clearInterval(moveChickenRightInterval)
  document.removeEventListener('click', shootChicken)
  document.removeEventListener('mousemove', mouseMovments)
  document.body.style.cursor = 'pointer'
}

//This function will check if there is a collision between the player and the chickens
const chickenPlayerCollision = () => {
  let conatinerBoundaries = chickensContainer.getBoundingClientRect()

  if (
    conatinerBoundaries.top <= mouseY &&
    conatinerBoundaries.bottom >= mouseY &&
    conatinerBoundaries.left <= mouseX &&
    conatinerBoundaries.right >= mouseX
  ) {
    gameOver()
  }
}

const mouseMovments = (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
  eggPlayerCollision()
  chickenPlayerCollision()
}

document.addEventListener('click', shootChicken)
document.addEventListener('mousemove', mouseMovments)
window.addEventListener('load', init)
playAgain.addEventListener('click', playAgainFunction)
