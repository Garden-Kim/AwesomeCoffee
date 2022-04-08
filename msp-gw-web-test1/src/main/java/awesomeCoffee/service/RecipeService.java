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

import awesomeCoffee.dto.FoodDTO;
import awesomeCoffee.dto.RecipeDTO;

@Service
public class RecipeService {

	private Logger logger = LoggerFactory.getLogger(RecipeService.class);

	@Autowired(required = true)
	@Qualifier("sqlSession_sample")
	private SqlSession sqlSession;

	@Autowired(required = true)
	@Qualifier("transactionManager_sample")
	private DataSourceTransactionManager transactionManager_sample;



	public List<FoodDTO> foodList() {
		return sqlSession.selectList("Food.foodList");
	}

	public FoodDTO foodInfo(Map<String, Object> param) {
		return sqlSession.selectOne("Food.foodInfo", param);
	}

	public int updateFood(Map<String, Object> param) {

		// 트렌젝션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);

		int result = 0;
		try {

			result = sqlSession.update("Food.updateFood", param);

			transactionManager_sample.commit(status);
			logger.info("========== 매장 등록 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}

	public int deleteFood(Map<String, Object> param) {
		// 트렌젝션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);

		int result = 0;
		try {

			result = sqlSession.delete("Food.deleteFood", param);

			transactionManager_sample.commit(status);
			logger.info("========== 매장 등록 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}

	// 레시피 등록
	public int insertRecipe(Map<String, Object> param) {
		// 트렌젝션 구현
				DefaultTransactionDefinition def = new DefaultTransactionDefinition();
				def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
				TransactionStatus status = transactionManager_sample.getTransaction(def);

				int result = 0;
				try {

					result = sqlSession.insert("Recipe.insertRecipe", param);

					transactionManager_sample.commit(status);
					logger.info("========== 레시피 등록 완료 : {}", result);

				} catch (Exception e) {
					logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
					e.printStackTrace();
					transactionManager_sample.rollback(status);
				}
				return result;
	}

	public List<RecipeDTO> recipeList() {
		return sqlSession.selectList("Recipe.recipeList");
	}

	public RecipeDTO recipeInfo(Map<String, Object> param) {
		
		return sqlSession.selectOne("Recipe.recipeInfo", param);
	}

	public int recipeDelete(Map<String, Object> param) {
		// 트렌젝션 구현
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);

		int result = 0;
		try {

			result = sqlSession.delete("Recipe.deleteRecipe", param);

			transactionManager_sample.commit(status);
			logger.info("========== 레시피 삭제 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}

	public int recipeUpdate(Map<String, Object> param) {
		// 트렌젝션 구현
				DefaultTransactionDefinition def = new DefaultTransactionDefinition();
				def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
				TransactionStatus status = transactionManager_sample.getTransaction(def);

				int result = 0;
				try {

					result = sqlSession.delete("Recipe.updateRecipe", param);

					transactionManager_sample.commit(status);
					logger.info("========== 레시피 수정 완료 : {}", result);

				} catch (Exception e) {
					logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
					e.printStackTrace();
					transactionManager_sample.rollback(status);
				}
				return result;
	}
}
