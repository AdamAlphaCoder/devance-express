const router = require('express').Router()

const { models } = require('../../../sequelize')

// LIST ALL USERS
router.get('/', async (req, res) => {
  try {
    const users = await models.user.findAll()

    res.json({
      success: true,
      users
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

// GETS A SINGLE USER BY ID
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID Param must be a number'
      })
    }

    const user = await models.user.findByPk(id)

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
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      error: err.message
    })
  }
})

// CREATES A SINGLE USER
router.post('/', async (req, res) => {
  try {
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

    await models.user.create({ name, age })

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

// UPDATES A SINGLE USER BY ID
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID Param must be a number'
      })
    }

    const userCount = await models.user.count({ where: { id } })
    const userExists = userCount > 0

    if (!userExists) {
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

    await models.user.update(
      {
        name,
        age
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

// DELETES A SINGLE USER BY ID
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID Param must be a number'
      })
    }

    const userCount = await models.user.count({ where: { id } })
    const userExists = userCount > 0

    if (!userExists) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      })
    }

    await models.user.destroy({
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
