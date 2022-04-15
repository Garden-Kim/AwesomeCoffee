/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH, CONFIG, window) {

  var page = {
    els: {},
    data: {},
    init: function init() {},
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView: function initView() {
      console.log(M.data.global('id'));
      console.log(M.data.storage('AUTO_LOGIN_AUTH'));
      if (module.isEmpty(M.data.global('id'))) {
        M.page.html('./login.html');
      }
      console.log(M.data.param('body'));
      console.log(M.data.param('tbody'));
      var data = M.data.param('body');
      var items = '';
      var totalP = 0;
      $.each(data, function (index, item) {
        items += "<tr id='" + item.foodNum + "' class ='test' style='height:5rem;font-size:1.5rem;'>";
        items += "<th>";
        items += item.foodName;
        items += "</th><th data='" + item.storeOrderQty + "'>";
        items += item.storeOrderQty + " 개";
        items += "</th><th data='" + item.foodPrice + "'>";
        items += item.foodPrice + " 원";
        items += "</th></tr>";
        totalP += Number(item.foodPrice);
      });
      $("#noti-wrap").html(items);
      $('#totalPrice').html(totalP);

    },
    initEvent: function initEvent() {
      $('.l-fix').on('click', function () {
        M.page.back();
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
      $('#btn-order').on('click', function () {
        MNet.sendHttp({
          path: SERVER_PATH.STORE_ORDER_REGIST,
          data: {
            "list": M.data.param('tbody'),
          },
          succ: function (data) {
            console.log(data);
            var pagelist = M.info.stack();
            M.page.remove(pagelist[1].key);
            alert('발주가 완료되었습니다.');
            M.page.replace('./foodOrder.html');
          },
          error: function () {
            console.log('에러');
          }
        });
      });
    }
  };
  window.__page__ = page;
})(jQuery, M, __util__, __mnet__, __serverPath__, __difinition__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);