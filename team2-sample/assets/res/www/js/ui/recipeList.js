/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, CONFIG, window) {
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $btnModify: null,
      $btnTop: null,
      $infoDetail: null,
      $btnWrap: null,
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
      this.els.$btnModify = $('#btn-modify');
      this.els.$btnTop = $('.btn-top');
      this.els.$infoBox = $('#info-detail');
      this.els.$btnWrap = $('#btn-more');
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
          self.data.lastSeqNum = data.lastSeqNo;
          $.each(data.list, function (index, item) {
            items += "<li id='" + item.seqNo + "' class ='menu'>";
            items += "<div class='thumbnail-wrap'>";
            items += "<div class='thumbnail'>";
            items += "<img src='" + item.imgUrl + " ' alt=''/>";
            items += "</div>";
            items += "<span class='label-info none'>";
            items += "<img src= '" + item.imgUrl + "' alt='50%'/>";
            items += "</span>";
            items += "</div>";
            items += "<div class='info-box'>";
            items += "<div class='info-box-top'>";
            items += "<strong class='ellipsis_1'>";
            items += item.title;
            items += "</strong>";
            items += "<div class='info-box-btm'>";
            items += "<p style='text-align:right;' class='ellipsis_1'>";
            items += item.content + '원';
            items += "</p>";
            items += "</div>";
            items += "</div>";
            items += "</a>";
            items += "</li>";
          });
          $(".metro-wrap").append(items);
        },
        error: function (data) {
          alert("리스트를 가져오지 못했습니다.");
        },
      });
    },
    initEvent: function initEvent() {
      var self = this;
      $('.l-fix').on('click', function () {
        M.page.back();
      });

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
      
      this.els.$btnTop.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      });
      $('.menu-store-info')
      $('.metro-wrap').on('click', '.menu', function () {
        var seqNo = $(this).attr('id');
        $.sendHttp({
          path: SERVER_PATH.NOTICE_DETAIL,
          data: {
            loginId: M.data.global("userId"),
            seqNo: seqNo
          },
          succ: function (data) {
            if (data.rsltCode == '0000') {
              M.page.html('./recipeDetail.html', {
                param: {
                  seqNo: seqNo
                }
              });
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
    }
  };
  window.__page__ = page;
})(jQuery, M, __config__, window);
/*
$.each(data.lists, function(index, item){
  items += "<tr>";
  items += "<td><a href='/'>"+ item.memberNum + "</a></td>";
  items += "<td>"+ item.memberNum +"</td>";
  items += "<td><input type='' name='' value='" + item.memberNum + "'></td>";
  items += "</tr>";    
})*/

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);