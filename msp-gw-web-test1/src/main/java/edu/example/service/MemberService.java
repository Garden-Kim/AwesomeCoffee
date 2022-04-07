package edu.example.service;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.util.StringUtils;

import edu.example.dto.MemberDto;

@Service
public class MemberService {

	private Logger logger = LoggerFactory.getLogger(MemberService.class);

	@Autowired(required = true)
	@Qualifier("sqlSession_sample")
	private SqlSession sqlSession;

	@Autowired(required = true)
	@Qualifier("transactionManager_sample")
	private DataSourceTransactionManager transactionManager_sample;

	public MemberDto getMemberInfo(Map<String, Object> param) {
		return sqlSession.selectOne("Member.getMemberInfo", param);
	}

	// 아이디 중복확인
	public String duplicate(Map<String, Object> param) {
		String result = "N";
		MemberDto info = sqlSession.selectOne("Member.duplicate", param);
		if (!StringUtils.isEmpty(info)) {
			result = "Y";
		}
		return result;
	}

	// 개인정보 확인
	public String find(Map<String, Object> param) {
		String result = "N";
		MemberDto info = sqlSession.selectOne("Member.find", param);
		if (info != null) {
			result = "Y";
		}
		return result;
	}

	// 비밀번호 바꾸기
	public int changePw(Map<String, Object> param) {
		// 트렌잭션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {

			result = sqlSession.update("Member.changePw", param);

			transactionManager_sample.commit(status);
			logger.info("========== 비밀번호 변경 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}

	// 아이디 찾기
	public MemberDto findId(Map<String, Object> param) {
		MemberDto result = null;
		result = sqlSession.selectOne("Member.findId", param);
		return result;
	}

	// 멤버 조인
	public int insertMember(Map<String, Object> param) {
		// 트랜잭션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {

			result = sqlSession.insert("Member.insertMember", param);
			transactionManager_sample.commit(status);
			logger.info("========== 회원 등록 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}

	// 멤버 수정
	public int updateMember(Map<String, Object> param) {
		// 트렌잭션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {

			MemberDto info = sqlSession.selectOne("Member.getMemberInfo", param);
			// if( param.get("password").equals(info.getPassword()) ) {
			result = sqlSession.update("Member.updateMember", param);
			// }

			transactionManager_sample.commit(status);
			logger.info("========== 유저 수정 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}

	// 멤버 탈퇴
	public int deleteMember(Map<String, Object> param) {
		// 트렌잭션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {

			result = sqlSession.delete("Member.deleteMember", param);

			transactionManager_sample.commit(status);
			logger.info("========== 유저 탈퇴 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}

}
