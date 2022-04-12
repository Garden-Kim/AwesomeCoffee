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
import awesomeCoffee.dto.OrderlistDTO;

@Service
public class OrderlistService {
	private Logger logger = LoggerFactory.getLogger(OrderlistService.class);
	@Autowired(required = true)
	@Qualifier("sqlSession_sample")
	private SqlSession sqlSession;

	@Autowired(required = true)
	@Qualifier("transactionManager_sample")
	private DataSourceTransactionManager transactionManager_sample;
	
	@Autowired
	private CartService cartService;
	

	// 주문 내역 insert
	public int insertOrderlist(Map <String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			List<CartDTO> list = cartService.selectAllCart(param.get("memberNum").toString());
			for (int i=0 ; i<list.size(); i++) {
				param.put("goodsNum", list.get(i).getGoodsNum());
				result = sqlSession.update("Orderlist.insertOrderlist", param);
			}

			transactionManager_sample.commit(status);
			logger.info("========== 주문 내역 등록 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	// 주문 내역 리스트 read 
	public List<OrderlistDTO> selectOrderlist (Map<String, Object> param) {
		return sqlSession.selectList("Orderlist.selectAllOrderlist", param);
	}
	
	// 회원 주문 리스트에 해당하는 상품list 
	public List<OrderlistDTO> selectGoodsNums (Map<String, Object> param){
		return sqlSession.selectList("Orderlist.selectGoodsNums", param);
	}
	
	
	// 주문 내역 delete 
	public int deleteOrderlist(Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			result = sqlSession.update("Orderlist.deleteOrderlist", param);

			transactionManager_sample.commit(status);
			logger.info("========== 주문 내역 삭제 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] updateMember() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
}

