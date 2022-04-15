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
      MNet.sendHttp({
        path: SERVER_PATH.STORE_ORDER_LIST,
        data: {},
        succ: function (data) {
          var items = "";
          if(data.list === ''){
            items += "<h1 style='font-size:2rem;color:#888;text-align:center;margin-top:5rem;'>"
            items += "발주내역이 없습니다.</h1>"
            $(".foodPayList").append(items);
          }else{
            $.each(data.list, function (index, item) {
              items += "<ul data='" + item.storeOrderNum + "' class='memberOne bg-white' >";
              items += "<li>";
              items += "<div style='font-size:1.5rem;padding:.7rem;'>";
              items += "발주번호 : "+ item.storeOrderNum;
              items += "<span style='color:#aaa'>";
              items += " / 날짜 : "+ item.storeOrderDate;
              items += "</span>";
              items += "<span style='float:right;margin-right:1rem;'>";
              items += "총액 : "+ item.listPrice + " 원 ";
              items += "</span>";
              items += "</div>";
              items += "</li>";
              
              items += "<li>";
              items += "<ul>";
              items += '식자재명';
              items += "</ul>";
              items += "<ul>";
              items += '갯수';
              items += "</ul>";
              items += "<ul>";
              items += '금액';
              items += "</ul>";
              items += "</li>";
              //// each 문 돌리기
              $.each(item.list, function (index, a) {
                items += "<li>";
                items += "<ul>";
                items += a.foodName;
                items += "</ul>";
                items += "<ul>";
                items += a.storeOrderQty + ' 개';
                items += "</ul>";
                items += "<ul>";
                items += a.foodPrice + ' 원';
                items += "</ul>";
                items += "</li>";
              });
              items += "</ul>";
            });
            $(".foodPayList").append(items);
          }
        },
        error: function (data) {
          $(".foodPayList").css("display", "none");
          alert("에러");
        }
      });
    },
    initEvent : function initEvent(){
      $('.l-fix').on('click', function(){
        M.page.back();
      });
      $('#btnTop').on('click', function () {
        $('.cont-wrap').scrollTop(0);
      })
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
// 관리자 사이드바
      $('#menu-order-food').on('click', function(){
        M.page.replace('./foodOrder.html');
      });      
      $('#menu-payment-list').on('click', function(){
        M.page.html('./foodTransferList.html');
      });       
      $('#menu-sales').on('click', function(){
        M.page.html('./sales.html');
      });      
      $('#menu-menu').on('click', function(){
        M.page.html('./menuList.html');
      });          
      $('#menu-member-info').on('click', function(){
        M.page.html('./memberList.html');
      });   
      $('#menu-store-info').on('click', function(){
        M.page.html('./storeList.html');
      });
      $('#menu-logout').on('click', function(){
        MNet.sendHttp({
          path: SERVER_PATH.LOGOUT,
          data: {
            "loginId": M.data.global('id')
          },
          succ: function (data) {
            M.data.removeGlobal('id');
            M.data.removeGlobal('grade');
            M.data.removeStorage('AUTO_LOGIN_AUTH');
            alert("로그아웃되셨습니다.");
            M.page.html({
                    url: "./login.html",
                    actionType: "CLEAR_TOP"
            });
          }
        });
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