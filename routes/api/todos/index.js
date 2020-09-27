const router = require('express').Router()

let lastTodoId = 0
const todosArray = []

function Todo (title, body, user, id) {
  const todo = {}

  if (!id && id !== 0) {
    todo.id = lastTodoId
    lastTodoId++
  } else {
    todo.id = id
  }

  todo.title = title
  todo.body = body
  todo.user = user

  return todo
}

// LIST ALL TODOS
router.get('/', (req, res) => {
  res.json({
    success: true,
    todos: todosArray
  })
})

// GETS A SINGLE TODO BY ID
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: 'ID Param must be a number'
    })
  }

  const todo = todosArray.find(todo => todo.id === id)

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found'
    })
  }

  res.json({
    success: true,
    todo
  })
})

// CREATES A SINGLE TODO
router.post('/', (req, res) => {
  const title = req.body.title
  const body = req.body.body
  const user = req.body.user

  if (!title) {
    return res.status(400).json({
      success: false,
      error: 'Missing body field: title'
    })
  }

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Missing body field: body'
    })
  }

  if (!user && user !== 0) {
    return res.status(400).json({
      success: false,
      error: 'Missing body field: user'
    })
  }

  if (typeof user !== 'number') {
    return res.status(400).json({
      success: false,
      error: 'Body field "user" must be of type integer'
    })
  }

  todosArray.push(Todo(title, body, user))

  res.json({
    success: true
  })
})

// UPDATES A SINGLE TODO BY ID
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: 'ID Param must be a number'
    })
  }

  const todo = todosArray.find(todo => todo.id === id)

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found'
    })
  }

  const title = req.body.title
  const body = req.body.body
  const user = req.body.user

  if (!title) {
    return res.status(400).json({
      success: false,
      error: 'Missing body field: title'
    })
  }

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Missing body field: body'
    })
  }

  if (!user && user !== 0) {
    return res.status(400).json({
      success: false,
      error: 'Missing body field: user'
    })
  }

  if (typeof user !== 'number') {
    return res.status(400).json({
      success: false,
      error: 'Body field "user" must be of type integer'
    })
  }

  todosArray[todosArray.indexOf(todo)] = Todo(title, body, user, id)

  res.json({
    success: true
  })
})

// DELETES A SINGLE TODO BY ID
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: 'ID Param must be a number'
    })
  }

  const todo = todosArray.find(todo => todo.id === id)

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: 'Todo not found'
    })
  }

  todosArray.splice(id, 1)

  res.json({
    success: true
  })
})

module.exports = router
