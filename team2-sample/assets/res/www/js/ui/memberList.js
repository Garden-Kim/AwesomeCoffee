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
        path: SERVER_PATH.STORE_MEM_LIST,
        data: {},
        succ: function (data) {
          var items = "";
          if(data.list === ''){
            items += "<h1 style='font-size:2rem;color:#888;text-align:center;margin-top:5rem;'>"
            items += "회원목록이 없습니다.</h1>"
            $(".memberList").append(items);
          }else{
            $.each(data.list, function (index, item) {
              items += "<ul data='" + item.memberNum + "' class='memberOne bg-white' >";
              items += "<li>";
              items += "<div>";
              items += "아이디 : " + item.memberId;
              items += "<span style='color:#aaa'>";
              items += " / 회원번호 : "+ item.memberNum;
              items += "</span>";
              items += "</div>";
              items += "</li>";
              items += "<li>";
              items += "<div>";
              items += "성명 ";
              items += "</div>";
              items += "<div>";
              items += "연락처 ";
              items += "</div>";
              items += "<div>";
              items += "이메일 ";
              items += "</div>";
              items += "</li>";
              items += "<li class='member-info'>";
              items += "<div>";
              items += item.memberName;
              items += "</div>";
              items += "<div>";
              items += item.memberPhone;
              items += "</div>";
              items += "<div>";
              items += item.memberEmail;
              items += "</div>";
              items += "</li>";
              items += "</ul>";
            });
            $(".memberList").append(items);
            $('.cookState:contains(N)').css('color', 'red');
            $('.takeout:contains(N)').css('color', 'red');
            $('.cookState:contains(Y)').css('color', 'blue');
            $('.takeout:contains(Y)').css('color', 'blue');
          }
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
      
      $('.order-menu').on('click', '.orderOne', function( ) {
        var orderNum = $(this).attr('data' );
        MNet.sendHttp({
          path: SERVER_PATH.ORDER_LIST_DETAIL,
          data: {
            orderNum : orderNum,
          },
          succ: function (data) {
            if (data.rsltCode == '0000') {
              M.page.html('./payDetail.html',{param : {orderNum	: orderNum}} );
            } else {
              alert('페이지를 열 수 없습니다.');
            }
          },
          error: function (data) {
            console.log(data);
            alert('에러!');
          }
        });
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
      
// 관리자 사이드바
      $('#menu-order-food').on('click', function(){
        M.page.html('./foodOrder.html');
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
        M.page.replace('./memberList.html');
      });   
      $('#menu-store-info').on('click', function(){
        M.page.html('./storeList.html');
      });
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