const Wheel = require('../models/Wheel');

module.exports = {
    dwheel_wheel_run: (wheelHash) => {
        return new Promise((resolve, reject) => {
            //@ 1: 1440
            //@ 2: 1410
            //@ 3: 1380
            //@ 4: 1350
            //@ 5: 1320
            //@ 6: 1290
            //@ 7: 1260
            //@ 8: 1230
            //@ 9: 1200
            //@ 10: 1170
            //@ 11: 1140
            //@ 12: 1110
            var pickInt32Array = (function () {
                var r = new Int32Array(2),
                    o;
                return function pick(c) {
                    r[0] = Math.random() * 100;
                    for (r[1] = -1;
                        (o = c[++r[1]]) && r[0] >= o[0]; r[0] -= o[0]);
                    if (o) return o[1]
                }
            })()

            Wheel.findOne({
                shopName: wheelHash
            }, function (err, wheel) {
                if (err) return reject(err);
                if (!wheel) return reject('can not find wheel');
                const timeWheel = wheel.setting.triggerPlacement.timeWheel;

                var slices = Object.keys(wheel.slices).map(function (key) {
                    return [wheel.slices[key].gravity, wheel.slices[key].couponCode]
                });

                var slicesFilter = slices.filter((value) => {
                    return value[0] != undefined
                })

                var choices = [
                    [slicesFilter[0][0], "1440"],
                    [slicesFilter[1][0], "1410"],
                    [slicesFilter[2][0], "1380"],
                    [slicesFilter[3][0], "1350"],
                    [slicesFilter[4][0], "1320"],
                    [slicesFilter[5][0], "1290"],
                    [slicesFilter[6][0], "1260"],
                    [slicesFilter[7][0], "1230"],
                    [slicesFilter[8][0], "1200"],
                    [slicesFilter[9][0], "1170"],
                    [slicesFilter[10][0], "1140"],
                    [slicesFilter[11][0], "1110"]
                ];
                var deg = pickInt32Array(choices);
                var indexWheel = 0;
                for (let i = 0; i < choices.length; i++) {
                    if (choices[i][1] === deg) {
                        indexWheel = i;
                    }
                }

                // console.log(indexWheel);
                return resolve({
                    wheel_deg_end: deg,
                    wheel_time_end: timeWheel * 1000,
                    stage2_heading_text: slicesFilter[indexWheel][1] != '' ? wheel.setting.displayOption.titleSuccessAfter : wheel.setting.displayOption.titleFailAfter,
                    stage2_main_coupon: slicesFilter[indexWheel][1],
                    success: true
                })
            })
        })
    },
    dwheel_load_popups: (shopHash) => {
        return new Promise((resolve, reject) => {
            Wheel.findOne({
                shopName: shopHash
            }, function (err, wheel) {
                if (err) return reject(err);
                if (!wheel) return reject('can not find wheel');
                return resolve(wheel)
            })
        })
    },
    dwheel_get_setting: (shopHash) => {
        return new Promise((resolve, reject) => {
            Wheel.findOne({
                shopName: shopHash
            }, function (err, wheel) {
                if (err) return reject(err);
                if (!wheel) return reject('can not find wheel');
                return resolve(wheel.setting)
            })
        })
    },
    dwheel_get_slices: (shopHash) => {
        return new Promise((resolve, reject) => {
            Wheel.findOne({
                shopName: shopHash
            }, function (err, wheel) {
                if (err) return reject(err);
                if (!wheel) return reject('can not find wheel');
                return resolve(wheel.slices)
            })
        })
    },
    dwheel_update_setting: (shopHash, setting) => {
        return new Promise((resolve, reject) => {
            Wheel.updateMany({
                shopName: shopHash
            }, {
                $set: {
                    setting: setting
                }
            }, {
                multi: true
            }, function(err, result) {
                if (err) return reject(err);
                return resolve(result)
            });
        })
    },
    dwheel_update_slices: (shopHash, slices) => {
        return new Promise((resolve, reject) => {
            Wheel.updateMany({
                shopName: shopHash
            }, {
                $set: {
                    slices: slices
                }
            }, {
                multi: true
            }, function(err, result) {
                if (err) return reject(err);
                return resolve(result)
            });
        })
    }
}