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
import awesomeCoffee.dto.StoreOrderDTO;

@Service
public class StoreOrderService {
	private Logger logger = LoggerFactory.getLogger(StoreService.class);

	@Autowired(required = true)
	@Qualifier("sqlSession_sample")
	private SqlSession sqlSession;

	@Autowired(required = true)
	@Qualifier("transactionManager_sample")
	private DataSourceTransactionManager transactionManager_sample;

	// 발주 insert 
	public int insertStoreOrder(List<Map<String, Object>> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		
		int result = 0;
		try {
			for(Map<String, Object> map : param) {
				StoreOrderDTO dto = new StoreOrderDTO();
				dto.setFoodNum(map.get("foodNum").toString());
				dto.setStoreNum(map.get("storeNum").toString());
				dto.setStoreOrderNum(map.get("storeOrderNum").toString());
				dto.setStoreOrderQty(Integer.parseInt((String)map.get("storeOrderQty")));
				
//				String storeOrderNum = sqlSession.selectOne("StoreOrder.createStoreOrderNum");
//				dto.setStoreOrderNum(storeOrderNum);
				
				sqlSession.insert("StoreOrder.insertStoreOrder", dto);
				result++;
			}
			transactionManager_sample.commit(status);
			logger.info("========== 발주 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;

	}
	// 발주내역 총합계
	public String storeOrderPriceSum() {
		return sqlSession.selectOne("StoreOrder.storeOrderPriceSum");
	}
	// 발주내역
	public List<StoreOrderDTO> storeOrderList() {
		return sqlSession.selectList("StoreOrder.storeOrderList");
	}
	// 발주 detail
	public List<StoreOrderDTO> selectOrderDetail(Map<String, Object> param) {
		return sqlSession.selectList("StoreOrder.selectOrderDetail", param);
	}
	// 발주 detail 합계
	public String storeOrderPrice(Map<String, Object> param) {
		return sqlSession.selectOne("StoreOrder.storeOrderPrice", param);
	}

}
