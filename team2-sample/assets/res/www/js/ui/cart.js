/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){

  var page = {
    els: {
      $back: null,
      $btnTop: null,
      $plus: null,
      $minus: null,
      $orderBtn: null,
      $a: null,
      $b: null,
      $c: null,
      $menuStoreInfo: null,
      $sideBar: null,
    },
    data: {
      requset: {
        loginId: M.data.global('id'),
        lastSeqNo: '0',
        cnt: '5'
      },
    },
    init: function init() {
      this.els.$back = $('#back');
      this.els.$btnTop = $('.btn-top');
      this.els.$qtyPlus = $('#qtyPlus');
      this.els.$qtyMinus = $('#qtyMinus');
      this.els.$orderBtn = $('#orderBtn');
      this.els.$a = $('#a');
      this.els.$b = $('#b');
      this.els.$c = $('#c');
      this.els.$menuStoreInfo = $('#menu-store-info');
      this.els.$sideBar = $('.side-bar');

    },
    initView: function initView() {
      this.drawNoticeList();
      this.sideBarDisplay();
    },
    drawNoticeList: function () {
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.CART_LIST,
        data: self.data.requset,
        succ: function (data) {
          var items = "";
          console.log(data);
          if(data.list == ''){
            items += "<h1 style='font-size:2rem;color:#888;text-align:center;margin-top:5rem;'>"
            items += "장바구니가 비었습니다.</h1>"
            $(".metro-wrap").append(items);
            $("#tp").html('0 원');
          }else{
            var totalP = "";
            $.each(data.list, function (index, item) {
              items += "<div class='cartMenu'>";
              items += "<div class='cartImg'>";
              // 데이터 있을 경우 바꿔야할 코드 (현재는 임의의 이미지)
              //items += "<img id='imgUrl' src='" + data.imgUrl + "'/>";
              items += "<img src='../img/coffee_exam.png'>";
              items += "</div>";
              items += "<ul>";
              items += "<li data-seq='" + item.goodsName + "' class='menuName' >";
              items += "<span>";
              items += item.goodsName;
              items += "</span>";
              items += "<button type='button' class='qty delete' style='font-size: 13px; width : 7rem; border:1px solid  rgb(223, 221, 221); border-radius:1rem;'>";
              items += "삭제";
              items += "</button>";
              items += "</li>";
              items += "<li data-seq='" + item.goodsName + "' class='price' >";
              items += "<span class='goodsPrice' data-p='"+ (Number(item.goodsPrice) * Number(item.goodsQty)) +"'> "
              items += item.goodsPrice;
              items += "</span>";
              items += "<button type='button' class='qty qtyPlus'>";
              items += "<img src='../img/icon-plus.png' >";
              items += "</button>";
              items += "<span data-q='"+ item.goodsQty +"' class='qty goodsQty'>";
              items += item.goodsQty;
              items += "</span>";
              items += "<button type='button' class='qty qtyMinus'>";
              items += "<img src='../img/icon-minus.png' >";
              items += "</button>";
              items += "</li>";
              items += "</ul>";
              items += "</div>";
              totalP += Number($('.goodsPrice').attr('data-p'));
              console.log(totalP);
            });
            $(".metro-wrap").append(items);
            console.log(totalP);
            $("#tp").html(totalP + ' 원');
          }
        },
        error: function (data) {
          $(".btn-wrap").css("display", "none");
          alert("에러");
        }
      });
    },

    initEvent: function initEvent() {
      var self = this;
      // 사이드바 
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
        M.page.replace('./menuList.html');
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
        M.page.html('./payList.html');
      });

      $(".metro-wrap").on("click", ".qtyPlus " , function(){
        var qty = Number($(this).parent().children('.goodsQty').text());
        var ser = qty + 1;
        var price = Number($(this).parent().children('.goodsPrice').attr('data-p'));
        $(this).parent().children('.goodsPrice').html(price * ser);
        $(this).parent().children('.goodsPrice').attr('data-p', price * ser);
        $(this).parent().children('.goodsQty').html(ser);
        $(this).parent().children('.goodsQty').attr('data-q', ser);
      });
      $(".metro-wrap").on("click", ".qtyMinus " , function(){
        var qty = Number($(this).parent().children('.goodsQty').text());
        if (qty != 1){
          var ser = qty - 1;
          var price = Number($(this).parent().children('.goodsPrice').attr('data-p'));
          $(this).parent().children('.goodsPrice').html(price * ser);
          $(this).parent().children('.goodsPrice').attr('data-p', price * ser);
          $(this).parent().children('.goodsQty').html(ser);
          $(this).parent().children('.goodsQty').attr('data-q', ser);
        }
      });
      
      this.els.$back.on('click', function () {
        M.page.back();
      })
      this.els.$btnTop.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      })
      this.els.$orderBtn.on('click', function () {
        // 상품번호 넘겨서 눌러야 함.
        M.page.html('./payment.html');
      })

    },
    // 사이드바 display
    sideBarDisplay : function(){
      $('.side-bar').css('display', 'none');
      if ($(".side-bar").css("display") == "none") {
        $(".side-bar").hide();
      } else {
        $(".side-bar").show();
      }
    },
    qtyMinus: function () {
      var self = this;
      var ser = Number($('#goodsQty').html()) - 1;
      $('#goodsPrice').html(5000 * ser);
      $('#goodsQty').html(ser);
    },
    qtyPlus: function () {
      var self = this;
      var ser = Number($('#goodsQty').html()) + 1;
      $('#goodsPrice').html(5000 * ser);
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