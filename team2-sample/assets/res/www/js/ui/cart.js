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
        path: SERVER_PATH.NOTICE_LIST,
        data: self.data.requset,
        succ: function (data) {
          var items = "";
          self.data.requset.lastSeqNo = data.lastSeqNo;
          $.each(data.list, function (index, item) {
            items += "<div class='cartMenu'>";
            items += "<div class='cartImg'>";
            // 데이터 있을 경우 바꿔야할 코드 (현재는 임의의 이미지)
            //items += "<img id='imgUrl' src='" + data.imgUrl + "'/>";
            items += "<img src='../img/coffee_exam.png'>";
            items += "</div>";
            items += "<ul>";
            items += "<li data-seq='" + item.seqNo + "' class='menuName' >";
            items += "<span>";
            items += item.title;
            items += "</span>";
            items += "<button type='button' id='delete' class='qty' style='font-size: 13px; width : 7rem; border:1px solid  rgb(223, 221, 221); border-radius:1rem;'>";
            items += "삭제";
            items += "</button>";
            items += "</li>";
            items += "<li data-seq='" + item.seqNo + "' class='price' >";
            items += "<span id='goodsPrice'> "
            items += "5000";
            items += "</span>";
            items += "<button type='button' id='qtyPlus' class='qty'>";
            items += "<img src='../img/icon-plus.png' >";
            items += "</button>";
            items += "<span id='goodsQty' class='qty'>";
            items += "1";
            items += "</span>";
            items += "<button type='button' id='qtyMinus' class='qty'>";
            items += "<img src='../img/icon-minus.png' >";
            items += "</button>";
            items += "</li>";
            items += "</ul>";
            items += "</div>";
          });
          $(".metro-wrap").append(items);
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
      $('#m-payList').on('click', function(){
        // M.page.replace('./menuList.html');
      });

      this.els.$qtyPlus.on('click', '.price', function () {
        var seqNo = $(this).attr('data-seq');
        var ser = Number($('#goodsQty').html()) + 1;
        $('#goodsPrice').html(5000 * ser);
        $('#goodsQty').html(ser);
        // self.qtyPlus();
      })

      this.els.$qtyMinus.on('click', function () {
        if ($('#goodsQty').html() != 1) {
          self.qtyMinus();
        }
      })
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