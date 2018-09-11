const express = require('express');
var md5 = require('md5');
var cache = require('memory-cache');
const Shop = require('../models/Shop');
const Wheel = require('../models/Wheel');
const ajax = require('../controllers/ajax-action');
const router = express.Router();
const config = require('../../config');
const appUrl = config.APP_URI;

router.get('/ajax', (req, res, next) => {
  //res.cookie('dwheel_seen',  '123456789', { maxAge: 30*24*3600*1000 });
  //console.log(req.cookies);
  res.clearCookie("dwheel_seen");
  res.status(200).send('0');
});


var add_minutes = function (dt, minutes) {
  return new Date(dt.getTime() + minutes * 60000);
}
function parseCookies (request) {
  var list = {},
      rc = request.headers.cookie;

  rc && rc.split(';').forEach(function( cookie ) {
      var parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  return list;
}

router.post('/ajax', async(req, res, next) => {
  const data = req.body;
  switch (data.action) {
    case 'dwheel_wheel_run':
      const wheelHash = data.wheel_hash;

      const data_wheel_setting = await ajax.dwheel_get_setting(wheelHash);
      const timeNotify = data_wheel_setting.triggerPlacement.timeNotify;
      const timeWheel = data_wheel_setting.triggerPlacement.timeWheel;
      const coupon_expire_timestamp = +new Date(add_minutes(new Date(), timeNotify + timeWheel/60 )) / 1000 | 0;

      const data_wheel_run = await ajax.dwheel_wheel_run(wheelHash);
           
      const data_notify = {
        'coupon': data_wheel_run.stage2_main_coupon,
        'timestamp': coupon_expire_timestamp
      }
      cache.put('wheel_' + req.sessionID, data_notify, 1000 * 60 * timeNotify );

      // set cookie 
      res.writeHead(200, {
        'set-cookie': `dwheel_session=${req.sessionID}; expires=${new Date(Date.now() + 1000 * 60 * timeNotify)}; path=/;"`,
        'content-type': 'text/plain'
      });
      
      res.end(JSON.stringify(data_wheel_run));
      break;
    case 'dwheel_notice':
      //const hash = data.wheel_hash;
      //const wheelSession = data.dwheel_session;
      var cookiesWheel = parseCookies(req);
      if (cookiesWheel['dwheel_session'] != undefined && cache.get('wheel_' + req.sessionID) != undefined && cookiesWheel['dwheel_session'] == req.sessionID ){
        res.render('layout/notify', {
          appUrl: appUrl,
          data: cache.get('wheel_' + req.sessionID)
        })
      } else{
        res.send('');
      }
      break;
    case 'dwheel_load_popups':
      var shopHash = data.wheel_hash;
      //var getCookie = data.dwheel_seen;
      var cookies = parseCookies(req);

      try {
        const dwheel_load_popups = await ajax.dwheel_load_popups(shopHash);

        if (dwheel_load_popups.setting.showStatus){
            if (cookies['dwheel_seen'] == undefined || cookies['dwheel_seen'] == ''){
            
              res.render('layout/load_popup', {
                appUrl: appUrl,
                slices: dwheel_load_popups.slices,
                setting: dwheel_load_popups.setting,
                shopHash: shopHash
            })
          }
        } else{
          res.send('')
        }
      } catch (error) {
        res.status(200).send('0');
      }
      break;
    case 'dwheel_event':
      const wheelHash_event = data.wheel_hash;
      const wheel_setting = await ajax.dwheel_get_setting(wheelHash_event);
      const showTime = wheel_setting.triggerPlacement.showTime;
      
      res.writeHead(200, {
        'set-cookie': `dwheel_seen=${wheelHash_event}; expires=${new Date(Date.now() + 60 * 60 * 24 * showTime * 1000)}; path=/;"`,
        'content-type': 'text/plain'
      });
      res.end();
      // res.status(200).send('');
      break;
    case 'dwheel_close_notice':
      //if ( parseCookies(req)['dwheel_session'] == req.sessionID ){
      res.clearCookie("dwheel_session");
      //}
      res.status(200).send('');
      break;
    default:
      res.status(200).send('');
      break;
  }
})

router.get('/setting', (req, res, next) => {
  req.shopName = 'doke-apps';
  var shopNameHash = md5(req.shopName);
  const wheel = new Wheel({ shopName: shopNameHash }).save();
  res.json({
    success: true,
    setting: wheel
  })
})

router.get('/setting/:shopName', async (req, res, next) => {
  const { shopName } = req.params;
  var shopNameHash = md5(shopName);
  try {
    const data_wheel_setting = await ajax.dwheel_get_setting(shopNameHash);
    res.json({
      error: false,
      setting: data_wheel_setting
    })
  } catch (error) {
    res.json({
      error: true,
      message: error
    })
  }
})

router.get('/slices/:shopName', async (req, res, next) => {
  const { shopName } = req.params;
  var shopNameHash = md5(shopName);
  try {
    const data_wheel_slices= await ajax.dwheel_get_slices(shopNameHash);
    res.json({
      error: false,
      slices: data_wheel_slices
    })
  } catch (error) {
    res.json({
      error: true,
      message: error
    })
  }
})

router.post('/update-setting/:shopName', async (req, res, next) => {
  const { shopName } = req.params;
  var shopNameHash = md5(shopName);
  const { setting } = req.body;
  try {
    const wheel_update_setting = await ajax.dwheel_update_setting(shopNameHash, setting);
    res.json({
      error: false,
      message: 'update setting success'
    })
  } catch (error) {
    res.json({
      error: true,
      message: error
    })
  }
})

router.post('/update-slices/:shopName', async (req, res, next) => {
  const { shopName } = req.params;
  var shopNameHash = md5(shopName);
  const { slices } = req.body;

  try {
    const wheel_update_slices = await ajax.dwheel_update_slices(shopNameHash, slices);
    res.json({
      error: false,
      message: 'update slices success'
    })
  } catch (error) {
    res.json({
      error: true,
      message: error
    })
  }
})

module.exports = router;
