const express = require('express')
const router = express.Router()
const Menu=require('../models/Menu')
const { update } = require('lodash')

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newMenu = new Menu(data)
        const response = await newMenu.save()
        console.log('menu saved')
        res.status(200).json(response)
    }
    catch(error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Menu.find()
        console.log('menu fetched')
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})

router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste
        if (taste == 'sweet' || taste == 'sour' || taste == 'spicy') {
            const data = await Menu.find({ taste: taste })
            console.log('menu fetched')
            res.status(200).json(data)
        } else {
            res.status(404).json({ error: 'Menu not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id
        const updatedMenuData = req.body
        
        const response = await Menu.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true,
            runValidators:true
        })

        if (!response) {
            return res.status(404).json({error:'Menu not found'})
        }

        console.log('response updated')
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const menuId = req.params.id
        const response = Menu.findByIdAndDelete(menuId)
        if (!response) {
            return res.status(404).json({error:'Menu not found'})
        }
        console.log('response deleted')
        res.status(200).json({message:"Menu deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})

module.exports=router