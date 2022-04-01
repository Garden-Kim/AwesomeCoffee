/**
 * @file : 주문내역
 * @author : 김예은
 * @date : 22.03.30
 */

(function ($, M, CONFIG, window) {
  var CONSTANT = CONFIG.CONSTANT;
  var SERVER_PATH = CONFIG.SERVER_PATH;
  var page = {
    els: {
      $title: null,
      $regDate: null,
      $menu: null,
      $finish: null,
      $back: null,
      $menu : null,
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
      this.els.$title = $('#title');
      this.els.$regDate = $('#regDate');
      this.els.$menu = $('#menu');
      this.els.$back = $("#back");
      this.els.$finish = $("#finish");
      this.els.$menuOrderList = $('#menu-order-list');
      this.els.$menuPickup = $('#menu-pickup');
      this.els.$menuRecipeList = $('#menu-recipe-list');
      this.els.$menuStoreInfo = $('#menu-store-info');
    },
    initView: function initView() {
      var self = this;
      $.sendHttp({
        path: SERVER_PATH.NOTICE_DETAIL,
        data: {
          loginId: M.data.global("userId"),
          seqNo: M.data.global("seqNo")
        },
        succ: function (data) {
          var items = "";
          items += "<div class='detail-tit'>";
          items += "<p id='title'>";
          items += data.title;
          items += "</p>";
          items += "<span id='regDate'>";
          items += data.regDate;
          items += "</span>";
          items += "</div>";
          self.els.$title.html("주문번호 : " + data.title);
          self.els.$regDate.html("회원이름 : " + data.regDate);
          //self.els.$menu.html("메뉴리스트 : " + data.content);
        },
        error: function () {
          alert("데이터를 불러오지 못했습니다.");
        }
      });
      $.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: self.data.requset,
        succ: function (data) {
          var items = "";
          self.data.requset.lastSeqNo = data.lastSeqNo;
          $.each(data.list, function (index, item) {
            items += "<div class='empOrderList'>"
            items += "<li data-seq='" + item.seqNo + "'>";
            items += "메뉴 : " + item.content;
            items += "</li>";
            items += "<li data-seq='" + item.seqNo + "'>";
            items += "수량 : 1개";
            items += "</li>";
            items += "</div>"
          });
          $(".empMenu").append(items);
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
      var title = M.data.global('title');
      var content = M.data.global('content');
      
      this.els.$back.on('click', function () {
        M.page.html('./empOrderList.html');
      })

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

      this.els.$finish.on('click', function () {
        M.pop.alert({
          title: '알림',
          message: '조리 완료 상태로 넘어가겠습니까?',
          buttons: ['예', '아니오'],
          callback: function (index) {
            if (index == 1) {
              return false;
            }
            if (index == 0) {
              console.log(M.data.global('seqNo'))
              M.page.html({
                // seqNo 을 리스트로 넘겨서 해당 조리여부를 Y 로 바꿈
                url : './empOrderList.html',
                param : M.data.global("seqNo")
              });
              return false;
              // $.sendHttp({
              //   path: SERVER_PATH.NOTICE_DELETE,
              //   data: {
              //     loginId: M.data.global("userId"),
              //     seqNo: M.data.global("seqNo")
              //   },
              //   succ: function () {
              //     alert("게시글이 삭제되었습니다.");
              //     M.page.html("./list.html");
              //   },
              //   error: function () {
              //     alert("삭제 실패");
              //   }
              // });
            }
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