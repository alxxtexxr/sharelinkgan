const express = require('express');

const router = express.Router();

// Import controller
const linkController = require('../controllers/links');

// Import helper
const validateUser = require('../helpers/validate-user');

router.get('/demo', (req, res, send) => { res.send('Hello World!'); });

router.get('/links', validateUser, linkController.index);
router.get('/links/:id', validateUser, linkController.show);
router.post('/links', validateUser, linkController.create);
router.put('/links/:id', validateUser, linkController.update);
router.delete('/links/:id', validateUser, linkController.destroy);
router.get('/:username/links', validateUser, linkController.userLinks);

module.exports = router;