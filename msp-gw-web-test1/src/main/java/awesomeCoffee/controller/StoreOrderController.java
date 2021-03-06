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

import com.google.gson.Gson;
import com.ibm.db2.jcc.am.re;

import awesomeCoffee.dto.AuthInfo;
import awesomeCoffee.dto.FoodDTO;
import awesomeCoffee.dto.MemberOrderDTO;
import awesomeCoffee.dto.MenuDTO;
import awesomeCoffee.dto.StoreDTO;
import awesomeCoffee.dto.StoreOrderDTO;
import awesomeCoffee.service.FoodService;
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

	// 발주 목록(총합포함)
	@RequestMapping(method = RequestMethod.POST, value = "/api/storeOrder/list")
	public ModelAndView storeOrderList(HttpServletRequest request, HttpSession session) {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		List<Map<String, Object>> storeOrderList = new ArrayList<Map<String, Object>>();
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}	

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		
		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		String storeNum = storeService.getStoreNumById(authInfo.getLoginId());
		
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			List<StoreOrderDTO> storeOrderInfo = storeOrderService.storeOrderList(storeNum);
			logger.info("======================= responseBodyMap : {}", storeOrderInfo.size());
			
			for (int i = 0; i < storeOrderInfo.size(); i++) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("storeOrderNum", storeOrderInfo.get(i).getStoreOrderNum());
				map.put("storeNum", storeNum);
				map.put("storeOrderDate", storeOrderInfo.get(i).getStoreOrderDate());
				map.put("listPrice", storeOrderInfo.get(i).getListPrice());
				List<Map<String, Object>> list1 = new ArrayList<Map<String, Object>>();
				List<StoreOrderDTO> list = storeOrderService.selectOrderDetail(storeOrderInfo.get(i).getStoreOrderNum());
				for (int j = 0; j < list.size(); j++) {
					Map<String, Object> mapList = new HashMap<String, Object>();
					mapList.put("foodNum", list.get(j).getFoodNum());
					mapList.put("foodName", list.get(j).getFoodName());
					// 식자재 * 개수 의 가격 
					mapList.put("foodPrice", list.get(j).getFoodPrice());
					mapList.put("storeOrderQty", list.get(j).getStoreOrderQty());
					
					list1.add(mapList);
				}
				map.put("list", list1);
				storeOrderList.add(map);
			}
			String priceSum = storeOrderService.storeOrderPriceSum(storeNum);

			if (!StringUtils.isEmpty(storeOrderInfo)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("list", storeOrderList);
				responseBodyMap.put("priceSum", priceSum);
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

	// 발주 등록
	@RequestMapping(method = RequestMethod.POST, value = "/api/storeOrder/regist")
	public ModelAndView regiStore(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		List<Map<String, Object>> ListReqBodyMap = (List<Map<String, Object>>) reqBodyMap.get("list"); 
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

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
			String storeNum = storeService.getStoreNumById(authInfo.getLoginId());
			int result = storeOrderService.insertStoreOrder(ListReqBodyMap,storeNum);
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

	
	// 발주 상세페이지
//	@RequestMapping(method = RequestMethod.POST, value = "/api/storeOrder/detail")
//	public ModelAndView storeOrderDetail(HttpServletRequest request, HttpSession session) {
//		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
//		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
//		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
//		List<Map<String, Object>> foodlistDetail = new ArrayList<Map<String, Object>>();
//
//		if (reqHeadMap == null) {
//			reqHeadMap = new HashMap<String, Object>();
//		}
//		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
//		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
//
//		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
//
//		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
//		if (StringUtils.isEmpty(authInfo)) {
//			responseBodyMap.put("rsltCode", "1003");
//			responseBodyMap.put("rsltMsg", "Login required.");
//		} else {
//			String orderPrice = storeOrderService.storeOrderPrice(reqBodyMap);
//			List<StoreOrderDTO> list = storeOrderService.selectOrderDetail(reqBodyMap);
//			for (int i = 0; i < list.size(); i++) {
//				Map<String, Object> map = new HashMap<String, Object>();
//				map.put("storeOrderNum", list.get(i).getStoreOrderNum());
//				map.put("foodName", list.get(i).getFoodName());
//				map.put("storeOrderPrice", list.get(i).getStoreOrderPrice());
//				map.put("storeOrderQty", list.get(i).getStoreOrderQty());
//
//				foodlistDetail.add(map);
//			}
//			if (!StringUtils.isEmpty(list)) {
//				responseBodyMap.put("rsltCode", "0000");
//				responseBodyMap.put("rsltMsg", "Success");
//				responseBodyMap.put("list", foodlistDetail);
//				responseBodyMap.put("orderPrice", orderPrice);
//			} else {
//				responseBodyMap.put("rsltCode", "2003");
//				responseBodyMap.put("rsltMsg", "Data not found.");
//			}
//		}
//		ModelAndView mv = new ModelAndView("defaultJsonView");
//		mv.addObject(Const.HEAD, reqHeadMap);
//		mv.addObject(Const.BODY, responseBodyMap);
//
//		return mv;
//	}

}
