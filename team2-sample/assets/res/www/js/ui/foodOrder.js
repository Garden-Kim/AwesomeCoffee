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
            items += "</li><li style='text-align:center;'>";
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
            items += item.foodPrice;
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
        M.page.replace('./foodOrder.html');
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
      
      $("#noti-wrap").on("click", ".qtyPlus " , function(){
        var qty = Number($(this).parent().children('span').text());
        var ser = qty + 1;
        var price = Number($(this).parent().siblings('.foodPrice').attr('id'));
        $(this).parent().siblings('.foodPrice').html(price * ser);
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
          console.log(price);
          $(this).parent().siblings('.foodPrice').html(price * ser);
          $(this).parent().siblings('.foodPrice').attr('data-p', price * ser);
          $(this).parent().children('span').html(ser);
          $(this).parent().children('span').attr('data-q', ser);
        }
      });
      this.els.$btnOrder.on('click', function(){
        var chkList;
        $("input[name=color]:checked").each(function(){
          var qty = $(this).parent().siblings('.foodQty').children('span').text();
          console.log(qty); 
          console.log($(this).val());
          // data 넣으면 됨.
          chkList = { foodNum : $(this).val(),
                      storeOrderQty : qty}
           console.log("체크된 값 : " + chkList);
        });
/*        MNet.sendHttp({
          path: SERVER_PATH.STORE_ORDER_REGI,
          data: {

          },
          succ: function (data) {
            console.log(data);
            $('#title').text(data.goodsName);
            $('#content').html(data.goodsContent);
            $('#goodsPrice').text(data.goodsPrice);
            console.log(data.imgUrl);
            if (data.goodsImage != null) {
              $('#imgUrl').attr('src', data.goodsImage);
            }
          },
          error: function (data) {
            console.log(data);
            alert("실패");
          }
        });*/
        
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
  
})(jQuery,M,__page__,window);