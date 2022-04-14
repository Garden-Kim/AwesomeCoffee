/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, MNet, module, config, SERVER_PATH, window) {

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
      var self = this;
      if (module.isEmpty(M.data.global('id'))) {
        M.page.html('./login.html');
      }
      // 초기 그래프 
      MNet.sendHttp({
        path: SERVER_PATH.PAYMENT_MONTHSUM,
        data: {
          "year": M.data.param('year'),
        },
        succ: function (data) {
          console.log(data);
          list = []
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
      // 검색한 날짜의 결제 리스트 
      console.log(M.data.param('paymentDate'));
      $('#inputDate').val(M.data.param('paymentDate'))
      MNet.sendHttp({
        path: SERVER_PATH.PAYMENT_DATELIST,
        data: {
          "paymentDate": M.data.param('paymentDate'),
        },
        succ: function (data) {
          var items = "";
          $.each(data.list, function (index, item) {
            items += "<ul class='paymentList'>"
            items += "<li class='list'>";
            items += item.orderNum;
            items += "</li>";
            items += "<li class='list'>";
            items += item.paymentKind;
            items += "</li>";
            items += "<li class='list'>";
            items += item.paymentDate;
            items += "</li>";
            items += "<li class='list'>";
            items += item.paymentPrice;
            items += "</li>";
            items += "</ul>"
          });
          $(".paymentList").append(items);
        },
        error: function (data) {
          console.log(data);
          alert(" 리스트를 가져오지 못했습니다. ");
        },
      });
      // 검색한 날짜의 매출 합계
      console.log(M.data.param('paymentDate'));
      MNet.sendHttp({
        path: SERVER_PATH.PAYMENT_DAYSUM,
        data: {
          "paymentDate": M.data.param('paymentDate'),
        },
        succ: function (data) {
          console.log(data);
          $('#paymentSum').html(data.dayPaymentSum);
        },
        error: function (data) {
          console.log(data);
          alert(" 데이터를 가져오지 못했습니다. ");
        },
      });
    },
    initEvent: function initEvent() {
      // 매출 그래프 데이터 갖고오기 
      const tabList = document.querySelectorAll('.category li');
      for (var i = 0; i < tabList.length; i++) {
        tabList[i].querySelector('.btn-category').addEventListener('click', function () {
          for (var j = 0; j < tabList.length; j++) {
            tabList[j].classList.remove('on');
          }
          var year = $(this).parent('li').attr('id');
          M.data.param('year', year);
          this.parentNode.classList.add('on');
          MNet.sendHttp({
            path: SERVER_PATH.PAYMENT_MONTHSUM,
            data: {
              "year": year,
            },
            succ: function (data) {
              console.log(data);
              list = []
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
                year: M.data.param('year'),
              }
            });
          },
          error: function (data) {
            console.log(data);
            alert(" 데이터를 가져오지 못했습니다. ");
          },
        });

      });

      $('.l-fix').on('click', function () {
        M.page.back();
      });

    },
  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __util__, __config__, __serverPath__, window);
/*
$.each(data.lists, function(index, item){
  items += "<tr>";
  items += "<td><a href='/'>"+ item.memberNum + "</a></td>";
  items += "<td>"+ item.memberNum +"</td>";
  items += "<td><input type='' name='' value='" + item.memberNum + "'></td>";
  items += "</tr>";    
})*/

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);