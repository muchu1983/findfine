//初始化autocomplate place_chenged event
tour.sendData = {};

function initMap() {
    var input = (document.getElementById('autocomplete'));
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            //未獲得地點資訊
            return;
        }
        tour.sendData = {
            keyword: document.getElementById('autocomplete').value,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };
    });

    //登入按鈕
    $("#loginBtn").click(function() {
        if ($("#loginBtn").html() == "Log In") {
            window.location = "/account/login";
        }
    });




    // $('#wishList').hide();
    $('#myFriends').hide();
    // $('#myPlans').hide();
    $('#myMessages').hide();
    $('#logOut').hide();

    $('#loginBtn').hide();
    //strEmail 如已登入 不顯示login button 並顯示會員帳號
    if (strEmail == "None") {} else {
        $('#loginBtn').html(strEmail);
        $('#wishList').show();
        $('#myFriends').show();
        $('#myPlans').show();
        $('#myMessages').show();
        $('#logOut').show();
        $('#loginBtn').hide();
    }

    $("#wishList").click(function() {
        window.location = "/page/wishList";
    });

    $("#logOut").click(function() {
        if ($("#logOut").html() == "Log Out") {
            window.location = "/account/logout";
        }
    });



    $("#myPlans").click(function() {
        window.location = "/page/myTrip";
    });
}

$(function() {
    $('#btnFindTrip').on('click', function() {
        //暫時改丟靜態頁,之後改後端接
        //若無googlemap資訊 將值帶到下一頁
        if (typeof tour.sendData.keyword == 'undefined') {
            var input = ($('#autocomplete')).val();
            location.href = '/page/find?keyword=' + input + '&lat=' + tour.sendData.lat + '&lng=' + tour.sendData.lng;
        } else {
            location.href = '/page/find?keyword=' + tour.sendData.keyword + '&lat=' + tour.sendData.lat + '&lng=' + tour.sendData.lng;
        }
    });

    //圖片展示區塊
    $('.portfolio-link').on('click', function(e) {
        e.preventDefault();
        var url = '/page/find?keyword=' + $(this).data('place') + '&lat=' + $(this).data('lat') + '&lng=' + $(this).data('lng');
        location.href = url;
    });
});

(function($) {

    $(document).ready(initHome);

    function initHome() {
        initCurrencySelect();
        //登入按鈕
        $("#loginBtn").click(function() {
            window.location = "/account/login";
        });
        // 飛機飛呀飛
        planeFly(5000);
        $(".plane_print").addClass('active');

        // add to wishlist 按鈕點擊
        addToWishlistBtnClick();

        // 大LOGO箭頭動畫
        $(".intro-text > .arrow_blk_hideblk>.arrow_blk").delay(1500).queue(function(next) {
            $(this).addClass('active');
            next();
        });

        
        // 頁面下滑選單效果
        topNavDown(800);

    };

    //幣別
    function initCurrencySelect() {
        //設定目前幣別
        var strUserCurrencyUrl = "/trip/userCurrency";
        $.getJSON(strUserCurrencyUrl, function(jsonResp) {
            strUserCurrency = jsonResp["strUserCurrency"];
            $("#moneySelect").val(strUserCurrency);
            $("#moneySelect").selectpicker("refresh")
            console.log("init user currency selection: " + strUserCurrency);
        });
        //切換目前幣別
        $("#moneySelect").change(function() {
            var strSelectedCurrencyVal = $("#moneySelect").find(":selected").val();
            var strChangeUserCurrencyUrl = strUserCurrencyUrl + "?user_currency=" + strSelectedCurrencyVal;
            $.getJSON(strChangeUserCurrencyUrl, function(jsonResp) {
                strUserCurrency = jsonResp["strUserCurrency"];
                console.log("switch user currency to: " + strUserCurrency);
            });
        });

    };

})(jQuery);
