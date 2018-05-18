window.onload = function () {
    var $mac = null;    
    var ethernet = null;

    if(network) {
        $mac = network.ethernets[0].MACAddress;
    }else {
        alert('mac值有误，请检查参数');
    }

    ajax({
        type: "get",
        url: $edu_url + '/play_record?mac='+$mac,
        dataType: "json",
        success: function (response) {
            var data = response.data;
            if ( data == null ) {
                for ( var i = 0,_li=''; i < 10; i++ ) {
                    _li += '<li>'+
                                '<p class="noRecord">暂无资源</p>'+
                                '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                '<div class="bgfocus"></div>'+
                                '<div class="border"></div>'+
                            '</li>';
                }
                $(".classes").html(_li);
                $(".logout").elements[0].className = "logout focus";
            } else {
                for ( var i = 0,_li=""; i < data.length; i++ ) {
                    switch (data[i].type){
                        case "1":
                            if ( i == 0 ) {
                                _li+='<li class="active" data-num='+ i +' data-videoid='+data[i].video_id+' data-videosrc="'+data[i].video_path+'">'+
                                        '<p class="titleSmall">'+
                                            '<span>名校精品课堂</span>'+
                                            '<span>'+data[i].school_name+'</span>'+
                                        '</p>'+
                                        '<p class="titleBig">'+data[i].video_title+'</p>'+
                                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                        '<div class="bgfocus"></div>'+
                                        '<div class="border"></div>'+
                                    '</li>';
                            } else {
                                _li+='<li data-num='+ i +' data-videoid='+data[i].video_id+' data-videosrc="'+data[i].video_path+'">'+
                                        '<p class="titleSmall">'+
                                            '<span>名校精品课堂</span>'+
                                            '<span>'+data[i].school_name+'</span>'+
                                        '</p>'+
                                        '<p class="titleBig">'+data[i].video_title+'</p>'+
                                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                        '<div class="bgfocus"></div>'+
                                        '<div class="border"></div>'+
                                    '</li>';
                            }
                        break;
                        case "2":
                            if ( i == 0 ) {
                                _li+='<li class="active" data-num='+(i)+' data-videoid='+data[i].video_id+' data-videosrc="'+data[i].video_path+'">'+
                                        '<p class="titleSmall">'+
                                            '<span>高考冲刺</span>'+
                                            '<span>'+data[i].subject_name+'</span>'+
                                        '</p>'+
                                        '<p class="titleBig">'+data[i].video_title+'</p>'+
                                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                        '<div class="bgfocus"></div>'+
                                        '<div class="border"></div>'+
                                    '</li>';
                            } else {
                                _li+='<li data-num='+(i)+' data-videoid='+data[i].video_id+' data-videosrc="'+data[i].video_path+'">'+
                                        '<p class="titleSmall">'+
                                            '<span>高考冲刺</span>'+
                                            '<span>'+data[i].subject_name+'</span>'+
                                        '</p>'+
                                        '<p class="titleBig">'+data[i].video_title+'</p>'+
                                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                        '<div class="bgfocus"></div>'+
                                        '<div class="border"></div>'+
                                    '</li>';
                            }
                        break;
                        case "3":
                            if ( i == 0 ) {
                                _li+='<li class="active" data-num='+(i)+' data-videoid='+data[i].video_id+' data-videosrc="'+data[i].video_path+'">'+
                                        '<p class="titleSmall">'+
                                            '<span>中考冲刺</span>'+
                                            '<span>'+data[i].subject_name+'</span>'+
                                        '</p>'+
                                        '<p class="titleBig">'+data[i].video_title+'</p>'+
                                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                        '<div class="bgfocus"></div>'+
                                        '<div class="border"></div>'+
                                    '</li>';
                            } else {
                                _li+='<li data-num='+(i)+' data-videoid='+data[i].video_id+' data-videosrc="'+data[i].video_path+'">'+
                                        '<p class="titleSmall">'+
                                            '<span>中考冲刺</span>'+
                                            '<span>'+data[i].subject_name+'</span>'+
                                        '</p>'+
                                        '<p class="titleBig">'+data[i].video_title+'</p>'+
                                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                        '<div class="bgfocus"></div>'+
                                        '<div class="border"></div>'+
                                    '</li>';
                            }
                        break;
                        case "4":
                            if ( i == 0 ) {
                                _li+='<li class="active" data-num='+(i)+' data-videoid='+data[i].video_id+' data-videosrc="'+data[i].video_path+'">'+
                                        '<p class="titleSmall">'+
                                            '<span>名师名课</span>'+
                                            '<span>'+data[i].teacher_name+'</span>'+
                                        '</p>'+
                                        '<p class="titleBig">'+data[i].video_title+'</p>'+
                                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                        '<div class="bgfocus"></div>'+
                                        '<div class="border"></div>'+
                                    '</li>';
                            } else {
                                _li+='<li data-num='+(i)+' data-videoid='+data[i].video_id+' data-videosrc="'+data[i].video_path+'">'+
                                        '<p class="titleSmall">'+
                                            '<span>名师名课</span>'+
                                            '<span>'+data[i].teacher_name+'</span>'+
                                        '</p>'+
                                        '<p class="titleBig">'+data[i].video_title+'</p>'+
                                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                        '<div class="bgfocus"></div>'+
                                        '<div class="border"></div>'+
                                    '</li>';
                            }
                        break;
                        case "5":
                            if ( i == 0 ) {
                                _li+='<li class="active" data-num='+(i)+' data-videoid='+data[i].video_id+' data-videosrc="'+data[i].video_path+'">'+
                                        '<p class="titleSmall">'+
                                            '<span>获奖课程</span>'+
                                            '<span>'+data[i].prize_name+'</span>'+
                                            '<span>'+data[i].award_name+'</span>'+
                                        '</p>'+
                                        '<p class="titleBig">'+data[i].video_title+'</p>'+
                                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                        '<div class="bgfocus"></div>'+
                                        '<div class="border"></div>'+
                                    '</li>';
                            } else {
                                _li+='<li data-num='+(i)+' data-videoid='+data[i].video_id+' data-videosrc="'+data[i].video_path+'">'+
                                        '<p class="titleSmall">'+
                                            '<span>获奖课程</span>'+
                                            '<span>'+data[i].prize_name+'</span>'+
                                            '<span>'+data[i].award_name+'</span>'+
                                        '</p>'+
                                        '<p class="titleBig">'+data[i].video_title+'</p>'+
                                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                        '<div class="bgfocus"></div>'+
                                        '<div class="border"></div>'+
                                    '</li>';
                            }
                        break;
                        case "6":
                            if ( i == 0 ) {
                                _li+='<li class="active" data-num='+(i)+' data-videoid='+data[i].video_id+' data-videosrc="'+data[i].video_path+'">'+
                                        '<p class="titleSmall">'+
                                            '<span>研究型课程</span>'+
                                        '</p>'+
                                        '<p class="titleBig">'+data[i].video_title+'</p>'+
                                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                        '<div class="bgfocus"></div>'+
                                        '<div class="border"></div>'+
                                    '</li>';
                            } else {
                                _li+='<li data-num='+(i)+' data-videoid='+data[i].video_id+' data-videosrc="'+data[i].video_path+'">'+
                                        '<p class="titleSmall">'+
                                            '<span>研究型课程</span>'+
                                        '</p>'+
                                        '<p class="titleBig">'+data[i].video_title+'</p>'+
                                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                        '<div class="bgfocus"></div>'+
                                        '<div class="border"></div>'+
                                    '</li>';
                            }
                        break;
                        case "7":
                        case "8":
                        case "9":
                            if ( i == 0 ) {
                                _li+='<li class="active" data-num='+(i)+' data-videoid='+data[i].video_id+' data-videosrc="'+data[i].video_path+'">'+
                                        '<p class="titleSmall">'+
                                            '<span>'+data[i].stage_name+'课程</span>'+
                                            '<span>'+data[i].semester_name+'</span>'+
                                            '<span>'+data[i].subject_name+'</span>'+
                                        '</p>'+
                                        '<p class="titleBig">'+data[i].video_title+'</p>'+
                                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                        '<div class="bgfocus"></div>'+
                                        '<div class="border"></div>'+
                                    '</li>';
                            } else {
                                _li+='<li data-num='+(i)+' data-videoid='+data[i].video_id+' data-videosrc="'+data[i].video_path+'">'+
                                        '<p class="titleSmall">'+
                                            '<span>'+data[i].stage_name+'课程</span>'+
                                            '<span>'+data[i].semester_name+'</span>'+
                                            '<span>'+data[i].subject_name+'</span>'+
                                        '</p>'+
                                        '<p class="titleBig">'+data[i].video_title+'</p>'+
                                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                                        '<div class="bgfocus"></div>'+
                                        '<div class="border"></div>'+
                                    '</li>';
                            }
                        break;
                    }
                    $(".classes").html(_li);
                }
            }
            
            if ( window.location.href.indexOf("webAddress") > 0 ) {
                var activeSe = Number(window.location.href.split("webAddress=")[1]),
                    classesEle = $(".classes li").elements;
                    
                $(".active").elements[0].className = "";
                classesEle[activeSe].className = "active";
            }

            // if ( data.length < 10 ) {
            //     for ( var i = data.length,_li=''; i < 10; i++ ) {
            //         _li += '<li data-num="'+(55)+'">'+
            //                     '<p class="noRecord">没有历史记录</p>'+
            //                     '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
            //                     '<div class="bgfocus"></div>'+
            //                     '<div class="border"></div>'+
            //                 '</li>';
            //     }
            //     $(".classes").append(_li);
            // }

        }
    });
}

function topKeyDown () {
    if ( $(".classes li.active").elements.length > 0 ) {
        var ele = $(".classes li").elements;
        var $num = Number($(".active").attr("data-num"));
        
        if ( $num > 1 ) {
            ele[$num].className = "";
            ele[$num-2].className = "active";
        } else
        if ( $num == 0 || $num == 1 ) {
            ele[$num].className = "";
            $(".logout").elements[0].className = "logout focus";
        }
    }
}

function downKeyDown () {
    if ( $(".classes li.active").elements.length > 0 ) {
        var ele = $(".classes li").elements;
        var titLen = $(".classes .titleBig").elements.length;
        var $num = Number($("li.active").attr("data-num"));
        if ( $num < titLen-2) {
            ele[$num].className = "";
            ele[$num+2].className = "active";
        }
    } else
    if ( $(".head .focus").elements.length > 0 && $(".noRecord").elements.length < 10) {
        $(".logout").elements[0].className = "logout normal";
        $(".classes li").elements[0].className = "active";
    }
}

function leftKeyDown () {
    if ( $(".classes li.active").elements.length > 0 ) {
        var ele = $(".classes li").elements;
        var $num = Number($(".active").attr("data-num"));

        if ( $num % 2 != 0 ) {
            ele[$num].className = "";
            ele[$num-1].className = "active";
        }
    }
}

function rightKeyDown () {
    if ( $(".classes li.active").elements.length > 0 ) {
        var ele = $(".classes li").elements;
        var titLen = $(".classes .titleBig").elements.length;
        var $num = Number($(".active").attr("data-num"));

        if ( $num % 2 == 0 && $num != titLen-1 ) {
            ele[$num].className = "";
            ele[$num+1].className = "active";
        }
    }
}

function enterKeyDown () {
    if ( $(".head .focus").elements.length > 0 ) {
        var $param = Number(location.href.split("?")[1].split("&")[1].split("=")[1]);
        window.location.href = 'home.html?active=' + $param; 
    } else
    if ( $(".classes li.active").elements.length > 0 ) {
        var $url = $(".active").attr("data-videosrc"),
            activeS = $(".active").attr("data-num");

        if ( window.location.href.indexOf("webAddress") > -1 ) {
            var ori = window.location.href.split("html/")[1],
                webStr = ori.split("webAddress=")[1];
               
            webAddress = window.location.href.split("webAddress=")[0]+"webAddress="+webStr.replace(webStr,activeS);
        } else {
            webAddress = window.location.href.split("html/")[1]+"&webAddress="+activeS;
        }

        window.location.href = "./media.html?video="+$url+"&"+webAddress;
    }
}

function escKeyDown () {
    var strMatch = window.location.href.indexOf("freeClasses");
    var $param = Number(location.href.split("?")[1].split("&")[1].split("=")[1]);
    if ( strMatch > -1 ) {
        window.location.href = 'home.html?active=' + $param;
    }
}