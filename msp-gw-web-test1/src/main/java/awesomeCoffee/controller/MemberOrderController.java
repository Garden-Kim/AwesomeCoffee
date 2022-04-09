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
import awesomeCoffee.dto.MemberOrderDTO;
import awesomeCoffee.dto.MenuDTO;
import awesomeCoffee.service.CartService;
import awesomeCoffee.service.MemberOrderService;
import awesomeCoffee.service.MemberService;
import kr.msp.constant.Const;

@Controller
public class MemberOrderController {
	private Logger logger = LoggerFactory.getLogger(MemberOrderController.class);
	@Autowired(required = true)
	private MemberOrderService memberOrderService;
	@Autowired(required = true)
	private MemberService memberService;
	@Autowired
	private CartService cartService;
	
	// 바로 주문시 상품 정보 select 
	@RequestMapping(method = RequestMethod.POST, value="/api/order/directOrder")
	public ModelAndView directOrder(HttpSession session, HttpServletRequest request,
			HttpServletResponse response) {
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
			MenuDTO dto = memberOrderService.directOrder(reqBodyMap);
			if (!StringUtils.isEmpty(dto)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("qty", 1);
				responseBodyMap.put("goodsImage",dto.getGoodsImage());
				responseBodyMap.put("goodsName",dto.getGoodsName());
				responseBodyMap.put("goodsPrice",dto.getGoodsPrice());
				
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
	
	// 주문 select (장바구니에서 주문하기 버튼 클릭시 )
	@RequestMapping(method = RequestMethod.POST, value = "/api/order/selectCartlist")
	public ModelAndView memberCartList(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		List<Map<String, Object>> memberCartList = new ArrayList<Map<String, Object>>();

		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		String memberNum = memberService.getMemberNum(authInfo.getLoginId());
		reqBodyMap.put("memberNum",memberNum);
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			List<MemberOrderDTO> list = memberOrderService.memberCartList(reqBodyMap);
			logger.info("======================= CartListSize : {}", list.size());

			for (int i =0; i<list.size() ; i++) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("goodsNum", list.get(i).getGoodsNum());
				map.put("qty", list.get(i).getQty());
				map.put("priceSum", list.get(i).getPriceSum());
				map.put("goodsName", list.get(i).getGoodsName());
				map.put("goodsImage", list.get(i).getGoodsImage());

				memberCartList.add(map);
			}
			logger.info("======================= categoryList : {}" , memberCartList.toString());
						
			if (!StringUtils.isEmpty(list)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("list",memberCartList);
			} else { 
				responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Data not found.");
			}
		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// 주문 read 회원
	@RequestMapping(method = RequestMethod.POST, value = "/api/order/memList")
	public ModelAndView orderMemList(HttpSession session) {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		List<Map<String, Object>> orderList = new ArrayList<Map<String, Object>>();

		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			String memberNum = memberService.getMemberNum(authInfo.getLoginId());
			List<MemberOrderDTO> list = memberOrderService.selectAllMemOrder(memberNum);
			logger.info("======================= responseBodyMap : {}", list.size());

			for (int i = 0; i < list.size(); i++) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("takeout", list.get(i).getTakeout());
				map.put("cookState", list.get(i).getCookState());
				map.put("orderPrice", list.get(i).getOrderPrice());
				map.put("orderTime", list.get(i).getOrderTime());
				map.put("memberNum", list.get(i).getMemberNum());
				map.put("orderNum", list.get(i).getOrderNum());

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

	// 주문 read 직원 (조리상태가 N인 모든 것 )
	@RequestMapping(method = RequestMethod.POST, value = "/api/order/empList")
	public ModelAndView orderEmpList(HttpSession session) {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		List<Map<String, Object>> orderList = new ArrayList<Map<String, Object>>();

		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			List<MemberOrderDTO> list = memberOrderService.selectAllEmpOrder();
			logger.info("======================= responseBodyMap : {}", list.size());

			for (int i = 0; i < list.size(); i++) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("takeout", list.get(i).getTakeout());
				map.put("cookState", list.get(i).getCookState());
				map.put("orderPrice", list.get(i).getOrderPrice());
				map.put("orderTime", list.get(i).getOrderTime());
				map.put("memberNum", list.get(i).getMemberNum());
				map.put("orderNum", list.get(i).getOrderNum());

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

	// 주문 update 조리여부
	@RequestMapping(method = RequestMethod.POST, value = "/api/order/updateCookState")
	public ModelAndView orderCookStateUpdate(HttpSession session, HttpServletRequest request,
			HttpServletResponse response) {

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
			int result = memberOrderService.updateOrderCookState(reqBodyMap);
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

	// 주문 update 수령여부
	@RequestMapping(method = RequestMethod.POST, value = "/api/order/updateTakeout")
	public ModelAndView orderTakeoutUpdate(HttpSession session, HttpServletRequest request,
			HttpServletResponse response) {

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
			int result = memberOrderService.updateOrderTakeout(reqBodyMap);
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

	// 주문 delete
	@RequestMapping(method = RequestMethod.POST, value = "/api/order/delete")
	public ModelAndView orderDelete(HttpServletRequest request, HttpSession session) {
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
			String memberNum = memberService.getMemberNum(authInfo.getLoginId());
			reqBodyMap.put("memberNum", memberNum);
			int result = memberOrderService.deleteOrder(reqBodyMap);
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
