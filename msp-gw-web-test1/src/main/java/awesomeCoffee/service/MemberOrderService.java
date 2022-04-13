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

import awesomeCoffee.dto.MemberOrderDTO;
import awesomeCoffee.dto.MenuDTO;

@Service
public class MemberOrderService {
	private Logger logger = LoggerFactory.getLogger(MemberOrderService.class);
	@Autowired(required = true)
	@Qualifier("sqlSession_sample")
	private SqlSession sqlSession;

	@Autowired(required = true)
	@Qualifier("transactionManager_sample")
	private DataSourceTransactionManager transactionManager_sample;


	// 바로주문
	public MenuDTO directOrder(Map<String, Object> param) {
		return sqlSession.selectOne("Order.directOrder", param);
	}
	// 주문 번호 자동 생성
	public String createOrderNum() {
		return sqlSession.selectOne("Order.createOrderNum");
	}
	// 바로 주문 insert (결제 완료시 실행)
	public int insertDirectOrder (Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			result = sqlSession.update("Order.insertDirectOrder", param);

			transactionManager_sample.commit(status);
			logger.info("========== 바로주문 접수 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	// 회원 주문 insert (결제 완료시 실행)
	public int insertMemberOrder (Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {

			result = sqlSession.update("Order.insertOrder", param);

			transactionManager_sample.commit(status);
			logger.info("========== 주문 접수 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	// 회원주문 select  (주문하기 클릭시 실행)
	public List<MemberOrderDTO> memberCartList(Map<String, Object> param) {
		return sqlSession.selectList("Order.memberCartList", param);
	}
	// 주문 read 회원 NN
	public List<MemberOrderDTO> selectMemOrderNN(String memberNum) {
		return sqlSession.selectList("Order.selectMemOrderNN", memberNum);
	}
	// 주문 read 회원 YN
	public List<MemberOrderDTO> selectMemOrderYN(String memberNum) {
		return sqlSession.selectList("Order.selectMemOrderYN", memberNum);
	}
	// 주문 read 회원 YY
	public List<MemberOrderDTO> selectMemOrderYY(String memberNum) {
		return sqlSession.selectList("Order.selectMemOrderYY", memberNum);
	}
	// 주문 read 회원 전체 리스트
	public List<MemberOrderDTO> selectAllMemOrder(String memberNum) {
		return sqlSession.selectList("Order.selectAllMemOrder", memberNum);
	}
	
	
	
	
	
	// 주문 read 직원 조리상태 N
	public List<MemberOrderDTO> selectAllEmpOrderN(){
		return sqlSession.selectList("Order.selectAllEmpOrderN");
	}
	// 주문 read 직원 조리상태 Y
	public List<MemberOrderDTO> selectAllEmpOrderY(){
		return sqlSession.selectList("Order.selectAllEmpOrderY");
	}
	// 주문 read 직원 오늘의 주문
	public List<MemberOrderDTO> selectTodayOrder(){
		return sqlSession.selectList("Order.selectTodayOrder");
	}
	// 주문 update 수령여부
	public int updateOrderTakeout(Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			result = sqlSession.update("Order.updateOrderTakeout", param);
			transactionManager_sample.commit(status);
			logger.info("========== 회원주문 수령여부 수정 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	// 주문 update 조리여부
	public int updateOrderCookState(Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			result = sqlSession.update("Order.updateOrderCookState", param);
			transactionManager_sample.commit(status);
			logger.info("========== 회원주문 조리상태 수정 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	// 회원주문 delete
	public int deleteOrder(Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			result = sqlSession.delete("Order.deleteOrder", param);
			transactionManager_sample.commit(status);
			logger.info("========== 회원주문 삭제 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	// 직원이 보는 주문 상세
	public MemberOrderDTO selectOrderDetail(Map<String, Object> param) {
		return sqlSession.selectOne("Order.selectOrderDetail", param);
	}
	public List<MemberOrderDTO> selectAllEmpOrderTake() {
		return sqlSession.selectList("Order.selectAllEmpOrderTake");
	}

}
