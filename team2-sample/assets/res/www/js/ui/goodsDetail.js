/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){
  var seqNoSend;
  var page = {
    els: {


      $imgUrl: null,
      $title: null,
      $content: null,

      $cartBtn: null,
      $payment: null,
      $qtyPlus: null,
      $qtyMinus: null,
    },
    data: { goodsNum : ''},
    init: function init() {
      this.els.$imgUrl = $('#imgUrl');
      this.els.$title = $('#title');
      this.els.$content = $('#content');

      this.els.$cartBtn = $('#cartBtn');
      this.els.$payment = $('#payment');
      
      this.els.$qtyPlus = $('#qtyPlus');
      this.els.$qtyMinus = $('#qtyMinus');

    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
      var self = this;
      console.log(M.data.param("goodsName"));
      MNet.sendHttp({
        path: SERVER_PATH.MENU_INFO,
        data: {
          "goodsName": M.data.param("goodsName"),
        },
        succ: function (data) {
          console.log(data);
          $('#title').text(data.goodsName);
          $('#content').html(data.goodsContent );
          $('#kal').text(data.goodsKal + ' Kal');
          $('.goodsPrice').text(data.goodsPrice);
          $('.goodsPrice').attr('id', data.goodsPrice);
          $('#imgUrl').attr('src', 'http://192.168.0.31:8080/view/goods/upload/'+ data.goodsImage);
          console.log(data.goodsNum);
          goodsNum = data.goodsNum;
          console.log(goodsNum);
          if(data.recipeYn == 'Y'){
            $('#recipe-exist').text('레시피가 존재합니다.')
            $('#recipe-write').text('레시피 상세');
          }
          if(data.categoryNum != '45 '){
            MNet.sendHttp({
              path: SERVER_PATH.MENU_CATEGORYLIST,
              data: {
                "categoryNum" : "45 ",
              },
              succ: function (data) {
                console.log(data);
                console.log(data.list[0]);
                console.log(data.list[0].goodsName);
                $('#imgUrl1').attr('src','http://192.168.0.31:8080/view/goods/upload/' + data.list[0].goodsImage);
                $('#goodsName1').text(data.list[0].goodsName);
                $('#goodsPrice1').text(data.list[0].goodsPrice + ' 원');
                $('#menu1').attr('data',data.list[0].goodsName);
                
                $('#imgUrl2').attr('src','http://192.168.0.31:8080/view/goods/upload/' + data.list[1].goodsImage);
                $('#goodsName2').text(data.list[1].goodsName);
                $('#goodsPrice2').text(data.list[1].goodsPrice + ' 원');
                $('#menu2').attr('data',data.list[1].goodsName);
                
                $('#imgUrl3').attr('src','http://192.168.0.31:8080/view/goods/upload/' + data.list[2].goodsImage);
                $('#goodsName3').text(data.list[2].goodsName);
                $('#goodsPrice3').text(data.list[2].goodsPrice + ' 원');
                $('#menu3').attr('data',data.list[2].goodsName);
              }
            });
          }else{
            MNet.sendHttp({
              path: SERVER_PATH.MENU_CATEGORYLIST,
              data: {
                "categoryNum" : "42",
              },
              succ: function (data) {
                console.log(data);
                console.log(data.list[0]);
                console.log(data.list[0].goodsName);
                $('#imgUrl1').attr('src','http://192.168.0.31:8080/view/goods/upload/' + data.list[0].goodsImage);
                $('#goodsName1').text(data.list[0].goodsName);
                $('#goodsPrice1').text(data.list[0].goodsPrice + ' 원');
                $('#menu1').attr('data',data.list[0].goodsName);
                
                $('#imgUrl2').attr('src','http://192.168.0.31:8080/view/goods/upload/' + data.list[1].goodsImage);
                $('#goodsName2').text(data.list[1].goodsName);
                $('#goodsPrice2').text(data.list[1].goodsPrice + ' 원');
                $('#menu2').attr('data',data.list[1].goodsName);
                
                $('#imgUrl3').attr('src','http://192.168.0.31:8080/view/goods/upload/' + data.list[2].goodsImage);
                $('#goodsName3').text(data.list[2].goodsName);
                $('#goodsPrice3').text(data.list[2].goodsPrice + ' 원');
                $('#menu3').attr('data',data.list[2].goodsName);
              }
            });
          }
        },
        error: function (data) {
          console.log(data);
          alert("실패");
        }
      });
    },
    initEvent: function initEvent() {
      var self = this;
      $('#menu1').on('click', function(){
        var goodsName = $(this).attr('data');
        M.page.html('./goodsDetail.html',{param : {goodsName	: goodsName}} );
      });
      $('#menu2').on('click', function(){
        var goodsName = $(this).attr('data');
        M.page.html('./goodsDetail.html',{param : {goodsName	: goodsName}} );
      });
      $('#menu3').on('click', function(){
        var goodsName = $(this).attr('data');
        M.page.html('./goodsDetail.html',{param : {goodsName	: goodsName}} );
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
        M.page.replace('./cart.html');
      });
      $('#m-interest').on('click', function(){
        M.page.html('./wishList.html');
      });
      $('#m-payList').on('click', function(){
        M.page.html('./payList.html');
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
        M.page.replace('./menuList.html');
      });          
      $('#menu-member-info').on('click', function(){
      //    회원정보  M.page.html('./.html');
      });   
      $('#menu-store-info').on('click', function(){
        M.page.html('./storeList.html');
      });
      
      
      $('#recipe-write').on('click', function(){
        if($('#recipe-write').text() == '레시피 상세'){
          M.page.html('./recipeDetail.html',{param : { goodsName : M.data.param("goodsName"),
                                                      goodsNum : goodsNum }});
        }else{
          M.page.html('./write-recipe.html',{param : { goodsName : M.data.param("goodsName"),
                                                      goodsNum : goodsNum }});
        }
      });
      $('#modiBtn').on('click', function(){
        M.page.html('./write-menu.html',{param : { seqNo : M.data.param('seqNo')}});
      });
      $('#delBtn').on('click', function(){
        if (confirm("메뉴를 삭제하시겠습니까?") == true){
          alert("완료되었습니다.");
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          M.page.replace('./menuList.html');
        }else return;
      });
      this.els.$qtyPlus.on('click', function () {

        self.qtyPlus();

      });
      this.els.$qtyMinus.on('click', function () {
        if ($('#goodsQty').html() != 1) {
          self.qtyMinus();
        }
      });
      this.els.$cartBtn.on('click', function () {
        console.log($('#goodsQty').html());
        MNet.sendHttp({
          path: SERVER_PATH.CART_REGIST,
          data: {
            "goodsNum": goodsNum,
            "qty" : $('#goodsQty').html()
          },
          succ: function (data) {
            console.log($('#goodsQty').html());
            console.log(data);
          },
          error: function (data) {
            console.log(data);
            alert("실패");
          }
        });
        if (confirm("장바구니에 등록되셨습니다. 이동하시겠습니까?") == true){
          M.page.replace('./cart.html');
        }else return;
      });
      this.els.$payment.on('click', function () {
        console.log($('#goodsQty').html());
        M.page.html('./payment.html', {param : {
                                          "goodsNum": goodsNum,
                                          "qty" : $('#goodsQty').html(),
                                          'direct' : 'Y'}});
      });
    },
    qtyMinus: function () {
      var self = this;
      var price = Number($('.goodsPrice').attr('id'));
      var ser = Number($('#goodsQty').html()) - 1;
      $('.goodsPrice').html(price * ser);
      $('#goodsQty').html(ser);
    },
    qtyPlus: function () {
      var self = this;
      var price = Number($('.goodsPrice').attr('id'));
      var ser = Number($('#goodsQty').html()) + 1;
      $('.goodsPrice').html(price * ser);
      $('#goodsQty').html(ser);

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