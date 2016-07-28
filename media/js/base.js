$(document).ready(function($){
//    /*oneBit = new OneBit('../usr/plugins/BinjooKit/1bit/1bit.swf');
//    oneBit.ready(function() {
//        oneBit.specify('color', '#40AA52');
//        oneBit.specify('playerSize', '10');
//        oneBit.specify('analytics', true);
//        oneBit.apply('a.mp3');
//    });*/
    //go top
    $("a#gotop").click(function(){$("html,body").animate({scrollTop:"0px"},600);return false});
//    //email显示
//    $(".myemail").click(function(){var d="ixxoo.me";var f="gmail.com";var e=d+"@"+f;$(this).hide();setTimeout(function(){var g=$(".myemail");g.next().hide();g.text(e);g.attr("href","mailto:"+e).unbind("click");g.fadeIn(2000)},1)});
//    //网盘
//    /*$(".disk-left ol li a").click(function() {
//        //var v = $(this).attr("class");
//        $(".disk-rigth ol").hide(100).empty();
//        var d = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=" + this.href + "/rss.xml&num=100&callback=?";
//        $.getJSON(d,
//        function(e) {
//            $(e.responseData.feed.entries).each(function(g, j) {
//                var l = j.title,
//                h = j.link,
//                f = j.content;
//                $(".disk-rigth ol").append("<li><a href='" + h + "' title='" + f + "'>" + l + "</a></li>")
//            });
//            $(".disk-rigth ol").slideDown(300)
//        });
//        return false
//    })
//    */
//    //新窗口打开
//    $("#content .post .con a:not(a[rel=nofollow], a[href^=javascript], a[class=more]), #comments .comment-list a[rel*=nofollow]").attr({
//        target:"_blank"
//    });
//    //loading...
//    $('a:not(a[href^="javascript"], a[href^="https"], a[target="_blank"], a[href*="#"])').click(function(e){
//        if(e.which == 2){
//                return true;
//            }else{
//                $('#clickload').slideDown(200);
//            }
//    });
});
NProgress.configure({ showSpinner: false, minimum: 0.1 });
NProgress.start();
    $(window).load(function() {
    NProgress.done(true);
    $('.fade').removeClass('out');
});
