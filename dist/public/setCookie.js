function getCookieValue(name) {
    var arrCookie = document.cookie.split(";");
    
    for ( var c = 0;c < arrCookie.length;c++ ) {
        var nameCookie = arrCookie[c].split("=");
        
        if ( nameCookie[0].indexOf(name) > -1 ) {
            return nameCookie[1];
        }
    }
}

function setCookie(){
    if ( $(".active").elements.length > 0 ) {
        var videoId = $(".active").attr("data-videoid");
    } else {
        var videoId = $(".dialogActive").attr("data-videoid");
    }
    var navId = "",
        activeArr = videoId.split(""),
        activeLg = activeArr.length;

    if ( activeArr[activeLg-1] == "-" ) {
        navId = $(".secondNav .hasBeenSelected").attr("data-id");
    }
    
    cookieId = videoId + navId;

    if ( document.cookie.indexOf("-") > -1 ) {
        var str = getCookieValue("arr");
        var videoArr = str.split(",");
        var videoStr = videoArr.join(",");
        
        if ( videoArr.length == 10 && videoStr.indexOf(cookieId) == -1 ) {
            videoArr.pop();
        }

        if ( videoStr.indexOf(cookieId) > -1 ) {
            for(var i=0;i<videoArr.length;i++){
                if(videoArr[i] == cookieId){
                    videoArr.splice(i,1);
                }
            }
            
            videoArr.unshift(cookieId);
            var videoStr = videoArr.join(",");
            document.cookie = "arr="+videoStr;
    
        } else {
            videoArr.unshift(cookieId);
            var videoStr = videoArr.join(",");
            document.cookie = "arr="+videoStr;
        }
    } else {
        document.cookie = "arr=[]";
        var videoArr = JSON.parse(getCookieValue("arr"));
        videoArr.push(cookieId);
        var videoStr = videoArr.join(",");
        document.cookie = "arr="+videoStr;
    }
    // alert(document.cookie);
}