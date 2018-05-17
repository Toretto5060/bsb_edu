window.onload = function () {
    if ( window.location.href.indexOf("webAddress") > 0 ) {
        var locateParams = window.location.href.split("webAddress=")[1],
            firHasBeenSe = Number(locateParams.split("&")[0]),
            detailIde = Number(locateParams.split("&")[2]),
            currentPa = Number(locateParams.split("&")[4]);

        ajaxGetInformation('get', '/award', "", firHasBeenSe);
        ajaxGetInformation('get', '/video', {award_detail_id:detailIde, page:currentPa}, 0);
    } else {
        ajaxGetInformation('get','/award');
        ajaxGetInformation('get', '/video', {award_detail_id:1});
    }
}

function topKeyDown () {
    if ( $(".firstNav li.active").elements.length > 0 ) {
        $(".active").elements[0].className = "hasBeenSelected";
        $(".logout").elements[0].className = "logout focus";
    } else
    if ( $(".secondNav li.active").elements.length > 0 ) { 
        $(".firstNav li.hasBeenSelected").elements[0].className = "active";
        $(".secondNav li.active").elements[0].className = "hasBeenSelected";  
    } else
    if ( $(".classes li.active").elements.length > 0 ) {
        var ele = $(".active").elements[0].parentNode.childNodes;
        var $num = Number($(".active").attr("data-num"));
        if ( $num > 1 ) {
            ele[$num].className = "";
            ele[$num-2].className = "active";
        } else
        if ( $num == 0 || $num == 1 ) {
            ele[$num].className = "";
            $(".secondNav li.hasBeenSelected").elements[0].className = "active";
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
    if ( $(".head .focus").elements.length > 0 ) {
        $(".logout").elements[0].className = "logout normal";
        $(".firstNav li.hasBeenSelected").elements[0].className = "active";
    } else
    if ( $(".firstNav li.active").elements.length > 0 ) {
        $(".active").elements[0].className = "hasBeenSelected";
        $(".secondNav li.hasBeenSelected").elements[0].className = "active";
    } else
    if ( $(".secondNav li.active").elements.length > 0 ) {
        $(".active").elements[0].className = "hasBeenSelected";
        $(".classes li").elements[0].className = "active";
    } else
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
    }
}

function leftKeyDown () {
    if ( $(".firstNav li.active").elements.length > 0 ) {
        var ele = $(".firstNav li").elements;
        var $num = Number($(".active").attr("data-num"));
        if ( $num != 0 ) {
            ele[$num].className = "";
            ele[$num-1].className = "active";

            ajax({
                type: "get",
                url: $edu_url+"/award",
                success: function (response) {
                    var data = response.data[$num-1].details;
                    for ( var s = 0, _li = ""; s < data.length; s++ ) {
                        if ( s == 0 ) {
                            _li += '<li class="hasBeenSelected" data-num="'+(s)+'" data-id="'+data[0].id+'"'+
                                        '<p>'+data[0].name+'</p>'+
                                        '<div></div>'+
                                    '</li>';
                        } else {
                            _li += '<li data-num="'+(s)+'" data-id="'+data[s].id+'"'+
                                        '<p>'+data[s].name+'</p>'+
                                        '<div></div>'+
                                    '</li>';
                        }
                    }
                    $(".secondNav").html(_li);
                    data = null;
                    _li = null;

                    ajaxGetInformation("get","/video",{award_detail_id:1});
                }
            });
        }
    } else
    if ( $(".secondNav li.active").elements.length > 0 ) {
        var ele = $(".secondNav li").elements;
        var $num = Number($(".active").attr("data-num"));
        var $id = Number($(".active").attr("data-id"));
        if ( $num != 0 ) {
            ele[$num].className = "";
            ele[$num-1].className = "active";

            ajaxGetInformation("get","/video",{award_detail_id: $id-1});
        }
    } else
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
    if ( $(".firstNav li.active").elements.length > 0 ) {
        var ele = $(".firstNav li").elements;
        var $num = Number($(".active").attr("data-num"));
        if ( $num < ele.length-1 ) {
            ele[$num].className = "";
            ele[$num+1].className = "active";

            ajax({
                type: "get",
                url: $edu_url+"/award",
                success: function (response) {
                    var data = response.data[$num+1].details;
                    for ( var s = 0, _li = ""; s < data.length; s++ ) {
                        if ( s == 0 ) {
                            _li += '<li class="hasBeenSelected" data-num="'+(s)+'" data-id="'+data[0].id+'"'+
                                        '<p>'+data[0].name+'</p>'+
                                        '<div></div>'+
                                    '</li>';
                        } else {
                            _li += '<li data-num="'+(s)+'" data-id="'+data[s].id+'"'+
                                        '<p>'+data[s].name+'</p>'+
                                        '<div></div>'+
                                    '</li>';
                        }
                    }
                    $(".secondNav").html(_li);
                    data = null;
                    _li = null;

                    ajaxGetInformation("get","/video",{award_detail_id:4});
                }
            });
        }
    } else
    if ( $(".secondNav li.active").elements.length > 0 ) {
        var ele = $(".secondNav li").elements;
        var $num = Number($(".active").attr("data-num"));
        var $id = Number($(".active").attr("data-id"));
        if ( $num < ele.length-1 ) {
            ele[$num].className = "";
            ele[$num+1].className = "active";

            ajaxGetInformation("get","/video",{award_detail_id: $id+1});
        }
    } else
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
        var detail_id = $(".secondNav .hasBeenSelected").attr("data-id");
        
        if ( currentPage < lastPage ) {
            ajaxGetInformation("get","/video",{
                award_detail_id: detail_id,
                page: currentPage+1
            });
        }
    } else
    if ( $(".prevPage .selectAble").elements.length > 0 && $(".prevPage .active").elements.length > 0 ) {
        var currentPage = parseInt($(".currentPage").html());
        var lastPage = parseInt($(".lastPage").html());
        var detail_id = $(".secondNav .hasBeenSelected").attr("data-id");

        if ( currentPage != 1 ) {
            ajaxGetInformation("get","/video",{
                award_detail_id: detail_id,
                page: currentPage-1
            });
        }
    } else
    if ( $(".head .focus").elements.length > 0 ) {
        var $param = Number(location.href.split('?')[1].split("&")[1].split("=")[1]);
        window.location.href = 'home.html?active=' + $param;
    } else
    if ( $(".classes li.active").elements.length > 0 ) {
        var video_id = $(".active").attr("data-videoid"),
            $url = $(".active").attr("data-videosrc"),
            $title = $(".active .character").html(),
            gradeId = Number($(".active").attr("data-gradeid")),
            firHasBeenS = $(".firstNav .hasBeenSelected").attr("data-num"),
            secHasBeenS = $(".secondNav .hasBeenSelected").attr("data-num"),
            detailId = $(".secondNav .hasBeenSelected").attr("data-id"),
            activeS = $(".active").attr("data-num"),
            currentP = $(".currentPage").html(),
            $type = "award";

        if ( window.location.href.indexOf("webAddress") > 0 ) {
            var ori = window.location.href.split("html/")[1],
                oriStr = ori.split("=")[3];
            webAddress = ori.replace(oriStr,firHasBeenS+"&"+secHasBeenS+"&"+detailId+"&"+activeS+"&"+currentP);
        } else {
            webAddress = window.location.href.split("html/")[1]+"&webAddress="+firHasBeenS+"&"+secHasBeenS+"&"+detailId+"&"+activeS+"&"+currentP;
        }
        
        if (gradeId) {
            window.location.href = "./media.html?video="+$url+"&"+webAddress;
            videoRecord(video_id,$type,$url,$title,"70024");
        } else {
            authentic({
                url: $url,
                aaaCode: "70024",
                bossCode: "800700000175"
            },webAddress,111,video_id,$type,$url,$title,"70024");
        }
    }
}

function pageUpKeyDown() {
    var currentPage = parseInt($(".currentPage").html());
    var lastPage = parseInt($(".lastPage").html());

    if ( $(".secondNav li.active").elements.length > 0 ) {
        var detail_id = $(".secondNav .active").attr("data-id");
    } else {
        var detail_id = $(".secondNav .hasBeenSelected").attr("data-id");
    }
    
    if ( currentPage != 1 ) {
        ajaxGetInformation("get","/video",{
            award_detail_id: detail_id,
            page: currentPage-1
        });
    }

    $(".term").html("");
    $(".prevPage .border").show();
    $(".nextPage .border").hide();
    $(".prevPage .border").elements[0].className = "border active";
    $(".nextPage .border").elements[0].className = "border";

    if ( $(".firstNav li.active").elements.length > 0 ) {
        $(".active").elements[0].className = "hasBeenSelected";
    }
    if ( $(".secondNav li.active").elements.length > 0 ) {
        $(".active").elements[0].className = "hasBeenSelected";
    }
}

function pageDownKeyDown() {
    var currentPage = parseInt($(".currentPage").html());
    var lastPage = parseInt($(".lastPage").html());

    if ( $(".secondNav li.active").elements.length > 0 ) {
        var detail_id = $(".secondNav .active").attr("data-id");
    } else {
        var detail_id = $(".secondNav .hasBeenSelected").attr("data-id");
    }
    
    if ( currentPage < lastPage ) {
        ajaxGetInformation("get","/video",{
            award_detail_id: detail_id,
            page: currentPage+1
        });
    }

    $(".term").html("");
    $(".nextPage .border").show();
    $(".prevPage .border").hide();
    $(".nextPage .border").elements[0].className = "border active";
    $(".prevPage .border").elements[0].className = "border";

    if ( $(".firstNav li.active").elements.length > 0 ) {
        $(".active").elements[0].className = "hasBeenSelected";
    }
    if ( $(".secondNav li.active").elements.length > 0 ) {
        $(".active").elements[0].className = "hasBeenSelected";
    }
}

function escKeyDown () {
    var $param = Number(location.href.split('?')[1].split("&")[1].split("=")[1]);
    var strMatch = window.location.href.indexOf("award");
    if ( strMatch > -1 ) {
        window.location.href = 'home.html?active=' + $param;
    }
}

function ajaxGetInformation(type,address,dataParams,webAddress){
    ajax({
        type: type,
        url: $edu_url+address,
        data: dataParams,
        success: function (response) {
            if ( address == "/award" ) {
                var data = response.data;
                for ( var i = 0, _li_1 = ""; i < data.length; i++ ) {
                    if ( i == 0 ) {
                        _li_1 += '<li class="active" data-num="'+(i)+'" data-id="'+data[i].id+'">'+
                                    '<p>'+data[0].name+'</p>'+
                                    '<div></div>'+
                                '</li>';
                    } else {
                        _li_1 += '<li data-num="'+(i)+'" data-id="'+data[i].id+'">'+
                                    '<p>'+data[i].name+'</p>'+
                                    '<div></div>'+
                                '</li>';
                    }
                }
                $(".firstNav").html(_li_1);
                data = null;
                _li_1 = null;

                if ( window.location.href.indexOf("webAddress") > 0 ) {
                    var secData = response.data[webAddress].details;
                } else {
                    var secData = response.data[0].details;
                }
                
                for ( var s = 0, _li_2 = ""; s < secData.length; s++ ) {
                    if ( s == 0 ) {
                        _li_2 += '<li class="hasBeenSelected" data-num="'+(s)+'" data-id="'+secData[0].id+'"'+
                                    '<p>'+secData[0].name+'</p>'+
                                    '<div></div>'+
                                '</li>';
                    } else {
                        _li_2 += '<li data-num="'+(s)+'" data-id="'+secData[s].id+'"'+
                                    '<p>'+secData[s].name+'</p>'+
                                    '<div></div>'+
                                '</li>';
                    }
                }
                $(".secondNav").html(_li_2);
                secData = null;
                _li_2 = null;
            } else
            if ( address == "/video" ) {
                var lastPage = response.data.last_page;//总页数
                var currentPage = response.data.current_page;//当前页数 

                if ( parseInt(lastPage) == 0 ) {
                    currentPage = 0;
                }

                $(".stage-title").html("获奖课程");

                $(".currentPage").html(currentPage);
                $(".lastPage").html(lastPage);

                var data = response.data.data;

                for ( var i = 0, _li_3 = ""; i < data.length; i++ ) {
                    var titleName = "";
                    if ( data[i].grade_id == 1 ) {
                        titleName = "(免费)"+data[i].video_title;
                    } else {
                        titleName = data[i].video_title;
                    }

                    _li_3 += '<li data-gradeid="'+data[i].grade_id+'" data-num="'+(i)+'" data-videoid="'+data[i].id+'-5-" data-videoSrc="'+data[i].video_url+'">'+
                                '<div class="character">'+titleName+'</div>'+
                                '<div class="bottCor"></div>'+
                                '<div class="border"></div>'+
                            '</li>';
                }
                $('.classes').html(_li_3);

                if ( webAddress == 0 ) {
                    if ( window.location.href.indexOf("webAddress") > 0 ) {
                        var locateParams = window.location.href.split("webAddress=")[1],
                            firHasBeenSe = Number(locateParams.split("&")[0]),
                            secHasBeenSe = Number(locateParams.split("&")[1]),
                            activeSe = Number(locateParams.split("&")[3]);
    
                            var firstNavEle = $(".firstNav li").elements,
                                secondNavEle = $(".secondNav li").elements,
                                classesEle = $(".classes li").elements;
                            $(".firstNav .active").elements[0].className = "";
                            $(".secondNav .hasBeenSelected").elements[0].className = "";
                            firstNavEle[firHasBeenSe].className = "hasBeenSelected";
                            secondNavEle[secHasBeenSe].className = "hasBeenSelected";
                            classesEle[activeSe].className = "active";
                    }
                }

                if ( parseInt(lastPage) <= 1 || parseInt(currentPage) == parseInt(lastPage) ) {
                    $('.nextPage .bgFocus').elements[0].className = "bgFocus";
                } else {
                    $('.nextPage .bgFocus').elements[0].className = "bgFocus selectAble";
                }

                if( parseInt(currentPage) == 1 || parseInt(lastPage) == 0 ){
                    $('.prevPage .bgFocus').elements[0].className = "bgFocus";
                }else{
                    $('.prevPage .bgFocus').elements[0].className = "bgFocus selectAble";
                }

                lastPage = null;
                currentPage = null;
                data = null;
                _li_3 = null;
            }
        }
    });
}