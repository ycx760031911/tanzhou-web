(function () {

    var $box = $("#wrap"),
        $oLi = $("#wrap .content").find("li"),
        index = -1,
        maxLength = imgData.length-1;

    loadDiv(10);

    $(window).scroll(function () {
        if (index >= maxLength)return;
        var allTop = $(window).height() + $(document).scrollTop(),
            boxTop = $box.offset().top + $box.height() - 200;
        if (allTop > boxTop){ loadDiv(10); }
    });

    function loadDiv(num) {
        var length = index+num;
        length = Math.min(length, maxLength);
        add();
        function add() {
            if (index < length){
                index++;
            }else{
                return;
            }

            var date = imgData[index];
            var oImg = new Image();
            oImg.src = date.src;
            oImg.onload = function () {
                var $div = $('<div class="container">' +
                    '<div class="img">'+
                         '<a href="javascript:;"><img src="'+date.src+'" alt=""></a>' +
                    '</div>' +
                    '<div class="title">' +
                           '<a href="javascsript:;">'+date.dec+'</a>' +
                    '</div>' +
                    '<div class="info">' +
                        '<div class="time">'+date.time+'</div>' +
                        '<div class="all">' +
                             '<a href="javascript:;">阅读全文</a>' +
                        '</div>' +
                        '</div>' +
                    '</div>');
                $div.css("display","none");
                FindShort().append($div);
                $div.fadeIn();
                add();
            }
        }
    }

    function FindShort() {
        var obj,
            short = 99999;
        $oLi.each(function (i) {
            var height = $(this).height();
            if (height < short){
                short = height;
                obj = $(this);
            }
        });
        return $(obj);
    }

})();