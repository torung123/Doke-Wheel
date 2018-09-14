const express = require('express');
var md5 = require('md5');
var request = require('superagent');
let nodeXlsx = require('node-xlsx');
let fs = require('fs');
var cache = require('memory-cache');
const Shop = require('../models/Shop');
const Wheel = require('../models/Wheel');
const Statictic = require('../models/Statictic');

const ajax = require('../controllers/ajax-action');
const router = express.Router();
const config = require('../../config');
const appUrl = config.APP_URI;

router.get('/ajax', (req, res, next) => {
  req.shopName = 'doke-apps';
  var shopNameHash = md5(req.shopName);
  res.clearCookie("dwheel_seen_" + shopNameHash);
  res.status(200).send('0');
});


var add_minutes = function (dt, minutes) {
  return new Date(dt.getTime() + minutes * 60000);
}

function parseCookies(request) {
  var list = {},
    rc = request.headers.cookie;

  rc && rc.split(';').forEach(function (cookie) {
    var parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  return list;
}

router.post('/ajax', async (req, res, next) => {
  const data = req.body;
  switch (data.action) {
    case 'dwheel_wheel_run':
      const wheelHash = data.wheel_hash;

      const data_wheel_setting = await ajax.dwheel_get_setting(wheelHash);
      const timeNotify = data_wheel_setting.triggerPlacement.timeNotify;
      const timeWheel = data_wheel_setting.triggerPlacement.timeWheel;
      const coupon_expire_timestamp = +new Date(add_minutes(new Date(), timeNotify + timeWheel / 60)) / 1000 | 0;

      const data_wheel_run = await ajax.dwheel_wheel_run(wheelHash);
      // Update counter nếu quay
      const update_wheeled = await ajax.dwheel_update_wheeled(wheelHash);

      const data_notify = {
        'coupon': data_wheel_run.stage2_main_coupon,
        'timestamp': coupon_expire_timestamp
      }
      cache.put('wheel_' + req.sessionID, data_notify, 1000 * 60 * timeNotify);

      // set cookie 
      res.writeHead(200, {
        'set-cookie': `dwheel_session=${req.sessionID}; expires=${new Date(Date.now() + 1000 * 60 * timeNotify)}; path=/;"`,
        'content-type': 'text/plain'
      });

      res.end(JSON.stringify(data_wheel_run));
      // import email to mailchimp
      if (data.form_data) {
        var dataInfo = data.form_data.split("&");

        var info = {};
        for (var key in dataInfo) {
          info[dataInfo[key].split("=")[0]] = dataInfo[key].split("=")[1];
        }
        const save_info = await ajax.dwheel_save_info_customer(wheelHash, info);
        if (info.dwheel_email != '') {
          const async_mailchimp = await ajax.dwheel_export_data_to_mailchimp(wheelHash);
          if (!async_mailchimp.error) {
            var mailchimpApiKey = async_mailchimp.mailchimp.apiKey,
                listUniqueId = async_mailchimp.mailchimp.listID;
            var mailchimpInstance = mailchimpApiKey.split('-')[1];
            const dwheel_name = info.dwheel_name.replace(/\+/g, ' ');
            const dwheel_email = decodeURIComponent(info.dwheel_email);
            request
              .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
              .set('Content-Type', 'application/json;charset=utf-8')
              .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey).toString('base64'))
              .send({
                'email_address': dwheel_email,
                'status': 'subscribed',
                'merge_fields': {
                  'FNAME': dwheel_name != '' ? dwheel_name : 'Khách',
                  'LNAME': 'Vòng quay may mắn'
                }
              })
              .end(function (err, response) {
                if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                  console.log('Signed Up!');
                } else {
                  console.log('Sign Up Failed :(');
                  //console.log(err)
                }
              });
          }
        }
      }
      break;
    case 'dwheel_notice':
      const codeAction = data.code;
      const stateAction = data.state;
      try {
        if (codeAction == 'exit_popup' && stateAction == 1 && req.cookies.dwheel_session != req.sessionID) {
          const update_refuse = await ajax.dwheel_update_refuse(data.wheel_hash);
        }
        var cookiesWheel = parseCookies(req);
        if (cookiesWheel['dwheel_session'] != undefined && cache.get('wheel_' + req.sessionID) != undefined && cookiesWheel['dwheel_session'] == req.sessionID) {
          res.render('layout/notify', {
            appUrl: appUrl,
            data: cache.get('wheel_' + req.sessionID)
          })
        } else {
          res.send('');
        }
      } catch (error) {
        res.json(error);
      }
      break;
    case 'dwheel_load_popups':
      var shopHash = data.wheel_hash;

      //var getCookie = data.dwheel_seen;
      var cookies = parseCookies(req);

      try {
        const dwheel_load_popups = await ajax.dwheel_load_popups(shopHash);
        if (dwheel_load_popups.setting.showStatus) {
          if (cookies['dwheel_seen_' + shopHash] == undefined || cookies['dwheel_seen_' + shopHash] == '') {
            res.render('layout/load_popup', {
              appUrl: appUrl,
              slices: dwheel_load_popups.slices,
              setting: dwheel_load_popups.setting,
              shopHash: shopHash
            })
          }
        } else {
          res.send('')
        }
      } catch (error) {
        res.status(200).send(error);
      }
      break;
    case 'dwheel_event':
      const wheelHash_event = data.wheel_hash;
      const wheel_setting = await ajax.dwheel_get_setting(wheelHash_event);
      const showTime = wheel_setting.triggerPlacement.showTime;

      // đếm số lượt hiển thị vào db
      if (req.cookies.dwheel_session != req.sessionID) {
        const update_displayed = await ajax.dwheel_update_displayed(wheelHash_event);
      }

      res.writeHead(200, {
        'set-cookie': `dwheel_seen_${wheelHash_event}=${wheelHash_event}; expires=${new Date(Date.now() + 60 * 60 * 24 * showTime * 1000)}; path=/;"`,
        'content-type': 'text/plain'
      });
      res.end();
      // res.status(200).send('');
      break;
    case 'dwheel_close_notice':
      //if ( parseCookies(req)['dwheel_session'] == req.sessionID ){
      res.clearCookie("dwheel_session");
      //}

      cache.del('wheel_' + req.sessionID);
      res.status(200).send('');
      break;

    default:
      res.status(200).send('');
      break;
  }
})

router.get('/reset-cookie/:shopName', (req, res, next) => {
  const {
    shopName
  } = req.params;
  var shopNameHash = md5(shopName);
  res.clearCookie("dwheel_seen_" + shopNameHash);
  res.json({
    msg: 'OK'
  })
})

router.get('/statictic/:shopName', async (req, res, next) => {
  const {
    shopName
  } = req.params;
  var shopNameHash = md5(shopName);
  try {
    const getStat = await ajax.dwheel_get_static(shopNameHash);
    res.json({
      error: false,
      stat: getStat
    })
  } catch (error) {
    res.json({
      error: true,
      message: error
    })
  }
})

router.get('/setting', (req, res, next) => {
  req.shopName = 'doke-apps';
  var shopNameHash = md5(req.shopName);
  const wheel = new Wheel({
    shopName: shopNameHash
  }).save();
  res.json({
    success: true,
    setting: wheel
  })
})

router.get('/setting/:shopName', async (req, res, next) => {
  const {
    shopName
  } = req.params;
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
  const {
    shopName
  } = req.params;
  var shopNameHash = md5(shopName);
  try {
    const data_wheel_slices = await ajax.dwheel_get_slices(shopNameHash);
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
  const {
    shopName
  } = req.params;
  var shopNameHash = md5(shopName);
  const {
    setting
  } = req.body;
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
  const {
    shopName
  } = req.params;
  var shopNameHash = md5(shopName);
  const {
    slices
  } = req.body;

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

router.get('/mailchimp/:shopName', async (req, res, next) => {
  const {
    shopName
  } = req.params;
  var shopNameHash = md5(shopName);
  try {
    const wheel_get_mailchimpDB = await ajax.dwheel_get_mailchimp(shopNameHash);
    res.json({
      error: false,
      mailchimp: wheel_get_mailchimpDB
    })
  } catch (error) {
    res.json({
      error: true,
      message: error
    })
  }
})

router.post('/update-mailchimp/:shopName', async (req, res, next) => {
  const {
    shopName
  } = req.params;
  var shopNameHash = md5(shopName);
  const {
    mailchimp
  } = req.body;

  try {
    const wheel_update_mailchimp = await ajax.dwheel_update_mailchimp(shopNameHash, mailchimp);
    res.json({
      error: false,
      message: 'update mailchimp success'
    })
  } catch (error) {
    res.json({
      error: true,
      message: error
    })
  }
})

router.post('/check-mailchimp', async (req, res, next) => {
    const { mailchimpApiKey, listUniqueId } = req.body;
    var mailchimpInstance = mailchimpApiKey.split('-')[1];
    request
    .get('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
    .set('Content-Type', 'application/json;charset=utf-8')
    .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey).toString('base64'))
    .end(function (err, response) {
      if (response.status < 300) {
        res.json({
          error: false,
          message: 'Connect OK'
        });
      } else {
        res.json({
          error: true,
          message: 'Connect Failed'
        });
      }
    });
})

// router.post('/subscribe-mailchimp', (req, res, next) => {
//   const {
//     email_list
//   } = req.body;
//   var mailchimpInstance = 'us12',
//     listUniqueId = 'd09add0dac',
//     mailchimpApiKey = '0cf1506f8d4eec80359fa0a81fe4fe1e-us12';

//   request
//     .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
//     .set('Content-Type', 'application/json;charset=utf-8')
//     .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey).toString('base64'))
//     .send({
//       'email_address': req.body.email,
//       'status': 'subscribed',
//       'merge_fields': {
//         'FNAME': req.body.firstName,
//         'LNAME': req.body.lastName
//       }
//     })
//     .end(function (err, response) {
//       if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
//         res.send('Signed Up!');
//       } else {
//         res.send('Sign Up Failed :(');
//       }
//     });
// })

router.get('/export/:shopName', function (req, res) {
  const {
    shopName
  } = req.params;
  var shopNameHash = md5(shopName);
  let dataExcel = [];
  Statictic.find({ shopHash: shopNameHash })
    .then(data => {
      if (data.length > 0){
      // Lay du lieu header cho file excel <=> lay cac key name trong collection
      // O day cac key name cua collection user la: userName, email, phone
      var users = data[0].infoCustomer;
 
      let arrHeaderTitle = [];
   
      Object.keys(users[0]['_doc']).forEach(key => {
        arrHeaderTitle.push(key);
      });

      dataExcel.push(arrHeaderTitle);  // push header vao mang dataExcel

      // Lay du lieu cac row tuong ung voi header <=> lay cac value tuong ung voi key name o tren
      for (let item of users) {
        let rowItemValue = [];
        Object.keys(item._doc).forEach(key => {
          rowItemValue.push(item[key]);
        });
        dataExcel.push(rowItemValue); // push tung dong value vao mang dataExcel
      }
      
      let buffer = nodeXlsx.build([{name: "List Email", data: dataExcel}]); // Returns a buffer
      // res.attachment('users.xlsx');
      // res.send(buffer);
      fs.writeFile(`./public/exports/users_${req.sessionID}.xlsx`, buffer, function (err) {
        if (err) return res.json({
          error: true,
          message: err
        })
        else return res.json({
          error: false,
          link: `https://9a4038ba.ngrok.io/exports/users_${req.sessionID}.xlsx`
        });
      });
    } else {
      res.json({
        error: true,
        message: 'Data null'
      })
    }
    })
    .catch(err => res.status(400).json({
      error: true,
      message: err
    }));
});

module.exports = router;