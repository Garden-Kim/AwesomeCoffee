/**
 * @file : 회원가입
 * @author : 김정원
 * @date : 2022-03-25
 */
// 페이지단위 모듈
(function ($, M, window) {
  var id;
  var juso;
  var title;
  var page = {
    els: {
      $map: null,
    },
    data: {},
    init: function init() {
      this.els.$map = $('#map');
      id = M.data.global('userId');
      if(M.data.param('content')){
        juso = M.data.param('content');
        title = M.data.param('title');
      }else{
        juso = '가산디지털단지역';
        title = '가디역';
      }
    },


    initView: function initView() {
      // 화면에서 세팅할 동적데이터
      var self = this;
      




    },
    initEvent: function initEvent() {


    },
    initMap: function initMap() {

      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
          center: new kakao.maps.LatLng(37.4798346, 126.8824997), // 지도의 중심좌표
          level: 1 // 지도의 확대 레벨
        };

      // 지도를 생성합니다    
      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 주소-좌표 변환 객체를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();

      // 주소로 좌표를 검색합니다
  
      geocoder.addressSearch(juso, function (result, status) {

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
            content: '<div style="width:150px;text-align:center;padding:6px 0;">'+title+'</div>'
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }

        $('#title').html(title);
        $('#address').html(juso);
      });
    },




  };
  window.__page__ = page;
})(jQuery, M, window);


// 해당 페이지에서 실제 호츌
(function ($, M, pageFunc, window) {
  M.onReady(function () {
    pageFunc.init();
    pageFunc.initView();
    pageFunc.initEvent();
    pageFunc.initMap();
  });
})(jQuery, M, __page__, window);