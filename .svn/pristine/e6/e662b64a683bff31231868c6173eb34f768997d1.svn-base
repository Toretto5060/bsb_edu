var dataParams = {};
var paramsArr = decodeURI(location.href).split("?")[1].split("&");
var typeValue = '';

window.onload = function () {
    switch (paramsArr[0]) {
        case "mx":
            typeValue = 1;
            if ( window.location.href.indexOf("webAddress") > 0 ) {
                var locateParams = window.location.href.split("webAddress=")[1],
                    currentPa = Number(locateParams.split("&")[1]);

                ajaxGetInformation(1, paramsArr[3], currentPa, 0);
            } else {
                ajaxGetInformation(1,paramsArr[3],1);
            }
            
        break;
        case "ms":
            typeValue = 4;    
            if ( window.location.href.indexOf("webAddress") > 0 ) {
                var locateParams = window.location.href.split("webAddress=")[1],
                    currentPa = Number(locateParams.split("&")[1]);

                ajaxGetInformation(2, paramsArr[3], currentPa, 0);
            } else {
                ajaxGetInformation(2,paramsArr[3],1);
            }
            
        break;
    }
}

function topKeyDown () {
    if ( $(".classes li.active").elements.length > 0 ) {
        var ele = $(".active").elements[0].parentNode.childNodes;
        var $num = Number($(".active").attr("data-num"));
        if ( $num > 1 ) {
            ele[$num].className = "";
            ele[$num-2].className = "active";
        } else
        if ( $num == 0 || $num == 1 ) {
            ele[$num].className = "";
            $(".logout").elements[0].className = "logout focus";
        }
    } else
    if ( $(".footer p.active").elements.length > 0 ) {
        var ele = $(".classes li").elements;
        var eleLength = $(".classes li").elements.length;
        ele[eleLength-1].className = "active";
        $(".footer .active").hide();
        $(".footer .active").elements[0].className = "border";
    }
}

function downKeyDown () {
    if ( $(".classes li.active").elements.length > 0 ) {
        var ele = $(".active").elements[0].parentNode.childNodes;
        var $num = Number($(".active").attr("data-num"));
        if ( $num < ele.length-2 ) {
            ele[$num].className = "";
            ele[$num+2].className = "active";
        } else
        if ( $num == ele.length-1 || $num == ele.length-2 ) {
            ele[$num].className = "";
            $(".prevPage .border").elements[0].className = "border active";
            $(".prevPage .border").show();
        }
    } else
    if ( $(".head .focus").elements.length > 0 ) {
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
    } else
    if ( $(".nextPage p.active").elements.length > 0 ) {
        $(".nextPage .border").hide();
        $(".nextPage .border").elements[0].className = "border";
        $(".prevPage .border").show();
        $(".prevPage .border").elements[0].className = "border active";
    }
}

function rightKeyDown () {
    if ( $(".classes li.active").elements.length > 0 ) {
        var ele = $(".classes li").elements;
        var $num = Number($(".active").attr("data-num"));

        if ( $num % 2 == 0 && $num != ele.length-1 ) {
            ele[$num].className = "";
            ele[$num+1].className = "active";
        }
    } else
    if ( $(".prevPage p.active").elements.length > 0 ) {
        $(".prevPage .border").hide();
        $(".prevPage .border").elements[0].className = "border";
        $(".nextPage .border").show();
        $(".nextPage .border").elements[0].className = "border active";
    }
}

function enterKeyDown () {
    if ( $(".nextPage .selectAble").elements.length > 0 && $(".nextPage .active").elements.length > 0 ) {
        var currentPage = parseInt($(".currentPage").html());
        var lastPage = parseInt($(".lastPage").html());

        if ( currentPage < lastPage ) {
            switch ( paramsArr[0] ) {
                case "mx":
                    ajaxGetInformation(1, paramsArr[3], currentPage+1);
                break;
                case "ms":
                    ajaxGetInformation(2, paramsArr[3], currentPage+1);
                break;
            }
        }
        lastPage = null;
        currentPage = null;
    } else
    if ( $(".prevPage .selectAble").elements.length > 0 && $(".prevPage .active").elements.length > 0 ) {
        var currentPage = parseInt($(".currentPage").html());
        var lastPage = parseInt($(".lastPage").html());

        if ( currentPage != 1 ) {
            switch ( paramsArr[0] ) {
                case "mx":
                    ajaxGetInformation(1, paramsArr[3], currentPage-1);
                break;
                case "ms":
                    ajaxGetInformation(2, paramsArr[3], currentPage-1);
                break;
            }
        }
        lastPage = null;
        currentPage = null;
    } else
    if ( $(".head .focus").elements.length > 0 ) {
        var $active = Number(paramsArr[4].split("=")[1]);
        var $activeIndex = Number(paramsArr[5].split('=')[1]);

        switch ( paramsArr[0] ) {
            case "mx":
                window.location.href = 'schoolTeacher.html?0&category=mx&active='+$active+'&index='+$activeIndex;
            break;
            case "ms":
                window.location.href = 'schoolTeacher.html?0&category=ms&active='+$active+'&index='+$activeIndex;
            break;
        }
    } else
    if ( $(".classes li.active").elements.length > 0 ) {
        var video_id = $(".active").attr("data-videoid"),
            $url = $(".active").attr("data-videosrc"),
            $title = $(".active .character").html(),
            gradeId = Number($(".active").attr("data-gradeid")),
            activeS = $(".active").attr("data-num"),
            currentP = $(".currentPage").html(),
            $aaaCode = "",
            $bossCode = "";

        if ( window.location.href.indexOf("webAddress") > 0 ) {
            var ori = window.location.href.split("html/")[1],
                oriStr = ori.split("=")[3];
                
            webAddress = ori.replace(oriStr,activeS+"&"+currentP);
        } else {
            webAddress = window.location.href.split("html/")[1]+"&webAddress="+activeS+"&"+currentP;
        }

        switch (paramsArr[0]) {
            case "mx":
                var $type = "elite_school";
                $aaaCode = "70020";
                $bossCode = "800700000171";
            break;
        
            case "ms":
                var $type = "elite_teacher";
                $aaaCode = "70019";
                $bossCode = "800700000170";
            break;
        }
    
        if (gradeId) {
            window.location.href = "./media.html?video="+$url+"&"+webAddress;
            videoRecord(video_id,$type,$url,$title,$aaaCode);
        } else {
            authentic({
                url: $url,
                aaaCode: $aaaCode,
                bossCode: $bossCode
            },webAddress,111,video_id,$type,$url,$title,$aaaCode);
        }
    } 
}

function pageUpKeyDown() {
    var currentPage = parseInt($(".currentPage").html());
    var lastPage = parseInt($(".lastPage").html());

    if ( currentPage != 1 ) {
        switch ( paramsArr[0] ) {
            case "mx":
                ajaxGetInformation(1, paramsArr[3], currentPage-1);
            break;
            case "ms":
                ajaxGetInformation(2, paramsArr[3], currentPage-1);
            break;
        }
    }

    $(".term").html("");
    $(".prevPage .border").show();
    $(".nextPage .border").hide();
    $(".prevPage .border").elements[0].className = "border active";
    $(".nextPage .border").elements[0].className = "border";
    
    lastPage = null;
    currentPage = null;
}

function pageDownKeyDown() {
    var currentPage = parseInt($(".currentPage").html());
    var lastPage = parseInt($(".lastPage").html());

    if ( currentPage < lastPage ) {
        switch ( paramsArr[0] ) {
            case "mx":
                ajaxGetInformation(1, paramsArr[3], currentPage+1);
            break;
            case "ms":
                ajaxGetInformation(2, paramsArr[3], currentPage+1);
            break;
        }
    }

    $(".term").html("");
    $(".nextPage .border").show();
    $(".prevPage .border").hide();
    $(".nextPage .border").elements[0].className = "border active";
    $(".prevPage .border").elements[0].className = "border";

    lastPage = null;
    currentPage = null;
}

function escKeyDown () {
    var $active = Number(paramsArr[4].split("=")[1]);
    var $activeIndex = Number(paramsArr[5].split('=')[1]);

    switch ( paramsArr[0] ) {
        case "mx":
            window.location.href = 'schoolTeacher.html?0&category=mx&active='+$active+'&index='+$activeIndex;
        break;
        case "ms":
            window.location.href = 'schoolTeacher.html?0&category=ms&active='+$active+'&index='+$activeIndex;
        break;
    }
}

function ajaxGetInformation(type,params,page,webAddress){
    switch (type) {
        case 1:
            dataParams = {
                is_famous_school: 1,
                school_ids: params,
                page: page
            }
        break;
        case 2:
            dataParams = {
                is_famous_teacher: 1,
                teacher_ids: params,
                page: page
            }
        break;
    }

    ajax({
        type: "get",
        url: $edu_url + "/video",
        data: dataParams,
        success: function (response) {
            var lastPage = response.data.last_page;//总页数
            var currentPage = response.data.current_page;//当前页数 

            if ( parseInt(lastPage) == 0 ) {
                currentPage = 0;
            }

            switch (paramsArr[0]) {
                case "mx":
                    $('.stage-title').html(response.data.school_name);    
                break;
                case "ms":
                    $('.stage-title').html(response.data.teacher_name+'老师');
                break;
            }

            $(".currentPage").html(currentPage);
            $(".lastPage").html(lastPage);

            var data = response.data.data;

            for ( var i = 0, _li = ""; i < data.length; i++ ) {
                var titleName = "";
                if ( data[i].grade_id == 1 ) {
                    titleName = "(免费)"+data[i].video_title;
                } else {
                    titleName = data[i].video_title;
                }

                if ( $(".classes li").elements.length == 0 ) {
                    if ( i == 0 ) {
                        _li += '<li class="active" data-gradeid="'+data[i].grade_id+'" data-num="'+(i)+'" data-videoid="'+data[i].id+"-"+typeValue+'" data-videoSrc="'+data[i].video_url+'">'+
                                    '<div class="character">'+titleName+'</div>'+
                                    '<div class="bottCor"></div>'+
                                    '<div class="border"></div>'+
                                '</li>';
                    } else {
                        _li += '<li data-gradeid="'+data[i].grade_id+'" data-num="'+(i)+'" data-videoid="'+data[i].id+"-"+typeValue+'" data-videoSrc="'+data[i].video_url+'">'+
                                    '<div class="character">'+titleName+'</div>'+
                                    '<div class="bottCor"></div>'+
                                    '<div class="border"></div>'+
                                '</li>';
                    }
                } else {
                    _li += '<li data-gradeid="'+data[i].grade_id+'" data-num="'+(i)+'" data-videoid="'+data[i].id+"-"+typeValue+'" data-videoSrc="'+data[i].video_url+'">'+
                                '<div class="character">'+titleName+'</div>'+
                                '<div class="bottCor"></div>'+
                                '<div class="border"></div>'+
                            '</li>';
                }
            }
            $(".classes").html(_li);

            if ( webAddress == 0 ) {
                if ( window.location.href.indexOf("webAddress") > 0 ) {
                    var locateParams = window.location.href.split("webAddress=")[1],
                        activeSe = Number(locateParams.split("&")[0]);
                    
                    var classesEle = $(".classes li").elements;
                    $(".active").elements[0].className = "";
                    classesEle[activeSe].className = "active";
                }
            }

            if ( parseInt(lastPage) <= 1 || parseInt(currentPage) == parseInt(lastPage) ) {
                $(".nextPage .bgFocus").elements[0].className = "bgFocus";
            } else {
                $(".nextPage .bgFocus").elements[0].className = "bgFocus selectAble";
            }

            if( parseInt(currentPage) == 1 || parseInt(lastPage) == 0 ){
                $(".prevPage .bgFocus").elements[0].className = "bgFocus";
            }else{
                $(".prevPage .bgFocus").elements[0].className = "bgFocus selectAble";
            }

            lastPage = null;
            currentPage = null;
            data = null;
            _li = null;
        }
    });
}