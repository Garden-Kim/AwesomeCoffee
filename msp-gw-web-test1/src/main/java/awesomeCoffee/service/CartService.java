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

import awesomeCoffee.dto.CartDTO;
import awesomeCoffee.dto.MemberDTO;
import awesomeCoffee.dto.StoreOrderDTO;
import awesomeCoffee.dto.WishlistDTO;

@Service
public class CartService {
	private Logger logger = LoggerFactory.getLogger(CartService.class);

	@Autowired(required = true)
	@Qualifier("sqlSession_sample")
	private SqlSession sqlSession;

	@Autowired(required = true)
	@Qualifier("transactionManager_sample")
	private DataSourceTransactionManager transactionManager_sample;
	// 장바구니 insert 
	public int insertCart(Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			result = sqlSession.insert("Cart.insertCart", param);
			transactionManager_sample.commit(status);
			logger.info("========== 장바구니 등록 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	// 장바구니 update 
	public int updateCart(Map<String, Object> param ) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			result = sqlSession.update("Cart.updateCart", param);
			transactionManager_sample.commit(status);
			logger.info("========== 장바구니 수량 수정 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	// 장바구니 read
	public List<CartDTO> selectAllCart(String memberNum) {
		return sqlSession.selectList("Cart.selectAllCart", memberNum);
	}
	// 장바구니 deleteOne (사용자가 직접 삭제버튼 누를시 해당 메뉴 삭제)
	public int deleteCartOne(Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			result = sqlSession.delete("Cart.deleteCartOne", param);
			transactionManager_sample.commit(status);
			logger.info("========== 장바구니 삭제 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	// 장바구니 delete (결제시)
	public int deleteCart(Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			result = sqlSession.delete("Cart.deleteCart", param);
			transactionManager_sample.commit(status);
			logger.info("========== 결제 후 장바구니 삭제 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	public int modifyCart(Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			result = sqlSession.update("Cart.modifyCart", param);
			transactionManager_sample.commit(status);
			logger.info("========== 장바구니 수량 수정 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	public int modifyCart(List<Map<String, Object>> param, String memberNum) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		System.out.println(param);
		int result = 0;
		try {


			for(Map<String, Object> map : param) {
				CartDTO dto = new CartDTO();
				dto.setGoodsNum(map.get("goodsNum").toString());	
				dto.setMemberNum(memberNum);
				dto.setQty(map.get("qty").toString());
				
				sqlSession.update("Cart.modifyCart", dto);
				result++;
			}
			transactionManager_sample.commit(status);
			logger.info("========== 수정 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;

	}
}
