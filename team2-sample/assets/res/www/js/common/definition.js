/**
 * @file : definition.js 상수 값을 모아두는 공통 JS
 * @author : 
 * @date : 
 */
(function (window, M) {
	var module = {};
	
  var IS_DEV = true;
  var IS_PROD = !IS_DEV;


  // 앱 환경변수 값
  var ENV = module.ENV = {
    IS_DEV : IS_DEV, // 개발 모드 여부
    SERVER_NAME: IS_PROD ? "GW_SERVER" : "GW_SERVER" //바라볼 서버 이름 (Manifest.xml에 설정되어있는 이름)
    ,UPLOAD_URL: IS_PROD ? "" : ""
    ,INDICATOR: true //서버통신시 indicator 여부 
  };
	var isDev = module.isDev = true; // 개발 모드 여부
	var Definition = module.config = {
		SERVER_NAME: "GW_SERVER" //바라볼 서버 이름 (Manifest.xml에 설정되어있는 이름)
			,
		UPLOAD_URL: "",
		INDICATOR_MSG: "통신중..." //서버통신시 default indicator_msg 
			,
		INDICATOR: true //서버통신시 indicator 여부 
			,
		DEFAULT_ERROR_MSG: "네트워크 통신 중 오류가 발생했습니다.",
		RES_DEV: "dev",
		RES_REAL: "real"
	};

	//운영&개발에 따른 서버 정보 세팅
	//별도 개발 서버가 없음..
/*	if (isDev == true) {
		console.log("-------------------------DEV-------------------------");
		Definition.SERVER_NAME = "HTTP_DEV";
		// Definition.UPLOAD_URL = M.info.app("manifest.network.http")[Definition.SERVER_NAME].address;
	} else {
		Definition.SERVER_NAME = "HTTP_DEV";
		// Definition.UPLOAD_URL = M.info.app("manifest.network.http")[Definition.SERVER_NAME].address;
	}*/
	//console.log("     SERVER URL: " + Definition.UPLOAD_URL);
	


	//서버 전문 요청 목록
	var ServerPath = module.serverPath = {
    // 로그인
    LOGIN : "api/loginPro/login", //로그인
    LOGOUT : "api/loginPro/logout", //로그아웃
    PW_CHK : "api/loginPro/pwChk", // 비밀번호 확인
    
    // 회원
    JOIN : "api/member/regist", //회원가입
    UPDATE : "api/member/update", // 회원정보수정
    FIND_ID : "api/member/findId", //아이디 찾기
    INFO : "api/member/info", //회원 정보 조회
    OUT : "api/member/out", //회원 탈퇴
    PASSWORD : "api/member/password", //비밀번호 변경
    DUPLICATE : "api/member/duplicate", //아이디 중복 체크
    
    // 매장
    STORE_REGIST : "api/store/regist", // 매장등록
    STORE_DELETE : "api/store/delete", // 매장삭제
    STORE_UPDATE : "api/store/update", // 매장정보 수정
    STORE_STATE : "api/store/state", // 매장상태 변경
    STORE_INFO : "api/store/info", // 매장상세정보(매장이름입력)
    STORE_LIST : "api/store/storeList", // 매장 리스트
    STORE_MEM_LIST : "api/store/memList", // 회원 리스트
    STORE_SEARCH_LIST : "api/store/searchList", // 매장검색
    
    // 레시피
    RECIPE_REGIST : "api/recipe/regist", // 레시피 등록
    RECIPE_LIST : "api/recipe/list", // 레시피 리스트
    RECIPE_DELETE : "api/recipe/delete", // 레시피 삭제
    RECIPE_INFO : "api/recipe/info", // 레시피 조회(goodsNum 입력)
    RECIPE_UPDEATE : "api/recipe/update", // 레시피 수정
    
    // 식자재
    FOOD_REGIST : "api/food/regist", // 식자재 등록
    FOOD_LIST : "api/food/foodList", // 식자재 리스트
    FOOD_DELETE : "api/food/delete", // 식자재 삭제
    FOOD_UPDATE : "api/food/update", // 식자재 수정
    
    // 발주
    
    STORE_ORDER_REGI : "api/storeOrder/regist", // 발주 등록
    STORE_ORDER_LIST : "api/storeOrder/list", // 발주 리스트
    
    // 메뉴
    MENU_CATEGORY_REGIST : "api/menu/categoryRegist", // 카테고리 등록
    MENU_CATEGORY_LIST : "api/menu/categoryList", // 카테고리 리스트
    MENU_CATEGORY_UPDATE : "api/menu/categoryUpdate", // 카테고리 수정
    MENU_CATEGORY_DELETE : "api/menu/categoryDelete", // 카테고리 삭제
    MENU_REGIST : "api/menu/regist", // 메뉴 등록
    MENU_UPDATE : "api/menu/update", // 메뉴수정
    MENU_INFO : "api/menu/info", // 메뉴 상세정보(메뉴이름)
    MENU_DELETE : "api/menu/delete", // 메뉴 삭제
    MENU_UPDATE_FILE : "api/menu/updateFile", // 메뉴수정(이미지 포함)
    MENU_LIST : "api/menu/list", // 메뉴 리스트
    MENU_CATEGORYLIST : "api/category/menuList", // 카테고리별 메뉴리스트
    MENU_SEARCH : "api/menu/search", // 메뉴 검색
    MENU_EMPLIST : "api/menu/empList" , //메뉴 리스트(관리자)
    MENU_CATEGORYEMPLIST : "api/category/menuEmpList", //카테고리별 메뉴리스트(관리자)
    
    // 관심상품
    WISH_REGIST : "api/wishlist/update", // 관심상품 등록/삭제
    WISH_LIST : "api/wishlist/list", // 관심상품 목록
    
    // 장바구니
    
    CART_REGIST : "api/cart/regist", // 장바구니 등록
    CART_LIST : "api/cart/list", // 장바구니 리스트
    CART_DELETE_ONE : "api/cart/deleteOne", // 장바구니 삭제(버튼클릭시 한개삭제)
    CARTE_DELETE : "api/cart/delete", // 장바구니 삭제(결제완료시)
    
    // 주문
    
    ORDER_REGIST :  "api/order/selectCartlist", // 주문 등록
    ORDER_DELETE : "api/order/delete", // 주문 삭제
    ORDER_EMP_LIST : "api/order/empTodayList", // 주문리스트(매장이보는 전부)
    ORDER_EMP_DETAIL : "api/order/empDetail", // 직원 주문 상세 
    ORDER_EMP_LIST_N : "api/order/empListN", // 주문리스트(매장이보는 조리상태N)
    ORDER_EMP_LIST_Y : "api/order/empListY", // 주문리스트(매장이보는 조리상태Y)
    ORDER_UPDATE_TAKE : "api/order/updateTakeout", // 주문수정(수령상태)
    ORDER_UPDATE_STATE : "api/order/updateCookState", // 주문수정(조리상태)
    ORDER_DIRECTORDER : "api/order/directOrder", // 바로주문 
    ORDER_TAKE_LIST : "api/order/empListTake", // 주문리스트(조리Y 수령N)
    ORDER_TODAYORDER : "api/order/empTodayList", // 오늘의 주문 
    
    // 주문내역
    ORDER_LIST_REGIST : "api/orderlist/regist", // 주문 상세 등록
    ORDER_LIST_LIST : "api/orderlist/list", // 주문상세 리스트(회원)
    ORDER_LIST_LISTNN : "api/orderlist/listNN", // 주문 리스트(회원 조리N 수령N)
    ORDER_LIST_LISTYN : "api/orderlist/listYN", // 주문 리스트(회원 조리Y 수령N)
    ORDER_LIST_LISTYY : "api/orderlist/listYY", // 주문 리스트(회원 조리Y 수령Y)
    ORDER_LIST_DETAIL : "api/orderlist/detail", // 회원 주문 상세 
    
    
    // 결제(회원)
    PAYMENT_MEM_REGIST : "api/payment/regist", // 결제등록(회원)
    PAYMENT_DIRECTREGIST :  "api/payment/directRegist", // 바로주문결제
    PAYMENT_MEM_LIST : "api/payment/list", // 결제 목록 (회원)
    PAYMENT_YEARSUM : "api/payment/yearSum", // 결제 합계 (년)
    PAYMENT_MONTHSUM : "api/payment/monthSum" , // 결제 합계 (월) 매출
    PAYMENT_DATELIST : "api/payment/dateList", // 특정날짜 결제 리스트 
    
    // 발주 
    STORE_ORDER_DETAIL : "api/storeOrder/detail",  // 발주 상세페이지
    STORE_ORDER_LIST : "api/storeOrder/list", // 발주 리스트
    STORE_ORDER_REGIST : "api/storeOrder/regist", // 발주 등록
    
    // 입금(매장결제)
    FOOD_PAYMENT_LIST: "api/foodPayment/list", // 입금(결제)리스트
    FOOD_PAYMENT_PAYMENT : "api/foodPayment/deposit",  // 입금(결제)
    FOOD_PAYMENT_PRICE : "api/foodPayment/restPayment" , // 결제 잔액
    
    

	};
	
	
  var SERVER_CODE = module.SERVER_CODE = {
    SUCC: '0000', // 성공시
  }

  // 상수 키 값
  var CONSTANT = module.CONSTANT =  {
    AUTO_LOGIN_AUTH: 'AUTO_LOGIN_AUTH'
  }

  // 메시지 문자열 상수
  var MSG = module.MSG = {
    INDICATOR_MSG: "통신중..." //서버통신시 default indicator_msg 
		,DEFAULT_ERROR_MSG: "네트워크 통신 중 오류가 발생했습니다."
  };
  
  
	//Android Upload 통신 시 콜백
	var successCallBack;
	var errorCallBack;

	window.__difinition__ = module;
	window.__config__ = module.config;
	window.__serverPath__ = module.serverPath;
})(window, M);