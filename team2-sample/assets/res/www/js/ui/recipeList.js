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
      var ctg = '2';
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

      // 사이드바 메뉴
      this.els.$menuOrderList.on('click', function () {
        M.page.html("./empOrderList.html");
      });
      this.els.$menuPickup.on('click', function () {
        M.page.html("./pickupList.html");
      });
      this.els.$menuRecipeList.on('click', function () {
        M.page.replace("./recipeList.html");
      });
      this.els.$menuStoreInfo.on('click', function () {
        M.page.html("./storeInfo.html"); 
      });
      $('#menu-order-manage').on('click', function(){
        M.page.html("./orderManage.html"); 
      })
      $('#menu-logout').on('click', function(){
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
      // 카테고리
      const tabList = document.querySelectorAll('.category li');
      for(var i = 0; i < tabList.length; i++){
        tabList[i].querySelector('.btn-category').addEventListener('click', function(){
          for(var j = 0; j < tabList.length; j++){
            tabList[j].classList.remove('on');
          }
          var ctg = $(this).parent('li').attr('id');
          this.parentNode.classList.add('on');
          console.log(ctg);
          self.drawNoticeList(ctg);
        });
      };
      this.els.$btnTop.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      });
      $('.metro-wrap').on('click', '.menu', function () {
        var goodsNum = $(this).attr('id');
        var recipeYn = $(this).attr('data');
        var goodsName = $(this).attr('data-n');
        console.log(goodsName);
        console.log(recipeYn);
        console.log(goodsName);
        if(recipeYn == 'Y'){
          MNet.sendHttp({
            path: SERVER_PATH.RECIPE_INFO,
            data: {
              goodsNum : goodsNum,
            },
            succ: function (data) {
              if (data.rsltCode == '0000') {
                M.page.html('./empRecipeDetail.html',{param : { goodsName : goodsName,
                                                                goodsNum : goodsNum }});
              } else {
                alert('매장정보로 로그인하세요.');
              }
            }
          });
        }else{
          alert('레시피가 존재하지 않습니다.');
        }
      });
    },
    drawNoticeList: function (ctg) {
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.MENU_CATEGORYEMPLIST,
        data: {
          "categoryNum" : ctg,
        },
        succ: function (data) {
          console.log(data);
          var items = "";
          $.each(data.list, function (index, item) {
            console.log(item);
            items += "<li id='" + item.goodsNum + "' class ='menu' data='"+ item.recipeYn +"' data-n='"+ item.goodsName +"'>";
            items += "<div class='thumbnail-wrap'>";
            items += "<div class='thumbnail'>";
            items += "<img src='http://192.168.0.31:8080/view/goods/upload/" + item.goodsImage + " ' alt=''/>";
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