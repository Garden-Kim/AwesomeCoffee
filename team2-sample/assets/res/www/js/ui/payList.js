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

    },
    initView: function initView() {
      this.drawNoticeList()
    },
    drawNoticeList: function () {
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.ORDER_MEM_LIST,
        data: self.data.requset,
        succ: function (data) {
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<ul data='" + item.orderNum + "' class='orderOne bg-white' >";
            items += "<li>";
            items += item.orderTime;
            items += "</li>";
            items += "<li class='img-wrap orderList'>";
            items += "<div class='img'>";
            items += "<img src='";
            items += item.imgUrl;
            items += "' alt=''/>";
            items += "</div>";
            items += "<span class='label-info none'>";
            items += "<img src='";
            items += item.imgUrl;
            items += "' alt='50%'/>";
            items += "</span>";
            items += "</li>";
            items += "<li class='info-box'>";
            items += "<div class='info-box-top' style='margin-top: 1rem;'>";
            items += "조리상태 <strong >";
            items += item.cookState;
            items += "</strong>";
            items += "수령상태 <strong >";
            items += item.takeout;
            items += "</strong>";
            items += "</div>";
            items += "<div class='order-info'>";
            items += "<strong>";
            items += item.orderPrice + " 원";
            items += "</strong>";
            items += "<span>";
            items += "/ 1개";
            items += "</span>";
            items += "</div>";
            items += "</li>";
            items += "</ul>";
          });
          $(".order-menu").append(items);
        },
        error: function (data) {
          $(".order-menu").css("display", "none");
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
      /*
      $(".empOrder").on('click', '.empOrderItem', function(){
        if($(this).text() == 'N'){
          $(this).text('Y');
        }else{
          $(this).text('N');
        }
      });
      */
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
      // 회원 사이드바
      $('#m-orderList').on('click', function(){
        M.page.html('./menuList.html');
      });
      $('#m-storeList').on('click', function(){
        M.page.html('./storeList.html');
      });
      $('#m-userInfo').on('click', function(){
        M.page.html('./userInfo.html');
      });
      $('#m-cart').on('click', function(){
        M.page.html('./cart.html');
      });
      $('#m-payList').on('click', function(){
        M.page.replace('./payList.html');
      });
      
      $(".order-menu").on('click', '.orderOne', function () {
        var orderNum = $(this).attr('data');
        MNet.sendHttp({
          path: SERVER_PATH.ORDER_LIST_LIST,
          data: {
            orderNum : orderNum,
          },
          succ: function (data) {
            M.page.html('./payDetail.html', {param : { orderNum : orderNum}});
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