package awesomeCoffee.service;

import java.util.List;
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

import awesomeCoffee.dto.StoreDTO;



@Service
public class StoreService {

	private Logger logger = LoggerFactory.getLogger(StoreService.class);

	@Autowired(required = true)
	@Qualifier("sqlSession_sample")
	private SqlSession sqlSession;

	@Autowired(required = true)
	@Qualifier("transactionManager_sample")
	private DataSourceTransactionManager transactionManager_sample;

	//매장 등록
	public int insertStore(Map<String, Object> param) {

		// 트렌젝션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);

		int result = 0;
		try {

			result = sqlSession.insert("Store.insertStore", param);

			transactionManager_sample.commit(status);
			logger.info("========== 매장 등록 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	
	// 매장 정보 이름으로
	public StoreDTO getStoreInfoByName(Map<String, Object> param) {
		return sqlSession.selectOne("Store.getStoreInfoByName", param);
	}
	
	// 매장 로그인
	public StoreDTO login(Map<String, Object> param) {
		return sqlSession.selectOne("Store.login", param);
	}
	//매장 리스트 조회
	public List<StoreDTO> storeList() {
		return sqlSession.selectList("Store.storeList");
	}
	
	//삭제
	public int deleteStore(Map<String, Object> param) {
		// 트렌젝션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);

		int result = 0;
		try {

			StoreDTO info = sqlSession.selectOne("Store.getStoreInfoById", param);

			if (info != null) {
				result = sqlSession.delete("Store.deleteStore", param);
			}

			transactionManager_sample.commit(status);
			logger.info("========== 회원탈퇴 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] deleteMember() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}

	public int updateStore(Map<String, Object> param) {
		// 트렌젝션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);

		int result = 0;
		try {

			StoreDTO info = sqlSession.selectOne("Store.getStoreInfoById", param);

			// if (param.get("password").equals(info.getPassword())) {
			result = sqlSession.update("Store.updateStore", param);
			// }

			transactionManager_sample.commit(status);
			logger.info("========== 매장정보 수정 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	// 아이디로 매장 번호 갖고오기 (String)
	public String getStoreNumById(String param) {
		return sqlSession.selectOne("Store.getStoreNumById", param);
	}
	// 아이디로 매장 번호 갖고오기 (Map)
	public StoreDTO getStoreInfoById(Map<String, Object> param) {
		return sqlSession.selectOne("Store.getStoreInfoById", param);
	}

	public int updateState(Map<String, Object> param) {
		// 트렌젝션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);

		int result = 0;
		try {

			StoreDTO info = sqlSession.selectOne("Store.getStoreInfoById", param);

			// if (param.get("password").equals(info.getPassword())) {
			result = sqlSession.update("Store.updateState", param);
			// }

			transactionManager_sample.commit(status);
			logger.info("========== 매장정보 수정 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}

}
