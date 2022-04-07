/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){

  var page = {
    els:  {
      $employee : null,
      $manager : null,
    },
    data: {},
    init: function init(){
      this.els.$employee = $('#employee');
      this.els.$manager = $('#manager');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
    },
    initEvent : function initEvent(){
    $('#employee').on('click', function(){
      M.page.html('./mainEmployee.html');
    });
    $('#manager').on('click', function(){
      M.page.html('./mainManager.html');
    });
    $('#member').on('click', function(){
      M.page.html('./main.html');
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