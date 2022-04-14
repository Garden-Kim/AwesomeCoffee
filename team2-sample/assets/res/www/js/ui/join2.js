/**
 * @file : intro.js 인트로 페이지
 * @author :
 * @date : 
 */

(function ($, M, MNet, module, SERVER_PATH, window) {
 
  var page = {

    els: {
      $userNmIpt: null,

      $loginIdIpt: null,
      $cellPhoneIpt: null,
      $repasswordIpt: null,
      $pwOk: null,
      $dupBtn: null,
      $dupBtnOk: null,
      $emailIpt: null,
      $joinBtn: null,
    },
    data: {},
    init: function init() {

      this.els.$userNmIpt = $('#userNm');
      this.els.$cellPhoneIpt = $('#cellPhone');
      this.els.$loginIdIpt = $('#loginId');
      this.els.$passwordIpt = $('#password');
      this.els.$repasswordIpt = $('#repassword');
      this.els.$pwOk = false;

      this.els.$dupBtn = $('#dupBtn');
      this.els.$dupBtnOk = false;
      this.els.$emailIpt = $('#email');
      this.els.$joinBtn = $('#joinBtn');
    },
    /*
      진행도를 표시한다.
      @param {function} succCallback 완료 후 호출될 함수
    */
    initView: function initView() {
      $('.l-fix').on('click', function () {
        M.page.back();
      });
    },
    initEvent: function initEvent() {
      var self = this;
      this.els.$dupBtn.on('click', function () {
        self.idOk();
      });
      this.els.$joinBtn.on('click', function () {
        self.joinOk();
      });
    },
    idOk: function () {
      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      console.log(id);
      if (module.isEmpty(id)) {
        return alert('아이디를 입력해주세요.');
      }
      if (id.length < 5) {
        return alert('아이디를 5자 이상 입력해주세요.');
      }
      MNet.sendHttp({
        path: SERVER_PATH.DUPLICATE,
        data: {
          memberId: id
        },
        succ: function succ(data) {
          if (data.dupYn === 'Y') {
            alert('중복된 아이디입니다.');
            self.els.$dupBtnOk = false;
          } else {
            alert('사용 가능한 아이디입니다.');
          
            M.data.param({
              'idT': id
            });
            self.els.$dupBtnOk = true;
          }
        }
      });
    },
    joinOk: function () {


      var self = this;
      var id = this.els.$loginIdIpt.val().trim();
      var pw = this.els.$passwordIpt.val().trim();
      var rpw = this.els.$repasswordIpt.val().trim();
      var email = this.els.$emailIpt.val().trim();
      var regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      
      var regPhone = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
      var cellphone = this.els.$cellPhoneIpt.val();


      var userNm = this.els.$userNmIpt.val().trim();
      
     

      alert(userNm);
      alert(cellphone);
      alert(id);
      alert(pw);
      alert(email);      

      if (cellPhone == '') {
        return alert("전화번호를 입력해주세요");
      }
      if (userNm == '') {
        return alert("이름을 입력해주세요");
      }

      if (module.isEmpty(id)) {
        return alert('아이디를 입력해주세요.');
      }
      if (module.isEmpty(pw)) {
        return alert('비밀번호를 입력해주세요.');
      }
      module.isCorrectPassword(pw, rpw, function () {
        self.els.$pwOk = true;
      });
      if (module.isEmpty(email)) {
        return alert('이메일을 입력해주세요.');
      }
      if(regPhone.test(cellphone) === false){
        return alert('핸드폰 번호를 11자리로 입력해주세요');
      }

      if (regEmail.test(email) === false) {
        return alert('입력된 값은 이메일형식이 아닙니다.');
      }
      if (M.data.param('idT') != id) {
        self.els.$dupBtnOk = false;
      }
      if (self.els.$dupBtnOk === false) {
        return alert('아이디 중복체크를 해주세요.');
      }
      
          MNet.sendHttp({
            path: SERVER_PATH.JOIN,
            data: {
              memberName: userNm,
              memberPhone: cellphone,
              memberId: id,
              memberPw: pw,
              memberEmail: email
            },
            succ: function (data) {
              M.page.html({
                url: "./join3.html",
              
              });
            }
          });
        
      
    }

  };
  window.__page__ = page;
})(jQuery, M, __mnet__, __util__, __serverPath__, window);

// 해당 페이지에서 실제 호출
(function ($, M, pageFunc, window) {

  M.onReady(function () {
    pageFunc.init(); // 최초 화면 초기화
    pageFunc.initView();
    pageFunc.initEvent();
  });

})(jQuery, M, __page__, window);