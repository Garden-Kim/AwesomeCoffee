/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){
  var seqNoSend;
  var page = {
    els: {
      $payment: null,
      $imgUrl: null,
      $title: null,
      $content: null,

      $goodsPrice: null,
      $qtyPlus: null,
      $goodsQty: null,
      $qtyMinus: null,
    },
    data: {},
    init: function init() {
      console.log(M.data.param('goodsNum'));
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
      var self = this;
      if(M.data.param('direct') == 'Y'){
        MNet.sendHttp({
          path: SERVER_PATH.ORDER_DIRECTORDER,
          data: {
            "goodsNum": M.data.param('goodsNum'),
            "qty" :  M.data.param('qty')
          },
          succ: function (data) {
            console.log(data);
            $('#title').text(data.goodsName);
            $('#qty').html(data.qty);
            $('#goodsPrice').html(Number(data.goodsPrice) * Number(data.qty));
            seqNoNext = data.seqNo;
            console.log(data.imgUrl);
            if (data.imgUrl != null) {
              $('#imgUrl5').attr('src', data.goodsImage);
            }
          },
          error: function (data) {
            console.log(data);
            alert("실패");
            M.page.html({url: "./main.html",
                         actionType: 'CLEAR_TOP'});
          }
        });
      }else{
        // 장바구니에서 넘어온 주문리스트
      }
    },
    initEvent: function initEvent() {
      var self = this;
      var payment = $("input:radio[name='payment']:checked").val();
      console.log(payment);
      if(module.isEmpty(payment)){
        return alert('결제 방법을 선택해주세요.');
      }
      $('#payBtn').on('click', function(){
        if(M.data.param('direct') == 'Y'){
          MNet.sendHttp({
            path: SERVER_PATH.PAYMENT_DIRECTREGIST,
            data: {
              paymentKind : payment,
              "goodsNum" : M.data.param('goodsNum')
            },
            succ: function (data) {
              console.log(data);            
              alert('결제 완료되었습니다.');
              M.page.replace('./main.html');
            },
            error: function (data) {
              console.log(data);
              alert("실패");
            }
          });
        }else{
          // 장바구니에서 넘어온 결제
        }
      });
      
      // Dom Event 바인딩
      $('.btn-back').on('click', function () {
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