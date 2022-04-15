/**
 * @file : 레시피 상세페이지
 * @author : 김예은
 * @date : 22.03.30
 */

 (function ($, M, MNet, module, SERVER_PATH, window) {

  var page = {
    els: {
      $loginId: null,
      $seqNum: null,
      $back: null,
      $menu : null
    },
    data: {},
    init: function init() {
      this.els.$back = $("#back");
      this.els.$menu = $('#menu');
    },
    initView: function initView() {
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.RECIPE_INFO,
        data: {
          goodsNum : M.data.param('goodsNum')
        }, 
        succ: function (data) {
          var items = "";
          items += "<div class='recipe-detail-tit'>";
          items += "<p id='title'>";
          items += M.data.param('goodsName');
          items += "</p>";
          items += "<span id='regDate'>";
          items += "상품번호 : " + M.data.param('goodsNum');
          items += "</span>";
          items += "</div>";
          items += "<div class='recipe-detail-cont'>";
          items += "<div class='img-wrap'>";
          items += "<img id='imgUrl' src='http://192.168.0.31:8080/view/goods/upload/" + M.data.param('goodsImage') + "'/>";
          items += "</div>";
          items += "<p id='content'>";
          items += data.recipeContent;
          items += "</p>";
          items += "</div>";
          $.each(data.list, function (index, item) {
            items += "<div class='recipe-detail-cont'>";
            items += "<span>";
            items += " 식자재번호 : " + item.foodNum;
            items += "</span>";
            items += "<span>";
            //items +=  // 이름
            items += "</span>";
            items += "<span style='float:right'>";
            items += item.recipeFoodQty + ' 개';
            items += "</span>";
            items += "</div>";
          });

          $("#notice-select").html(items);
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
      
      
      $('#modiBtn').on('click', function(){
        console.log(M.data.param("goodsName"));
        console.log(M.data.param("goodsNum"));
        M.page.html('./write-recipe.html',{param : { goodsName : M.data.param("goodsName"),
                                                     goodsNum :  M.data.param("goodsNum"),
                                                     recipeYn : 'Y'}});
      });
      $('#delBtn').on('click', function(){
        if (confirm("레시피를 삭제하시겠습니까?") == true){
          alert("완료되었습니다.");
          var pagelist = M.info.stack();
          M.page.remove(pagelist[1].key);
          M.page.replace('./list.html');
        }else return;
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