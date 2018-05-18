window.onload = function () {
    if (location.href.indexOf("active") == -1) {
        location.href = location.href+'?active=10';
    }
    var params_arr = location.href.split('?');
    var active_num = Number(params_arr[1].split('=')[1]);
    switch ( active_num ) {
        case 10:
            $('#left01').elements[0].className = "active";
        break;
        case 11:
            $('#left02').elements[0].className = "active";
        break;
        case 12:
            $('#left03').elements[0].className = "active";
        break;
        case 13:
            $('#container01').elements[0].className = "active";
        break;
        case 14:
            $('#right01').elements[0].className = "active";
        break;
        case 15:
            $('#right02').elements[0].className = "active";
        break;
        case 16:
            $('#right03').elements[0].className = "active";
        break;
        case 17:
            $('#bottom01').elements[0].className = "active";
        break;
        case 18:
            $('#bottom02').elements[0].className = "active";
        break;
        case 19:
            $('#bottom03').elements[0].className = "active";
        break;
        case 20:
            $('#bottom04').elements[0].className = "active";
        break;
        case 21:
            $('#bottom05').elements[0].className = "active";
        break;
        case 22:
            $('#bottom06').elements[0].className = "active";
        break;
    }

    var $mac = null;    
    var ethernet = null;

    // if(network) {
    //     $mac = network.ethernets[0].MACAddress;
    // }else {
    //     alert('mac值有误，请检查参数');
    // }

        ajax({
            type: "get",
            url: $edu_url + '/play_record?mac='+$mac,
            dataType: "json",
            success: function (response) {
                var data = response.data;
                if ( data == null ) {
                    $(".histroyTitle").html("无历史记录");
                } else {
                    $(".histroyTitle").html(data[0].video_title);
                }
            }
        });
}
var num = 0;
function topKeyDown () {
    if(document.getElementById('alert').style.display == "block") {
        return false;
    }
    if ( $("#left01").hasClass("active") ) {
        $("#left01").elements[0].className = "";
        $(".logout").elements[0].className = "logout focus";
    } else
    if ( $("#left02").hasClass("active") ) {
        $("#left02").elements[0].className = "";
        $("#left01").elements[0].className = "active";
    } else
    if ( $("#left03").hasClass("active") ) {
        $("#left03").elements[0].className = "";
        $("#left02").elements[0].className = "active";
    } else
    if ( $("#container01").hasClass("active") ) {
        $("#container01").elements[0].className = "";
        $(".logout").elements[0].className = "logout focus";
    } else
    if ( $("#right01").hasClass("active") ) {
        $("#right01").elements[0].className = "";
        $(".my_order").elements[0].className = "my_order selected";
    } else
    if ( $("#right02").hasClass("active") ) {
        $("#right02").elements[0].className = "";
        $("#right01").elements[0].className = "active";
    } else
    if ( $("#right03").hasClass("active") ) {
        $("#right03").elements[0].className = "";
        $("#right02").elements[0].className = "active";
    } else
    if ( $("#bottom01").hasClass("active") ) {
        $("#bottom01").elements[0].className = "";
        $("#left03").elements[0].className = "active";
    } else 
    if ( $("#bottom02").hasClass("active") ) {
        num = ($(".active").attr("data-num"))
        $("#bottom02").elements[0].className = "";
        $("#container01").elements[0].className = "active";
    } else 
    if ( $("#bottom03").hasClass("active") ) {
        num = ($(".active").attr("data-num"))
        $("#bottom03").elements[0].className = "";
        $("#container01").elements[0].className = "active";
    } else 
    if ( $("#bottom04").hasClass("active") ) {
        num = ($(".active").attr("data-num"))
        $("#bottom04").elements[0].className = "";
        $("#container01").elements[0].className = "active";
    } else 
    if ( $("#bottom05").hasClass("active") ) {
        num = ($(".active").attr("data-num"))
        $("#bottom05").elements[0].className = "";
        $("#container01").elements[0].className = "active";
    } else 
    if ( $("#bottom06").hasClass("active") ) {
        $("#bottom06").elements[0].className = "";
        $("#right03").elements[0].className = "active";
    }
    // console.log(num)
}

function downKeyDown () {
    if(document.getElementById('alert').style.display == "block") {
        return false;
    }
    var $num = $(".active").attr("data-num");
    if ( $("#left01").hasClass("active") ) {
        $("#left01").elements[0].className = "";
        $("#left02").elements[0].className = "active";
    } else
    if ( $("#left02").hasClass("active") ) {
        $("#left02").elements[0].className = "";
        $("#left03").elements[0].className = "active";
    } else 
    if ( $("#left03").hasClass("active") ) {
        $("#left03").elements[0].className = "";
        $("#bottom01").elements[0].className = "active";
    } else 
    if ( $("#container01").hasClass("active") ) {
        $("#container01").elements[0].className = "";
        if( num == 2){
          $("#bottom02").elements[0].className = "active";
        } else
        if( num == 3){
          $("#bottom03").elements[0].className = "active";
        } else
        if( num == 4){
          $("#bottom04").elements[0].className = "active";
        } else
        if( num == 5){
          $("#bottom05").elements[0].className = "active";
        }else{
          $("#bottom01").elements[0].className = "active";
        }
    } else 
    if ( $("#right01").hasClass("active") ) {
        $("#right01").elements[0].className = "";
        $("#right02").elements[0].className = "active";
    } else 
    if ( $("#right02").hasClass("active") ) {
        $("#right02").elements[0].className = "";
        $("#right03").elements[0].className = "active";
    } else 
    if ( $("#right03").hasClass("active") ) {
        $("#right03").elements[0].className = "";
        $("#bottom06").elements[0].className = "active";
    } else 
    if ( $(".logout").hasClass("focus") ) {
        $(".logout").elements[0].className = "logout normal";
        $("#left01").elements[0].className = "active";
    } else
    if ( $(".my_order").hasClass("selected") ) {
        $(".my_order").elements[0].className = "my_order noselect";
        $("#right01").elements[0].className = "active";
    }
    num = 0
}

function leftKeyDown () {
    if(document.getElementById('alert').style.display == "block" && document.getElementById('no').className) {
        document.getElementById('no').style.backgroundImage = "url(../images/edu/swiper/school/btn_cancel_normal.png)";
        document.getElementById('no').className = "";
        document.getElementById('yes').className = "select";
        document.getElementById('yes').style.backgroundImage = "url(../images/edu/swiper/school/btn_confirmed_focus.png)";
    } else
    if ( $(".my_order").hasClass("selected") ) {
        $(".my_order").elements[0].className = "my_order noselect";
        $(".logout").elements[0].className = "logout focus";
    } else {
        var $num = $(".active").attr("data-num");
        if ( $("#container01").hasClass("active") ) {
            // var dataNum = $("#container01").attr("data-num");
            var dataNum = $num
            $("#container01").elements[0].className = "";
            if ( dataNum == 0 ) {
                $("#left01").elements[0].className = "active";
            } else 
            if ( dataNum == 1 ) {
              $("#left02").elements[0].className = "active";
            }else{
              $("#left03").elements[0].className = "active";
            }
        } else
        if ( $("#right01").hasClass("active") ) {
            $("#container01").attr("data-num",$num);
            $("#right01").elements[0].className = "";
            $("#container01").elements[0].className = "active";
        } else
        if ( $("#right02").hasClass("active") ) {
            $("#container01").attr("data-num",$num);
            $("#right02").elements[0].className = "";
            $("#container01").elements[0].className = "active";
        } else 
        if ( $("#right03").hasClass("active") ) {
            num = 5
            $("#container01").attr("data-num",$num);
            $("#right03").elements[0].className = "";
            $("#container01").elements[0].className = "active";
        }else
        if ( $("#bottom02").hasClass("active") ) {
            $("#bottom02").elements[0].className = "";
            $("#bottom01").elements[0].className = "active";
        } else 
        if ( $("#bottom03").hasClass("active") ) {
            $("#bottom03").elements[0].className = "";
            $("#bottom02").elements[0].className = "active";
        } else 
        if ( $("#bottom04").hasClass("active") ) {
            $("#bottom04").elements[0].className = "";
            $("#bottom03").elements[0].className = "active";
        } else 
        if ( $("#bottom05").hasClass("active") ) {
            $("#bottom05").elements[0].className = "";
            $("#bottom04").elements[0].className = "active";
        } else 
        if ( $("#bottom06").hasClass("active") ) {
            $("#bottom06").elements[0].className = "";
            $("#bottom05").elements[0].className = "active";
        }
    }
}

function rightKeyDown () {
    if(document.getElementById('alert').style.display == "block" && document.getElementById('yes').className) {
        document.getElementById('yes').style.backgroundImage = "url(../images/edu/swiper/school/btn_confirmed_normal.png)";
        document.getElementById('yes').className = "";
        document.getElementById('no').className = "select";
        document.getElementById('no').style.backgroundImage = "url(../images/edu/swiper/school/btn_cancel_focus.png)";
        return false;
    } else 
    if ( $(".logout").hasClass("focus") ) {
        $(".logout").elements[0].className = "logout normal";
        $(".my_order").elements[0].className = "my_order selected";
    } else {
        var $num = $(".active").attr("data-num");
        if ( $("#left01").hasClass("active") ) {
            $("#container01").attr("data-num",$num);
            $("#left01").elements[0].className = "";
            $("#container01").elements[0].className = "active";
        } else
        if ( $("#left02").hasClass("active") ) {
            $("#container01").attr("data-num",$num);
            $("#left02").elements[0].className = "";
            $("#container01").elements[0].className = "active";
        } else

        if ( $("#left03").hasClass("active") ) {
            num = 2
            $("#container01").attr("data-num",$num);
            $("#left03").elements[0].className = "";
            $("#container01").elements[0].className = "active";
        } else

        if ( $("#container01").hasClass("active") ) {
            var dataNum = $("#container01").attr("data-num");
            $("#container01").elements[0].className = "";
            if ( dataNum == 0) {
                $("#right01").elements[0].className = "active";
            } else
            if ( dataNum == 1 ) {
                $("#right02").elements[0].className = "active";
            } 
            else 
            if( dataNum == 2){
                $("#right03").elements[0].className = "active";
            }
        } else
        if ( $("#bottom01").hasClass("active") ) {
            $("#bottom01").elements[0].className = "";
            $("#bottom02").elements[0].className = "active";
        } else 
        if ( $("#bottom02").hasClass("active") ) {
            $("#bottom02").elements[0].className = "";
            $("#bottom03").elements[0].className = "active";
        } else 
        if ( $("#bottom03").hasClass("active") ) {
            $("#bottom03").elements[0].className = "";
            $("#bottom04").elements[0].className = "active";
        } else 
        if ( $("#bottom04").hasClass("active") ) {
            $("#bottom04").elements[0].className = "";
            $("#bottom05").elements[0].className = "active";
        } else 
        if ( $("#bottom05").hasClass("active") ) {
            $("#bottom05").elements[0].className = "";
            $("#bottom06").elements[0].className = "active";
        }
    }
}

function enterKeyDown () {
    if(document.getElementById('alert').style.display == "block") {
        if(document.getElementById('yes').className == "select") {
            window.location.href = 'ui://index.htm';
        }else if(document.getElementById('no').className == "select") {
            document.getElementById('alert').style.display = "none";
            document.getElementById('no').style.backgroundImage = "url(../images/edu/swiper/school/btn_cancel_normal.png)";
            document.getElementById('no').className == "";
            $("#left01").elements[0].className = "active";
        }
        return false;
    }
    if ( $(".main .active").elements.length > 0 ) {
        var $url = $(".active").attr("data-target");
        var $dataActive = $(".active").attr("data-active");
        window.location.href = $url + "&active=" + $dataActive;
    } else 
    if ( $(".focus").elements.length > 0 ) {
        backKeyDown();
    } else 
    if ( $(".selected").elements.length > 0 ) {
        window.location.href = './have_ordered.html?mac='+$mac;
    }
}

function backKeyDown () {
    var strMatch = window.location.href.indexOf("home");
    if ( strMatch > -1 ) {
        if(document.getElementById('alert').style.display != "block") {
            if ( $(".main .active").elements.length > 0 ) {
                $(".active").elements[0].className = "";
            } else {
                $(".logout").elements[0].className = "logout normal";
            }
            document.getElementById('alert').style.display = "block";
            document.getElementById('yes').className = "select";
            document.getElementById('yes').style.backgroundImage = "url(../images/edu/swiper/school/btn_confirmed_focus.png)";
        }
    }
}

function escKeyDown () {
    var strMatch = window.location.href.match(new RegExp(/home/g));
    if(strMatch){
        if(document.getElementById('alert').style.display != "block") {
            if ( $('.main .active').length > 0 ) {
                $('.main .active').removeClass("active");
            } else {
                $('.logout').removeClass('focus').addClass('normal');
            }
            document.getElementById('alert').style.display = "block";
            document.getElementById('yes').className = "select";
            document.getElementById('yes').style.backgroundImage = "url(../images/edu/swiper/school/btn_confirmed_focus.png)";
        }
    } 
}