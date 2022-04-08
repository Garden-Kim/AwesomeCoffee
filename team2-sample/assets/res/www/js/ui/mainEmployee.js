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
      $('#menu-order-list').on('click', function () {
        M.page.html("./empOrderList.html");
      })
      $('#menu-pickup').on('click', function () {
        M.page.html("./pickupList.html");
      })
      $('#menu-recipe-list').on('click', function () {
        M.page.html("./recipeList.html");
      })
      $('#menu-store-info').on('click', function () {
        M.page.html("./storeInfo.html"); // 매장정보 페이지로 이동 
      }) 
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