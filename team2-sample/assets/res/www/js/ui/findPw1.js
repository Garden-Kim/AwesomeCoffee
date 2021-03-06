/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M,module, MNet, SERVER_PATH, window){

  var page = {
    els:  {
     $loginIdIpt : null,
      $userNmIpt : null,
      $cellPhoneIpt : null,
      $findPwBtn : null,
    },
    data: {},
    init: function init(){
      this.els.$loginIdIpt = $('#loginId');
      this.els.$userNmIpt = $('#userNm');
      this.els.$cellPhoneIpt = $('#cellPhone');
      this.els.$findPwBtn = $('#findPwBtn');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView : function initView(){
    },
    initEvent : function initEvent(){
      var self = this;
      this.els.$findPwBtn.on('click', function(){
        self.findPwBtn();
      });
    },
    findPwBtn : function(){
      var id = this.els.$loginIdIpt.val().trim();
      var nm = this.els.$userNmIpt.val().trim();
      var cp = this.els.$cellPhoneIpt.val().trim();
      var regPhone = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
      if(module.isEmpty(id)){
        return alert('아이디를 입력해주세요.');
      }
      if(module.isEmpty(nm)){
        return alert('사용자 성명을 입력해주세요.');
      }
      if(module.isEmpty(cp)){
        return alert('휴대폰 번호를 입력해주세요.');
      }
      if(!regPhone.test(cp)){
        return alert('휴대폰 번호를 11자리로 입력해주세요');
      }

      MNet.sendHttp({
        path: SERVER_PATH.FIND,
        data: {
          memberId : id,
          memberName : nm,
          memberPhone : cp
        },
        succ: function(data){
          if(data.existYn == 'Y'){
            alert('본인 인증에 성공하셨습니다.');
            M.page.replace('./findPw2.html',{ 'param':{loginId : id}});
          }else{
            return alert('본인 인증에 실패하셨습니다.');
          }
        }
      });      
    }
  };
  window.__page__ = page;
})(jQuery, M,__util__,__mnet__,__serverPath__, window);

// 해당 페이지에서 실제 호출
(function($,M,pageFunc,window){

  M.onReady(function(){
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });
  
})(jQuery,M,__page__,window);