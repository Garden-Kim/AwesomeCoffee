/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH, CONFIG, window) {

  var page = {
    els: {
      $back: null,
      $detail: null,
      $btnTop: null,
    },
    data: {
      requset: {
        loginId: M.data.global('id'),
        lastSeqNo: '0',
        cnt: '100000'
      },
    },
    init: function init() {
      this.els.$back = $('#back');
      this.els.$btnTop = $('#btnTop');

    },
    initView: function initView() {
      this.drawNoticeList()
    },
    drawNoticeList: function () {
      var self = this;
      MNet.sendHttp({
        path: SERVER_PATH.ORDER_LIST_LISTNN_YN,
        data: self.data.requset,
        succ: function (data) {
          var items = "";
          if (data.list === '') {
            items += "<h1 style='font-size:2rem;color:#888;text-align:center;margin-top:5rem;'>"
            items += "주문 내역이 없습니다.</h1>"
            $(".order-menu").append(items);
          } else {
            $.each(data.list, function (index, item) {
              items += "<ul data='" + item.orderNum + "' class='orderOne bg-white' >";
              items += "<li>";
              items += item.orderTime;
              items += "<span>";
              items += " / 주문번호 : " + item.orderNum;
              items += "</span>";
              items += "</li>";
              items += "<li class='img-wrap orderList'>";
              items += "<div class='img'>";
              items += "<img src='http://192.168.0.31:8080/view/goods/upload/";
              items += item.titleGoodsImage; /// 대표이미지
              items += "' alt=''/>";
              items += "</div>";
              items += "<span class='label-info none'>";
              items += "<img src='http://192.168.0.31:8080/view/goods/upload/";
              items += item.titleGoodsImage;
              items += "' alt='50%'/>";
              items += "</span>";
              items += "</li>";
              items += "<li class='info-box'>";
              items += "<div class='info-box-top' style='margin-top: 1rem;' id='" + item.orderNum + "'>";
              items += "조리상태 <strong class='cookState'>";
              items += item.cookState;
              items += "</strong>";
              items += "수령상태 <strong class='takeout' >";
              items += item.takeout;
              items += "</strong>";
              items += "</div>";
              items += "<div class='order-info' style='font-size: 1.6rem;'>";
              items += item.titleGoodsName;
              items += "<strong>";
              items += "/ " + item.orderPrice + " 원";
              items += "</strong>";
              items += "</div>";
              items += "</li>";
              items += "</ul>";
            });
            $(".order-menu").html(items);
            $('.cookState:contains(N)').css('color', 'red');
            $('.takeout:contains(N)').css('color', 'red');
            $('.cookState:contains(Y)').css('color', 'blue');
            $('.takeout:contains(Y)').css('color', 'blue');
          }
        },
        error: function (data) {
          $(".order-menu").css("display", "none");
          alert("에러");
        }
      });
    },
    initEvent: function initEvent() {
      // Dom Event 바인딩
      var self = this;
      this.els.$back.on('click', function () {
        M.page.back();
      })
      this.els.$btnTop.on('click', function () {
        $('.cont-wrap').scrollTop(0);
      })

      // 주문 order / history 
      const tabList = document.querySelectorAll('.orderStatus li');
      for (var i = 0; i < tabList.length; i++) {
        tabList[i].querySelector('.btn-status').addEventListener('click', function () {
          for (var j = 0; j < tabList.length; j++) {
            tabList[j].classList.remove('on');
          }
          var order = $(this).parent('li').attr('id');
          this.parentNode.classList.add('on');
          if(order == 'history'){
            MNet.sendHttp({
              path: SERVER_PATH.ORDER_LIST_LIST,
              data: self.data.requset,
              succ: function (data) {
                var items = "";
                if (data.list === '') {
                  items += "<h1 style='font-size:2rem;color:#888;text-align:center;margin-top:5rem;'>"
                  items += "주문 내역이 없습니다.</h1>"
                  $(".order-menu").append(items);
                } else {
                  $.each(data.list, function (index, item) {
                    items += "<ul data='" + item.orderNum + "' class='orderOne bg-white' >";
                    items += "<li>";
                    items += item.orderTime;
                    items += "<span>";
                    items += " / 주문번호 : " + item.orderNum;
                    items += "</span>";
                    items += "</li>";
                    items += "<li class='img-wrap orderList'>";
                    items += "<div class='img'>";
                    items += "<img src='http://192.168.0.31:8080/view/goods/upload/";
                    items += item.titleGoodsImage; /// 대표이미지
                    items += "' alt=''/>";
                    items += "</div>";
                    items += "<span class='label-info none'>";
                    items += "<img src='http://192.168.0.31:8080/view/goods/upload/";
                    items += item.titleGoodsImage;
                    items += "' alt='50%'/>";
                    items += "</span>";
                    items += "</li>";
                    items += "<li class='info-box'>";
                    items += "<div class='info-box-top' style='margin-top: 1rem;' id='" + item.orderNum + "'>";
                    items += "조리상태 <strong class='cookState'>";
                    items += item.cookState;
                    items += "</strong>";
                    items += "수령상태 <strong class='takeout' >";
                    items += item.takeout;
                    items += "</strong>";
                    items += "</div>";
                    items += "<div class='order-info' style='font-size: 1.6rem;'>";
                    items += item.titleGoodsName;
                    items += "<strong>";
                    items += "/ " + item.orderPrice + " 원";
                    items += "</strong>";
                    items += "</div>";
                    items += "</li>";
                    items += "</ul>";
                  });
                  $(".order-menu").html(items);
                  $('.cookState:contains(N)').css('color', 'red');
                  $('.takeout:contains(N)').css('color', 'red');
                  $('.cookState:contains(Y)').css('color', 'blue');
                  $('.takeout:contains(Y)').css('color', 'blue');
                }
              },
              error: function (data) {
                $(".order-menu").css("display", "none");
                alert("에러");
              }
            });
          }else if (order == 'orderList'){
            MNet.sendHttp({
              path: SERVER_PATH.ORDER_LIST_LISTNN_YN,
              data: self.data.requset,
              succ: function (data) {
                var items = "";
                if (data.list === '') {
                  items += "<h1 style='font-size:2rem;color:#888;text-align:center;margin-top:5rem;'>"
                  items += "주문 내역이 없습니다.</h1>"
                  $(".order-menu").append(items);
                } else {
                  $.each(data.list, function (index, item) {
                    items += "<ul data='" + item.orderNum + "' class='orderOne bg-white' >";
                    items += "<li>";
                    items += item.orderTime;
                    items += "<span>";
                    items += " / 주문번호 : " + item.orderNum;
                    items += "</span>";
                    items += "</li>";
                    items += "<li class='img-wrap orderList'>";
                    items += "<div class='img'>";
                    items += "<img src='http://192.168.0.31:8080/view/goods/upload/";
                    items += item.titleGoodsImage; /// 대표이미지
                    items += "' alt=''/>";
                    items += "</div>";
                    items += "<span class='label-info none'>";
                    items += "<img src='http://192.168.0.31:8080/view/goods/upload/";
                    items += item.titleGoodsImage;
                    items += "' alt='50%'/>";
                    items += "</span>";
                    items += "</li>";
                    items += "<li class='info-box'>";
                    items += "<div class='info-box-top' style='margin-top: 1rem;' id='" + item.orderNum + "'>";
                    items += "조리상태 <strong class='cookState'>";
                    items += item.cookState;
                    items += "</strong>";
                    items += "수령상태 <strong class='takeout' >";
                    items += item.takeout;
                    items += "</strong>";
                    items += "</div>";
                    items += "<div class='order-info' style='font-size: 1.6rem;'>";
                    items += item.titleGoodsName;
                    items += "<strong>";
                    items += "/ " + item.orderPrice + " 원";
                    items += "</strong>";
                    items += "</div>";
                    items += "</li>";
                    items += "</ul>";
                  });
                  $(".order-menu").html(items);
                  $('.cookState:contains(N)').css('color', 'red');
                  $('.takeout:contains(N)').css('color', 'red');
                  $('.cookState:contains(Y)').css('color', 'blue');
                  $('.takeout:contains(Y)').css('color', 'blue');
                }
              },
              error: function (data) {
                $(".order-menu").css("display", "none");
                alert("에러");
              }
            });
          }
        });
      };


      // 주문 상세페이지
      $('.order-menu').on('click', '.orderOne', function () {
        var orderNum = $(this).attr('data');
        MNet.sendHttp({
          path: SERVER_PATH.ORDER_LIST_DETAIL,
          data: {
            orderNum: orderNum,
          },
          succ: function (data) {
            if (data.rsltCode == '0000') {
              M.page.html('./payDetail.html', {
                param: {
                  orderNum: orderNum
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
        M.page.html('./wishList.html');
      });
      $('#m-payList').on('click', function () {
        M.page.replace('./payList.html');
      });
    },
  };

  window.__page__ = page;
})(jQuery, M, __util__, __mnet__, __serverPath__, __difinition__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);