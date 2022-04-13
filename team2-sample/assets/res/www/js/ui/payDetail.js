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
      console.log(M.data.param('orderNum'));
      MNet.sendHttp({
        path: SERVER_PATH.ORDER_LIST_DETAIL,
        data: M.data.param('orderNum'),
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<ul data='" + item.goodsNum + "' class='orderOne bg-white' >";
            items += "<li>";
            items += item.goodsName;
            items += "</li>";
            items += "<li class='info-box'>";
            items += "<div class='order-info'>";
            items += "<strong>";
            items += item.goodsPrice + " 원";
            items += "</strong>";
            items += "<span>";
            items += "/"+ item.orderlistQty + " 개";
            items += "</span>";
            items += "</div>";
            items += "</li>";
            items += "<li>";
            items += "합계 : " + item.price + " 원";
            items += "</li>";
            items += "</ul>";
          });
          $(".order-menu").append(items);
          $('#orderNum').html(M.data.param('orderNum'));
          $('#orderDate').html(data.orderDate);
          $('#payMethod').html(data.paymentKind);
          $('#paymentPrice').html(data.paymentPrice);
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
      $('#m-interest').on('click', function(){
        M.page.html('./wishList.html');
      });
      $('#m-payList').on('click', function(){
        M.page.html('./payList.html');
      });
      
      $(".order-menu").on('click', '.orderOne', function () {
        var seqNo = $(this).attr('data');
        M.data.global("seqNo", seqNo)
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId: M.data.global("id"),
            seqNo: seqNo
          },
          succ: function (data) {
            M.page.html('./orderDetail.html');
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