const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wheelSchema = new Schema({
    slices: {
        slice_1: {
            // sliceType: {
            //     type: String,
            //     default: 'Coupon'
            // },
            sliceLabel: {
                type: String,
                default: '30% OFF'
            },
            couponCode: {
                type: String,
                default: 'MA_GIAM_GIA_1'
            },
            gravity: {
                type: Number,
                default: 10
            },
            percent: {
                type: Number,
                default: 8.33
            }
        },
        slice_2: {
            // sliceType: {
            //     type: String,
            //     default: 'Coupon'
            // },
            sliceLabel: {
                type: String,
                default: 'Voucher 50k '
            },
            couponCode: {
                type: String,
                default: 'MA_GIAM_GIA_2'
            },
            gravity: {
                type: Number,
                default: 10
            },
            percent: {
                type: Number,
                default: 8.33
            }
        },
        slice_3: {
            // sliceType: {
            //     type: String,
            //     default: 'Losing'
            // },
            sliceLabel: {
                type: String,
                default: 'May mắn lần sau'
            },
            couponCode: {
                type: String,
                default: ''
            },
            gravity: {
                type: Number,
                default: 10
            },
            percent: {
                type: Number,
                default: 8.33
            }
        },
        slice_4: {
            // sliceType: {
            //     type: String,
            //     default: 'Coupon'
            // },
            sliceLabel: {
                type: String,
                default: '10% OFF'
            },
            couponCode: {
                type: String,
                default: 'MA_GIAM_GIA_4'
            },
            gravity: {
                type: Number,
                default: 10
            },
            percent: {
                type: Number,
                default: 8.33
            }
        },
        slice_5: {
            // sliceType: {
            //     type: String,
            //     default: 'Coupon'
            // },
            sliceLabel: {
                type: String,
                default: '20% OFF'
            },
            couponCode: {
                type: String,
                default: 'MA_GIAM_GIA_5'
            },
            gravity: {
                type: Number,
                default: 10
            },
            percent: {
                type: Number,
                default: 8.33
            }
        },
        slice_6: {
            // sliceType: {
            //     type: String,
            //     default: 'Losing'
            // },
            sliceLabel: {
                type: String,
                default: 'May mắn lần sau'
            },
            couponCode: {
                type: String,
                default: ''
            },
            gravity: {
                type: Number,
                default: 10
            },
            percent: {
                type: Number,
                default: 8.33
            }
        },
        slice_7: {
            // sliceType: {
            //     type: String,
            //     default: 'Coupon'
            // },
            sliceLabel: {
                type: String,
                default: '5% OFF'
            },
            couponCode: {
                type: String,
                default: 'MA_GIAM_GIA_7'
            },
            gravity: {
                type: Number,
                default: 10
            },
            percent: {
                type: Number,
                default: 8.33
            }
        },
        slice_8: {
            // sliceType: {
            //     type: String,
            //     default: 'Coupon'
            // },
            sliceLabel: {
                type: String,
                default: '50% OFF'
            },
            couponCode: {
                type: String,
                default: 'MA_GIAM_GIA_8'
            },
            gravity: {
                type: Number,
                default: 10
            },
            percent: {
                type: Number,
                default: 8.33
            }
        },
        slice_9: {
            // sliceType: {
            //     type: String,
            //     default: 'Coupon'
            // },
            sliceLabel: {
                type: String,
                default: 'Voucher 50k'
            },
            couponCode: {
                type: String,
                default: 'MA_GIAM_GIA_9'
            },
            gravity: {
                type: Number,
                default: 10
            },
            percent: {
                type: Number,
                default: 8.33
            }
        },
        slice_10: {
            // sliceType: {
            //     type: String,
            //     default: 'Coupon'
            // },
            sliceLabel: {
                type: String,
                default: '30% OFF'
            },
            couponCode: {
                type: String,
                default: 'MA_GIAM_GIA_10'
            },
            gravity: {
                type: Number,
                default: 10
            },
            percent: {
                type: Number,
                default: 8.33
            }
        },
        slice_11: {
            // sliceType: {
            //     type: String,
            //     default: 'Coupon'
            // },
            sliceLabel: {
                type: String,
                default: 'May mắn lần sau'
            },
            couponCode: {
                type: String,
                default: ''
            },
            gravity: {
                type: Number,
                default: 10
            },
            percent: {
                type: Number,
                default: 8.33
            }
        },
        slice_12: {
            // sliceType: {
            //     type: String,
            //     default: 'Coupon'
            // },
            sliceLabel: {
                type: String,
                default: 'Voucher 100k'
            },
            couponCode: {
                type: String,
                default: 'MA_GIAM_GIA_12'
            },
            gravity: {
                type: Number,
                default: 10
            },
            percent: {
                type: Number,
                default: 8.33
            }
        }
    },
    setting: {
        showStatus: {
            type: Boolean,
            default: true
        },
        displayOption: {
            logo: {
                type: String,
                default: '',
                trim: true
            },
            title:{
                type: String,
                default: 'VÒNG QUAY MAY MẮN'
            },
            description: {
                type: String,
                default: 'Thử ngay vận may - có quay có trúng'
            },
            showEmail: {
                type: Boolean,
                default: true
            },
            showName: {
                type: Boolean,
                default: true
            },
            buttonWheelText: {
                type: String,
                default: 'Quay Ngay'
            },
            claimed: {
                show: {
                    type: Boolean,
                    default: true
                },
                valuePercent: {
                    type: Number,
                    default: 70
                },
                textclaimed: {
                    type: String,
                    default: '70% người đã may mắn! Còn bạn thì sao, quay ngay nào'
                }
            },
            rules: {
                type: String,
                default: '<strong>Luật quay</strong><br>- Bạn chỉ có thể quay một lần<br>- Các ưu đãi có giá trị sử dụng trong 15 phút<br>'
            },
            titleSuccessAfter: {
                type: String,
                default: 'Chúc mừng bạn đã chiến thắng<br>Bạn thật may mắn hôm nay'
            },
            descSuccessAfter: {
                type: String,
                default: 'Đừng quên sử dụng mã giảm giá khi thanh toán <br> Mã giảm giá của bạn là'
            },
            titleFailAfter: {
                type: String,
                default: 'Tiếc quá :('
            },
            descFailAfter: {
                type: String,
                default: 'Chúc bạn may mắn lần sau'
            },
        },
        colorOption: {
            backgroundColor: {
                type: String,
                default: '#960a98'
            },
            textColor: {
                type: String,
                default: '#fff'
            },
            backgroundButton: {
                type: String,
                default: '#000'
            },
            textColorButton: {
                type: String,
                default: '#fff'
            }
        },
        triggerPlacement: {
            showAfter: {
                type: Number,
                default: 5 //Thời gian hiện popup sau bao nhiêu giây
            },
            showTime: {
                type: Number,
                default: 14 // sau bao nhiêu ngày sẽ hiện lại popup
            },
            timeWheel: {
                type: Number,
                default: 8 // Thời gian quay 8s
            },
            timeNotify: {
                type: Number,
                default: 15 // Thời gian hiện thanh notify (phút)
            },
            timedTrigger: {
                type: Boolean,
                default: true
            },
            exitTrigger: {
                type: Boolean,
                default: true
            }
        }
    },
    mailchimp: {
        active: {
            type: Boolean,
            default: false
        },
        apiKey: {
            type: String
        },
        listID: {
            type: String
        }
    },
    shopName: {//hash
        type: String
    }
});

module.exports = mongoose.model('wheel', wheelSchema);