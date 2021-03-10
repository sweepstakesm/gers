jQuery(document).ready(function($) {
    var lastScrollTop = 0;
    $(window).scroll(function() {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            $(".gm-button-show-comment").fadeOut()
        } else {
            var y = $(this).scrollTop();
            var navWrap = ($('.share-box').offset().top) - 500;
            if (y > navWrap) {
                $(".gm-button-show-comment").hide()
            } else {
                $(".gm-button-show-comment").fadeIn()
            }
        }
        lastScrollTop = st
    });
    $(".gm-button-show-comment-link").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#comments").offset().top
        }, 1000)
    })
})