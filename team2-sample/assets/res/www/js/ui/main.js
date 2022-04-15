/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, MNet, module, SERVER_PATH, window){

  var page = {
    els: {
      $announcementBtn: null,
      $btnTxt: null,
      $userInfoBtn: null,
      $orderList : null,
      $storeList : null,
    },
    data: {},
    init: function init() {
      this.els.$announcementBtn = $('#announcementBtn');
      this.els.$btnTxt = $('#btn-txt1');
      this.els.$userInfoBtn = $('#userInfoBtn');
      this.els.$orderList = $('#orderList');
      this.els.$storeList = $('#storeList');
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
      var self = this;
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      
      $('.announcementFour').on('click', '.ellipsis', function () {
        var seqNo = $(this).attr('data');
        console.log(seqNo);

        M.data.global({
          'seqNoSend': seqNo
        });
        console.log(M.data.global('seqNoSend'));
        self.bulletinDetail();
      })
      //  버튼 클릭시 동작
      var self = this;
      this.els.$orderList.on('click', function () {
        M.page.html('./menuList.html');
      });
      this.els.$storeList.on('click', function () {
        M.page.html('./storeList.html');
      });
      $('#userInfoBtn').on('click', function(){
        M.page.html('./userInfo.html');
      });
      $('#cart').on('click', function(){
        M.page.html('./cart.html');
      });
      $('#interest').on('click', function(){
        M.page.html('./wishList.html');
      });
      $('#payList').on('click', function(){
        M.page.html('./payList.html');
      });


    },


  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __util__, __serverPath__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);