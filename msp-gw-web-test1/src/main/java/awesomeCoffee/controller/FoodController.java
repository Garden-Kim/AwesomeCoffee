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

import awesomeCoffee.dto.FoodDTO;
import awesomeCoffee.service.FoodService;
import kr.msp.constant.Const;

@Controller
public class FoodController {

	private Logger logger = LoggerFactory.getLogger(FoodController.class);

	@Autowired
	FoodService foodService;

	// 식자재삭제
	@RequestMapping(method = RequestMethod.POST, value = "/api/food/delete")
	public ModelAndView deleteFood(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());

		FoodDTO info = foodService.foodInfo(reqBodyMap);
		if (StringUtils.isEmpty(info)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {

			int result = foodService.deleteFood(reqBodyMap);

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

	// 식자재 수정
	@RequestMapping(method = RequestMethod.POST, value = "/api/food/update")
	public ModelAndView updateFood(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());

		FoodDTO dto = foodService.foodInfo(reqBodyMap);

		if (!StringUtils.isEmpty(dto)) {
			int result = foodService.updateFood(reqBodyMap);
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

	@RequestMapping(method = RequestMethod.POST, value = "/api/food/regist")
	public ModelAndView registFood(HttpServletRequest request, HttpServletResponse response) {

		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());

		int result = foodService.insertFood(reqBodyMap);

		if (result > 0) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}

		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// 식자재리스트_기맹ver
	@RequestMapping(method = RequestMethod.POST, value = "/api/food/foodList")
	public ModelAndView storeList() {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		List<Map<String, Object>> foodList = new ArrayList<Map<String, Object>>();

		List<FoodDTO> info = foodService.foodList();
		if (StringUtils.isEmpty(info)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			List<FoodDTO> foodInfo = foodService.foodList();
			logger.info("======================= responseBodyMap : {}", foodInfo.size());

			for (int i = 0; i < foodInfo.size(); i++) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("foodPrice", foodInfo.get(i).getFoodPrice());
				map.put("foodName", foodInfo.get(i).getFoodName());
				map.put("foodNum", foodInfo.get(i).getFoodNum());

				foodList.add(map);
			}
			logger.info("======================= categoryList : {}", foodInfo.toString());

			if (!StringUtils.isEmpty(foodInfo)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("list", foodList);
			} else {
				responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Data not found.");
			}
		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

}
