/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH, CONFIG, window) {
  var seqNoSend;
  var page = {
    els: {
      $payment: null,
      $imgUrl: null,
      $title: null,
      $content: null,

      $goodsPrice: null,
      $qtyPlus: null,
      $goodsQty: null,
      $qtyMinus: null,
    },
    data: {},
    init: function init() {
      console.log(M.data.param('goodsNum'));
    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터
      var self = this;
      console.log(M.data.param('direct'));
      if (M.data.param('direct') == 'Y') {
        // 리스트화 시키기
        MNet.sendHttp({
          path: SERVER_PATH.ORDER_DIRECTORDER,
          data: {
            "goodsNum": M.data.param('goodsNum'),
            "qty": M.data.param('qty')
          },
          succ: function (data) {
            var items = "";
            items += "<div class='cartMenu bg-white' style='margin:1rem;width:95%'>";
            items += "<div class='cartImg'>";
            // 데이터 있을 경우 바꿔야할 코드 (현재는 임의의 이미지)
            //items += "<img id='imgUrl' src='" + data.imgUrl + "'/>";
            items += "<img src='" + M.data.global('imgHttp') +data.goodsImage +" ' alt=''/>";
            items += "</div>";
            items += "<ul>";
            items += "<li data-seq='" + data.goodsNum + "' class='menuName' >";
            items += "<span>";
            items += data.goodsName;
            items += "</span>";
            items += "</li>";
            items += "<li data-seq='" + data.goodsNum + "' class='price' >";
            items += "<span> "
            items += Number(data.goodsPrice).toLocaleString() + " 원";
            items += "</span>";
            items += "<span style='color:#aaa;' class='goodsQty' data='" + data.qty + "'>";
            items += " / " + data.qty + " 개";
            items += "</span>";
            items += "<span style='float:right;'>";
            items += "총 " + (Number(data.goodsPrice) * Number(data.qty)).toLocaleString() + " 원";
            items += "</span>";
            items += "</li>";
            items += "</ul>";
            items += "</div>";
            $(".metro-wrap").append(items);
            console.log(data);
            $('#totalPrice').html((Number(data.goodsPrice) * Number(data.qty)).toLocaleString());
            if (data.imgUrl != null) {
              $('#imgUrl5').attr('src', data.goodsImage);
            }
          },
          error: function (data) {
            console.log(data);
            alert("실패");
            M.page.html({
              url: "./main.html",
              actionType: 'CLEAR_TOP'
            });
          }
        });
      } else {
        // 리스트화
        MNet.sendHttp({
          path: SERVER_PATH.CART_LIST,
          data: {
            "list": M.data.param('data')
          },
          succ: function (data) {
            var items = "";
            var totalP = 0;
            $.each(data.list, function (index, item) {
              items += "<div class='paymentMenu bg-white' style='margin:1rem;width:95%'>";
              items += "<div class='paymentImg'>";
              // 데이터 있을 경우 바꿔야할 코드 (현재는 임의의 이미지)
              //items += "<img id='imgUrl' src='" + data.imgUrl + "'/>";
              items += "<img src='" + M.data.global('imgHttp') + item.goodsImage + "'>";
              items += "</div>";
              items += "<ul>";
              items += "<li data-seq='" + item.goodsNum + "' class='menuName' >";
              items += "<span>";
              items += item.goodsName;
              items += "</span>";
              items += "</li>";
              items += "<li data-seq='" + item.goodsNum + "' class='price' >";
              items += "<span> "
              items += item.goodsPrice + " 원";
              items += "</span>";
              items += "<span style='color:#aaa;' class='goodsQty' data='" + item.qty + "'>";
              items += " / " + item.qty + " 개";
              items += "</span>";
              items += "<span style='float:right;'>";
              items += "총 " + (Number(item.goodsPrice) * Number(item.qty)).toLocaleString() + " 원";
              items += "</span>";
              items += "</li>";
              items += "</ul>";
              items += "</div>";
              totalP += Number(Number(item.goodsPrice) * Number(item.qty));
              console.log(totalP);
            });
            var totalPSum = Number(totalP).toLocaleString();
            $(".metro-wrap").append(items);
            $('#totalPrice').html(totalPSum);
            console.log(totalP);
          },
          error: function (data) {
            alert("데이터를 불러오지 못했습니다.");
          }
        });
      }
    },
    initEvent: function initEvent() {
      var self = this;

      $('#payBtn').on('click', function () {
        var payment = $("input:radio[name='payment']:checked").val();
        console.log(payment);
        console.log(M.data.param('direct'));
        if (module.isEmpty(payment)) {
          return alert('결제 방법을 선택해주세요.');
        }
        // 바로결제 
        if (M.data.param('direct') == 'Y') {
          console.log(M.data.param('goodsNum'));
          console.log($('.goodsQty').attr('data'));
          var qty = $('.goodsQty').attr('data').trim();
          MNet.sendHttp({
            path: SERVER_PATH.PAYMENT_DIRECTREGIST,
            data: {
              paymentKind: payment,
              "goodsNum": M.data.param('goodsNum'),
              "qty": qty
            },
            succ: function (data) {
              if (data.rsltCode == '0000') {
                console.log(data);
                alert('결제 완료되었습니다.');
                M.page.replace('./main.html');
              } else {
                console.log(data);
                alert('에러!');
              }
            }
          });
        } else {
          MNet.sendHttp({
            path: SERVER_PATH.PAYMENT_MEM_REGIST,
            data: {
              "list": M.data.param('data'),
              paymentKind : payment,
            },
            succ: function (data) {
              console.log(data);
              alert('결제 완료되었습니다.');
              M.page.html({
                      url: "./main.html",
                      actionType: "CLEAR_TOP"
              });
            },
            error: function (data) {
              console.log(data);
              alert("실패");
            }
          });
        }
      });

      // Dom Event 바인딩
      $('.btn-back').on('click', function () {
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
        M.page.html('./wishList.html');
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
            alert("로그아웃되셨습니다.");
            M.data.removeGlobal('id');
            M.data.removeGlobal('grade');
            M.data.removeStorage('AUTO_LOGIN_AUTH');
            M.page.html({
                    url: "./intro.html",
                    actionType: "CLEAR_TOP"
            });
          }
        });
      });
    }

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