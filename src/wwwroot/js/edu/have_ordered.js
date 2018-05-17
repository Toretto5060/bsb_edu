var leftKeyDown = function () {
    if ($('.school').elements[0].className == "school active" || $('.log_out').elements[0].className == "log_out active") {
        return false;
    }
    var index = Number($('.content div.active').attr('data-position'));
    var active_class = $('.content div.active').elements[0].className;
    $('.content div.active').elements[0].className = active_class.replace(' active', '')
    $('.content div').elements[index - 1].className += " active";
}

var rightKeyDown = function () {
    if ($('.high').elements[0].className == "high active" || $('.log_out').elements[0].className == "log_out active") {
        return false;
    }
    var index = Number($('.content div.active').attr('data-position'));
    // var liEle = $(".content div").elements;
    // if ( index!=4 || index!=8 ) {
    //     liEle[index].className = "";
    //     liEle[index+1].className = "active";
    // }
    // alert($('.content div.active').elements[0].className);
    var active_class = $('.content div.active').elements[0].className;
    $('.content div.active').elements[0].className = active_class.replace(' active', '');
    $('.content div').elements[index + 1].className = $('.content div').elements[index + 1].className + " active";
}

var topKeyDown = function () {
    if ($('.log_out').elements[0].className == "log_out active") {
        return false;
    }
    var index = Number($('.content div.active').attr('data-position'));
    var active_class = $('.content div.active').elements[0].className;
    $('.content div.active').elements[0].className = active_class.replace(' active', '');
    if (index <= 4) {
        $('.log_out').elements[0].className = "log_out active";
    } else {
        $('.content div').elements[index - 5].className += " active";
    }
}
var downKeyDown = function () {
    if ($('.log_out').elements[0].className == "log_out active") {
        $('.log_out').elements[0].className = "log_out";
        $('.content div').elements[0].className += " active";
    } else {
        var index = Number($('.content div.active').attr('data-position'));
        if (index > 4){
            return false;
        }
        var active_class = $('.content div.active').elements[0].className;
        $('.content div.active').elements[0].className = active_class.replace(' active', '');
        if (index < 4) {
            $('.content div').elements[index + 5].className += " active";
        } else if (index == 4) {
            $('.high').elements[0].className += " active";
        }
    }
}

var enterKeyDown = function () {
    if ($('.log_out').elements[0].className == "log_out active") {
        window.history.go(-1);
    } else {
        var href = $('.active').attr('data-href');
        window.location.href = href;
    }
}

var escKeyDown = function () {
    window.history.go(-1);
}
