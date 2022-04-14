/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, module, MNet, SERVER_PATH, CONFIG, window) {
  var storeAddr = M.data.param('storeAddr');
  var storeName = M.data.param('storeName');
  var page = {
    els: {
      $storeName: null,
      $storeAddr: null,
      $storeOrder: null,
    },
    data: {},
    init: function init() {
      this.els.$storeName = $('#storeName');
      this.els.$storeAddr = $('#storeAddr');
      this.els.$storeOrder = $('#storeOrder');

    },
    initView: function initView() {
      //화면에서 세팅할 동적데이터

      var self = this;
      
      MNet.sendHttp({
        path: SERVER_PATH.STORE_INFO,
        data: {
          "storeName": storeName
        },
        succ: function (data) {
          console.log(data);
          storeAddr = data.storeAddr;
          $('#storeName').html(data.storeName);
          $('#storeAddr').html(data.storeAddr);

        },
        error: function (data) {
          console.log(data);
          alert("실패");
        }
      });

    },
    initEvent: function initEvent() {
      var self = this;
      $('.l-fix').on('click', function () {
        M.page.back();
      });
      // Dom Event 바인딩
      this.els.$storeOrder.on('click', function () {
        self.storeOrder();
      })
    },
    storeOrder: function () {
      M.page.html('./menuList.html');
    },


    initMap: function initMap() {
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
          center: new kakao.maps.LatLng(37.4798346, 126.8824997), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        };

      // 지도를 생성합니다    
      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다

      geocoder.addressSearch(storeAddr, function (result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {

          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: '<div style="width:150px;text-align:center;padding:6px 0;">'+ storeName +'</div>'
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
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
    pageFunc.initMap(); // 맵 셋팅
  });

})(jQuery, M, __page__, window);