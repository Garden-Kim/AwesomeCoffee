/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){

  var page = {
    els: {
      $finish: null,
      $back: null,
      $menuOrderList: null,
      $menuPickup: null,
      $menuRecipeList: null,
      $menuStoreInfo: null,
    },
    data: {
    },
    init: function init() {
      this.els.$back = $("#back");
      this.els.$finish = $("#finish");
      this.els.$menuOrderList = $('#menu-order-list');
      this.els.$menuPickup = $('#menu-pickup');
      this.els.$menuRecipeList = $('#menu-recipe-list');
      this.els.$menuStoreInfo = $('#menu-store-info');
    },
    initView: function initView() {
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.ORDER_EMP_DETAIL,
        data: {
          orderNum : M.data.param('orderNum')
        },
        succ: function (data) {
          var items = "";
          console.log(data);
          console.log(data.list);
          $.each(data.list, function (index, item) {
            items += "<ul class='emp-Detail bg-white'>"
            items += "<li>";
            items += item.goodsName;
            items += "</li>";
            items += "<li>";
            items += "수량 : "+ item.orderlistQty +"개";
            items += "</li>";
            items += "</ul>"
          });
          $(".empOrderlist").append(items);
          $('#orderTime').html(data.orderTime);
          $('#orderNum').html(data.orderNum);
          $('#memberNum').html(data.memberNum);
          $('#cookState').html(data.cookState);
        },
        error: function (data) {
          $(".empOrderlist").css("display", "none");
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
      })
      this.els.$menuPickup.on('click', function () {
        M.page.html("./pickupList.html");
      })
      this.els.$menuRecipeList.on('click', function () {
        M.page.html("./recipeList.html");
      })
      this.els.$menuStoreInfo.on('click', function () {
        M.page.html("./storeInfo.html");
      })
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

      this.els.$finish.on('click', function () {
        M.pop.alert({
          title: '알림',
          message: '조리 완료 상태로 넘어가겠습니까?',
          buttons: ['예', '아니오'],
          callback: function (index) {
            if (index == 1) {
              return false;
            }
            if (index == 0) {
              MNet.sendHttp({
                path: SERVER_PATH.ORDER_UPDATE_STATE,
                data: {
                  "cookState" : "Y",
                  orderNum : M.data.param('orderNum')
                },
                succ: function (data) {
                  alert('주문이 조리완료되었습니다.');
                  M.page.replace('./empOrderList.html');
                },
                error: function (data) {
                  alert('에러.');
                }
              });
            }
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
  
})(jQuery,M,__page__,window);