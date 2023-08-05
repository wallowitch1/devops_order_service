const express = require('express');
const router = express.Router();
const {Order} = require('../models');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/',verifyToken, async (req, res) => {
  if (req.user.username) {
    try {
      const user_id = req.user.user_id;
      let orders = null
      if (req.user.accounttype === 'delivery'){
        const state = '준비중';
        orders = await Order.findAll({where: { state}});
      }else{
        orders = await Order.findAll({where: { user_id}});
      }

      res.render('orders', { orders,user: req.user.username, accounttype: req.user.accounttype, user_id :req.user.user_id });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
});


router.post('/', async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    await Order.create({ user_id, product_id, quantity });
    res.redirect('/orders');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, product_id, quantity } = req.body;
    await Order.update({ user_id, product_id, quantity }, { where: { id } });
    res.redirect('/orders');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});


router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Order.destroy({ where: { id } });
      res.redirect('/orders');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
});
  
module.exports = router;
  