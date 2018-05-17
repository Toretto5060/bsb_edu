window.onload = function () {
    ajax({
        type: "get",
        url: $edu_url + "/video_rank",
        success: function (response) {
            var $data = response.data;
            for (var i = 0, _li_1 = ""; i < $data.length-5; i++) {
                if ( i == 0 ) {
                    _li_1 += '<li class="active" data-num="'+(i)+'" data-bossCode="'+$data[i].server_code+'" data-aaaCode="'+$data[i].service_code+'" data-videoid="'+$data[i].video_id+'-8" data-videosrc = "'+$data[i].video_path+'">'+
                                '<span class="nodeName">'+(i+1)+"&nbsp;&nbsp;"+ $data[i].video_title +'</span>'+
                                '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                '<div class="bgfocus"></div>'+
                                '<div class="border"></div>'+
                                '<div class="numberOne"></div>'+
                            '</li>';
                } else if ( i == 1 ) {
                    _li_1 += '<li data-num="'+(i)+'" data-bossCode="'+$data[i].server_code+'" data-aaaCode="'+$data[i].service_code+'" data-videoid="'+$data[i].video_id+'-8" data-videosrc = "'+$data[i].video_path+'">'+
                                '<span class="nodeName">'+(i+1)+"&nbsp;&nbsp;"+ $data[i].video_title +'</span>'+
                                '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                '<div class="bgfocus"></div>'+
                                '<div class="border"></div>'+
                                '<div class="numberTwo"></div>'+
                            '</li>';
                } else if ( i == 2 ) {
                    _li_1 += '<li data-num="'+(i)+'" data-bossCode="'+$data[i].server_code+'" data-aaaCode="'+$data[i].service_code+'" data-videoid="'+$data[i].video_id+'-8" data-videosrc = "'+$data[i].video_path+'">'+
                                '<span class="nodeName">'+(i+1)+"&nbsp;&nbsp;"+ $data[i].video_title +'</span>'+
                                '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                '<div class="bgfocus"></div>'+
                                '<div class="border"></div>'+
                                '<div class="numberThree"></div>'+
                            '</li>';
                } else {
                    _li_1 += '<li data-num="'+(i)+'" data-bossCode="'+$data[i].server_code+'" data-aaaCode="'+$data[i].service_code+'" data-videoid="'+$data[i].video_id+'-8" data-videosrc = "'+$data[i].video_path+'">'+
                                '<span class="nodeName">'+(i+1)+"&nbsp;&nbsp;"+ $data[i].video_title +'</span>'+
                                '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                '<div class="bgfocus"></div>'+
                                '<div class="border"></div>'+
                            '</li>';
                }
            }
            $('.classesFirst').html(_li_1);

            for (var i = 5, _li_2 = ""; i < $data.length; i++) {
                _li_2 += '<li data-num="'+(i)+'" data-bossCode="'+$data[i].server_code+'" data-aaaCode="'+$data[i].service_code+'" data-videoid="'+$data[i].video_id+'-8" data-videosrc = "'+$data[i].video_path+'">'+
                            '<span class="nodeName">'+(i+1)+"&nbsp;&nbsp;"+ $data[i].video_title +'</span>'+
                            '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                            '<div class="bgfocus"></div>'+
                            '<div class="border"></div>'+
                        '</li>';
            }
            $('.classesSecond').html(_li_2);

            if ( window.location.href.indexOf("webAddress") > 0 ) {
                var activeSe = Number(window.location.href.split("webAddress=")[1]),
                    classesEle = $(".mainRank li").elements;

                $(".active").elements[0].className = "";
                classesEle[activeSe].className = "active";
            }
        }
    });
}

function topKeyDown () {
    if ( $(".active").elements.length ) {
        var ele = $(".mainRank li").elements;
        var $num = Number($(".active").attr("data-num"));
        if ( $num==0 || $num==5 ) {
            ele[$num].className = "";
            $(".logout").elements[0].className = "logout focus";
        } else {
            ele[$num].className = "";
            ele[$num-1].className = "active";
        }
    }
}

function downKeyDown () {
    if ( $(".active").elements.length ) {
        var ele = $(".mainRank li").elements;
        var $num = Number($(".active").attr("data-num"));
        if ( $num==4 || $num==9 ) {
            return false;
        } else {
            ele[$num].className = "";
            ele[$num+1].className = "active";
        }
    } else
    if ( $(".logout").hasClass("focus") ) {
        $(".logout").elements[0].className = "logout normal";
        $(".classesFirst li").elements[0].className = "active";
    }
}

function leftKeyDown () {
    if ( $(".classesSecond .active").hasClass("active") ) {
        var $num = Number($(".active").attr("data-num"));
        var ele = $(".mainRank li").elements;
        ele[$num].className = "";
        ele[$num-5].className = "active";
    }
}

function rightKeyDown () {
    if ( $(".classesFirst .active").hasClass("active") ) {
        var $num = Number($(".active").attr("data-num"));
        var ele = $(".mainRank li").elements;
        ele[$num].className = "";
        ele[$num+5].className = "active";
    }
}

function enterKeyDown () {
    if ( $(".focus").elements.length > 0 ) {
        var $param = Number(location.href.split('?')[1].split("&")[1].split("=")[1]);
        window.location.href = 'home.html?active=' + $param;
    } else
    if ( $(".mainRank .active").hasClass("active") ) {
        var $url = $(".active").attr("data-videosrc"),
            $bossCode = $(".active").attr("data-bossCode"),
            $aaaCode = $(".active").attr("data-aaaCode"),
            activeS = $(".active").attr("data-num");

        if ( window.location.href.indexOf("webAddress") > -1 ) {
            var ori = window.location.href.split("html/")[1],
                webStr = ori.split("webAddress=")[1];

            webAddress = window.location.href.split("webAddress=")[0]+"webAddress="+webStr.replace(webStr,activeS);
        } else {
            webAddress = window.location.href.split("html/")[1]+"&webAddress="+activeS;
        }
        
        authentic({
            url: $url,
            aaaCode: $aaaCode,
            bossCode: $bossCode
        },webAddress,000);
    }
}

function escKeyDown () {
    var $param = Number(location.href.split('?')[1].split("&")[1].split("=")[1]);
    var strMatch = window.location.href.indexOf("rank");
    if ( strMatch > -1 ) {
        window.location.href = 'home.html?active=' + $param;
    }
}