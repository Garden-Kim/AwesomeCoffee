/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, MNet, module,SERVER_PATH, window){
  var element_layer = document.getElementById('layer');
  var page = {
    els:  {
      $changePwBtn : null,
      $storeNmIpt : null,
      $loginIdIpt : null,
      $passwordIpt : null,
      $addrIpt : null,
      $cellPhoneIpt : null,
      $saveBtn : null,
      $outBtn : null,
      $state : null,
    },
    data: {},
    init: function init(){
      this.els.$changePwBtn = $('#changePw');
      this.els.$storeNameIpt = $('#storeName');
      this.els.$loginIdIpt = $('#loginId');
      this.els.$passwordIpt = $('#password');
      this.els.$addrIpt = $('#addr');
      this.els.$cellPhoneIpt = $('#cellPhone');
      this.els.$saveBtn = $('#saveBtn');
      this.els.$outBtn = $('#outBtn');
      this.els.$state = $('#state');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
      var self = this;
      if(module.isEmpty(M.data.global('id'))){
        M.page.html('./login.html');
      }
      MNet.sendHttp({
        path: SERVER_PATH.STORE_INFO,
        data: {
          storeId : M.data.global('id'),
        },
        succ: function(data){
          self.els.$storeNameIpt.val(data.storeName);
          self.els.$loginIdIpt.val(M.data.global('id'));
          self.els.$addrIpt.val(data.storeAddr);
          self.els.$cellPhoneIpt.val(data.storePhone);
          if(data.state == 'Y'){
            self.els.$state.val('영업중');
          }else{
            self.els.$state.val('영업종료');
          }
          
        },
        error: function (data) {
          console.log(data);
          alert('정보를 가져오지 못했습니다.');
        }
      });
      $('#saveBtn').attr("disabled", true);
      if(self.els.$state.val() == 'N'){
        $('#outBtn').html('OPEN');
      }
    },
    initEvent : function initEvent(){
      var self = this;
      var id = M.data.global('id');
//      var birth = this.els.$birthDateIpt.val().trim();
//      var regBirth = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;
      module.onKeyupNum(self.els.$cellPhoneIpt);
      $('.l-fix').on('click', function(){
        M.page.back();
      });
      self.els.$passwordIpt.on('propertychange change keyup paste input', function () {
        $(self.els.$saveBtn).attr("disabled", false);
      });
      self.els.$changePwBtn.on('click', function () {
        var pw = self.els.$passwordIpt.val().trim();
        console.log(id);
        console.log(pw);
        MNet.sendHttp({
          path: SERVER_PATH.PW_CHK,
          data: {
            loginId: id,
            password: pw,
          },
          succ: function (data) {
            if (data.rsltCode == '0000') {
              alert('비밀번호 확인 완료!');
              M.page.html({ path : './findPw2.html', 
                            action: 'NO_HISTORY',
                            param : {loginId : id}});
            } else {
              console.log(data);
              alert('비밀번호가 일치하지 않습니다.');
            }
          },
          error: function (data) {
            console.log(data);
            alert('에러!');
          }
        });
      });
//      if(module.isEmpty(birth)){
//        return alert('생년월일을 입력해주세요.');
//      }
//      if(regBirth.test(birth) === false){
//        return alert('YYYYMMDD 형식으로 생년월일을 입력해주세요.');
//      }
      self.els.$saveBtn.on('click', function(){
        var pw = self.els.$passwordIpt.val().trim();
        var addr = self.els.$addrIpt.val().trim();
        var cp = self.els.$cellPhoneIpt.val().trim();
        var storeName = self.els.$storeNameIpt.val().trim();
        if(module.isEmpty(addr)){
          return alert('주소를 입력해주세요.');
        }
        if(module.isEmpty(cp)){
          return alert('휴대폰 번호를 입력해주세요.');
        } 
        if(!module.isRightPhoneNum(cp)){
          return alert('휴대폰 번호를 정확히 입력해주세요.');
        }
        MNet.sendHttp({
          path: SERVER_PATH.PW_CHK,
          data: {
            loginId: id,
            password: pw
          },
          succ: function (data) {
            if (data.rsltCode == '0000') {
              MNet.sendHttp({
                path: SERVER_PATH.STORE_UPDATE,
                data: {
                  storeId : id,
                  storePhone : cp,
                  storeAddr : addr,
                  storeName : storeName
                },
                succ: function(data){
                  alert('수정이 완료되었습니다.');
                  self.els.$passwordIpt.val('');                    
                },
                error: function (data) {
                  console.log(data);
                  alert('수정에 실패하셨습니다.');
                }
              });  
            } else {
              console.log(data);
              alert('비밀번호가 일치하지 않습니다.');
            }
          },
          error: function (data) {
            console.log(data);
            alert('에러!');
          }
        });          
      });
      self.els.$outBtn.on('click', function(){
        var pw = self.els.$passwordIpt.val().trim();
        var state;
        if($('#state').val() == '영업중'){
          state = 'N';
        }else{
          state = 'Y';
        }
        console.log(id);
        console.log(pw);
        MNet.sendHttp({
          path: SERVER_PATH.PW_CHK,
          data: {
            loginId: id,
            password: pw,
          },
          succ: function (data) {
            if (data.rsltCode == '0000') {
               if (confirm("매장상태를 변경하시겠습니까? \n현재상태 : " +  $('#state').val()) == true){

                  MNet.sendHttp({
                    path: SERVER_PATH.STORE_STATE,
                    data: {
                      storeId: id,
                      state : state,
                    },
                    succ: function (data) {
                      if (data.rsltCode == '0000') {
                        console.log(data);
                        if(data.state == 'N'){
                          $('#state').val('영업종료');
                        }else{
                          $('#state').val('영업중');
                        }
                       
                      }
                    },
                    error: function (data) {
                      console.log(data);
                      alert('에러!');
                    }
                  });
               }else{
                 alert("취소되었습니다");
               }
            } else {
              console.log(data);
              alert('비밀번호가 일치해야 변경하실 수 있습니다.');
            }
          },
          error: function (data) {
            console.log(data);
            alert('에러!');
          }
        });
      });     
      $('#addrSearch').on('click', function(){
        self.getAddr();
        $('.tbl-ipt').attr('style','pointer-events: none; ');
        $('#btn-two button').attr('disabled',true);
      });
      $('#btnCloseLayer').on('click', function(){
        element_layer.style.display = 'none';
        $('.tbl-ipt').attr('style','pointer-events: auto; ');
        $('#btn-two button').attr('disabled',false);
        var pw = self.els.$passwordIpt.val().trim();
        if(pw == ''){
          $('#saveBtn').attr('disabled',true);
        }
      });
    },
    getAddr: function () {
      var self = this;
      new daum.Postcode({
        oncomplete: function(data) {
            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                
            
            } else {
               
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById("addr").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            

            // iframe을 넣은 element를 안보이게 한다.
            // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
            element_layer.style.display = 'none';
        },
        width : '100%',
        height : '100%',
        maxSuggestItems : 5
    }).embed(element_layer);
    
    // iframe을 넣은 element를 보이게 한다.
    element_layer.style.display = 'block';

    // iframe을 넣은 element의 위치를 화면의 가운데로 이동시킨다.
    self.initLayerPosition();
      

    },
    initLayerPosition:function initLayerPosition(){
      var width = 300; //우편번호서비스가 들어갈 element의 width
      var height = 400; //우편번호서비스가 들어갈 element의 height
      var borderWidth = 5; //샘플에서 사용하는 border의 두께

      // 위에서 선언한 값들을 실제 element에 넣는다.
      element_layer.style.width = width + 'px';
      element_layer.style.height = height + 'px';
      element_layer.style.border = borderWidth + 'px solid';
      // 실행되는 순간의 화면 너비와 높이 값을 가져와서 중앙에 뜰 수 있도록 위치를 계산한다.
      element_layer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
      element_layer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
  },
  };
  window.__page__ = page;
})(jQuery, M,__mnet__, __util__,__serverPath__, window);


// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);