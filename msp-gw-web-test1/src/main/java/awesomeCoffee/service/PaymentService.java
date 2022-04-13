package awesomeCoffee.service;

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

import awesomeCoffee.dto.PaymentDTO;

@Service
public class PaymentService {
	private Logger logger = LoggerFactory.getLogger(PaymentService.class);
	@Autowired(required = true)
	@Qualifier("sqlSession_sample")
	private SqlSession sqlSession;

	@Autowired(required = true)
	@Qualifier("transactionManager_sample")
	private DataSourceTransactionManager transactionManager_sample;
	
	// 결제 합계 (연도)
	public String selectYearPayment (Map<String, Object> param) {
		return sqlSession.selectOne("Payment.selectYearPayment", param);
	}
	// 결제 합계 (월)
	public String selectMonthSum (Map<String, Object> param) {
		return sqlSession.selectOne("Payment.selectMonthPayment", param);
	}
	// 결제 합계 (일)
	public String selectDaySum (Map<String, Object> param) {
		return sqlSession.selectOne("Payment.selectDayPayment", param);
	}
	// 바로 주문 결제 
	public int directPaymentInsert (Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			result = sqlSession.update("Payment.insertDirectPayment", param);
			
			transactionManager_sample.commit(status);
			logger.info("========== 바로주문 결제 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	// 결제 insert 
	public int paymentInsert (Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			result = sqlSession.update("Payment.insertPayment", param);
			
			transactionManager_sample.commit(status);
			logger.info("========== 결제 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	// 결제 정보(주문 정보)
	public PaymentDTO selectOnePayment (String orderNum) {
		return sqlSession.selectOne("Payment.selectOnePayment", orderNum);
	}
	
}
