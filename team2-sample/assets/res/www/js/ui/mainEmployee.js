/**
 * @file : 직원페이지메인 
 * @author : 김예은
 * @date : 22.03.29
 */

(function ($, M, MNet, module, SERVER_PATH, window) {

  var seqNo = [];
  var page = {
    els: {
      $order: null,
      $pickup: null,
      $recipe: null,
    },
    data: {},
    init: function init() {
      this.els.$order = $('#order');
      this.els.$pickup = $('#pickup');
      this.els.$recipe = $('#recipe');
    },
    initView: function initView() {
      // 메인 이미지 슬라이드 
      $(document).ready(function () {
        $(".mySlideDiv").not(".active").hide(); //화면 로딩 후 첫번째 div를 제외한 나머지 숨김
        setInterval(nextSlide, 2500); //2.5초
      });

      //이전 슬라이드
      function prevSlide() {
        $(".mySlideDiv").hide(); //모든 div 숨김
        var allSlide = $(".mySlideDiv"); //모든 div 객체를 변수에 저장
        var currentIndex = 0; //현재 나타난 슬라이드의 인덱스 변수
        //반복문으로 현재 active클래스를 가진 div를 찾아 index 저장
        $(".mySlideDiv").each(function (index, item) {
          if ($(this).hasClass("active")) {
            currentIndex = index;
          }
        });

        //새롭게 나타낼 div의 index
        var newIndex = 0;
        if (currentIndex <= 0) {
          //현재 슬라이드의 index가 0인 경우 마지막 슬라이드로 보냄(무한반복)
          newIndex = allSlide.length - 1;
        } else {
          //현재 슬라이드의 index에서 한 칸 만큼 뒤로 간 index 지정
          newIndex = currentIndex - 1;
        }
        //모든 div에서 active 클래스 제거
        $(".mySlideDiv").removeClass("active");
        //새롭게 지정한 index번째 슬라이드에 active 클래스 부여 후 show()
        $(".mySlideDiv").eq(newIndex).addClass("active");
        $(".mySlideDiv").eq(newIndex).show();
      }
      //다음 슬라이드
      function nextSlide() {
        $(".mySlideDiv").hide();
        var allSlide = $(".mySlideDiv");
        var currentIndex = 0;
        $(".mySlideDiv").each(function (index, item) {
          if ($(this).hasClass("active")) {
            currentIndex = index;
          }
        });
        var newIndex = 0;
        if (currentIndex >= allSlide.length - 1) {
          //현재 슬라이드 index가 마지막 순서면 0번째로 보냄(무한반복)
          newIndex = 0;
        } else {
          //현재 슬라이드의 index에서 한 칸 만큼 앞으로 간 index 지정
          newIndex = currentIndex + 1;
        }
        $(".mySlideDiv").removeClass("active");
        $(".mySlideDiv").eq(newIndex).addClass("active");
        $(".mySlideDiv").eq(newIndex).show();
      }
      MNet.sendHttp({
        path: SERVER_PATH.ORDER_EMP_LIST_N,
        data: {},
        succ: function (data) {
          console.log(data);
          if (data.list != '') {
            var length = data.list.length;
            document.querySelector('#order-length').classList.remove('none');
            $('#order-length').text(length);
          }
        },
      });
      MNet.sendHttp({
        path: SERVER_PATH.ORDER_TAKE_LIST,
        data: {},
        succ: function (data) {
          console.log(data);
          if (data.list != '') {
            var length = data.list.length;
            document.querySelector('#pickup-length').classList.remove('none');
            $('#pickup-length').text(length);
          }
        },
      });
    },
    initEvent: function initEvent() {
      var self = this;
      $('#retry').on('click', function(){
        M.page.replace();
      });
      this.els.$order.on('click', function () {
        M.page.html("./empOrderList.html");
      });
      this.els.$pickup.on('click', function () {
        M.page.html("./pickupList.html");
      });
      this.els.$recipe.on('click', function () {
        M.page.html("./recipeList.html");
      });
      $('#today-order').on('click', function () {
        M.page.html("./orderManage.html");
      });
      $('#store-info').on('click', function () {
        M.page.html("./storeInfo.html");
      });
      $('#logout').on('click', function () {
        MNet.sendHttp({
          path: SERVER_PATH.LOGOUT,
          data: {
            "loginId": M.data.global('id')
          },
          succ: function (data) {
            M.data.removeGlobal('id');
            M.data.removeGlobal('grade');
            M.data.removeStorage('AUTO_LOGIN_AUTH');
            alert("로그아웃되셨습니다.");
            M.page.html({
              url: "./intro.html",
              actionType: "CLEAR_TOP"
            });
            
          }
        });
      });
    },

  };

  window.__page__ = page;
})(jQuery, M, __mnet__, __util__, __serverPath__, window);

(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  M.onRestore(function() {
    pageFunc.initView();
  });

})(jQuery, M, __page__, window);