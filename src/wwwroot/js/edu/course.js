var params_arr = location.href.split("?")[1].split("&"),
    category_id = Number(params_arr[0].split("=")[1]),
    subject_id = Number(params_arr[1].split("=")[1]),
    active = Number(params_arr[2].split("=")[1]),
    grades = Number(params_arr[3].split("=")[1]),
    term = decodeURI(params_arr[4].split("=")[1]),
    selectedInx = Number(params_arr[5].split("=")[1]),
    swiperInx = Number(params_arr[6].split("=")[1]),
    selectID = Number(params_arr[7].split("=")[1]),
    pageNo = 0,
    pageTotal = 0,
    totalPage = 0,
    pageBox = [];//储存"页数"以及对应的数据

window.onload = function () {
    if ( subject_id == 1 || subject_id == 3 ) {
        init_2();
    } else {
        init_1();
    }

    ajax({
        type: "get",
        url: $edu_url + "/chapter",
        dataType: "json",
        data: { "category_id":category_id, "subject_id":subject_id },
        success: function (response) {
            if ( response.status == 0 ) {
                $(".logout").elements[0].className = "logout focus";
            }

            datas = response.data;
            
            $(".stage-title").html(datas[0].category_name);

            if ( subject_id == 1 || subject_id == 3 ) {
                if ( window.location.href.indexOf("webAddress") > 0 ) {
                    $(".term").html("");  // 加上这句上一页和下一页才能显示出来
                    var locateParams = window.location.href.split("webAddress=")[1];
                    var currentPa = Number(locateParams.split("&")[1]);

                    dispose = dataDispose(datas, currentPa-1);
                    render_2(0);
                } else {
                    $(".term").html("");  // 加上这句上一页和下一页才能显示出来
                    dispose = dataDispose(datas, 0);
                    render_2();
                }
                
            } else {
                if ( window.location.href.indexOf("webAddress") > 0 ) {
                    $(".term").html("");  // 加上这句上一页和下一页才能显示出来
                    var locateParams = window.location.href.split("webAddress=")[1];
                    var currentPa = Number(locateParams.split("&")[2]);
                    
                    page(datas);
                    render_1(currentPa-1,0);
                } else {
                    $(".term").html("");  // 加上这句上一页和下一页才能显示出来
                    page(datas);
                    render_1(pageNo);
                }
            }
        }
    });
}

function page(data) {
    // 第一条数据 <=5的话
	// console.log(data[0]);
    var _arr = []; //储存每一页的数据
    
    if ( !data[0] ) {
		return;
    }
    
    if ( data[0].keypoinsts.length <= 5 ) {
        _arr.push({
			name: data[0].name,
			keypoinsts: data[0].keypoinsts
        });
        if ( !data[1] ) {
			pageBox.push(_arr);
			_arr = [];
			return;
        }
        
        //第二条数据也小于五
        if ( data[1].keypoinsts.length <= 5 ) {
            _arr.push({
				name: data[1].name,
				keypoinsts: data[1].keypoinsts
            });
            pageBox.push(_arr);
            _arr = [];
            data.splice(0, 2);
            page(data);
        } else
        if ( data[1].keypoinsts.length > 5 ) {
            _arr.push({
				name: data[1].name,
				keypoinsts: data[1].keypoinsts.slice(0, 5)
            });
            pageBox.push(_arr);
            _arr = [];
            
            var new_arr = {
				name: data[1].name,
				keypoinsts: data[1].keypoinsts.slice(5, data[1].keypoinsts.length)
            }

            data.splice(0, 2);
			data.unshift(new_arr);
			page(data);
        }
    } else {
        //  5< 第一条数据<= 10
        if ( data[0].keypoinsts.length <= 10 ) {
            _arr.push({
				name: data[0].name,
				keypoinsts: data[0].keypoinsts.slice(0, 5)
			}, {
				name: data[0].name,
				keypoinsts: data[0].keypoinsts.slice(5, data[0].keypoinsts.length)
            });
            pageBox.push(_arr);
			_arr = [];
			data.shift();
            page(data);
            
            // 第一条数据>10
        } else
        if ( data[0].keypoinsts.length > 10 ) {
            // console.log('==='+data[0].keypoinsts.length);
            _arr.push({
				name: data[0].name,
				keypoinsts: data[0].keypoinsts.slice(0, 5)
			});
			_arr.push({
				name: data[0].name,
				keypoinsts: data[0].keypoinsts.slice(5, 10)
            });
            pageBox.push(_arr);
			_arr = [];
			var new_arr = {
				name: data[0].name,
				keypoinsts: data[0].keypoinsts.slice(10, data[0].keypoinsts.length)
            };
            
            data.splice(0, 1);
			data.unshift(new_arr);
			page(data);
        }
    }
}

function dataDispose(data,currentPage) {
    var arrList = [];
    for ( var i = 0;i < data.length;i++ ) {
        if ( data[i].keypoinsts.length ) {
            for ( var r = 0;r < data[i].keypoinsts.length;r++ ) {
                arrList.push(data[i].keypoinsts[r]);
            }
        }
    }
    totalPage = Math.ceil(arrList.length / 10);

    var result = [];
    for ( var x = 0;x < Math.ceil(arrList.length / 10);x++ ) {
        var start = x * 10;
        var end = start + 10;
        result.push(arrList.slice(start, end));
    }
    // console.log(arrList);
    return result[currentPage];
}

function init_1(){
    var container = '<div class="listLeft">'+
                        '<p class="titleLeft"></p>'+
                        '<ul class="titleNameLf" data-num = 0></ul>'+
                    '</div>'+
                    '<div class="listRight">'+
                        '<p class="titleRight"></p>'+
                        '<ul class="titleNameRt" data-num = 1></ul>'+
                    '</div>'+
                    '<ul class="footer">'+
                            '<li class="prevPage">'+
                                '<p class="pages">上一页</p>'+
                                '<p class="bgOpa" style="filter:alpha(opacity=20)"></p>'+
                                '<p class="bgFocus"></p>'+
                                '<p class="border"></p>'+
                            '</li>'+
                            '<li class="pageInformation">'+
                                '<span>第</span>'+
                                '<span class="currentPage"></span>'+
                                '<span>/</span>'+
                                '<span class="lastPage"></span>'+
                                '<span>页</span>'+
                            '</li>'+
                            '<li class="nextPage">'+
                                '<p class="pages">下一页</p>'+
                                '<p class="bgOpa" style="filter:alpha(opacity=20)"></p>'+
                                '<p class="bgFocus"></p>'+
                                '<p class="border"></p>'+
                            '</li>'+
                        '</ul>';
        $(".mainCourseL").html(container);
}

function init_2(){
    var container = '<div class="navList">'+
                        '<ul class="classes"></ul>'+
                        '<ul class="footer">'+
                            '<li class="prevPage">'+
                                '<p class="pages">上一页</p>'+
                                '<p class="bgOpa" style="filter:alpha(opacity=20)"></p>'+
                                '<p class="bgFocus"></p>'+
                                '<p class="border"></p>'+
                            '</li>'+
                            '<li class="pageInformation">'+
                                '<span>第</span>'+
                                '<span class="currentPage"></span>'+
                                '<span>/</span>'+
                                '<span class="lastPage"></span>'+
                                '<span>页</span>'+
                            '</li>'+
                            '<li class="nextPage">'+
                                '<p class="pages">下一页</p>'+
                                '<p class="bgOpa" style="filter:alpha(opacity=20)"></p>'+
                                '<p class="bgFocus"></p>'+
                                '<p class="border"></p>'+
                            '</li>'+
                        '</ul>'+
                    '</div>';
        $(".mainCourseL").html(container);
}

function render_1(index,webAddress) {
    for ( var i = 0,_li_1 = ""; i < pageBox[index][0].keypoinsts.length; i++ ) {
        if ( i == 0 ) {
            _li_1 += '<li class="active" data-num="'+(i)+'" data-index="'+(i)+'">'+
                        '<span class="character">' + pageBox[index][0].keypoinsts[i].name + '</span>'+
                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                        '<div class="bgfocus"></div>'+
                        '<div class="border"></div>'+
                    '</li>';
        } else {
            _li_1 += '<li data-num="'+(i)+'" data-index="'+(i)+'">'+
                        '<span class="character">' + pageBox[index][0].keypoinsts[i].name +'</span>'+
                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                        '<div class="bgfocus"></div>'+
                        '<div class="border"></div>'+
                    '</li>';
        }
        $(".titleLeft").html(pageBox[index][0].name);
    }

    $(".titleNameLf").html(_li_1);

    if ( pageBox[index][1] ) {
        for ( var i = 0,_li_2 = ""; i < pageBox[index][1].keypoinsts.length; i++ ) {
            _li_2 += '<li data-num = "'+(i)+'" data-index="'+(i+$(".titleNameLf li").elements.length)+'">'+
                        '<span class="character">' + pageBox[index][1].keypoinsts[i].name + '</span>'+
                        '<div style="filter:alpha(opacity=20)" class="liBg"></div>'+
                        '<div class="bgfocus"></div>'+
                        '<div class="border"></div>'+
                    '</li>';
            $(".titleRight").html(pageBox[index][1].name);
        }
        $(".titleNameRt").html(_li_2);
    } else {
        $(".titleRight").html("");
        $(".titleNameRt").html("");
    }

    pageTotal = pageBox.length;
    $(".lastPage").html(pageTotal);

    if ( webAddress == 0 ) {
        if ( window.location.href.indexOf("webAddress") > 0 ) {
            var locateParams = window.location.href.split("webAddress=")[1],
                activeSe = Number(locateParams.split("&")[0]),
                ulInd = Number(locateParams.split("&")[1]);
                currentPa = Number(locateParams.split("&")[2]);
                $(".currentPage").html(currentPa); 

            if ( ulInd == 0 ) {
                var classesLf = $(".titleNameLf li").elements;
                $(".active").elements[0].className = "";
                classesLf[activeSe].className = "active";
            } else {
                var classesRt = $(".titleNameRt li").elements;
                $(".active").elements[0].className = "";
                classesRt[activeSe].className = "active";
            }
        }
    }

    if ( window.location.href.indexOf("webAddress") > 0 ) {
        $(".currentPage").html(currentPa);
    } else {
        $(".currentPage").html(pageNo+1);
    }

    var pageC = $(".currentPage").html();
    var pageT = $(".lastPage").html();

    if ( parseInt(pageT) <= 1 || parseInt(pageC) == parseInt(pageT) ) {
        $(".nextPage .bgFocus").elements[0].className = "bgFocus";
    } else {
        $(".nextPage .bgFocus").elements[0].className = "bgFocus selectAble";
    }

    if( parseInt(pageC) == 1 || parseInt(pageT) == 0 ){
        $(".prevPage .bgFocus").elements[0].className = "bgFocus";
    } else {
        $(".prevPage .bgFocus").elements[0].className = "bgFocus selectAble";
    }
}

function render_2(webAddress) {
    for ( var o = 0,_li = "";o < dispose.length;o++ ) {
        if ( o == 0 ) {
            _li +='<li class="active" data-num="'+(o)+'">'+
                    '<div class="character">'+dispose[o].name+'</div>'+
                    '<div class="bottCor"></div>'+
                    '<div class="border"></div>'+
                '</li>';
        } else {
            _li +='<li data-num="'+(o)+'">'+
                    '<div class="character">'+dispose[o].name+'</div>'+
                    '<div class="bottCor"></div>'+
                    '<div class="border"></div>'+
                '</li>';
        }
    }
    $(".classes").html(_li);
    $(".lastPage").html(totalPage);

    if ( webAddress == 0 ) {
        if ( window.location.href.indexOf("webAddress") > 0 ) {
            var locateParams = window.location.href.split("webAddress=")[1],
                activeSe = Number(locateParams.split("&")[0]);
                currentPa = Number(locateParams.split("&")[1]);
                classesEle = $(".classes li").elements;

            $(".currentPage").html(currentPa);
            $(".active").elements[0].className = "";
            classesEle[activeSe].className = "active";
        }
    }
    
    if ( window.location.href.indexOf("webAddress") > 0 ) {
        $(".currentPage").html(currentPa);
    } else {
        $(".currentPage").html(pageNo+1);
    }

    var pageC = $(".currentPage").html();
    var pageT = $(".lastPage").html();
    
    if ( parseInt(pageT) <= 1 || parseInt(pageC) == parseInt(pageT) ) {
        $(".nextPage .bgFocus").elements[0].className = "bgFocus";
    } else {
        $(".nextPage .bgFocus").elements[0].className = "bgFocus selectAble";
    }

    if( parseInt(pageC) == 1 || parseInt(pageT) == 0 ){
        $(".prevPage .bgFocus").elements[0].className = "bgFocus";
    } else {
        $(".prevPage .bgFocus").elements[0].className = "bgFocus selectAble";
    }
}

function topKeyDown () { 
    if ( subject_id == 1 || subject_id == 3 ) {
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
        } else
        if ( $(".footer p.active").elements.length > 0 ) {
            var ele = $(".classes li").elements;
            var eleLength = $(".classes li").elements.length;

            ele[eleLength-1].className = "active";
            $(".footer .active").hide();
            $(".footer .active").elements[0].className = "border";
        }
    } else {
        if ( $(".titleNameLf .active").elements.length > 0 || $(".titleNameRt .active").elements.length > 0 ) {
            var ele = $(".active").elements[0].parentNode.childNodes;
            var $num = Number($(".active").attr("data-num"));
    
            if ( $num > 0 ) {
                ele[$num].className = "";
                ele[$num-1].className = "active";
            } else
            if ( $num == 0 ) {
                ele[$num].className = "";
                $(".logout").elements[0].className = "logout focus";
            }
        } else
        if ( $(".footer p.active").elements.length > 0 ) {
            var eleRt = $(".titleNameRt li").elements;
            var eleLf = $(".titleNameLf li").elements;
            var eleLenRt = $(".titleNameRt li").elements.length;
            var eleLenLf = $(".titleNameLf li").elements.length;

            if ( eleLenRt > 0 ) {
                eleRt[eleLenRt-1].className = "active";
            } else {
                eleLf[eleLenLf-1].className = "active";
            }
    
            $(".footer .active").hide();
            $(".footer .active").elements[0].className = "border";
        }
    }

    if ( $("#videoContent li.dialogActive").elements.length > 0 ) {
        var $num = Number($(".dialogActive").attr("data-num"));
        var ulEle = $("#videoContent li").elements; 
        var $length = $("#videoContent li").elements.length; 
        var $videoC = parseInt($("#videoContent").elements[0].offsetTop);

        if ( $num != 0 ) {
            ulEle[$num].className = "";
            ulEle[$num-1].className = "dialogActive";
        }

        if ( $length > 4 && $videoC < 0 ) {
			var newTop = $videoC+77;
			$("#videoContent").css("top",newTop+"px");
		}
    }
}

function downKeyDown () {
    if ( subject_id == 1 || subject_id == 3 ) {
        if ( $(".classes li.active").elements.length > 0 ) {
            var ele = $(".classes li").elements;
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
    } else {
        if ( $(".titleNameLf .active").elements.length > 0 || $(".titleNameRt .active").elements.length > 0 ) {
            var ele = $(".active").elements[0].parentNode.childNodes;
            var $num = Number($(".active").attr("data-num"));
    
            if ( $num < ele.length-1 ) {
                ele[$num].className = "";
                ele[$num+1].className = "active";
            } else
            if ( $num == ele.length-1 ) {
                ele[$num].className = "";
                $(".prevPage .border").elements[0].className = "border active";
                $(".prevPage .border").show();
            }
        } else
        if ( $(".head .focus").elements.length > 0 ) {
            $(".logout").elements[0].className = "logout normal";
            $(".titleNameLf li").elements[0].className = "active";
        }
    }

    if ( $("#videoContent li.dialogActive").elements.length > 0 ) {
        var $num = Number($(".dialogActive").attr("data-num"));
        var ulEle = $("#videoContent li").elements; 
        var $length = $("#videoContent li").elements.length; 
        var $videoC = parseInt($("#videoContent").elements[0].offsetTop);
        
        if ( $num != ulEle.length-1 ) {
            ulEle[$num].className = "";
            ulEle[$num+1].className = "dialogActive";
        }

        if ( $length > 4 && $videoC >  -(($length-4)*77) ) {
			var newTop = $videoC-77;
			$("#videoContent").css("top",newTop+"px");
		} else
		if ( $length > 4 && $videoC == -(($length-4)*77) ) {
			$("#videoContent").css("top",-(($length-4)*77)+"px");
		}
    }
}

function leftKeyDown () {
    if ( subject_id == 1 || subject_id == 3 ) {
        if ( $(".classes li.active").elements.length > 0 ) {
            var ele = $(".classes li").elements;
            var $num = Number($(".active").attr("data-num"));

            if ( $num % 2 != 0 ) {
                ele[$num].className = "";
                ele[$num-1].className = "active";
            }
        }
    } else {
        if ( $(".titleNameRt .active").elements.length > 0 ) {
            var ele = $(".active").elements[0].parentNode.childNodes;
            var eleOther = $(".titleNameLf li").elements;
            var $num = Number($(".active").attr("data-num"));
    
            if ( eleOther.length > $num ) {
                ele[$num].className = "";
                eleOther[$num].className = "active";
            }
        }
    }

    if ( $(".nextPage p.active").elements.length > 0 ) {
        $(".nextPage .border").hide();
        $(".nextPage .border").elements[0].className = "border";
        $(".prevPage .border").show();
        $(".prevPage .border").elements[0].className = "border active";
    }
}

function rightKeyDown () {
    if ( subject_id == 1 || subject_id == 3 ) {
        if ( $(".classes li.active").elements.length > 0 ) {
            var ele = $(".classes li").elements;
            var $num = Number($(".active").attr("data-num"));

            if ( $num % 2 == 0 && $num != ele.length-1 ) {
                ele[$num].className = "";
                ele[$num+1].className = "active";
            }
        }
    } else {
        if ( $(".titleNameLf .active").elements.length > 0 ) {
            var ele = $(".active").elements[0].parentNode.childNodes;
            var eleOther = $(".titleNameRt li").elements;
            var $num = Number($(".active").attr("data-num"));
    
            if ( eleOther.length > $num ) {
                ele[$num].className = "";
                eleOther[$num].className = "active";
            }
        }
    }

    if ( $(".prevPage p.active").elements.length > 0 ) {
        $(".prevPage .border").hide();
        $(".prevPage .border").elements[0].className = "border";
        $(".nextPage .border").show();
        $(".nextPage .border").elements[0].className = "border active";
    }
}

function enterKeyDown () {
    if ( subject_id == 1 || subject_id == 3 ) {
        if ( $(".nextPage .selectAble").elements.length > 0 && $(".nextPage .active").elements.length > 0 ) {
            var curPage = parseInt($(".currentPage").html());
            var lastPage = parseInt($(".lastPage").html());
            
            if ( window.location.href.indexOf("webAddress") > 0 ) {
                if ( curPage < lastPage ) {
                    $(".term").html(""); // 加上这句上一页和下一页才能显示出来
                    currentPa++;
                    dispose = dataDispose(datas,currentPa-1);
                    render_2();
                    $(".classes li").elements[0].className = "";
                }
                
            } else {
                if ( curPage < lastPage ) {
                    $(".term").html(""); // 加上这句上一页和下一页才能显示出来
                    pageNo++;
                    dispose = dataDispose(datas,pageNo);
                    render_2();
                    $(".classes li").elements[0].className = "";
                }
            }

        } else
        if ( $(".prevPage .selectAble").elements.length > 0 && $(".prevPage .active").elements.length > 0 ) {
            var curPage = parseInt($(".currentPage").html());
            var lastPage = parseInt($(".lastPage").html());

            if ( window.location.href.indexOf("webAddress") > 0 ) {
                if ( curPage <= lastPage && curPage > 0 ) {
                    $(".term").html(""); // 加上这句上一页和下一页才能显示出来
                    currentPa--;
                    dispose = dataDispose(datas,currentPa-1);
                    render_2();
                    $(".classes li").elements[0].className = "";
                }

            } else {
                if ( curPage <= lastPage && curPage > 0 ) {
                    $(".term").html(""); // 加上这句上一页和下一页才能显示出来
                    pageNo--;
                    dispose = dataDispose(datas,pageNo);
                    render_2();
                    $(".classes li").elements[0].className = "";
                }
            }
        } else
        if ( $(".dialogNone").hasClass("display") ) {
            var classesUl = $(".classes li").elements;
            $(".dialogNone").elements[0].className = "dialogNone";
            classesUl[dataNum].className = "active";
        } else
        if ( $(".classes .active").elements.length > 0 ) {
            dataNum = Number($(".active").attr("data-num"));
            var currentPage = $(".currentPage").html()-1;
            dispose = dataDispose(datas, currentPage);
            
            activeS = $(".active").attr("data-num");
            currentP = $(".currentPage").html();

            if ( window.location.href.indexOf("webAddress") > 0 ) {
                var ori = window.location.href.split("html/")[1],
                    oriStr = ori.split("=")[9];
                webAddress = ori.replace(oriStr,activeS+"&"+currentP);
            } else {
                webAddress = window.location.href.split("html/")[1]+"&webAddress="+activeS+"&"+currentP;
            }

            if ( dispose[dataNum].video_mains.length == 0 ) {
                $(".active").elements[0].className = "";
                $(".dialogNone").elements[0].className = "dialogNone display";
            } else {
                $(".active").elements[0].className = "";
                $(".dialogVideo").elements[0].className = "dialogVideo display";

                for ( var u = 0,_li="";u < dispose[dataNum].video_mains.length;u++ ) {
                    var titleName = "";
                    if ( dispose[dataNum].video_mains[u].grade_id == 1 ) {
                        titleName = "(免费)"+dispose[dataNum].video_mains[u].video_title;
                    } else {
                        titleName = dispose[dataNum].video_mains[u].video_title;
                    }

                    if ( u == 0 ) {
                        _li+='<li data-gradeid="'+dispose[dataNum].video_mains[u].grade_id+'" class="dialogActive" data-num="'+(u)+'" data-videoid="'+dispose[dataNum].video_mains[u].video_id+'-7" data-videosrc="'+dispose[dataNum].video_mains[u].video_path+'">'+
                                '<p class="videoTitle">'+titleName+'</p>'+
                                '<p class="videoTle">'+
                                    '<span class="videoTeacher">'+dispose[dataNum].video_mains[u].teacher_name+'老师</span>'+
                                    '<span class="videoSchool">'+dispose[dataNum].video_mains[u].school_name+'</span>'+
                                '</p>'+
                                '<div class="liBg"></div>'+
                                '<div class="bgfocus"></div>'+
                                '<div class="border"></div>'+
                            '</li>';
                    } else {
                        _li+='<li data-gradeid="'+dispose[dataNum].video_mains[u].grade_id+'" data-num="'+(u)+'" data-videoid="'+dispose[dataNum].video_mains[u].video_id+'-7" data-videosrc="'+dispose[dataNum].video_mains[u].video_path+'">'+
                                '<p class="videoTitle">'+titleName+'</p>'+
                                '<p class="videoTle">'+
                                    '<span class="videoTeacher">'+dispose[dataNum].video_mains[u].teacher_name+'老师</span>'+
                                    '<span class="videoSchool">'+dispose[dataNum].video_mains[u].school_name+'</span>'+
                                '</p>'+
                                '<div class="liBg"></div>'+
                                '<div class="bgfocus"></div>'+
                                '<div class="border"></div>'+
                            '</li>';
                    }
                }
                $("#videoContent").html(_li);

            }
        } else
        if ( $("#videoContent li.dialogActive").elements.length > 0 ) {
            var $videoid = $(".dialogActive").attr("data-videoid");
            var $url = $(".dialogActive").attr("data-videosrc");
            var $title = $(".dialogActive .videoTitle").html();
            var gradeId = Number($(".dialogActive").attr("data-gradeid"));
            var $aaaCode = "";
            var $bossCode = "";

            switch (active){
				case 17:
                    var $type = "grade_school";
                    $aaaCode = "70016";
                    $bossCode = "800700000167";
				break;
				case 18:
                    var $type = "middle_school";
                    $aaaCode = "70017";
                    $bossCode = "800700000168";
				break;
				case 19:
                    var $type = "high_school";
                    $aaaCode = "70018";
                    $bossCode = "800700000169";
				break;
            }
            
            if (gradeId) {
                window.location.href = "./media.html?video="+$url+"&"+webAddress;
                videoRecord($videoid,$type,$url,$title,$aaaCode);
            } else {
                authentic({
                    url: $url,
                    aaaCode: $aaaCode,
                    bossCode: $bossCode
                },webAddress,111,$videoid,$type,$url,$title,$aaaCode);
            }

            var classesUl = $(".classes li").elements;
            $(".dialogActive").elements[0].className = "";
            $(".dialogVideo").elements[0].className = "dialogVideo";
            classesUl[dataNum].className = "active";
        }

    } else {
        if ( $(".nextPage .selectAble").elements.length > 0 && $(".nextPage .active").elements.length > 0 ) {
            var curPage = parseInt($(".currentPage").html());
            var lastPage = parseInt($(".lastPage").html());

            if ( window.location.href.indexOf("webAddress") > 0 ) {
                if ( curPage <= lastPage && curPage > 0 ) {
                    $(".term").html(""); // 加上这句上一页和下一页才能显示出来
                    currentPa++;
                    render_1(currentPa-1);
                    $(".titleNameLf li").elements[0].className = "";
                }

            } else {
                if ( curPage <= lastPage && curPage > 0 ) {
                    $(".term").html(""); // 加上这句上一页和下一页才能显示出来
                    pageNo++;
                    render_1(pageNo);
                    $(".titleNameLf li").elements[0].className = "";
                }
            }

        } else
        if ( $(".prevPage .selectAble").elements.length > 0 && $(".prevPage .active").elements.length > 0 ) {
            var curPage = parseInt($(".currentPage").html());
            var lastPage = parseInt($(".lastPage").html());

            if ( window.location.href.indexOf("webAddress") > 0 ) {
                if ( curPage <= lastPage ) {
                    $(".term").html(""); // 加上这句上一页和下一页才能显示出来
                    currentPa--;
                    render_1(currentPa-1);
                    $(".titleNameLf li").elements[0].className = "";
                }

            } else {
                if ( curPage <= lastPage ) {
                    $(".term").html(""); // 加上这句上一页和下一页才能显示出来
                    pageNo--;
                    render_1(pageNo);
                    $(".titleNameLf li").elements[0].className = "";
                }
            }

        } else
        if ( $(".dialogNone").hasClass("display") ) {
            var classesUl = $(".mainCourseL li").elements;
            $(".dialogNone").elements[0].className = "dialogNone";
            classesUl[liNum].className = "active";
        } else
        if ( $(".titleNameLf .active").elements.length > 0 || $(".titleNameRt .active").elements.length > 0 ) {
            page(datas);
            liNum = $(".active").attr("data-index");
            
            var currentPage = $(".currentPage").html()-1,
                totalPage = parseInt($(".lastPage").html()),
                dataIndex = $(".active").attr("data-num"),
                ulNum = $(".active").elements[0].parentNode.getAttribute("data-num"),
                newPageBox = pageBox.slice(0,totalPage),
                newArr = newPageBox[currentPage][ulNum].keypoinsts[dataIndex];

            var activeSele = $(".active").attr("data-num"),
                currentPg = $(".currentPage").html(),
                ulParentA = $(".active").elements[0].parentNode.getAttribute("data-num");

            if ( window.location.href.indexOf("webAddress") > 0 ) {    
                var ori = window.location.href.split("html/")[1],
                    oriStr = ori.split("=")[9];
                webAddress = ori.replace(oriStr,activeSele+"&"+ulParentA+"&"+currentPg);
            } else {
                webAddress = window.location.href.split("html/")[1]+"&webAddress="+activeSele+"&"+ulParentA+"&"+currentPg;
            }
                
            if ( newArr.video_mains.length == 0 ) {
                $(".active").elements[0].className = "";
                $(".dialogNone").elements[0].className = "dialogNone display";
            } else {
                $(".active").elements[0].className = "";
                $(".dialogVideo").elements[0].className = "dialogVideo display";

                for ( var r = 0,_li="";r < newArr.video_mains.length;r++ ) {
                    var titleName = "";
                    if ( newArr.video_mains[r].grade_id == 1 ) {
                        titleName = "(免费)"+newArr.video_mains[r].video_title;
                    } else {
                        titleName = newArr.video_mains[r].video_title;
                    }

                    if ( r == 0 ) {
                        _li+='<li data-gradeid="'+newArr.video_mains[r].grade_id+'" class="dialogActive" data-num="'+(r)+'" data-videoid="'+newArr.video_mains[r].video_id+'-7" data-videosrc="'+newArr.video_mains[r].video_path+'">'+
                                '<p class="videoTitle">'+titleName+'</p>'+
                                '<p class="videoTle">'+
                                    '<span class="videoTeacher">'+newArr.video_mains[r].teacher_name+'老师</span>'+
                                    '<span class="videoSchool">'+newArr.video_mains[r].school_name+'</span>'+
                                '</p>'+
                                '<div class="liBg"></div>'+
                                '<div class="bgfocus"></div>'+
                                '<div class="border"></div>'+
                            '</li>';
                    } else {
                        _li+='<li data-gradeid="'+newArr.video_mains[r].grade_id+'" data-num="'+(r)+'" data-videoid="'+newArr.video_mains[r].video_id+'-7" data-videosrc="'+newArr.video_mains[r].video_path+'">'+
                                '<p class="videoTitle">'+titleName+'</p>'+
                                '<p class="videoTle">'+
                                    '<span class="videoTeacher">'+newArr.video_mains[r].teacher_name+'老师</span>'+
                                    '<span class="videoSchool">'+newArr.video_mains[r].school_name+'</span>'+
                                '</p>'+
                                '<div class="liBg"></div>'+
                                '<div class="bgfocus"></div>'+
                                '<div class="border"></div>'+
                            '</li>';
                    }
                }
                $("#videoContent").html(_li);

            }
            
        } else
        if ( $("#videoContent li.dialogActive").elements.length > 0 ) {
            var $videoid = $(".dialogActive").attr("data-videoid");
            var $url = $(".dialogActive").attr("data-videosrc");
            var $title = $(".dialogActive .videoTitle").html();
            var gradeId = Number($(".dialogActive").attr("data-gradeid"));
            var $aaaCode = "";
            var $bossCode = "";

            switch (active){
				case 17:
                    var $type = "grade_school";
                    $aaaCode = "70016";
                    $bossCode = "800700000167";
				break;
				case 18:
                    var $type = "middle_school";
                    $aaaCode = "70017";
                    $bossCode = "800700000168";
				break;
				case 19:
                    var $type = "high_school";
                    $aaaCode = "70018";
                    $bossCode = "800700000169";
				break;
            }
            
            if (gradeId) {
                window.location.href = "./media.html?video="+$url+"&"+webAddress;
                videoRecord($videoid,$type,$url,$title,$aaaCode);
            } else {
                authentic({
                    url: $url,
                    aaaCode: $aaaCode,
                    bossCode: $bossCode
                },webAddress,111,$videoid,$type,$url,$title,$aaaCode);
            }

            var classesUl = $(".mainCourseL li").elements;
            $(".dialogActive").elements[0].className = "";
            $(".dialogVideo").elements[0].className = "dialogVideo";
            classesUl[liNum].className = "active";
        }
    }

    if ( $(".head .focus").elements.length > 0 ) {
        window.location.href="youngMiddleHigh.html?grade="+grades+"&active="+active+"&focus="+subject_id+"&selectedInx="+selectedInx+"&swiperInx="+swiperInx+"&selectId="+selectID;
    }
}

function pageUpKeyDown() {
    if ( subject_id == 1 || subject_id == 3 ) {
        var curPage = parseInt($(".currentPage").html());
        var lastPage = parseInt($(".lastPage").html());

        if ( window.location.href.indexOf("webAddress") > 0 ) {
            if ( curPage <= lastPage && curPage > 0 ) {
                $(".term").html(""); // 加上这句上一页和下一页才能显示出来
                currentPa--;
                dispose = dataDispose(datas,currentPa-1);
                render_2();
                $(".classes li").elements[0].className = "";
            }

        } else {
            if ( curPage <= lastPage && curPage > 0 ) {
                $(".term").html(""); // 加上这句上一页和下一页才能显示出来

                if ( pageNo > 0 ) {
                    pageNo--;
                }
                
                dispose = dataDispose(datas,pageNo);
                render_2();
                $(".classes li").elements[0].className = "";
            }
        }

    } else {
        var curPage = parseInt($(".currentPage").html());
        var lastPage = parseInt($(".lastPage").html());

        if ( window.location.href.indexOf("webAddress") > 0 ) {
            if ( curPage <= lastPage ) {
                $(".term").html(""); // 加上这句上一页和下一页才能显示出来
                currentPa--;
                render_1(currentPa-1);
                $(".titleNameLf li").elements[0].className = "";
            }

        } else {
            if ( curPage <= lastPage ) {
                $(".term").html(""); // 加上这句上一页和下一页才能显示出来

                if ( pageNo > 0 ) {
                    pageNo--;
                }
                
                render_1(pageNo);
                $(".titleNameLf li").elements[0].className = "";
            }
        }

    }

    $(".term").html("");
    $(".prevPage .border").show();
    $(".nextPage .border").hide();
    $(".prevPage .border").elements[0].className = "border active";
    $(".nextPage .border").elements[0].className = "border";
}

function pageDownKeyDown() {
    if ( subject_id == 1 || subject_id == 3 ) {
        var curPage = parseInt($(".currentPage").html());
        var lastPage = parseInt($(".lastPage").html());
        
        if ( window.location.href.indexOf("webAddress") > 0 ) {
            if ( curPage < lastPage ) {
                $(".term").html(""); // 加上这句上一页和下一页才能显示出来
                currentPa++;
                dispose = dataDispose(datas,currentPa-1);
                render_2();
                $(".classes li").elements[0].className = "";
            }
            
        } else {
            if ( curPage < lastPage ) {
                $(".term").html(""); // 加上这句上一页和下一页才能显示出来
                pageNo++;
                dispose = dataDispose(datas,pageNo);
                render_2();
                $(".classes li").elements[0].className = "";
            }
        }

    } else {
        var curPage = parseInt($(".currentPage").html());
        var lastPage = parseInt($(".lastPage").html());

        if ( window.location.href.indexOf("webAddress") > 0 ) {
            if ( curPage <= lastPage && curPage > 0 ) {
                $(".term").html(""); // 加上这句上一页和下一页才能显示出来
                currentPa++;
                render_1(currentPa-1);
                $(".titleNameLf li").elements[0].className = "";
            }

        } else {
            if ( curPage <= lastPage && curPage > 0 ) {
                $(".term").html(""); // 加上这句上一页和下一页才能显示出来
               
                if ( pageNo <  lastPage-1) {
                    pageNo++;
                }
                
                render_1(pageNo);
                $(".titleNameLf li").elements[0].className = "";
            }
        }

    }

    $(".term").html("");
    $(".nextPage .border").show();
    $(".prevPage .border").hide();
    $(".nextPage .border").elements[0].className = "border active";
    $(".prevPage .border").elements[0].className = "border";
}

function escKeyDown () {
    var strMatch = window.location.href.indexOf("courseList");
    if( strMatch > -1 ){
        window.location.href="youngMiddleHigh.html?grade="+grades+"&active="+active+"&focus="+subject_id+"&selectedInx="+selectedInx+"&swiperInx="+swiperInx+"&selectId="+selectID;    
    }
}