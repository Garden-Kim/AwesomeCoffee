/**
 * @file : 주문리스트
 * @author : 김예은
 * @date : 22.03.29
 */

(function ($, M, CONFIG, window) {
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $back: null,
      $detail: null,
      $btnTop: null,
      $menu: null,
      $menuOrderList: null,
      $menuPickup: null,
      $menuRecipeList: null,
      $menuStoreInfo: null,
    },
    data: {
      requset: {
        loginId: M.data.global('userId'),
        lastSeqNo: '0',
        cnt: '100000'
      },
    },
    init: function init() {
      this.els.$back = $('#back');
      this.els.$btnTop = $('#btnTop');
      this.els.$menu = $('#menu');
      this.els.$menuOrderList = $('#menu-order-list');
      this.els.$menuPickup = $('#menu-pickup');
      this.els.$menuRecipeList = $('#menu-recipe-list');
      this.els.$menuStoreInfo = $('#menu-store-info');

    },
    initView: function initView() {
      this.drawNoticeList()
    },
    drawNoticeList: function () {
      var self = this;
      $.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: self.data.requset,
        succ: function (data) {
          var items = "";
          self.data.requset.lastSeqNo = data.lastSeqNo;
          $.each(data.list, function (index, item) {
            items += "<ul >"
            items += "<li data-seq='" + item.seqNo + "' class='empOrderDetail'>";
            items += item.title;
            items += "</li>";
            items += "<li data-seq='" + item.seqNo + "' class='empOrderDetail'>";
            items += item.content;
            items += "</li>";
            items += "<li data-seq='" + item.seqNo + "' class='empOrderDetail'>";
            items += "아메리카노 외3";
            items += "</li>";
            items += "<li data-seq='" + item.seqNo + "' class='empOrderDetail'>";
            items += item.regDate;
            items += "</li>";
            items += "<li data-seq='" + item.seqNo + "' class='empOrderState'>";
            items += "N";
            items += "</li>";
            items += "</ul>"
          });
          $(".empOrder").append(items);
        },
        error: function (data) {
          $(".btn-wrap").css("display", "none");
          alert("에러");
        }
      });
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$back.on('click', function () {
        M.page.html("./main.html");
      })
      this.els.$btnTop.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      })
      /*
      $(".empOrder").on('click', '.empOrderItem', function(){

        if($(this).text() == 'N'){
          $(this).text('Y');
        }else{
          $(this).text('N');
        }
      });
      */
      // 사이드바 
      $('.btn-menu').on('click', function () {
        console.log('메뉴클릭');
        $('.position').attr('style', 'position: absolute; top:0;right:0px;bottom:0;transition:1s ease;');
        $('.wrapper').fadeTo("fast", 0.3);
      });
      $('.btn-menu').on('blur', function () {
        console.log('취소');
        $('.position').attr('style', 'position: absolute; top:0;right:-130px;bottom:0;transition:1s ease;');
        $('.wrapper').fadeTo("fast", 1);
      });
      // 사이드바 메뉴
      this.els.$menuOrderList.on('click', function () {
        M.page.html("./empOrderList.html");
      })
      this.els.$menuPickup.on('click', function () {
        M.page.html("./pickupList.html");
      })
      this.els.$menuRecipeList.on('click', function () {
        M.page.html("./recipeList.html");
      })
      this.els.$menuRecipeList.on('click', function () {
        // M.page.html("./.html"); 매장정보 페이지로 이동 
      })
      
      $('.empOrder').on('click', '.empOrderDetail', function () {
        var seqNo = $(this).attr('data-seq');
        M.data.global("seqNo", seqNo)
        $.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId: M.data.global("userId"),
            seqNo: seqNo
          },
          succ: function (data) {
            M.page.html('./empOrderDetail.html');
          }
        });
      })

    },
  };

  window.__page__ = page;
})(jQuery, M, __config__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);