/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){

  var page = {
    els:  {
      $btnOrder : null,
    },
    data: {},
    init: function init(){
      this.els.$btnOrder = $('#btn-order');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      console.log(M.data.global('id'));
      console.log(M.data.storage('AUTO_LOGIN_AUTH'));
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          "loginId": M.data.global('id'),
          "lastSeqNo": '0',
          "cnt": '10000000',
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<ul id='"+ item.seqNo +"' class ='food-list bg-white'>";
            items += "<li>";
            items += "<input type='checkbox' id='"+ item.seqNo +"' name='color' class='chk-03' />";
            items += "</li><li>";
            items += item.title;
            items += "</li><li>";
            items += "<button type='button' id='qtyPlus' class='qty'>";
            items += "<img src='../img/icon-plus.png'>";
            items += "</button>";
            items += "<span id='goodsQty' class='qty'>";
            items += "1";
            items += "</span>";
            items += "<button type='button' id='qtyMinus' class='qty'>";
            items += "<img src='../img/icon-minus.png'>";
            items += "</button>";
            items += "</li><li>";
            items += "2000원"
            items += "</li></ul>";;
          });
          $("#noti-wrap").html(items);
        },
        error: function (data) {
          console.log(data);
          alert("리스트를 가져오지 못했습니다.");
        },
      });
    },
    initEvent : function initEvent(){
      var self= this;
      $('.l-fix').on('click', function(){
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
      $('#menu-order-food').on('click', function(){
        M.page.replace('./order.html');
      });      
      $('#menu-payment-list').on('click', function(){
      //   발주내역   M.page.html('./.html');
      });       
      $('#menu-sales').on('click', function(){
        M.page.html('./sales.html');
      });      
      $('#menu-menu').on('click', function(){
        M.page.html('./menuList.html');
      });          
      $('#menu-member-info').on('click', function(){
      //    회원정보  M.page.html('./.html');
      });   
      $('#menu-store-info').on('click', function(){
        M.page.html('./storeList.html');
      });

      this.els.$btnOrder.on('click', function(){
        M.page.html('./fpayment.html');
      });
      $('.btn-top').on('click', function () {
        $('.cont-wrap').scrollTop(0);
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