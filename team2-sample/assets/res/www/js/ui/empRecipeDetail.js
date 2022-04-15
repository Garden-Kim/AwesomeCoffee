/**
 * @file : 레시피 상세페이지
 * @author : 김예은
 * @date : 22.03.30
 */

 (function ($, M, MNet, module, SERVER_PATH, window) {

  var page = {
    els: {
      $title: null,
      $regDate: null,
      $imgUrl: null,
      $content: null,
      $loginId: null,
      $seqNum: null,
      $back: null,
      $menu : null
    },
    data: {},
    init: function init() {
      this.els.$title = $('#title');
      this.els.$regDate = $('#regDate');
      this.els.$imgUrl = $('#imgUrl');
      this.els.$content = $('#content');
      this.els.$back = $("#back");
      this.els.$menu = $('#menu');
    },
    initView: function initView() {
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.RECIPE_INFO,
        data: {
          goodsNum: M.data.param('goodsNum')
        }, 
        succ: function (data) {
          var items = "";
          items += "<div class='recipe-detail-tit'>";
          items += "<p id='title'>";
          items += M.data.param('goodsName');
          items += "</p>";
          items += "<span id='regDate'>";
          items += "RecipeNumber : " + data.goodsNum;
          items += "</span><br/>";
          items += "<span> ";
          items += "Category : coffee";
          items += "</span>";
          items += "</div>";
          items += "<div class='recipe-detail-cont'>";
          // 이미지 url
          if (data.goodsImage != null) {
            items += "<div class='img-wrap'>";
            items += "<img id='imgUrl' src='http://192.168.0.31:8080/view/goods/upload/" + data.goodsImage + "'/>";
            items += "</div>";
            M.data.global("imgUrl", data.goodsImage);
            var split = data.goodsImage.lastIndexOf('/');
            var imgName = data.goodsImage.toString().substring(split + 1, );
            M.data.global("imgName", imgName);
          }
          items += "<p id='content'>";
          items += "물 : 100ml <br/> 에스프레소2샷 <br/> 휘핑크림200ml <br/> 설탕20g <br/> 얼음<br/>  ";
          items += "</p>";
          items += "</div>";

          $("#notice-select").html(items);

          self.els.$title.html(data.title);
          self.els.$regDate.html(data.regDate);
          self.els.$content.html(data.content);

        },
        error: function () {
          alert("데이터를 불러오지 못했습니다.");
        }
      })

      //if ($loginId.val() == )
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$back.on('click', function () {
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
      $('#menu-order-list').on('click', function () {
        M.page.html("./empOrderList.html");
      })
      $('#menu-pickup').on('click', function () {
        M.page.html("./pickupList.html");
      })
      $('#menu-recipe-list').on('click', function () {
        M.page.html("./recipeList.html");
      })
      $('#menu-store-info').on('click', function () {
        M.page.html("./storeInfo.html");
      })      
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
      
    },
  };

  window.__page__ = page;
})(jQuery, M, __mnet__, __util__,__serverPath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);