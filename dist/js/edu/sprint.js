var params = window.location.href.split("?")[1].split("&")[0].split("=")[1];
var typeValue = '';
window.onload = function () {
    switch (params) {
        case "zk":
            typeValue = 3;
            if (window.location.href.indexOf("webAddress") > 0) {
                var locateParams = window.location.href.split("webAddress=")[1],
                    hasBeenSe = Number(locateParams.split("&")[0]),
                    currentPa = Number(locateParams.split("&")[2]);

                ajaxGetInformation('get', '/video', { is_middle_school_sprint: 1, subject_id: hasBeenSe + 1, page: currentPa }, 0);
            } else {
                ajaxGetInformation('get', '/video', { is_middle_school_sprint: 1, subject_id: 1 });
            }

            break;
        case "gk":
            typeValue = 2;
            if (window.location.href.indexOf("webAddress") > 0) {
                var locateParams = window.location.href.split("webAddress=")[1],
                    hasBeenSe = Number(locateParams.split("&")[0]),
                    currentPa = Number(locateParams.split("&")[2]);
                ajaxGetInformation('get', '/video', { is_high_school_sprint: 1, subject_id: hasBeenSe + 1, page: currentPa }, 0);
            } else {
                ajaxGetInformation('get', '/video', { is_high_school_sprint: 1, subject_id: 1 });
            }

            break;
        case "yy":
            typeValue = 6;
            if (window.location.href.indexOf("webAddress") > 0) {
                var locateParams = window.location.href.split("webAddress=")[1],
                    hasBeenSe = Number(locateParams.split("&")[0]),
                    currentPa = Number(locateParams.split("&")[2]);
                ajaxGetInformation('get', '/video', { is_research: 1, page: currentPa }, 0);
            } else {
                ajaxGetInformation('get', '/video', { is_research: 1 });
            }

            break;
    }
}

function ajaxGetInformation(type, address, dataParams, webAddress) {
    if (params == "yy") {
        $(".firstNav").hide();
        $(".navBg").hide();
        $(".classes").css("top", "124px");
    }

    ajax({
        type: type,
        url: $edu_url + address,
        data: dataParams,
        success: function (response) {
            if (address == "/video") {
                var lastPage = response.data.last_page;//总页数
                var currentPage = response.data.current_page;//当前页数 

                if (parseInt(lastPage) == 0) {
                    currentPage = 0;
                }

                switch (params) {
                    case "zk":
                        $(".stage-title").html("中考冲刺");
                        break;
                    case "gk":
                        $(".stage-title").html("高考冲刺");
                        break;
                    case "yy":
                        $(".stage-title").html("研究性课程");
                        break;
                }

                // $(".stage-title").html("中考冲刺");//加上这句，下面的2行当前页和最后页才能显示出来，原因不清楚

                $(".currentPage").html(currentPage);
                $(".lastPage").html(lastPage);

                var data = response.data.data;

                for (var i = 0, _li = ""; i < data.length; i++) {
                    var titleName = "";
                    if (data[i].grade_id == 1) {
                        titleName = "(免费)" + data[i].video_title;
                    } else {
                        titleName = data[i].video_title;
                    }

                    if ($(".firstNav .active").elements.length == 0 && $(".classes li").elements.length == 0) {
                        if (i == 0) {
                            if (params == "yy" || params == "zk" || params == "gk") {
                                _li += '<li class="active" data-gradeid="' + data[i].grade_id + '" data-num="' + (i) + '" data-videoid="' + data[i].id + "-" + typeValue + '" data-videosrc="' + data[0].video_url + '" data-title="' + titleName + '">' +
                                    '<div class="character">' + titleName + '</div>' +
                                    '<div class="bottCor"></div>' +
                                    '<div class="border"></div>' +
                                    '</li>'
                            }
                        } else {
                            _li += '<li data-gradeid="' + data[i].grade_id + '" data-num="' + (i) + '" data-videoid="' + data[i].id + "-" + typeValue + '" data-videosrc="' + data[i].video_url + '" data-title="' + titleName + '">' +
                                '<div class="character">' + titleName + '</div>' +
                                '<div class="bottCor"></div>' +
                                '<div class="border"></div>' +
                                '</li>'
                        }
                    } else {
                        _li += '<li data-gradeid="' + data[i].grade_id + '" data-num="' + (i) + '" data-videoid="' + data[i].id + "-" + typeValue + '" data-videosrc="' + data[i].video_url + '" data-title="' + titleName + '">' +
                            '<div class="character">' + titleName + '</div>' +
                            '<div class="bottCor"></div>' +
                            '<div class="border"></div>' +
                            '</li>'
                    }
                }
                $(".classes").html(_li);

                if (webAddress == 0) {
                    if (window.location.href.indexOf("webAddress") > 0) {
                        var locateParams = window.location.href.split("webAddress=")[1],
                            hasBeenSe = Number(locateParams.split("&")[0]),
                            activeSe = Number(locateParams.split("&")[1]);

                        var firstNavEle = $(".firstNav li").elements,
                            classesEle = $(".classes li").elements;
                        $(".hasBeenSelected").elements[0].className = "";
                        $(".active").elements[0].className = "";
                        firstNavEle[hasBeenSe].className = "hasBeenSelected";
                        classesEle[activeSe].className = "active";
                    }
                }

                // if ($(".classes .active").elements.length > 0) {
                //     setTimeout(function marquee() {
                //         var $title = $(".active").attr("data-title");
                //         // alert($title);
                //         var $marqueeText = "<marquee width='470'>"+$title+"</marquee>";
                //         $(".active .character").html($marqueeText);
                //     }, 3000)
                // }

                if (parseInt(lastPage) <= 1 || parseInt(currentPage) == parseInt(lastPage)) {
                    $(".nextPage .bgFocus").elements[0].className = "bgFocus";
                } else {
                    $(".nextPage .bgFocus").elements[0].className = "bgFocus selectAble";
                }

                if (parseInt(currentPage) == 1 || parseInt(lastPage) == 0) {
                    $(".prevPage .bgFocus").elements[0].className = "bgFocus";
                } else {
                    $(".prevPage .bgFocus").elements[0].className = "bgFocus selectAble";
                }

                lastPage = null;
                currentPage = null;
                data = null;
                _li = null;
            }
        }
    });
}

function topKeyDown() {
    if (params == "zk" || params == "gk") {
        if ($(".classes li.active").elements.length > 0) {
            var ele = $(".active").elements[0].parentNode.childNodes;
            var $num = Number($(".active").attr("data-num"));
            if ($num > 1) {
                ele[$num].className = "";
                ele[$num - 2].className = "active";
            } else
                if ($num == 0 || $num == 1) {
                    ele[$num].className = "";
                    $(".hasBeenSelected").elements[0].className = "active";
                }
        } else
            if ($(".firstNav li.active").elements.length > 0) {
                $(".active").elements[0].className = "hasBeenSelected";
                $(".logout").elements[0].className = "logout focus";
            } else
                if ($(".footer p.active").elements.length > 0) {
                    var ele = $(".classes li").elements;
                    var eleLength = $(".classes li").elements.length;
                    ele[eleLength - 1].className = "active";
                    $(".footer .active").hide();
                    $(".footer .active").elements[0].className = "border";
                }
    } else
        if (params == "yy") {
            if ($(".classes li.active").elements.length > 0) {
                var ele = $(".active").elements[0].parentNode.childNodes;
                var $num = Number($(".active").attr("data-num"));
                if ($num > 1) {
                    ele[$num].className = "";
                    ele[$num - 2].className = "active";
                } else
                    if ($num == 0 || $num == 1) {
                        ele[$num].className = "";
                        $(".logout").elements[0].className = "logout focus";
                    }
            } else
                if ($(".footer p.active").elements.length > 0) {
                    var ele = $(".classes li").elements;
                    var eleLength = $(".classes li").elements.length;
                    ele[eleLength - 1].className = "active";
                    $(".footer .active").hide();
                    $(".footer .active").elements[0].className = "border";
                }
        }
}

function downKeyDown() {
    if (params == "zk" || params == "gk") {
        if ($(".classes li.active").elements.length > 0) {
            var ele = $(".active").elements[0].parentNode.childNodes;
            var $num = Number($(".active").attr("data-num"));
            if ($num < ele.length - 2) {
                ele[$num].className = "";
                ele[$num + 2].className = "active";
            } else
                if ($num == ele.length - 1 || $num == ele.length - 2) {
                    ele[$num].className = "";
                    $(".prevPage .border").elements[0].className = "border active";
                    $(".prevPage .border").show();
                }
        } else
            if ($(".firstNav li.active").elements.length > 0) {
                $(".active").elements[0].className = "hasBeenSelected";
                $(".classes li").elements[0].className = "active";
            } else
                if ($(".head .focus").elements.length > 0) {
                    $(".logout").elements[0].className = "logout normal";
                    $(".hasBeenSelected").elements[0].className = "active";
                }
    } else
        if (params == "yy") {
            if ($(".classes li.active").elements.length > 0) {
                var ele = $(".active").elements[0].parentNode.childNodes;
                var $num = Number($(".active").attr("data-num"));
                if ($num < ele.length - 2) {
                    ele[$num].className = "";
                    ele[$num + 2].className = "active";
                } else
                    if ($num == ele.length - 1 || $num == ele.length - 2) {
                        ele[$num].className = "";
                        $(".prevPage .border").elements[0].className = "border active";
                        $(".prevPage .border").show();
                    }
            } else
                if ($(".head .focus").elements.length > 0) {
                    $(".logout").elements[0].className = "logout normal";
                    $(".classes li").elements[0].className = "active";
                }
        }
}

function leftKeyDown() {
    if (params == "zk" || params == "gk") {
        if ($(".firstNav li.active").elements.length > 0) {
            var ele = $(".firstNav li").elements;
            var $num = Number($(".active").attr("data-num"));
            if ($num != 0) {
                ele[$num].className = "";
                ele[$num - 1].className = "active";

                switch (params) {
                    case "zk":
                        ajaxGetInformation("get", "/video", {
                            is_middle_school_sprint: 1,
                            subject_id: $num
                        });
                        break;
                    case "gk":
                        ajaxGetInformation("get", "/video", {
                            is_high_school_sprint: 1,
                            subject_id: $num
                        });
                        break;
                }
            }
        } else
            if ($(".classes li.active").elements.length > 0) {
                var ele = $(".classes li").elements;
                var $num = Number($(".active").attr("data-num"));

                if ($num % 2 != 0) {
                    ele[$num].className = "";
                    ele[$num - 1].className = "active";
                }
            } else
                if ($(".nextPage p.active").elements.length > 0) {
                    $(".nextPage .border").hide();
                    $(".nextPage .border").elements[0].className = "border";
                    $(".prevPage .border").show();
                    $(".prevPage .border").elements[0].className = "border active";
                }
    } else
        if (params == "yy") {
            if ($(".classes li.active").elements.length > 0) {
                var ele = $(".classes li").elements;
                var $num = Number($(".active").attr("data-num"));

                if ($num % 2 != 0) {
                    ele[$num].className = "";
                    ele[$num - 1].className = "active";
                }
            } else
                if ($(".nextPage p.active").elements.length > 0) {
                    $(".nextPage .border").hide();
                    $(".nextPage .border").elements[0].className = "border";
                    $(".prevPage .border").show();
                    $(".prevPage .border").elements[0].className = "border active";
                }
        }
}

function rightKeyDown() {
    if (params == "zk" || params == "gk") {
        if ($(".firstNav li.active").elements.length > 0) {
            var ele = $(".firstNav li").elements;
            var $num = Number($(".active").attr("data-num"));
            if ($num < ele.length - 1) {
                ele[$num].className = "";
                ele[$num + 1].className = "active";

                switch (params) {
                    case "zk":
                        ajaxGetInformation("get", "/video", {
                            is_middle_school_sprint: 1,
                            subject_id: $num + 2
                        });
                        break;
                    case "gk":
                        ajaxGetInformation("get", "/video", {
                            is_high_school_sprint: 1,
                            subject_id: $num + 2
                        });
                        break;
                }
            }
        } else
            if ($(".classes li.active").elements.length > 0) {
                var ele = $(".classes li").elements;
                var $num = Number($(".active").attr("data-num"));

                if ($num % 2 == 0 && $num != ele.length - 1) {
                    ele[$num].className = "";
                    ele[$num + 1].className = "active";
                }
            } else
                if ($(".prevPage p.active").elements.length > 0) {
                    $(".prevPage .border").hide();
                    $(".prevPage .border").elements[0].className = "border";
                    $(".nextPage .border").show();
                    $(".nextPage .border").elements[0].className = "border active";
                }
    } else
        if (params == "yy") {
            if ($(".classes li.active").elements.length > 0) {
                var ele = $(".classes li").elements;
                var $num = Number($(".active").attr("data-num"));

                if ($num % 2 == 0 && $num != ele.length - 1) {
                    ele[$num].className = "";
                    ele[$num + 1].className = "active";
                }
            } else
                if ($(".prevPage p.active").elements.length > 0) {
                    $(".prevPage .border").hide();
                    $(".prevPage .border").elements[0].className = "border";
                    $(".nextPage .border").show();
                    $(".nextPage .border").elements[0].className = "border active";
                }
        }
}

function enterKeyDown() {
    if ($(".nextPage .selectAble").elements.length > 0 && $(".nextPage .active").elements.length > 0) {
        var currentPage = parseInt($(".currentPage").html());
        var lastPage = parseInt($(".lastPage").html());
        var subject_id = parseInt($(".hasBeenSelected").attr("data-num"));

        if (currentPage < lastPage) {
            switch (params) {
                case "zk":
                    ajaxGetInformation("get", "/video", {
                        is_middle_school_sprint: 1,
                        subject_id: subject_id + 1,
                        page: currentPage + 1
                    });
                    break;
                case "gk":
                    ajaxGetInformation("get", "/video", {
                        is_high_school_sprint: 1,
                        subject_id: subject_id + 1,
                        page: currentPage + 1
                    });
                    break;
                case "yy":
                    ajaxGetInformation("get", "/video", {
                        is_research: 1,
                        page: currentPage + 1
                    });
                    break;
            }
        }
    } else
        if ($(".prevPage .selectAble").elements.length > 0 && $(".prevPage .active").elements.length > 0) {
            var currentPage = parseInt($(".currentPage").html());
            var lastPage = parseInt($(".lastPage").html());
            var subject_id = parseInt($(".hasBeenSelected").attr("data-num"));

            if (currentPage != 1) {
                switch (params) {
                    case "zk":
                        ajaxGetInformation("get", "/video", {
                            is_middle_school_sprint: 1,
                            subject_id: subject_id + 1,
                            page: currentPage - 1
                        });
                        break;
                    case "gk":
                        ajaxGetInformation("get", "/video", {
                            is_high_school_sprint: 1,
                            subject_id: subject_id + 1,
                            page: currentPage - 1
                        });
                        break;
                    case "yy":
                        ajaxGetInformation("get", "/video", {
                            is_research: 1,
                            page: currentPage - 1
                        });
                        break;
                }
            }
        } else
            if ($(".head .focus").elements.length > 0) {
                var $param = Number(location.href.split('?')[1].split("&")[1].split("=")[1]);
                window.location.href = 'home.html?active=' + $param;
            } else
                if ($(".classes li.active").elements.length > 0) {
                    var video_id = $(".active").attr("data-videoid"),
                        $url = $(".active").attr("data-videosrc"),
                        $title = $(".active .character").html(),
                        gradeId = Number($(".active").attr("data-gradeid")),
                        hasBeenS = $(".hasBeenSelected").attr("data-num"),
                        activeS = $(".active").attr("data-num"),
                        currentP = $(".currentPage").html(),
                        $aaaCode = "",
                        $bossCode = "";

                    if (window.location.href.indexOf("webAddress") > 0) {
                        var ori = window.location.href.split("html/")[1],
                            oriStr = ori.split("=")[3];
                        webAddress = ori.replace(oriStr, hasBeenS + "&" + activeS + "&" + currentP);
                    } else {
                        webAddress = window.location.href.split("html/")[1] + "&webAddress=" + hasBeenS + "&" + activeS + "&" + currentP;
                    }

                    switch (params) {
                        case "zk":
                            var $type = "middle_school_sprint";
                            $aaaCode = "70023";
                            $bossCode = "800700000174";
                            break;

                        case "gk":
                            var $type = "high_school_sprint";
                            $aaaCode = "70022";
                            $bossCode = "800700000173";
                            break;

                        case "yy":
                            var $type = "research";
                            $aaaCode = "70021";
                            $bossCode = "800700000172";
                            break;
                    }

                    if (gradeId) {
                        window.location.href = "./media.html?video=" + $url + "&" + webAddress;
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

    if ( $(".firstNav li.active").elements.length > 0 ) {
        var subject_id = parseInt($(".active").attr("data-num"));
    } else {
        var subject_id = parseInt($(".hasBeenSelected").attr("data-num"));
    }
    
    if (currentPage != 1) {
        switch (params) {
            case "zk":
                ajaxGetInformation("get", "/video", {
                    is_middle_school_sprint: 1,
                    subject_id: subject_id + 1,
                    page: currentPage - 1
                });
                break;
            case "gk":
                ajaxGetInformation("get", "/video", {
                    is_high_school_sprint: 1,
                    subject_id: subject_id + 1,
                    page: currentPage - 1
                });
                break;
            case "yy":
                ajaxGetInformation("get", "/video", {
                    is_research: 1,
                    page: currentPage - 1
                });
                break;
        }
    }

    $(".term").html("");
    $(".prevPage .border").show();
    $(".nextPage .border").hide();
    $(".prevPage .border").elements[0].className = "border active";
    $(".nextPage .border").elements[0].className = "border";

    if ( $(".firstNav li.active").elements.length > 0 ) {
        $(".active").elements[0].className = "hasBeenSelected";
    }
}

function pageDownKeyDown() {
    var currentPage = parseInt($(".currentPage").html());
    var lastPage = parseInt($(".lastPage").html());

    if ( $(".firstNav li.active").elements.length > 0 ) {
        var subject_id = parseInt($(".active").attr("data-num"));
    } else {
        var subject_id = parseInt($(".hasBeenSelected").attr("data-num"));
    }
    
    if (currentPage < lastPage) {
        switch (params) {
            case "zk":
                ajaxGetInformation("get", "/video", {
                    is_middle_school_sprint: 1,
                    subject_id: subject_id + 1,
                    page: currentPage + 1
                });
                break;
            case "gk":
                ajaxGetInformation("get", "/video", {
                    is_high_school_sprint: 1,
                    subject_id: subject_id + 1,
                    page: currentPage + 1
                });
                break;
            case "yy":
                ajaxGetInformation("get", "/video", {
                    is_research: 1,
                    page: currentPage + 1
                });
                break;
        }
    }

    $(".term").html("");
    $(".nextPage .border").show();
    $(".prevPage .border").hide();
    $(".nextPage .border").elements[0].className = "border active";
    $(".prevPage .border").elements[0].className = "border";

    if ( $(".firstNav li.active").elements.length > 0 ) {
        $(".active").elements[0].className = "hasBeenSelected";
    }
}

function escKeyDown() {
    var $param = Number(location.href.split('?')[1].split("&")[1].split("=")[1]);
    var strMatch = window.location.href.indexOf("sprint");
    if (strMatch > -1) {
        window.location.href = 'home.html?active=' + $param;
    }
}