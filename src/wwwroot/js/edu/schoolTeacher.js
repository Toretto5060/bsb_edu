var param = window.location.href.split("?")[1].split("&")[1].split("=")[1];
var active = window.location.href.split("?")[1].split("&")[2].split("=")[1];

window.onload = function () {
    switch (param) {
        case "mx":
            $(".stage-title").html("选择名校");
            ajaxGetInformation("/school?is_famous=1");
        break;
        case "ms":
            $(".stage-title").html("选择名师");
            ajaxGetInformation("/teacher?is_famous=1");
        break;
    }
}
function ajaxGetInformation(address){
    ajax({
        type: "get",
        url: $edu_url + address,
        dataType: "json",
        success: function (response) {
            var data = response.data;
            var originalArr = data; 
            var len = originalArr.length;
            originalArr.unshift(originalArr[len-1]);
            originalArr.push(originalArr[1]);
            // console.log(originalArr);

            for ( var i = 0, _slide = ""; i < originalArr.length;i++ ) {
                if ( i == 1 ) {
                    _slide+= '<li class="active site" data-num="'+(i)+'" style="filter:alpha(opacity=100)" data-id="'+originalArr[i].id+'" data-name="'+originalArr[i].name+'">'+
                                '<img src="'+originalArr[i].img_url+'">'+
                                '<div class="border"></div>'+
                            '</li>';
                } else {
                    _slide+= '<li data-num="'+(i)+'" style="filter:alpha(opacity=70)" data-id="'+originalArr[i].id+'" data-name="'+originalArr[i].name+'">'+
                                '<img src="'+originalArr[i].img_url+'">'+
                                '<div class="border"></div>'+
                            '</li>';
                } 
            }
            
            for ( var o = 0,_bullet = ""; o < originalArr.length-2; o++ ) {
                if ( o == 0 ) {
                    _bullet+= '<div data-num="'+(o)+'" class="circleSelected"></div>';
                } else {
                    _bullet+= '<div data-num="'+(o)+'" class="circleNormal"></div>';
                }
            }

            $(".swiperWrapper").html(_slide);
            $(".swiperPagination").html(_bullet);

            if ( window.location.href.indexOf("index=") > -1 ) {
                var $index = Number(window.location.href.split("?")[1].split("&")[3].split("=")[1]);
                $(".swiperWrapper").css("left", -(680*$index+400) + "px");
                var eles = $(".swiperWrapper li").elements;
                $(".swiperWrapper li.active").elements[0].className = "";
                eles[$index+1].className = "active site";
                $(".swiperPagination div.circleSelected").elements[0].className = "circleNormal";
                $(".swiperPagination div").elements[$index].className = "circleSelected";
            }
            
            _slide = "";
            _bullet = "";
        }
    });
}

function topKeyDown () {
    if ( $(".swiperWrapper li.active").elements.length > 0 ) {
        $(".active").elements[0].className = "site";
        $(".logout").elements[0].className = "logout focus";
    }
}

function downKeyDown () {
    if ( $(".head .focus").elements.length > 0 ) {
        $(".logout").elements[0].className = "logout normal";
        $(".site").elements[0].className = "site active";
    }
}

function leftKeyDown () {
    if ( $(".swiperWrapper li.active").elements.length > 0 ) {
        var $num = Number($(".active").attr("data-num"));
        var eleWrap = $(".swiperWrapper li").elements;
        var elePage = $(".swiperPagination div").elements;
        var len = $(".swiperWrapper li").elements.length;
        var wrapLeft = parseInt($(".swiperWrapper").elements[0].offsetLeft);
        
        if ( wrapLeft < -400 ) {
            var newRight = wrapLeft+680;
            $(".swiperWrapper").css("left",newRight + "px");
        } else
        if ( wrapLeft > -((len-3)*680+400) ) {
            $(".swiperWrapper").css("left",-((len-3)*680+400) + "px");
        }
        
        if ( $num == 1 ) {
            eleWrap[$num].className = "";
            eleWrap[len-2].className = "active site";
            elePage[0].className = "circleNormal";
            elePage[len-3].className = "circleSelected";
        } else {
            eleWrap[$num].className = "";
            eleWrap[$num-1].className = "active site";
            elePage[$num-1].className = "circleNormal";
            elePage[$num-2].className = "circleSelected";
        }
    }
}

function rightKeyDown () {
    if ( $(".swiperWrapper li.active").elements.length > 0 ) {
        var $num = Number($(".active").attr("data-num"));
        var eleWrap = $(".swiperWrapper li").elements;
        var elePage = $(".swiperPagination div").elements;
        var len = $(".swiperWrapper li").elements.length;
        var wrapLeft = parseInt($(".swiperWrapper").elements[0].offsetLeft);

        if ( wrapLeft >= -((len-4)*680+400) ) {
            var newRight = wrapLeft-680;
            $(".swiperWrapper").css("left",newRight + "px");
        } else
        if ( wrapLeft < -((len-4)*680+400) ) {
            $(".swiperWrapper").css("left","-400px");
        }

        if ( $num > 0 && $num < len-2 ) {
            eleWrap[$num].className = ""; 
            eleWrap[$num+1].className = "active site";
            elePage[$num-1].className = "circleNormal";
            elePage[$num].className = "circleSelected";
        } else {
            eleWrap[$num].className = "";
            eleWrap[1].className = "active site";
            elePage[$num-1].className = "circleNormal";
            elePage[0].className = "circleSelected";
        }
    }
}

function enterKeyDown () {
    if ( $(".swiperWrapper li.active").elements.length > 0 ) {
        var activeIndex = Number($(".circleSelected").attr("data-num"));
        var hrefParams = $(".active").attr("data-name");
        var paramsID = $(".active").attr("data-id");
        
        switch (param) {
            case "mx":
                window.location.href = "projectST.html?mx&"+hrefParams+"&-1&"+paramsID+"&active="+active+"&index="+activeIndex;
            break;
        
            case "ms":
                window.location.href = "projectST.html?ms&"+hrefParams+"&-1&"+paramsID+"&active="+active+"&index="+activeIndex;
            break;
        }
    } else
    if ( $(".head .focus").elements.length > 0 ) {
        window.location.href = "home.html?active=" + active;
    }
}

function escKeyDown () {
    var strMatch = window.location.href.indexOf("schoolTeacher");
    if ( strMatch > -1 ) {
        window.location.href = 'home.html?active=' + active;
    }
}