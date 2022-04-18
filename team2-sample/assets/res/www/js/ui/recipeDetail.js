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
          var content = data.recipeContent;
          content = content.replace(/\r\n/ig, '<br/>');
          content = content.replace(/\\n/ig, '<br/>');
          content = content.replace(/\n/ig, '<br/>');
          console.log(content);
          var items = "";
          items += "<div class='recipe-detail-tit bg-white'>";
          items += "<p id='title'>";
          items += M.data.param('goodsName');
          items += "</p>";
          items += "<span id='regDate'>";
          items += "상품번호 : " + M.data.param('goodsNum');
          items += "</span>";
          items += "</div>";
          items += "<div class='recipe-detail-cont bg-white'>";
          items += "<div class='img-wrap'>";
          items += "<img id='imgUrl' src='http://192.168.0.31:8080/view/goods/upload/" + M.data.param('goodsImage') + "'/>";
          items += "</div>";
          items += "<p id='content'>";
          items += content;
          items += "</p>";
          items += "</div>";
          
          $.each(data.list, function (index, item) {
            items += "<div class='recipe-detail-cont bg-white' style='width:100% ;height:4rem;border:2px solid #eee; margin:.5rem 0; padding:1rem;'>";
            items += "<li style='float:left; width:40%; font-size:1.5rem;'>";
            items += " 식자재번호 : " + item.foodNum;
            items += "</li>";
            items += "<li  style='float:left; width:40% ; font-size:1.5rem;'>";
            items += item.foodName;
            items += "</li>";
            items += "<li style='float:right; width:20%;  font-size:1.5rem;'>";
            items += item.recipeFoodQty + ' 개';
            items += "</li>";
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
          MNet.sendHttp({
            path : SERVER_PATH.RECIPE_DELETE,
            data: {
              "goodsNum":M.data.param("goodsNum"),
            },
            succ: function(data){
              if(data.rsltCode == '0000'){
                var pagelist = M.info.stack();
                console.log(pagelist);
                M.page.remove(pagelist[1].key);
                alert("삭제 완료되었습니다.");
                M.page.replace('./menuList.html');
              }else{
                return alert('삭제에 실패하셨습니다.');
              }
            }
          });
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