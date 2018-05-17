function topKeyDown () {
    if ( $("#project001").hasClass("focus") ) {
        $("#project001").elements[0].className = "";
        $(".logout").elements[0].className = "logout focus";
    } else
    if ( $("#project002").hasClass("focus") ) {
        $("#project002").elements[0].className = "";
        $(".logout").elements[0].className = "logout focus";
    } else
    if ( $("#project003").hasClass("focus") ) {
        $("#project003").elements[0].className = "";
        $(".logout").elements[0].className = "logout focus";
    } else
    if ( $("#project004").hasClass("focus") ) {
        $("#project004").elements[0].className = "";
        $(".logout").elements[0].className = "logout focus";
    } else
    if ( $("#project005").hasClass("focus") ) {
        $("#project005").elements[0].className = "";
        $("#project001").elements[0].className = "focus";
    } else
    if ( $("#project006").hasClass("focus") ) {
        $("#project006").elements[0].className = "";
        $("#project002").elements[0].className = "focus";
    } else
    if ( $("#project007").hasClass("focus") ) {
        $("#project007").elements[0].className = "";
        $("#project003").elements[0].className = "focus";
    } else
    if ( $("#project008").hasClass("focus") ) {
        $("#project008").elements[0].className = "";
        $("#project004").elements[0].className = "focus";
    } else
    if ( $("#project009").hasClass("focus") ) {
        $("#project009").elements[0].className = "";
        $("#project005").elements[0].className = "focus";
    }
    //  else
    // if ( $("#project010").hasClass("focus") ) {
    //     $("#project010").elements[0].className = "";
    //     $("#project006").elements[0].className = "focus";
    // } else
    // if ( $("#project011").hasClass("focus") ) {
    //     $("#project011").elements[0].className = "";
    //     $("#project007").elements[0].className = "focus";
    // } else
    // if ( $("#project012").hasClass("focus") ) {
    //     $("#project012").elements[0].className = "";
    //     $("#project008").elements[0].className = "focus";
    // }
}

function downKeyDown () {
    if ( $(".logout").hasClass("focus") ) {
        $(".logout").elements[0].className = "logout normal";
        $("#project001").elements[0].className = "focus";
    } else
    if ( $("#project001").hasClass("focus") ) {
        $("#project001").elements[0].className = "";
        $("#project005").elements[0].className = "focus";
    } else
    if ( $("#project002").hasClass("focus") ) {
        $("#project002").elements[0].className = "";
        $("#project006").elements[0].className = "focus";
    } else
    if ( $("#project003").hasClass("focus") ) {
        $("#project003").elements[0].className = "";
        $("#project007").elements[0].className = "focus";
    } else
    if ( $("#project004").hasClass("focus") ) {
        $("#project004").elements[0].className = "";
        $("#project008").elements[0].className = "focus";
    } else
    if ( $("#project005").hasClass("focus") ) {
        $("#project005").elements[0].className = "";
        $("#project009").elements[0].className = "focus";
    }
    //  else
    // if ( $("#project006").hasClass("focus") ) {
    //     $("#project006").elements[0].className = "";
    //     $("#project010").elements[0].className = "focus";
    // } else
    // if ( $("#project007").hasClass("focus") ) {
    //     $("#project007").elements[0].className = "";
    //     $("#project011").elements[0].className = "focus";
    // } else
    // if ( $("#project008").hasClass("focus") ) {
    //     $("#project008").elements[0].className = "";
    //     $("#project012").elements[0].className = "focus";
    // }
}

function leftKeyDown () {
    if ( $("#project002").hasClass("focus") ) {
        $("#project002").elements[0].className = "";
        $("#project001").elements[0].className = "focus";
    } else
    if ( $("#project003").hasClass("focus") ) {
        $("#project003").elements[0].className = "";
        $("#project002").elements[0].className = "focus";
    } else
    if ( $("#project004").hasClass("focus") ) {
        $("#project004").elements[0].className = "";
        $("#project003").elements[0].className = "focus";
    } else
    if ( $("#project006").hasClass("focus") ) {
        $("#project006").elements[0].className = "";
        $("#project005").elements[0].className = "focus";
    } else
    if ( $("#project007").hasClass("focus") ) {
        $("#project007").elements[0].className = "";
        $("#project006").elements[0].className = "focus";
    } else
    if ( $("#project008").hasClass("focus") ) {
        $("#project008").elements[0].className = "";
        $("#project007").elements[0].className = "focus";
    }
    //  else
    // if ( $("#project010").hasClass("focus") ) {
    //     $("#project010").elements[0].className = "";
    //     $("#project009").elements[0].className = "focus";
    // } else
    // if ( $("#project011").hasClass("focus") ) {
    //     $("#project011").elements[0].className = "";
    //     $("#project010").elements[0].className = "focus";
    // } else
    // if ( $("#project012").hasClass("focus") ) {
    //     $("#project012").elements[0].className = "";
    //     $("#project011").elements[0].className = "focus";
    // }
}

function rightKeyDown () {
    if ( $("#project001").hasClass("focus") ) {
        $("#project001").elements[0].className = "";
        $("#project002").elements[0].className = "focus";
    } else
    if ( $("#project002").hasClass("focus") ) {
        $("#project002").elements[0].className = "";
        $("#project003").elements[0].className = "focus";
    } else
    if ( $("#project003").hasClass("focus") ) {
        $("#project003").elements[0].className = "";
        $("#project004").elements[0].className = "focus";
    } else
    if ( $("#project005").hasClass("focus") ) {
        $("#project005").elements[0].className = "";
        $("#project006").elements[0].className = "focus";
    } else
    if ( $("#project006").hasClass("focus") ) {
        $("#project006").elements[0].className = "";
        $("#project007").elements[0].className = "focus";
    } else
    if ( $("#project007").hasClass("focus") ) {
        $("#project007").elements[0].className = "";
        $("#project008").elements[0].className = "focus";
    }
    //  else
    // if ( $("#project009").hasClass("focus") ) {
    //     $("#project009").elements[0].className = "";
    //     $("#project010").elements[0].className = "focus";
    // } else
    // if ( $("#project010").hasClass("focus") ) {
    //     $("#project010").elements[0].className = "";
    //     $("#project011").elements[0].className = "focus";
    // } else
    // if ( $("#project011").hasClass("focus") ) {
    //     $("#project011").elements[0].className = "";
    //     $("#project012").elements[0].className = "focus";
    // }
}

function enterKeyDown () {
    if ( $(".mainMoreP .focus").elements.length > 0 ) {
        var $url = $(".focus").attr("data-target");
        window.location.href = $url;
    } else
    if ( $(".focus").elements.length > 0 ) {
        $(".logout").elements[0].className = "logout pressed";
        var $param = Number(location.href.split('?')[1].split("&")[1].split("=")[1]);
        window.location.href = 'home.html?active=' + $param;
    }
}

function escKeyDown () {
    var $param = Number(location.href.split('?')[1].split("&")[1].split("=")[1]);
    var strMatch = window.location.href.indexOf("more");
    if ( strMatch > -1 ) {
        window.location.href = 'home.html?active=' + $param;
    }
}