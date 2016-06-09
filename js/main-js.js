$(document).ready(function () {
    $(".unBorderedIcon.first").click(function () {
        var closed=false;
        $(".form").animate({
            top: (!closed) * 80 + 'px'
        }), 10;    });

        $(".messageOpen").click(function () {
            var closed=false;
            $(".form").animate({
            top: (!closed) * -400 + 'px'
        }), 10;
    });


});