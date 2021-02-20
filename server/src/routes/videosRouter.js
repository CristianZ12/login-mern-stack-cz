const express = require('express');
const router = express.Router();
const auth = require('../lib/auth');

const controllers = require('../controllers/videosControllers');

router.get('/', auth ,controllers.getVideos);
router.post('/', auth, controllers.addVideos);
router.get('/:id', auth, controllers.getVideo);
router.put('/:id', auth, controllers.updateVideos);
router.delete('/:id', auth, controllers.deleteVideos);

module.exports = router;