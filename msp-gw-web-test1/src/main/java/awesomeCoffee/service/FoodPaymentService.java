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

import awesomeCoffee.dto.FoodPaymentDTO;

@Service
public class FoodPaymentService {

	private Logger logger = LoggerFactory.getLogger(FoodPaymentService.class);

	@Autowired(required = true)
	@Qualifier("sqlSession_sample")
	private SqlSession sqlSession;

	@Autowired(required = true)
	@Qualifier("transactionManager_sample")
	private DataSourceTransactionManager transactionManager_sample;

	// 입금(결제) insert
	public int insertFoodPayment(Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			result = sqlSession.insert("FoodPayment.insertFoodPayment", param);
			transactionManager_sample.commit(status);
			logger.info("========== 입금 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}

	// 입금(결제) 내역 read
	public List<FoodPaymentDTO> selectFoodPaymentList(String storeNum) {
		return sqlSession.selectList("FoodPayment.selectFoodPaymentList");
	}

	// 입금(결제) 총액
	public String foodPaymentPriceSum(String storeNum) {
		return sqlSession.selectOne("FoodPayment.foodPaymentPriceSum", storeNum);
	}

}
