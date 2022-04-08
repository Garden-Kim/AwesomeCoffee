package awesomeCoffee.service;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;

import awesomeCoffee.dto.AuthInfo;

@Service
public class LoginProService {

	private Logger logger = LoggerFactory.getLogger(FoodService.class);

	@Autowired(required = true)
	@Qualifier("sqlSession_sample")
	private SqlSession sqlSession;

	@Autowired(required = true)
	@Qualifier("transactionManager_sample")
	private DataSourceTransactionManager transactionManager_sample;
	
	
	// 로그인
	public AuthInfo login(Map<String, Object> param) {
		AuthInfo result = null;
		AuthInfo authInfo = sqlSession.selectOne("loginPro.chkId", param);
		System.out.println(authInfo.getLoginId());
		System.out.println(authInfo.getPassword());
		if (param.get("password").equals(authInfo.getPassword())) {
			result = authInfo;
		}
		return result;
	}
	// 로그아웃
	public AuthInfo logout(Map<String, Object> param) {
		AuthInfo result = null;
		AuthInfo authInfo = sqlSession.selectOne("loginPro.chkId", param);
		result = authInfo;
		return result;
	}

}
