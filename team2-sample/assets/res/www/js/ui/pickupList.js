/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){

  var page = {
    els: {
      $back: null,
      $top: null,
      $pickup: null,
      $menu: null,
      $menuOrderList: null,
      $menuPickup: null,
      $menuRecipeList: null,
      $menuStoreInfo: null,

    },
    data: {
      requset: {
        loginId: M.data.global('id'),
        lastSeqNo: '0',
        cnt: '100000'
      },
    },
    init: function init() {
      this.els.$back = $("#back");
      this.els.$btnTop = $('#btnTop');
      this.els.$pickup = $('.pickup');
      this.els.$menu = $('#menu');
      this.els.$menuOrderList = $('#menu-order-list');
      this.els.$menuPickup = $('#menu-pickup');
      this.els.$menuRecipeList = $('#menu-recipe-list');
      this.els.$menuStoreInfo = $('#menu-store-info');
    },
    initView: function initView() {
      this.drawNoticeList()
    },
    drawNoticeList: function () {
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.ORDER_TAKE_LIST,
        data: self.data.requset,
        succ: function (data) {
          var items = "";
          if (data.list == '') {
            items += "<h1 style='font-size:2rem;color:#888;text-align:center;margin-top:5rem;'>"
            items += "수령 대기 중인 주문이 존재하지 않습니다. </h1>"
            $(".pickup").html(items);
          } else {
            self.data.requset.lastSeqNo = data.lastSeqNo;
            $.each(data.list, function (index, item) {
              items += "<ul class='pickupState bg-white' style='height: 6rem;' data-seq='" + item.orderNum + "'>"
              items += "<li >";
              items += item.orderNum;
              items += "</li>";
              items += "<li>";
              items += item.memberNum;
              items += "</li>";
              items += "<li>";
              items += item.orderTime;
              items += "</li>";
              items += "<li>";
              items += item.takeout;
              items += "</li>";
              items += "</ul>"
            });
            $(".pickup").html(items);
          }
        },
        error: function (data) {
          $(".pickup").css("display", "none");
          alert("에러");
        }
      });
    },
    initEvent: function initEvent() {
      var self = this;
      this.els.$back.on('click', function () {
        M.page.back();
      })
      this.els.$btnTop.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      })
      // 사이드바 
      $('.btn-menu').on('click', function () {
        console.log('메뉴클릭');
        $('.position').attr('style', 'position: absolute; top:0;right:0px;bottom:0;transition:1s ease;');
        $('.wrapper').fadeTo("fast", 0.3);
        $('.wrapper').attr('style', 'position:relative;height:100%;background-color:#fff;pointer-events: none;cursor: default;');
      });
      $('.btn-menu').on('blur', function () {
        console.log('취소');
        $('.position').attr('style', 'position: absolute; top:0;right:-130px;bottom:0;transition:1s ease;');
        $('.wrapper').fadeTo("fast", 1);
        $('.wrapper').attr('style', 'position:relative;height:100%;background-color:#fff;');
      });

      // 사이드바 메뉴
      this.els.$menuOrderList.on('click', function () {
        M.page.html("./empOrderList.html");
      });
      this.els.$menuPickup.on('click', function () {
        M.page.replace("./pickupList.html");
      });
      this.els.$menuRecipeList.on('click', function () {
        M.page.html("./recipeList.html");
      });
      this.els.$menuStoreInfo.on('click', function () {
        M.page.html("./storeInfo.html"); 
      });
      $('#menu-order-manage').on('click', function(){
        M.page.html("./orderManage.html"); 
      })
      $('#menu-logout').on('click', function(){
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
      // 픽업 완료 기능
      $('.pickup').on('click', '.pickupState', function () {
        var orderNum = $(this).attr('data-seq');
        M.pop.alert({
          title: '알림',
          message: '픽업 완료 상태로 넘어가겠습니까?',
          buttons: ['예', '아니오'],
          callback: function (index) {
            if (index == 1) {
              return false;
            }
            if (index == 0) {
              MNet.sendHttp({
                path: SERVER_PATH.ORDER_UPDATE_TAKE,
                data: {
                  "takeout" : "Y",
                  orderNum: orderNum
                },
                succ: function (data) {
                  alert('완료되었습니다.');
                  M.page.replace('./pickupList.html');
                },
                error: function (data) {
                  alert("에러");
                }
              });
            }
          }
        })
      })
    },
    // 사이드바 display
    sideBarDisplay: function () {
      $('.side-bar').css('display', 'none');
      if ($(".side-bar").css("display") == "none") {
        $(".side-bar").hide();
      } else {
        $(".side-bar").show();
      }
    }
  };

  window.__page__ = page;
})(jQuery, M, __util__, __mnet__, __serverPath__,__difinition__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);