/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){

  var page = {
    els:  {
      $btnOrder : null,
      $btnSales : null,
      $btnProduct : null,
    },
    data: {},
    init: function init(){
      this.els.$btnOrder = $('#btn-order');
      this.els.$btnSales = $('#btn-sales');
      this.els.$btnProduct = $('#btn-product');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
    },
    initEvent : function initEvent(){
      var self = this;
      // 사이드바 
      $('.btn-menu').on('click', function () {
        console.log('메뉴클릭');
        $('.position').attr('style', 'position: absolute; top:0;right:0px;bottom:0;transition:1s ease;');
        $('.wrapper').fadeTo("fast", 0.3);
      });
      $('.btn-menu').on('blur', function () {
        console.log('취소');
        $('.position').attr('style', 'position: absolute; top:0;right:-130px;bottom:0;transition:1s ease;');
        $('.wrapper').fadeTo("fast", 1);
      });
      $('#menu-order-food').on('click', function(){
        console.log('사이드바클릭');
        M.page.html('./order.html');
      });
      $('#menu-payment-list').on('click', function(){
      //   발주내역   M.page.html('./.html');
      });       
      $('#menu-sales').on('click', function(){
        console.log('사이드바클릭');
        M.page.html('./sales.html');
      });      
      $('#menu-menu').on('click', function(){
        console.log('사이드바클릭');
        M.page.html('./menuList.html');
      });          
      $('#menu-member-info').on('click', function(){
        console.log('사이드바클릭');
      //    회원정보  M.page.html('./.html');
      });
      $('#menu-store-info').on('click', function(){
        console.log('사이드바클릭');
        M.page.html('./storeList.html');
      });
      
      this.els.$btnOrder.on('click', function(){
        M.page.html('./order.html');
      });      
      this.els.$btnSales.on('click', function(){
        M.page.html('./sales.html');
      });      
      this.els.$btnProduct.on('click', function(){
        M.page.html('./menuList.html');
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