const router = require('express').Router()

let lastUserId = 0
const usersArray = []

function User (name, age, id) {
  const user = {}

  if (!id && id !== 0) {
    user.id = lastUserId
    lastUserId++
  } else {
    user.id = id
  }

  user.name = name
  user.age = age

  return user
}

// LIST ALL USERS
router.get('/', (req, res) => {
  res.json({
    success: true,
    users: usersArray
  })
})

// GETS A SINGLE USER BY ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: 'ID Param must be a number'
    })
  }

  const user = usersArray.find(user => user.id === id)

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    })
  }

  res.json({
    success: true,
    user
  })
})

// CREATES A SINGLE USER
router.post('/', (req, res) => {
  const name = req.body.name
  const age = req.body.age

  if (!name) {
    return res.status(400).json({
      success: false,
      error: 'Missing body field: name'
    })
  }

  if (!age) {
    return res.status(400).json({
      success: false,
      error: 'Missing body field: age'
    })
  }

  if (typeof age !== 'number') {
    return res.status(400).json({
      success: false,
      error: 'Body field "age" must be of type integer'
    })
  }

  usersArray.push(User(name, age))

  res.json({
    success: true
  })
})

// UPDATES A SINGLE USER BY ID
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: 'ID Param must be a number'
    })
  }

  const user = usersArray.find(user => user.id === id)

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    })
  }

  const name = req.body.name
  const age = req.body.age

  if (!name) {
    return res.status(400).json({
      success: false,
      error: 'Missing body field: name'
    })
  }

  if (!age) {
    return res.status(400).json({
      success: false,
      error: 'Missing body field: age'
    })
  }

  if (typeof age !== 'number') {
    return res.status(400).json({
      success: false,
      error: 'Body field "age" must be of type integer'
    })
  }

  usersArray[usersArray.indexOf(user)] = User(name, age, id)

  res.json({
    success: true
  })
})

// DELETES A SINGLE USER BY ID
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: 'ID Param must be a number'
    })
  }

  const user = usersArray.find(user => user.id === id)

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    })
  }

  usersArray.splice(id, 1)

  res.json({
    success: true
  })
})

module.exports = router
