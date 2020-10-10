const router = require('express').Router()

const { models } = require('../../../sequelize')

// LIST ALL TODOS
router.get('/', async (req, res) => {
  try {
    const todos = await models.todo.findAll({ include: [models.user] })

    res.json({
      success: true,
      todos
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

// GETS A SINGLE TODO BY ID
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID Param must be a number'
      })
    }

    // const todo = todosArray.find((todo) => todo.id === id)
    const todo = await models.todo.findByPk(id)

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
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

// CREATES A SINGLE TODO
router.post('/', async (req, res) => {
  try {
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

    const userCount = await models.user.count({ where: { id: user } })
    const userExists = userCount > 0

    if (!userExists) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    await models.todo.create({
      title,
      body,
      userId: user
    })

    res.json({
      success: true
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

// UPDATES A SINGLE TODO BY ID
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID Param must be a number'
      })
    }

    const todoCount = await models.todo.count({ where: { id } })
    const todoExists = todoCount > 0

    if (!todoExists) {
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

    const userCount = await models.user.count({ where: { id: user } })
    const userExists = userCount > 0

    if (!userExists) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    await models.todo.update(
      {
        title,
        body,
        userId: user
      },
      {
        where: { id }
      }
    )

    res.json({
      success: true
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

// DELETES A SINGLE TODO BY ID
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID Param must be a number'
      })
    }

    const todoCount = await models.todo.count({ where: { id } })
    const todoExists = todoCount > 0

    if (!todoExists) {
      return res.status(404).json({
        success: false,
        error: 'Todo not found'
      })
    }

    await models.todo.destroy({
      where: { id }
    })

    res.json({
      success: true
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

module.exports = router
