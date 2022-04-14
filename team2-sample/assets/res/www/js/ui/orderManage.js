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
      $menu: null,
      $menuOrderList: null,
      $menuPickup: null,
      $menuRecipeList: null,
      $menuStoreInfo: null,
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
      MNet.sendHttp({
        path: SERVER_PATH.ORDER_EMP_LIST,
        data: self.data.requset,
        succ: function (data) {
          var items = "";
          self.data.requset.lastSeqNo = data.lastSeqNo;
          $.each(data.list, function (index, item) {
            items += "<ul >"
            items += "<li data-seq='" + item.orderNum + "' class='empOrderDetail'>";
            items += item.orderNum;
            items += "</li>";
            items += "<li data-seq='" + item.orderNum + "' class='empOrderDetail'>";
            items += item.memberNum;
            items += "</li>";
            items += "<li data-seq='" + item.orderNum + "' class='empOrderDetail'>";
            items += item.titleGoodsName;
            items += "</li>";
            items += "<li data-seq='" + item.orderNum + "' class='empOrderState'>";
            items += item.cookState;
            items += "</li>";
            items += "<li data-seq='" + item.orderNum + "' class='pickupState'>";
            items += item.takeout;
            items += "</li>";
            items += "</ul>"
          });
          $(".empOrder").append(items);
          $('.empOrderState:contains(N)').css('color', 'red');
          $('.pickupState:contains(N)').css('color', 'red');
          $('.empOrderState:contains(Y)').css('color', 'blue');
          $('.pickupState:contains(Y)').css('color', 'blue');
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
        M.page.back();
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
        $('.wrapper').attr('style', 'position:relative;height:100%;background-color:#fff;pointer-events: none;cursor: default;');
      });
      $('.btn-menu').on('blur', function () {
        console.log('취소');
        $('.position').attr('style', 'position: absolute; top:0;right:-130px;bottom:0;transition:1s ease;');
        $('.wrapper').fadeTo("fast", 1);
        $('.wrapper').attr('style', 'position:relative;height:100%;background-color:#fff;');
      });
      // 사이드바 메뉴
      this.els.$menuOrderList.on('click', function () {
        M.page.replace("./empOrderList.html");
      });
      this.els.$menuPickup.on('click', function () {
        M.page.html("./pickupList.html");
      });
      this.els.$menuRecipeList.on('click', function () {
        M.page.html("./recipeList.html");
      });
      this.els.$menuStoreInfo.on('click', function () {
        M.page.html("./storeInfo.html"); 
      });
      $('#menu-order-manage').on('click', function(){
        M.page.html("./orderManage.html"); 
      })
      
      $('.empOrder').on('click', '.empOrderDetail', function () {
        var seqNo = $(this).attr('data-seq');
        M.data.global("seqNo", seqNo)
        MNet.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId: M.data.global("id"),
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
})(jQuery, M, __util__, __mnet__, __serverPath__,__difinition__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);