/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH, CONFIG, window) {

  var page = {
    els: {},
    data: {
      requset: {
        loginId: M.data.global('id'),
        lastSeqNo: '0',
        cnt: '100000'
      },
    },
    init: function init() {},
    initView: function initView() {
      console.log(M.data.global('id'));
      console.log(M.data.storage('AUTO_LOGIN_AUTH'));
      if (module.isEmpty(M.data.global('id'))) {
        M.page.html('./login.html');
      }
      // 초기 그래프 
      var year = '22';
      MNet.sendHttp({
        path: SERVER_PATH.PAYMENT_MONTHSUM,
        data: {
          "year": year,
        },
        succ: function (data) {
          console.log(data);
          list = []
          M.data.param('year', year);
          $.each(data.monthList, function (index, item) {
            list.push({
              "monthSum": item.monthSum
            });
          });

          console.log(list);
          var month1 = list[0].monthSum;
          var month2 = list[1].monthSum;
          var month3 = list[2].monthSum;
          var month4 = list[3].monthSum;
          var month5 = list[4].monthSum;
          var month6 = list[5].monthSum;
          var month7 = list[6].monthSum;
          var month8 = list[7].monthSum;
          var month9 = list[8].monthSum;
          var month10 = list[9].monthSum;
          var month11 = list[10].monthSum;
          var month12 = list[11].monthSum;

          for (j = 0; list.length < j; j++) {

            var i = list[j].month;
          }
          var i = 0;
          myChart = new Chart(document.getElementById('myChart'), {
            type: 'bar',
            data: {
              labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
              datasets: [{
                label: '월 매출',
                data: [month1, month2, month3, month4, month5, month6, month7, month8, month9, month10, month11, month12]

                  ,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });

        },
        error: function (data) {
          console.log(data);
          alert(" fail ");
        },
      });
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
      // 관리자 사이드바
      $('#menu-order-food').on('click', function () {
        M.page.html('./foodOrder.html');
      });
      $('#menu-payment-list').on('click', function () {
        M.page.html('./foodTransferList.html');
      });
      $('#menu-sales').on('click', function () {
        M.page.replace('./sales.html');
      });
      $('#menu-menu').on('click', function () {
        M.page.html('./menuList.html');
      });
      $('#menu-member-info').on('click', function () {
        M.page.html('./memberList.html');
      });
      $('#menu-store-info').on('click', function () {
        M.page.html('./storeList.html');
      });
      $('#menu-logout').on('click', function () {
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
              url: "./intro.html",
              actionType: "CLEAR_TOP"
            });
          }
        });
      });

      // 매출 그래프 데이터 갖고오기 
      const tabList = document.querySelectorAll('.category li');
      for (var i = 0; i < tabList.length; i++) {
        tabList[i].querySelector('.btn-category').addEventListener('click', function () {
          for (var j = 0; j < tabList.length; j++) {
            tabList[j].classList.remove('on');
          }
          var year = $(this).parent('li').attr('id');
          this.parentNode.classList.add('on');
          MNet.sendHttp({
            path: SERVER_PATH.PAYMENT_MONTHSUM,
            data: {
              "year": year,
            },
            succ: function (data) {
              console.log(data);
              list = []
              M.data.param('year', year);
              $.each(data.monthList, function (index, item) {
                list.push({
                  "monthSum": item.monthSum
                });
              });

              console.log(list);
              var month1 = list[0].monthSum;
              var month2 = list[1].monthSum;
              var month3 = list[2].monthSum;
              var month4 = list[3].monthSum;
              var month5 = list[4].monthSum;
              var month6 = list[5].monthSum;
              var month7 = list[6].monthSum;
              var month8 = list[7].monthSum;
              var month9 = list[8].monthSum;
              var month10 = list[9].monthSum;
              var month11 = list[10].monthSum;
              var month12 = list[11].monthSum;

              for (j = 0; list.length < j; j++) {

                var i = list[j].month;
              }
              var i = 0;
              myChart = new Chart(document.getElementById('myChart'), {
                type: 'bar',
                data: {
                  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                  datasets: [{
                    label: '월 매출',
                    data: [month1, month2, month3, month4, month5, month6, month7, month8, month9, month10, month11, month12]

                      ,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
                      'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                  }]
                },
                options: {
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }
                }
              });

            },
            error: function (data) {
              console.log(data);
              alert(" fail ");
            },
          });
        });
      };

      $('.btn-search').on('click', function () {
        var paymentDate = "";
        paymentDate = document.getElementById('inputDate').value;
        console.log(paymentDate);
        MNet.sendHttp({
          path: SERVER_PATH.PAYMENT_DATELIST,
          data: {
            "paymentDate": paymentDate
          },
          succ: function (data) {
            M.page.replace('./saleSearch.html', {
              param: {
                paymentDate: paymentDate,
              }
            });
          },
          error: function (data) {
            console.log(data);
            alert(" 데이터를 가져오지 못했습니다. ");
          },
        });


      })
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