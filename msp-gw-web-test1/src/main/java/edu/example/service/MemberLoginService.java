package edu.example.service;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;

import edu.example.dto.LoginDTO;

@Service
public class MemberLoginService {
	private Logger logger = LoggerFactory.getLogger(MemberLoginService.class);
	
	@Autowired(required=true)
    @Qualifier("sqlSession_sample")
    private SqlSession sqlSession;
	
	@Autowired(required=true)
    @Qualifier("transactionManager_sample")
    private DataSourceTransactionManager transactionManager_sample;
	// 로그인
	public LoginDTO login(Map<String, Object> param) {
		LoginDTO result = null;
		LoginDTO loginDTO = sqlSession.selectOne("Member.login", param);
		if (param.get("password").equals(loginDTO.getPassword())) {
			result = loginDTO;
		}
		return result;
	}
	// 로그아웃
	public LoginDTO logout(Map<String, Object> param) {
		LoginDTO result = null;
		LoginDTO loginDTO = sqlSession.selectOne("Member.login", param);
		result = loginDTO;
		return result;
	}

}
