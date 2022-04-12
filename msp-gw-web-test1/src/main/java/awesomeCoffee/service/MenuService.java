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
import org.springframework.util.StringUtils;

import awesomeCoffee.dto.MenuDTO;

@Service
public class MenuService {
	private Logger logger = LoggerFactory.getLogger(MenuService.class);

	@Autowired(required = true)
	@Qualifier("sqlSession_sample")
	private SqlSession sqlSession;

	@Autowired(required = true)
	@Qualifier("transactionManager_sample")
	private DataSourceTransactionManager transactionManager_sample;
	
	// 메뉴 검색
	public List<MenuDTO> selectSearchMenu(Map<String, Object> goodsName){
		return sqlSession.selectList("Menu.selectSearchMenu", goodsName);
	}
	
	// 메뉴 삭제
	public int deleteMenu(Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		
		int result = 0;
		try {
			result = sqlSession.update("Menu.deleteMenu", param);
			transactionManager_sample.commit(status);
			logger.info("========== 메뉴 삭제 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	// 메뉴 수정 
	public int updateMenu(Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		
		int result = 0;
		try {
			result = sqlSession.update("Menu.updateMenu", param);
			transactionManager_sample.commit(status);
			logger.info("========== 메뉴 수정 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	// 메뉴 수정 (파일 업로드 포함)
	public int updateFileMenu(Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		// 원래 존재하는 이미지 파일 삭제를 위한 select
		//////////////////////////////////////////////// ...ㅠ
		MenuDTO menu = sqlSession.selectOne("Menu.selectOneMenu", param);
		MenuDTO origin = new MenuDTO();
		origin.setGoodsImage(menu.getGoodsImage());
		origin.setOriginalFile(menu.getOriginalFile());
		
		int result = 0;
		try {
			result = sqlSession.update("Menu.updateFileMenu", param);
			transactionManager_sample.commit(status);
			logger.info("========== 메뉴 수정 완료(파일 포함) : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	
	// 메뉴 리스트 (관심상품)
	public List<MenuDTO> selectWishMenu(String memberNum){
		return sqlSession.selectList("Menu.selectWishMenu", memberNum);
	}
	// 메뉴 리스트
	public List<MenuDTO> selectAllMenu() {
		return sqlSession.selectList("Menu.selectAllMenu");
	}
	// 메뉴 리스트 (카테고리별)
	public List<MenuDTO> selectCategoryMenu(Map<String, Object> categoryNum){
		return sqlSession.selectList("Menu.selectCategoryMenu", categoryNum);
	}
	// 메뉴 등록
	public int insertMenu(Map<String, Object> param) {
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager_sample.getTransaction(def);
		int result = 0;
		try {
			result = sqlSession.insert("Menu.insertMenu", param);
			transactionManager_sample.commit(status);
			logger.info("========== 메뉴 등록 완료 : {}", result);

		} catch (Exception e) {
			logger.error("[ERROR] insertUser() Fail : e : {}", e.getMessage());
			e.printStackTrace();
			transactionManager_sample.rollback(status);
		}
		return result;
	}
	public MenuDTO getMenuInfo(Map<String, Object> param) {
		return sqlSession.selectOne("Menu.getMenuInfo", param);
	}

	public MenuDTO getMenuInfoByNum(Map<String, Object> param) {
		return sqlSession.selectOne("Menu.getMenuInfoByNum", param);
	}

	public String getRecipeYn(String string) {
		List<String> s = sqlSession.selectList("Menu.getRecipeYn",string);
		System.out.println(s);
		if(s.size() < 1) {
			return "N";
		}else {
			return "Y";
		}
	}
	
}
