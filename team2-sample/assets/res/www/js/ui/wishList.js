/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH,CONFIG, window){

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
        loginId: M.data.global('id'),
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
      this.drawNoticeList();
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
        $('.wrapper').attr('style', 'position:relative;height:100%;background-color:#fff;pointer-events: none;cursor: default;');
      });
      $('.btn-menu').on('blur', function () {
        console.log('취소');
        $('.position').attr('style', 'position: absolute; top:0;right:-130px;bottom:0;transition:1s ease;');
        $('.wrapper').fadeTo("fast", 1);
        $('.wrapper').attr('style', 'position:relative;height:100%;background-color:#fff;');
      });


      // 회원 사이드바
      $('#m-orderList').on('click', function () {
        M.page.html('./menuList.html');
      });
      $('#m-storeList').on('click', function () {
        M.page.html('./storeList.html');
      });
      $('#m-userInfo').on('click', function () {
        M.page.html('./userInfo.html');
      });
      $('#m-cart').on('click', function () {
        M.page.html('./cart.html');
      });
      $('#m-interest').on('click', function () {
        M.page.replace('./wishList.html');
      });
      $('#m-payList').on('click', function () {
        M.page.html('./payList.html');
      });
      $('#m-logout').on('click', function(){
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
                    url: "./login.html",
                    actionType: "CLEAR_TOP"
            });
          }
        });
      });
      
      this.els.$btnTop.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      });
      // 관심버튼
      $('#card').on('click', '.hurt', function() {
        console.log($(this));
        var goodsNum = $(this).attr('id');
        console.log(goodsNum);

        console.log(goodsNum);
        if (confirm("관심상품에서 삭제하시겠습니까?") == true){
          MNet.sendHttp({
            path: SERVER_PATH.WISH_REGIST,
            data: {
              goodsNum : goodsNum,
            },
            succ: function (data) {
              alert('관심상품을 해제하셨습니다.');
              M.page.replace('./wishList.html');
            },
            error: function (data) {
              console.log(data);
              alert('에러!');
            }
          });
        }else{
          alert('취소하셨습니다.');
        }
      });
      $('.metro-wrap').on('click', '.click-d', function () {
        var goodsName = $(this).attr('id');
        MNet.sendHttp({
          path: SERVER_PATH.MENU_INFO,
          data: {
            goodsName : goodsName,
          },
          succ: function (data) {
            if (data.rsltCode == '0000') {
              M.page.html('./goodsDetail.html', {
                param: {
                  goodsName: goodsName
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
    },
    drawNoticeList: function () {
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.WISH_LIST,
        data: {},
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            console.log(item);
            items += "<li id='"+ item.goodsName +"' class ='menu'>";
            items += "<div class='thumbnail-wrap click-d' id='"+ item.goodsName +"'>";
            items += "<div class='thumbnail'>";
            items += "<img src='http://192.168.0.31:8080/view/goods/upload/" +item.goodsImage +" ' alt=''/>";
            items += "</div>";
            items += "<span class='label-info none'>";
            items += "<img src= 'http://192.168.0.31:8080/view/goods/upload/" + item.goodsImage + "' alt='50%'/>";
            items += "</span>";
            items += "</div>";
            items += "<div class='info-box'>";
            items += "<div class='info-box-top'>";
            items += "<strong class='ellipsis_1'>";
            items += item.goodsName;
            items += "</strong>";
            items += "</div>";
            items += "<button type='button' id='"+ item.goodsNum +"' class='hurt' data='"+ item.wishlist +"'></button>";
            items += "<span class='info-box-btm'>";
            items += "<p style='text-align:right;' class='ellipsis_1'>";
            items += item.goodsPrice + ' 원';
            items += "</p>";
            items += "</span>";
            items += "</div>";
            items += "</li>";
          });
          $("#card").html(items);
        },
        error: function (data) {
          alert("리스트를 가져오지 못했습니다.");
        },
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