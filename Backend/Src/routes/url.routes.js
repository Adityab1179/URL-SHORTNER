const { ShortUrlCreation, RedirectShortUrl } = require("../controllers/Url.controller");
const router = require('express').Router();
router.post('/create', ShortUrlCreation);
router.get('/:id', RedirectShortUrl);
module.exports=router;