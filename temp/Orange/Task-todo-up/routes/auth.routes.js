const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('username', 'Некорректный логин'),
        check('password', 'минимальная длина пароля 6 символов')
    ],
    async (req, response) => {
        //console.log('body: ', req.body)
        try {
            const errors = validationResult(req)
            
            if(!errors.isEmpty()) {
                return response.status(400).json({ 
                    errors: errors.array(), message: 
                    'Некорректные данные при регистрации' 
                })
            }

            const {username, password} = req.body;
            
            const candidate = await User.findOne( { username } )

            if(candidate) {
                return response.status(400).json({ message: 'Такой пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User( { username, password:hashedPassword, lists:[] } );
            
            await user.save();

            response.status(201).json({ message: 'Пользователь создан' })

        } catch(e) {
            console.log(e)
            response.status(500).json({ "message": 'Что-то пошло не так'});
        }

})

router.post(
    '/login', 
    [
        check('username', 'Введите корректный логин'),
        check('password', 'Введите пароль').exists()
    ],
    async (req, response) => {
        try {
            const errors = validationResult(req)

            if(!errors.isEmpty()) {
                return response.status(400).json({ 
                    errors: errors.array(), 
                    message: 'Некорректные данные при входе в систему' 
                })
            }

            const {username, password} = req.body

            const user = await User.findOne({ username })

            if(!user) {
                return response.status(400).json({ message: 'Пользователь не найден' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) {
                return response.status(400).json({ message: 'Неверный пароль' })
            }
 
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            response.json({ token, userId: user.id });

        } catch(e) {
            console.log(e)
            response.status(500).json({ "message": 'Что-то пошло не так' });
        }
    })
module.exports = router;