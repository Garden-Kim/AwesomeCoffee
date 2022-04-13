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
      var ctg = '43 ';
      this.drawNoticeList(ctg);
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
        M.page.html('./cart.html');
      });
      $('#m-interest').on('click', function(){
        M.page.replace('./wishList.html');
      });
      $('#m-payList').on('click', function(){
        M.page.html('./payList.html');
      });
      
      this.els.$btnTop.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      });
      $('.metro-wrap').on('click', '.menu', function () {
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
    drawNoticeList: function (ctg) {
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.WISH_LIST,
        data: {},
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            console.log(item);
            items += "<li id='" + item.goodsName + "' class ='menu'>";
            items += "<div class='thumbnail-wrap'>";
            items += "<div class='thumbnail'>";
            items += "<img src='" + item.goodsImage + " ' alt=''/>";
            items += "</div>";
            items += "<span class='label-info none'>";
            items += "<img src= '" + item.goodsImage + "' alt='50%'/>";
            items += "</span>";
            items += "</div>";
            items += "<div class='info-box'>";
            items += "<div class='info-box-top'>";
            items += "<strong class='ellipsis_1'>";
            items += item.goodsName;
            items += "</strong>";
            items += "<div class='info-box-btm'>";
            items += "<p style='text-align:right;' class='ellipsis_1'>";
            items += item.goodsPrice + '원';
            items += "</p>";
            items += "</div>";
            items += "</div>";
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