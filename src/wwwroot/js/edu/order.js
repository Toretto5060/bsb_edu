// 本地测试IP
var _IP = "http://10.27.172.4/webpublish/educenter/backend/public/api/v1/ocn/";

// 订购接口
var $order = _IP + "order_prod";


var leftKeyDown = function () {
    if ($('.list').elements.length > 1) {
        if ($('.list .confirm').elements[1].className != "confirm active") return false;
        $('.list .confirm').elements[1].className = "confirm";
        $('.list .confirm').elements[0].className = "confirm active";
    } else {
        return false;
    }
}

var rightKeyDown = function () {
    if ($('.list').elements.length > 1) {
        if ($('.list .confirm').elements[0].className != "confirm active") return false;
        $('.list .confirm').elements[0].className = "confirm";
        $('.list .confirm').elements[1].className = "confirm active";
    } else {
        return false;
    }
}

var topKeyDown = function () {
    if ($('.list .confirm').elements[0].className != 'confirm active') return false;
    if ($('.list .confirm').elements[0].className == "confirm active") {
        $('.list .confirm').elements[0].className = "confirm";
    } else if ($('.list .confirm').elements[1].className == "confirm active") {
        $('.list .confirm').elements[1].className = "confirm";
    }
    $('.log_out').elements[0].className = "log_out active";
}

var downKeyDown = function () {
    if ($('.log_out').elements[0].className != "log_out active") return false;
    $('.log_out').elements[0].className = "log_out";
    $('.content .list .confirm').elements[0].className = "confirm active";
}

var enterKeyDown = function () {
    if ($('.log_out').elements[0].className == "log_out active") {
        window.history.go(-1);
    } else if (document.getElementById("inner").className != "") {
        /*
            下面的一句是演示用的demo，这个地方只配做demo
        */
        // $('.list .confirm').elements[0].className = "confirm active";
        // return $('.alert').elements[2].style.display = "none";


        /*
            以下是正确的逻辑
        */
        var inner_class =document.getElementById("inner").className;
        document.getElementById("inner").className = "";
        $('.list .confirm').elements[0].className = "confirm active";
        if (inner_class == 'success') {
            window.history.go(-1);
            $('.alert_success').elements[0].style.display = "none";
        } else {
            $('.alert_success').elements[2].style.display = "none";
        }
    } else if ($('.list .active').elements.length) {
        // 演示用
        // $('.list .active').elements[0].className = "confirm";
        // $('#inner').elements[0].className = "fail"
        // return $('.alert').elements[2].style.display = "block";

        /*
            以下是正确的逻辑
        */
        var mac = $('.list .active').attr('data-mac');
        var prodinstid = $('.list .active').attr('data-prodinstid');
        var offerid = $('.list .active').attr('data-offerid');
        if (!mac || !prodinstid || !offerid) {
            return alert("参数有误，请检查mac值，instid值， offerid值");
        }
        ajax({
            type: 'post',
            url: $order,
            data: {
                mac: mac,
                prod_inst_id: prodinstid,
                offer_id: offerid
            },
            success: function (res) {
                if (res.data.code == "000000") {
                    document.getElementById("inner").className = 'success';
                    $('.alert_success').elements[0].style.display = "block";
                } else {
                    document.getElementById("inner").className = 'fail';
                    $('.alert_success').elements[2].style.display = "block";
                }
            }
        });
        $('.list .confirm').elements[0].className = "confirm";
    }
}

var escKeyDown = function () {
    var returnWeb = window.location.href.split("cutline=")[1];
    window.location.href=returnWeb;
}