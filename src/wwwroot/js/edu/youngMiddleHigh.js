var params_arr = window.location.href.split("?")[1].split("&");
var paramsId = Number(params_arr[0].split("=")[1]);

window.onload = function () {
    var $gradeId = null,$categoryId = null;

    switch (paramsId) {
        case 1:
            $gradeId = 5;
            $categoryId = 4;
            $(".navigate").css("width","1128px");
        break;
    
        case 2:
            $gradeId = 10;
            $categoryId = 9;
            $(".navigate").css("width","896px");
        break;

        case 3:
            $gradeId = 14;
            $categoryId = 13;
            $(".navigate").css("width","664px");
        break;
    }

    if ( window.location.href.indexOf("selectedInx=") > -1 ) {
        var selectedInx = Number(params_arr[3].split('=')[1]);
        var selectID = Number(params_arr[5].split('=')[1]);
        ajaxGetInformation("/category", {category_id: paramsId},selectedInx);
        ajaxGetInformation("/subject", {category_id: selectID},selectedInx);
    } else {
        var selectedInx = 0;
        ajaxGetInformation("/category", {category_id: paramsId},selectedInx);
        ajaxGetInformation("/subject", {category_id: $categoryId},selectedInx);
    }
}

function ajaxGetInformation(address,params,selectedInx){
    ajax({
        type: "get",
        url: $edu_url + address,
        dataType: "json",
        data: params,
        success: function (response) {
            if ( address == "/category" ) {
                var data = response.data;
                // console.log(data);
                switch (paramsId) {
                    case 1:
                        for ( var i = 0, nav_li = "";i < data.length; i++ ) {
                            if ( i == selectedInx ) {
                                nav_li +='<li>'+
                                            '<span>'+data[i].name+'</span>'+
                                            '<div class="liBg"></div>'+
                                            '<div data-num="'+(i)+'" data-id="'+data[i].id+'" class="bgf bgfocus"></div>'+
                                            '<div class="border"></div>'+
                                        '</li>';
                            } else {
                                nav_li +='<li>'+
                                            '<span>'+data[i].name+'</span>'+
                                            '<div class="liBg"></div>'+
                                            '<div data-num="'+(i)+'" data-id="'+data[i].id+'" class="bgf"></div>'+
                                            '<div class="border"></div>'+
                                        '</li>';
                            }
                        }
                    break;
                
                    case 2:
                        for ( var i = 0, nav_li = '';i < data.length; i++ ) {
                            if ( i == selectedInx ) {
                                nav_li +='<li>'+
                                            '<span>'+data[i].name+'</span>'+
                                            '<div class="liBg"></div>'+
                                            '<div data-num="'+(i)+'" data-id="'+data[i].id+'" class="bgf bgfocus"></div>'+
                                            '<div class="border"></div>'+
                                        '</li>';
                            } else {
                                nav_li +='<li>'+
                                            '<span>'+data[i].name+'</span>'+
                                            '<div class="liBg"></div>'+
                                            '<div data-num="'+(i)+'" data-id="'+data[i].id+'" class="bgf"></div>'+
                                            '<div class="border"></div>'+
                                        '</li>';
                            }
                        }
                    break;

                    case 3:
                        for ( var i = 0, nav_li = '';i < data.length; i++ ) {
                            if ( i == selectedInx ) {
                                nav_li +='<li>'+
                                            '<span>'+data[i].name+'</span>'+
                                            '<div class="liBg"></div>'+
                                            '<div data-num="'+(i)+'" data-id="'+data[i].id+'" class="bgf bgfocus"></div>'+
                                            '<div class="border"></div>'+
                                        '</li>';
                            } else {
                                nav_li +='<li>'+
                                            '<span>'+data[i].name+'</span>'+
                                            '<div class="liBg"></div>'+
                                            '<div data-num="'+(i)+'" data-id="'+data[i].id+'" class="bgf"></div>'+
                                            '<div class="border"></div>'+
                                        '</li>';
                            }
                        }
                    break;
                }
                $(".navigate").html(nav_li);
                data = null;
                nav_li = null;
            } else
            if ( address == "/subject" ) {
                var data = response.data;
                var originalArr = data; 
                var len = originalArr.length;
                originalArr.unshift(originalArr[len-1]);
                originalArr.push(originalArr[1]);
                // console.log(originalArr);
                
                for ( var i = 0, _slide = "";i < originalArr.length; i++ ) {
                    if ( i == 1 ) {
                        _slide+= '<li class="site" data-num="'+(i)+'" data-classes="'+originalArr[i].category_id+'" data-subject="'+ originalArr[i].subject_id +'" data-term="'+originalArr[i].category_name+'">'+
                                    '<img src="'+originalArr[i].path+'">'+
                                    '<div class="border"></div>'+
                                '</li>';
                    } else {
                        _slide+= '<li data-num="'+(i)+'" data-classes="'+originalArr[i].category_id+'" data-subject="'+ originalArr[i].subject_id +'" data-term="'+originalArr[i].category_name+'">'+
                                    '<img src="'+originalArr[i].path+'">'+
                                    '<div class="border"></div>'+
                                '</li>';
                    }
                }
                var swiperW = '<ul class="swiperWrapper" style="left:-270px">"'+_slide+'"</ul>';

                $(".swiperContent").html(swiperW);

                if ( window.location.href.indexOf("swiperInx=") > -1 ) {
                    var $index = Number(params_arr[4].split('=')[1]);
                    $(".swiperWrapper").css("left", -(580*($index-1)+270) + "px");
                    var eles = $(".swiperWrapper li").elements;
                    $(".swiperWrapper li.site").elements[0].className = "";
                    eles[$index].className = "site";
                }

                if ( $(".navigate li.active").elements.length == 0 ) {
                    $(".swiperWrapper li.site").elements[0].className = "active site";
                }

                _slide = "";
                originalArr = "";
            }
        }
    });
}

function topKeyDown () {
    if ( $(".swiperWrapper li.active").elements.length > 0 ) {
        $(".active").elements[0].className = "site";
        $(".bgfocus").elements[0].parentNode.className = "active";
    } else
    if ( $(".navigate li.active").elements.length > 0 ) {
        $(".active").elements[0].className = "";
        $(".logout").elements[0].className = "logout focus";
    }
}

function downKeyDown () {
    if ( $(".navigate li.active").elements.length > 0 ) {
        $(".active").elements[0].className = "";
        $(".site").elements[0].className = "active site";
    } else 
    if ( $(".head .focus").elements.length > 0 ) {
        $(".logout").elements[0].className = "logout normal";
        $(".bgfocus").elements[0].parentNode.className = "active";
    }
}

function leftKeyDown () {
    if ( $(".navigate li.active").elements.length > 0 ) {
        var $num = Number($(".bgfocus").attr("data-num"));
        var $ele = $(".navigate li").elements;
        var $len = $(".navigate li").elements.length;

        if ( $num != 0 ) {
            $(".active .bgf").elements[0].className = "bgf";
            $ele[$num].className = "";
            $ele[$num-1].className = "active";
            $(".active .bgf").elements[0].className = "bgf bgfocus";

            switch (paramsId) {
                case 1:
                    ajaxGetInformation("/subject",{
                        category_id: $num + 3
                    });
                break;
            
                case 2:
                    ajaxGetInformation("/subject",{
                        category_id: $num + 8
                    });
                break;

                case 3:
                    ajaxGetInformation("/subject",{
                        category_id: $num + 12
                    });
                break;
            }
        }

    } else
    if ( $(".swiperWrapper li.active").elements.length > 0 ) {
        var $num = Number($(".active").attr("data-num"));
        var eleWrap = $(".swiperWrapper li").elements;
        var len = $(".swiperWrapper li").elements.length;
        var wrapLeft = parseInt($(".swiperWrapper").elements[0].offsetLeft);

        if ( wrapLeft < -270 ) {
            var newRight = wrapLeft+580;
            $(".swiperWrapper").css("left",newRight + "px");
        } else
        if ( wrapLeft > -((len-3)*580+270) ) {
            $(".swiperWrapper").css("left",-((len-3)*580+270) + "px");
        }

        if ( $num == 1 ) {
            eleWrap[$num].className = "";
            eleWrap[len-2].className = "active site";
        } else {
            eleWrap[$num].className = "";
            eleWrap[$num-1].className = "active site";
        }
    }
}

function rightKeyDown () {
    if ( $(".navigate li.active").elements.length > 0 ) {
        var $num = Number($(".bgfocus").attr("data-num"));
        var $ele = $(".navigate li").elements;
        var $len = $(".navigate li").elements.length;
       
        if ( $num != $len-1 ) {
            $(".active .bgf").elements[0].className = "bgf";
            $ele[$num].className = "";
            $ele[$num+1].className = "active";
            $(".active .bgf").elements[0].className = "bgf bgfocus";

            switch (paramsId) {
                case 1:
                    ajaxGetInformation("/subject",{
                        category_id: $num + 5
                    });
                break;
            
                case 2:
                    ajaxGetInformation("/subject",{
                        category_id: $num + 10
                    });
                break;

                case 3:
                    ajaxGetInformation("/subject",{
                        category_id: $num + 14
                    });
                break;
            }
        }

    } else
    if ( $(".swiperWrapper li.active").elements.length > 0 ) {
        var $num = Number($(".active").attr("data-num"));
        var eleWrap = $(".swiperWrapper li").elements;
        var len = $(".swiperWrapper li").elements.length;
        var wrapLeft = parseInt($(".swiperWrapper").elements[0].offsetLeft);
        
        if ( wrapLeft >= -((len-4)*580+270) ) {
            var newRight = wrapLeft-580;
            $(".swiperWrapper").css("left",newRight + "px");
        } else
        if ( wrapLeft < -((len-4)*580+270) ) {
            $(".swiperWrapper").css("left","-270px");
        }

        if ( $num > 0 && $num < len-2 ) {
            eleWrap[$num].className = "";
            eleWrap[$num+1].className = "active site";
        } else {
            eleWrap[$num].className = "";
            eleWrap[1].className = "active site";
        }
    }
}

function enterKeyDown () {
    if ( $(".swiperWrapper li.active").elements.length > 0 ) {
        var $activeIndex = $(".swiperWrapper li.active").attr("data-num");
        var $selectedIndex = $(".navigate .bgfocus").attr("data-num");
        var selectId = $(".navigate .bgfocus").attr("data-id");
        var category_id = $(".swiperWrapper .active").attr("data-classes");
        var subject_id = $(".swiperWrapper .active").attr("data-subject");
        var term = $(".swiperWrapper li.active").attr("data-term");
        var $param_active = Number(params_arr[1].split("=")[1]);

        window.location.href="courseList.html?category_id="+category_id+"&subject_id="+subject_id+"&active="+$param_active+"&grade="+paramsId+"&term="+term+"&selectedInx="+$selectedIndex+"&index="+$activeIndex+'&select='+selectId;
    } else
    if ( $(".head .focus").elements.length > 0 ) {
        var $param_active = Number(params_arr[1].split("=")[1]);
        window.location.href = "home.html?active=" + $param_active;
    }
}

function escKeyDown () {
    var strMatch = window.location.href.indexOf("youngMiddleHigh");
    var $param_active = Number(params_arr[1].split("=")[1]);
    if ( strMatch > -1 ) {
        window.location.href = 'home.html?active=' + $param_active;
    }
}