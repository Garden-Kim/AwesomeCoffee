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
import awesomeCoffee.dto.StoreDTO;
import awesomeCoffee.service.FoodService;
import awesomeCoffee.service.MenuService;
import awesomeCoffee.service.StoreOrderService;
import awesomeCoffee.service.StoreService;
import kr.msp.constant.Const;

@Controller
public class StoreOrderController {

	private Logger logger = LoggerFactory.getLogger(StoreOrderController.class);

	@Autowired
	StoreService storeService;
	@Autowired
	FoodService foodService;
	@Autowired
	StoreOrderService storeOrderService;

	// 발주 등록
	@RequestMapping(method = RequestMethod.POST, value = "/api/storeOrder/regist")
	public ModelAndView regiStore(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		
		
		FoodDTO foodInfo = foodService.foodInfo(responseBodyMap);
		StoreDTO storeInfo = storeService.getStoreInfoById(responseBodyMap);
		if (!StringUtils.isEmpty(storeInfo) && StringUtils.isEmpty(foodInfo)) {
			int result = storeOrderService.insertStoreOrder(reqBodyMap);

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
