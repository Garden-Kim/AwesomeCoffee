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
      console.log(M.data.global('id'));
      console.log(M.data.storage('AUTO_LOGIN_AUTH'));
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      MNet.sendHttp({ ///// 결제 잔액
        path: SERVER_PATH.FOOD_PAYMENT_PRICE,
        data: {
        },
        succ: function (data) {
          console.log(data);
          if(data.rsltCode == '0000'){
            $("#restPayment").html(data.restPayment + ' 원 ');
          }else{
            alert("결제잔액을 불러오지 못했습니다.");
          }
        },
      });
      MNet.sendHttp({
        path: SERVER_PATH.FOOD_PAYMENT_LIST,
        data: {
        },
        succ: function (data) {
          console.log(data);
          if(data.rsltCode == '0000'){
            var items = '';
            $.each(data.list, function (index, item) {
              items += "<tr id='"+ item.foodPaymentNum +"' class ='test' style='height:5rem;font-size:1.5rem;'>";
              items += "<th>";
              items += item.foodPaymentNum;
              items += "</th><th >";
              items += item.foodPaymentDate;
              items += "</th><th >";
              items += item.foodPaymentPrice + " 원";
              items += "</th></tr>";
            });
            $("#noti-wrap").html(items);
          }else{
            alert("입금내역을 불러오지 못했습니다.");
          }
        },
      });
    },
    initEvent : function initEvent(){
      $('.l-fix').on('click', function(){
        M.page.back();
      });
      $('#btnTop').on('click', function () {
        $('.cont-wrap').scrollTop(0);
      });
      // 입금버튼
      $('#btn-payment').on('click', function(){
        var pay = $('#foodPaymentPrice').val().trim();
        console.log(pay);
        if(module.isEmpty(pay)){
          alert("금액을 입력해주세요.");
        }else{
          MNet.sendHttp({ ///// 입금
            path: SERVER_PATH.FOOD_PAYMENT_PAYMENT,
            data: {
              "foodPaymentPrice" : pay
            },
            succ: function (data) {
              console.log(data);
              if(data.rsltCode == '0000'){
                alert("입금 완료되셨습니다.");
                M.page.replace('./foodTransferList.html');
              }else{
                alert("입금을 실패하셨습니다.");
              }
            },
          });
        }
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
      $('#btn-order').on('click', function(){
        M.page.html('./foodPayList.html');
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