/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){

  var page = {
    els: {
      $back: null,
      $detail: null,
      $btnTop: null,
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
      this.els.$back = $('#back');
      this.els.$btnTop = $('#btnTop');
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
        path: SERVER_PATH.ORDER_EMP_LIST_N,
        data: self.data.requset,
        succ: function (data) {
          var items = "";
          if (data.list == '') {
            items += "<h1 style='font-size:2rem;color:#888;text-align:center;margin-top:5rem;'>"
            items += "조리 대기 중인 주문이 존재하지 않습니다. </h1>"
            $(".empOrder").html(items);
          } else {
            $.each(data.list, function (index, item) {
              items += "<ul class='empOrderItem bg-white' data-seq='" + item.orderNum + "'>"
              items += "<li data-seq='" + item.orderNum + "' class='empOrderDetail'>";
              items += item.orderNum;
              items += "</li>";
              items += "<li data-seq='" + item.orderNum + "' class='empOrderDetail'>";
              items += item.memberNum;
              items += "</li>";
              items += "<li data-seq='" + item.orderNum + "' class='empOrderDetail'>";
              items += item.orderTime;
              items += "</li>";
              items += "<li data-seq='" + item.orderNum + "' class='empOrderDetail'>";
              items += item.orderPrice;
              items += "</li>";
              items += "<li data-seq='" + item.orderNum + "' class='empOrderState'>";
              items += item.cookState;
              items += "</li>";
              items += "</ul>"
            });
            $(".empOrder").html(items);
          }
        },
        error: function (data) {
          $(".btn-wrap").css("display", "none");
          alert("에러");
        }
      });
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
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
        M.page.replace("./empOrderList.html");
      });
      this.els.$menuPickup.on('click', function () {
        M.page.html("./pickupList.html");
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
      
      $('.empOrder').on('click', '.empOrderItem', function () {
        var orderNum = $(this).attr('data-seq');
        MNet.sendHttp({
          path: SERVER_PATH.ORDER_EMP_DETAIL,
          data: {
            orderNum : orderNum
          },
          succ: function (data) {
            M.page.html({ url: './empOrderDetail.html', 
                          actionType: "NO_HISTORY",
                          param : { orderNum : orderNum},
                          });
          }
        });
      })

    },
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
  M.onRestore(function() {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);