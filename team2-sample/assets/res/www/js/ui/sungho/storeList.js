/**
 * @file : 리스트 페이지
 * @author : 최성호
 * @date : 22.03.22
 */

// 페이지 단위모듈
(function ($, M, MNet, config, SERVER_PATH, window) {
  var seqNo = '0';
  var page = {
    els: {
      $back: null,
      $announcementWrite: null,
      $announcementMore: null,
      $btnTop: null,

      $thumbnailWrapper: null,
    },
    data: {},
    init: function () {
      this.els.$back = $('#back'); // input
      this.els.$announcementWrite = $('#announcementWrite');
      this.els.$announcementMore = $('.btn-point-color');
      this.els.$btnTop = $('#btnTop');
      this.els.$thumbnailWrapper = $('.numSend');
    },
    initView: function () {
      //화면에서 세팅할 동적데이터

      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_LIST,
        data: {
          "loginId": M.data.global('userIdSend'),
          "lastSeqNo": seqNo,
          "cnt": "50",
        },
        succ: function (data) {
                  var items = "";
                  $.each(data.list, function (index, item) {
                    items += "<ul data='" + item.seqNo + "' class='numSend metro-wrap store bg-white' >";

                    items += "<li class='img-wrap'>";
                    items += "<div class='img '>";
                    items += "<img src='";
                    items += item.imgUrl;
                    items += "' alt=''/>";
                    items += "</div>";
                    items += "<span class='label-info none'>";
                    items += "<img src='";
                    items += item.imgUrl;
                    items += "' alt='50%'/>";
                    items += "</span>";
                    items += "</li>";
                    items += "<li class='info-box storeList'>";
                    items += "<div class='info-box-top'>";
                    items += "<strong class='membOderList' >";
                    items += item.title;
                    items += "</strong>";
                    items += "</div>";
                    items += "<div class='info-box-btm storeS'>";
                    items += "<strong style='text-align:left;' class='membOderList'>";
                    items += item.content;
                    items += "</strong>";
                    items += "</div>";
                    items += "<div class='info-box-btm storeA'>";
                    items += "<strong class='membOderList'>";
                    items += "거리";
                    items += "</strong>";
                    items += "</div>";
                    items += "</li>";

                    items += "</ul>";
                    seqNo = item.seqNo;
                  });
                  $(".metro-wrap").append(items);
                  
                },
        error: function (data) {
          $(".btn-point-color").css("display", "none");
          console.log(data);
        }
      });


    },



    initEvent: function initEvent() {
      var self = this;
      // Dom Event 바인딩

      //  게시글 클릭시 게시글 상세보기 동작
      $('.metro-wrap').on('click', '.numSend', function () {
        var seqNo = $(this).attr('data');
        console.log(seqNo);

        M.data.global({
          'seqNoSend': seqNo
        });
        console.log(M.data.global('seqNoSend'));
        self.bulletinDetail();
      })
      //뒤로가기

      this.els.$back.on('click', function () {
        M.page.html('./main.html');
      })
      

    },

    bulletinDetail: function () {
      MNet.sendHttp({
        path: SERVER_PATH.NOTICE_DETAIL,
        data: {
          "loginId": M.data.global('userIdSend'),
          "seqNo": M.data.global('seqNoSend')
        },
        succ: function (data) {

          M.page.html('./orderStotedetail.html');



        },
        error: function (data) {
          console.log(data);
          alert("실패");
        }
      });
    },


    moreBtn: function () {

      // Load More를 위한 클릭 이벤트e

      
      if ($(".cont-wrap").length == 0) { // 숨겨진 항목이 있는지 체크
        alert("더 이상 항목이 없습니다"); // 더 이상 로드할 항목이 없는 경우 경고
      }
    },
    top: function () {
      $('.cont-wrap').scrollTop(0);
    },




  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __config__, __serverpath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init(); //최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);