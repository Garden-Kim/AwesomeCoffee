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
    data: {
/*      chkFood: {
        foodNum : null,
        storeOrderQty : null,
      },*/
    },
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
        path: SERVER_PATH.FOOD_LIST,
        data: {},
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<ul id='"+ item.foodNum +"' class ='food-list bg-white'>";
            items += "<li>";
            items += "<input type='checkbox' value='"+ item.foodNum +"' name='color' class='chk-03' />";
            items += "</li><li class='foodName' style='text-align:center;'>";
            items += item.foodName;
            items += "</li><li class='foodQty'>";
            items += "<button type='button' class='qty qtyPlus'>";
            items += "<img src='../img/icon-plus.png'>";
            items += "</button>";
            items += "<span class='qty' data-q='1'>";
            items += "1";
            items += "</span>";
            items += "<button type='button' class='qty qtyMinus'>";
            items += "<img src='../img/icon-minus.png'>";
            items += "</button>";
            items += "</li><li class='foodPrice' data-p='"+item.foodPrice+"' id='" +item.foodPrice+"'>";
            items += Number(item.foodPrice).toLocaleString() + '원';
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
                    url: "./intro.html",
                    actionType: "CLEAR_TOP"
            });
          }
        });
      });
      
      $("#noti-wrap").on("click", ".qtyPlus " , function(){
        var qty = Number($(this).parent().children('span').text());
        var ser = qty + 1;
        var price = Number($(this).parent().siblings('.foodPrice').attr('id'));
        var sum = (price * ser).toLocaleString();
        $(this).parent().siblings('.foodPrice').html(sum+'원');
        $(this).parent().siblings('.foodPrice').attr('data-p', price * ser);
        $(this).parent().children('span').html(ser);
        $(this).parent().children('span').attr('data-q', ser);
      });
      $("#noti-wrap").on("click", ".qtyMinus " , function(){
        var qty = Number($(this).parent().children('span').text());
        if (qty != 1){
          var ser = qty - 1;
          console.log(qty);
          console.log(ser);
          var price = Number($(this).parent().siblings('.foodPrice').attr('id'));
          var sum = (price * ser).toLocaleString();
          $(this).parent().siblings('.foodPrice').html(sum+'원');
          $(this).parent().siblings('.foodPrice').attr('data-p', price * ser);
          $(this).parent().children('span').html(ser);
          $(this).parent().children('span').attr('data-q', ser);
        }
      });
      this.els.$btnOrder.on('click', function(){
        var body = [];
        var tbody = [];
        $("input[name=color]:checked").each(function(){
          var i = 0;
          var foodNum = $(this).val();
          var foodName = $(this).parent().siblings('.foodName').text();
          var qty = $(this).parent().siblings('.foodQty').children('span').text();
          var foodPrice = $(this).parent().siblings('.foodPrice').attr('id');
          console.log(foodPrice); 
          console.log(qty); 
          var _body = { "foodNum": foodNum, "foodName" : foodName, "storeOrderQty" : qty , "foodPrice" : foodPrice };
          var _tbody = { "foodNum": foodNum, "storeOrderQty" : qty };
          console.log(_body);
          body.push(_body);
          tbody.push(_tbody);
        });
        console.log(body);
        console.log(tbody);
        M.page.html('./fpayment.html', {param : {"body" : body, "tbody" : tbody}});
        
        // M.page.html('./fpayment.html');
        
      });
      $('.btn-top').on('click', function () {
        $('.cont-wrap').scrollTop(0);
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
  M.onRestore(function() {
    pageFunc.initView();
  });
  
})(jQuery,M,__page__,window);