const {Router} = require('express');
const config = require('config');
const User = require('../models/User');
const router = Router();

router.post(
    '/required', 
    async (req, response) => {
        try {
            console.log('req.body: ', req.body) //Убрать потом
            const {userId} = req.body

            const user = await User.findById(userId, () => {
                console.log('Пользователь найден, проверяю листы задач')
            })

            if(!user) {
                return response.status(400).json({ message: 'Пользователь не найден' })
            }

            //console.log('Пользователь найден, проверяю листы задач')
            //console.log('Lists: ',user.lists);

            response.status(200).json({ message: user.lists })
        } catch(e) {
            console.log(e)
            response.status(500).json({ "message": 'Что-то пошло не так' });
        }
})

router.post(
    '/push', 
    async (req, response) => {
        try {
            console.log('On /push')
            console.log('req.body: ', req.body) //Убрать потом
            const {nameTask, descriptiontask, userId} = req.body

            const user = await User.findById(userId, () => {
                console.log('Пользователь найден, проверяю листы задач')
            })

            if(!user) {
                return response.status(400).json({ message: 'Пользователь не найден' })
            }

            //console.log('user: ',user); 

            let listNow = user.lists;
            //console.log('listnow: ', listNow)

            let objwithPush = { nametask: nameTask,
                                descriptiontask:descriptiontask }
            //console.log('listnow: ', objwithPush)

            listNow.push(objwithPush)
            //console.log('listnow: ', listNow)

            //console.log('user: ',user); 


            user.lists = listNow;

            await user.save();
            

            response.status(200).json({ message: 'Done list has edit' })
        } catch(e) {
            console.log(e)
            response.status(500).json({ message: 'Что-то пошло не так' });
        }
})

module.exports = router;