/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){

  var page = {
    els: {
      $back: null,
      $top: null,
      $pickup: null,
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
      this.els.$back = $("#back");
      this.els.$btnTop = $('#btnTop');
      this.els.$pickup = $('.pickup');
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
        path: SERVER_PATH.NOTICE_LIST,
        data: self.data.requset,
        succ: function (data) {
          var items = "";
          self.data.requset.lastSeqNo = data.lastSeqNo;
          $.each(data.list, function (index, item) {
            items += "<ul>"
            items += "<li data-seq='" + item.seqNo + "'>";
            items += item.title;
            items += "</li>";
            items += "<li data-seq='" + item.seqNo + "'>";
            items += item.content;
            items += "</li>";
            items += "<li data-seq='" + item.seqNo + "'>";
            items += "핫초코 외3";
            items += "</li>";
            items += "<li data-seq='" + item.seqNo + "' class='pickupState'>";
            items += "N";
            items += "</li>";
            items += "</ul>"
          });
          $(".pickup").append(items);
        },
        error: function (data) {
          $(".btn-wrap").css("display", "none");
          alert("에러");
        }
      });
    },
    initEvent: function initEvent() {
      var self = this;
      this.els.$back.on('click', function () {
        M.page.back();
      })
      this.els.$btnTop.on('click', function () {
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
      // 사이드바 메뉴
      this.els.$menuOrderList.on('click', function () {
        M.page.html("./empOrderList.html");
      })
      this.els.$menuPickup.on('click', function () {
        M.page.replace("./pickupList.html");
      })
      this.els.$menuRecipeList.on('click', function () {
        M.page.html("./recipeList.html");
      })
      this.els.$menuStoreInfo.on('click', function () {
        M.page.html("./storeInfo.html"); 
      })

      // 픽업 완료 기능
      $('.pickup').on('click', '.pickupState', function () {
        if ($(this).text() == 'N') {
          $(this).text('Y');
          $(this).toggleClass('pickupStateY');
        } else {
          $(this).text('N');
          $(this).toggleClass('pickupStateN');

        }
        M.pop.alert({
          title: '알림',
          message: '픽업 완료 상태로 넘어가겠습니까?',
          buttons: ['예', '아니오'],
          callback: function (index) {
            if (index == 1) {
              return false;
            }
            if (index == 0) {
              console.log(this)
              //M.page.html('./pickupList.html');
            }
          }
        })
      })
    },
    // 사이드바 display
    sideBarDisplay: function () {
      $('.side-bar').css('display', 'none');
      if ($(".side-bar").css("display") == "none") {
        $(".side-bar").hide();
      } else {
        $(".side-bar").show();
      }
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