/**
 * @file : 직원페이지메인 
 * @author : 김예은
 * @date : 22.03.29
 */

(function ($, M, MNet, module, SERVER_PATH,  window) {
  
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
    },
    initEvent: function initEvent() {
      var self = this;
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
                    url: "./login.html",
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

})(jQuery, M, __page__, window);