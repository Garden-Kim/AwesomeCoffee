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
    },
    initEvent : function initEvent(){
      $('.btn-search').on('click', function(){
        var year = "";
        var month = "";
        var date = "";
        var paymentDate = "";
        year = $('#year').val();
        month = $('#month').val();
        date = $('#date').val();
        paymentDate = year.val() + '/' + month.val() + '/' + date.val();
        console.log(paymentDate)
        MNet.sendHttp({
          path: SERVER_PATH.PAYMENT_DATELIST,
          data: {
            "paymentDate" : paymentDate
          },
          succ: function (data) {
            var items = "";
            self.data.requset.lastSeqNo = data.lastSeqNo;
            $.each(data.list, function (index, item) {
              items += "<ul class='empOrderItem' data-seq='" + item.orderNum + "'>"
              items += "<li data-seq='" + item.orderNum + "' class='empOrderDetail'>";
              items += item.orderNum;
              items += "</li>";
              items += "<li data-seq='" + item.orderNum + "' class='empOrderDetail'>";
              items += item.memberNum;
              items += "</li>";
              items += "<li data-seq='" + item.orderNum + "' class='empOrderDetail'>";
              items += item.orderTime;
              items += "</li>";
              items += "<li data-seq='" + item.orderNum + "' class='empOrderDetail'>";
              items += item.orderPrice;
              items += "</li>";
              items += "<li data-seq='" + item.orderNum + "' class='empOrderState'>";
              items += item.cookState;
              items += "</li>";
              items += "</ul>"
            });
            $(".empOrder").append(items);
          },
          error: function (data) {
            console.log(data);
            alert(" 리스트를 가져오지 못했습니다. ");
          },
        });
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
        M.page.html('./foodOrder.html');
      });      
      $('#menu-payment-list').on('click', function(){
  //   발주내역   M.page.html('./.html');
      });       
      $('#menu-sales').on('click', function(){
        M.page.replace('./sales.html');
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
    }
      )}
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