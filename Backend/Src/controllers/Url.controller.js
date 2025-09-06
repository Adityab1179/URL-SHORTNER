const ShortUrl=require("../Models/Url.model")
const {nanoid}=require("nanoid")
const qrcode = require('qrcode');
const {AppError,ConflictingError,ErrorHandler}=require("../utils/ErrorHandler")
const ShortUrlCreation = async (req, res,next) => {
  const { fullUrl,user } = req.body;
  const existingUrl = await ShortUrl.findOne({ full_url: fullUrl });
  if (existingUrl) {
    return res.status(200).json(existingUrl);
  }
  const shortId = nanoid(7);
  const qrCode = await qrcode.toDataURL(`${process.env.BASE_URL}/${shortId}`);
  if(!shortId) throw new AppError("Short Url Not Generated",401)
  try {
    const newShortUrl = new ShortUrl({
      full_url: fullUrl,
      short_url: `${process.env.BASE_URL}/${shortId}`,
      qrCode:qrCode,
    });
    if(user){
        newShortUrl.user=user;
    }
    await newShortUrl.save();
    res.status(201).json(newShortUrl);
  } catch (err) {
    if(err.code===11000) throw new ConflictingError("Short Url Already Exists")
    throw new ErrorHandler(err.message, 500);
  }
};
const RedirectShortUrl = async (req, res,next) => {
  try {
    const {id} = req.params;
    const url = await ShortUrl.findOneAndUpdate({ short_url: id },{$inc:{clicks:1}},{new:true});
    if (!url) {
      throw new AppError("Short URL not found", 404);
    }
    if (!/^https?:\/\//i.test(url.full_url)) {
      url.full_url = "http://" + url.full_url;
    }
      res.redirect(url.full_url)
  } catch (err) {
    next(err)
  }
};

module.exports={ ShortUrlCreation, RedirectShortUrl };