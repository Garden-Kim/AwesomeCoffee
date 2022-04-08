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
import awesomeCoffee.dto.OrderlistDTO;
import awesomeCoffee.service.MemberOrderService;
import awesomeCoffee.service.MemberService;
import awesomeCoffee.service.OrderlistService;
import kr.msp.constant.Const;

@Controller
public class OrderlistController {
	private Logger logger = LoggerFactory.getLogger(OrderlistController.class);
	@Autowired(required = true)
	private OrderlistService orderlistService;
	@Autowired
	private MemberOrderService memberOrderService;
	@Autowired
	private MemberService memberService;
	
	// 주문내역 insert
	@RequestMapping(method = RequestMethod.POST, value = "/api/orderlist/regist")
	public ModelAndView orderlistInsert(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
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
			int result = orderlistService.insertOrderlist(reqBodyMap);

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
	// 주문내역 read 
	@RequestMapping(method = RequestMethod.POST, value = "/api/orderlist/list")
	public ModelAndView orderlist(HttpServletRequest request,  HttpSession session) {
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		List<Map<String, Object>> orderList = new ArrayList<Map<String, Object>>();

		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			
			List<OrderlistDTO> list = orderlistService.selectOrderlist(reqBodyMap);
			logger.info("======================= responseBodyMap : {}", list.size());

			for (int i = 0; i < list.size(); i++) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("orderNum", list.get(i).getOrderNum());
				map.put("goodsNum", list.get(i).getGoodsNum());
				map.put("orderlistQty", list.get(i).getOrderlistQty());
				map.put("orderlistSum", list.get(i).getOrderlistSum());

				orderList.add(map);
			}
			logger.info("======================= orderList : {}", orderList.toString());

			if (!StringUtils.isEmpty(list)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("list", orderList);
			} else {
				responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Data not found.");
			}
		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

//	// 주문내역 update  
//	@RequestMapping(method = RequestMethod.POST, value = "/api/orderlist/update")
//	public ModelAndView orderListUpdate(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
//
//		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
//		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
//		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
//
//		if (reqHeadMap == null) {
//			reqHeadMap = new HashMap<String, Object>();
//		}
//
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
//			int result = memberOrderService.updateOrderCookState(reqBodyMap);
//			if (result > 0) {
//				responseBodyMap.put("rsltCode", "0000");
//				responseBodyMap.put("rsltMsg", "Success");
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
//
//	// 주문내역 delete
//	@RequestMapping(method = RequestMethod.POST, value = "/api/orderlist/delete")
//	public ModelAndView orderListDelete(HttpServletRequest request, HttpSession session) {
//		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
//		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
//		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
//
//		if (reqHeadMap == null) {
//			reqHeadMap = new HashMap<String, Object>();
//		}
//
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
//			String memberNum = memberService.getMemberNum(authInfo.getMemberId());
//			reqBodyMap.put("memberNum", memberNum);
//			int result = memberOrderService.deleteOrder(reqBodyMap);
//			if (result > 0) {
//				responseBodyMap.put("rsltCode", "0000");
//				responseBodyMap.put("rsltMsg", "Success");
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
