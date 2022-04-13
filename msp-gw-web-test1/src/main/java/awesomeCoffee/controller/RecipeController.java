package awesomeCoffee.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import awesomeCoffee.dto.AuthInfo;
import awesomeCoffee.dto.FoodDTO;
import awesomeCoffee.dto.RecipeDTO;
import awesomeCoffee.dto.StoreOrderDTO;
import awesomeCoffee.service.FoodService;
import awesomeCoffee.service.RecipeService;
import kr.msp.constant.Const;

@Controller
public class RecipeController {

	private Logger logger = LoggerFactory.getLogger(RecipeController.class);

	@Autowired
	RecipeService recipeService;

	// 레시피수정
	@RequestMapping(method = RequestMethod.POST, value = "/api/recipe/update")
	public ModelAndView updateRecipe(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		List<Map<String, Object>> reqBodyMap = (List<Map<String, Object>>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());

		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			if (authInfo.getGrade().equals("store")) {
				int result = recipeService.recipeUpdate(reqBodyMap);

				if (result > 0) {
					responseBodyMap.put("rsltCode", "0000");
					responseBodyMap.put("rsltMsg", "Success");
				} else {
					responseBodyMap.put("rsltCode", "2003");
					responseBodyMap.put("rsltMsg", "Data not found.");
				}
			} else {
				responseBodyMap.put("rsltCode", "1011");
				responseBodyMap.put("rsltMsg", "No permission.");
			}
		}

		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// 레시피조회
	@RequestMapping(method = RequestMethod.POST, value = "/api/recipe/info")
	public ModelAndView recipeInfo(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());

		RecipeDTO info = recipeService.recipeInfo(reqBodyMap);
		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			if (authInfo.getGrade().equals("store")) {

				if (!StringUtils.isEmpty(info)) {
					responseBodyMap.put("rsltCode", "0000");
					responseBodyMap.put("rsltMsg", "Success");
					responseBodyMap.put("goodsNum", info.getGoodsNum());
					responseBodyMap.put("foodNum", info.getFoodNum());
					responseBodyMap.put("recipeFoodQty", info.getRecipeFoodQty());
				} else {
					responseBodyMap.put("rsltCode", "2003");
					responseBodyMap.put("rsltMsg", "Data not found.");
				}
			} else {
				responseBodyMap.put("rsltCode", "1011");
				responseBodyMap.put("rsltMsg", "No permission.");
			}
		}

		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// 레시피삭제
	@RequestMapping(method = RequestMethod.POST, value = "/api/recipe/delete")
	public ModelAndView deleteRecipe(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());

		RecipeDTO info = recipeService.recipeInfo(reqBodyMap);
		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			if (authInfo.getGrade().equals("store")) {
				int result = recipeService.recipeDelete(reqBodyMap);

				if (result > 0) {
					responseBodyMap.put("rsltCode", "0000");
					responseBodyMap.put("rsltMsg", "Success");
				} else {
					responseBodyMap.put("rsltCode", "2003");
					responseBodyMap.put("rsltMsg", "Data not found.");
				}
			} else {
				responseBodyMap.put("rsltCode", "1011");
				responseBodyMap.put("rsltMsg", "No permission.");
			}
		}

		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// 레시피목록
	@RequestMapping(method = RequestMethod.POST, value = "/api/recipe/list")
	public ModelAndView recipeList(HttpSession session, HttpServletRequest request) {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		List<Map<String, Object>> recipeList = new ArrayList<Map<String, Object>>();
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			List<RecipeDTO> recipeInfo = recipeService.recipeList();
			logger.info("======================= responseBodyMap : {}", recipeInfo.size());

			for (int i = 0; i < recipeInfo.size(); i++) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("goodsNum", recipeInfo.get(i).getGoodsNum());
				map.put("recipeFoodQty", recipeInfo.get(i).getRecipeFoodQty());
				map.put("foodNum", recipeInfo.get(i).getFoodNum());

				recipeList.add(map);
			}
			logger.info("======================= recipeList : {}", recipeInfo.toString());

			if (!StringUtils.isEmpty(recipeInfo)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("list", recipeList);
			} else {
				responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Data not found.");
			}
		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.BODY, responseBodyMap);
		mv.addObject(Const.HEAD, reqHeadMap);
		return mv;
	}

	// 레시피 등록
	@RequestMapping(method = RequestMethod.POST, value = "/api/recipe/regist")
	public ModelAndView recipeRegist(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		List<Map<String, Object>> reqBodyMap = (List<Map<String, Object>>) request.getAttribute(Const.BODY);

		System.out.println(request.getAttribute(Const.BODY).toString());
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

//			reqBodyMap.put("storeId", authInfo.getLoginId());
//			StoreDTO dto = storeService.getStoreInfoById(reqBodyMap);
//			reqBodyMap.put("storeNum",dto.getStoreNum());

		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			int result = recipeService.insertRecipe(reqBodyMap);
			if (result > 0) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
			} else {
				responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Data not found.");
			}
		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}
}
