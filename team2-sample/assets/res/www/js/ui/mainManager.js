/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){

  var page = {
    els:  {
    },
    data: {},
    init: function init(){
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
    },
    initEvent : function initEvent(){
      var self = this;
      $('#btn-order').on('click', function(){
        M.page.html('./foodOrder.html');
      });
      $('#btn-foodPayList').on('click', function(){
        M.page.html('./foodTransferList.html');
      });       
      $('#btn-sales').on('click', function(){
        M.page.html('./sales.html');
      });      
      $('#btn-product').on('click', function(){
        M.page.html('./menuList.html');
      });          
      $('#btn-memberInfo').on('click', function(){
        M.page.html('./memberList.html');
      });
      $('#btn-storeInfo').on('click', function(){
        M.page.html('./storeInfo.html');
      });
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