// var $IP = 'http://192.168.6.88:8081/';
// var IP = 'http://192.168.6.88:8081/';
// var $IP = 'http://192.168.100.123:8081/';
// var IP = 'http://192.168.100.123:8081/';
var $IP = 'http://10.27.172.4/webpublish/';
var IP = 'http://10.27.172.4/webpublish/';

// 教育的后台公共接口
var $edu_url = $IP + "educenter/backend/public/api/v1";   // 自测时是http://192.168.6.88:81/

// 播放历史记录接口  
var $video_record_url = $IP + "educenter/backend/public/api/v1/history";

// 四助的后台公共接口
var $connection_url = IP + "communitycenter/backend/public/api/v1";// 自测时是http://192.168.6.88:81/

// 机顶盒用户信息获取接口
// var $user_url = $IP + 'equipment2017/backend/public/api/v1/userinfo?sn=DN11gd1708000966';  // 自测时是http://192.168.6.88:81/

// 天气api接口
var $weather_api_url = IP + 'apiqueryproxy/backend/public/api/v1/admin/get_weather';

// 主页面天气图片接口
var $weather_pic_url = IP + 'cms/backend/public/storage/weather/maintitle/';

//便民服务后台公共接口
var $convenient_url = IP + 'apiqueryproxy/backend/public/api/v1/admin';



// 本地测试IP
var _IP = $edu_url + "/ocn/";
// 鉴权接口
var $authentication = _IP + "authorization";
// 可订购接口
var $can_be_ordered = _IP + "online_order";
// 去订购接口
var $order = _IP + "order_prod";
// 查询已订购接口
var have_been_ordered = _IP + "can_ordered_offer";



// 机顶盒mac地址
var $mac = null;
// var ethernetArray = null; //获取接收终端所有网卡对象数组
var ethernet = null;

// 机顶盒环境:删除以下注释
// alert(network.ethernets[0].MACAddress);
// if(network) {
//     $mac = network.ethernets[0].MACAddress;
// }else {
//     alert('mac值有误，请检查参数');
// }

function videoRecord(videoid,typename,contentid,titlename,servicecode) {
    ajax({
        type: "post",
        url: $video_record_url,
        data: {
            video_id: videoid,
            type: typename,
            mac: $mac,
            content_id: contentid,
            title_name: titlename,
            service_code: servicecode
        },
        success: function () {
            // console.log("调用视频播放记录接口成功");
        },
        error: function () {
            // console.log("调用视频播放记录接口失败");
        }
    });
}


/**  AAA接口
 *  播放视频鉴权函数
 *  各个栏目对应的server_code值
 * - 小学课程: 70016 √7
 * - 初中课程: 70017 √8
 * - 高中课程: 70018 √9
 * - 名师名课: 70019 √4
 * - 名校精品: 70020 √1
 * - 研究性课程: 70021 √6
 * - 高考冲刺: 70022 √2
 * - 中考冲刺: 70023 √3
 * - 获奖课程: 70024 √5
 */

/**  BOSS接口
 *  播放视频鉴权函数
 *  各个栏目对应的server_code值
 * - 小学课程: 800700000167 √7
 * - 初中课程: 800700000168 √8
 * - 高中课程: 800700000169 √9
 * - 名师名课: 800700000170 √4
 * - 名校精品: 800700000171 √1
 * - 研究性课程: 800700000172 √6
 * - 高考冲刺: 800700000173 √2
 * - 中考冲刺: 800700000174 √3
 * - 获奖课程: 800700000175 √5
 */


function authentic(params,addressP,num,viId,types,contentid,titlename,servicecode) {
    var aaaCode = params.aaaCode;
    var bossCode = params.bossCode;
    var _url = params.url;
    
    ajax({
        type: "get",
        url: $authentication,
        data: {
            service_codes: aaaCode,
            stb_sn: $mac
        },
        success: function (result) {
            if ( num == 000 ) {
                if (Number(result.data.result)) {
                    window.location.href = "./order.html?mac="+$mac+"&server_code="+bossCode+"&cutline="+addressP;
                } else {
                    window.location.href = "./media.html?video="+_url+"&"+addressP;
                }
            } else {
                if (Number(result.data.result)) {
                    window.location.href = "./order.html?mac="+$mac+"&server_code="+bossCode+"&cutline="+addressP;
                } else {
                    window.location.href = "./media.html?video="+_url+"&"+addressP;
                    videoRecord(viId,types,contentid,titlename,servicecode);
                }
            }
            
        }
    })
}
