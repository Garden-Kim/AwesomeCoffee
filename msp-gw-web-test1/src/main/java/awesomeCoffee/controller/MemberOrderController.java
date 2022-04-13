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

import awesomeCoffee.dto.AuthInfo;
import awesomeCoffee.dto.MemberOrderDTO;
import awesomeCoffee.dto.MenuDTO;
import awesomeCoffee.dto.OrderlistDTO;
import awesomeCoffee.service.CartService;
import awesomeCoffee.service.MemberOrderService;
import awesomeCoffee.service.MemberService;
import awesomeCoffee.service.MenuService;
import awesomeCoffee.service.OrderlistService;
import kr.msp.constant.Const;
import net.sf.json.JSONArray;

@Controller
public class MemberOrderController {
	private Logger logger = LoggerFactory.getLogger(MemberOrderController.class);
	@Autowired(required = true)
	private MemberOrderService memberOrderService;
	@Autowired(required = true)
	private MemberService memberService;
	@Autowired
	private CartService cartService;
	@Autowired
	private OrderlistService orderlistService;
	@Autowired
	private MenuService menuService;

	// 바로 주문시 상품 정보 select
	@RequestMapping(method = RequestMethod.POST, value = "/api/order/directOrder")
	public ModelAndView directOrder(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
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
				responseBodyMap.put("qty", reqBodyMap.get("qty").toString());
				responseBodyMap.put("goodsImage", dto.getGoodsImage());
				responseBodyMap.put("goodsName", dto.getGoodsName());
				responseBodyMap.put("goodsPrice", dto.getGoodsPrice());

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
		Map<String, Object> reqBodyMap = new HashMap<String, Object>();
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		List<Map<String, Object>> memberCartList = new ArrayList<Map<String, Object>>();

		Map<String, Object> ListReqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		String str = (String)ListReqBodyMap.get("body").toString();
		System.out.println("str = " + str);
		Gson gson = new Gson();
		List<Map<String, Object>> list1 = new ArrayList<Map<String, Object>>();
		list1 = gson.fromJson(str, List.class);
		System.out.println("list1 : " + list1);
		System.out.println(list1.size());
//		System.out.println(ListReqBodyMap.get("body"));
//		String str = ListReqBodyMap.get("body").toString();
//		str = str.replace("[{", "");
//		str = str.replace("}]", "");
//		String[] strArray = str.split("},");
//		List<Map<String, Object>> list1 = new ArrayList<Map<String, Object>>();
//		for (String s : strArray) {
//			String s1 = s.replace("{", "");
//			String[] sss = s1.split(",");
//			Map<String, Object> m = new HashMap<String, Object>();
//			for (String ss2 : sss) {
//				String sss2[] = ss2.split(":");
//				m.put(sss2[0], (Object) sss2[1]);
//			}
//			list1.add(m);
//		}
//		for (int ii = 0; ii < list1.size(); ii++) {
//			System.out.println(list1);
//		}
//
//		if (reqHeadMap == null) {
//			reqHeadMap = new HashMap<String, Object>();
//		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		String memberNum = memberService.getMemberNum(authInfo.getLoginId());
		reqBodyMap.put("memberNum", memberNum);
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			cartService.modifyCart(list1, memberNum);

			List<MemberOrderDTO> list = memberOrderService.memberCartList(reqBodyMap);
			logger.info("======================= CartListSize : {}", list.size());

			for (int i = 0; i < list.size(); i++) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("goodsNum", list.get(i).getGoodsNum());
				map.put("qty", list.get(i).getQty());
				map.put("priceSum", list.get(i).getPriceSum());
				map.put("goodsName", list.get(i).getGoodsName());
				map.put("goodsImage", list.get(i).getGoodsImage());

				memberCartList.add(map);
			}
			logger.info("======================= categoryList : {}", memberCartList.toString());

			if (!StringUtils.isEmpty(list)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("list", memberCartList);
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

	// 주문 read 오늘의 주문
	@RequestMapping(method = RequestMethod.POST, value = "/api/order/empTodayList")
	public ModelAndView orderEmpList(HttpSession session, HttpServletRequest request) {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		List<Map<String, Object>> orderList = new ArrayList<Map<String, Object>>();

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
			List<MemberOrderDTO> list = memberOrderService.selectTodayOrder();
			logger.info("======================= responseBodyMap : {}", list.size());

			for (int i = 0; i < list.size(); i++) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("takeout", list.get(i).getTakeout());
				map.put("cookState", list.get(i).getCookState());
				map.put("orderPrice", list.get(i).getOrderPrice());
				map.put("orderTime", list.get(i).getOrderTime());
				map.put("memberNum", list.get(i).getMemberNum());
				map.put("orderNum", list.get(i).getOrderNum());
				List<Map<String, Object>> list1 = new ArrayList<Map<String, Object>>();
				List<OrderlistDTO> goodsList = orderlistService.selectGoodsNums(map);
				for (int a = 0; a < goodsList.size(); a++) {
					Map<String, Object> goodsMap = new HashMap<String, Object>();
					goodsMap.put("goodsNum", goodsList.get(a).getGoodsNum());
					goodsMap.put("orderPrice", goodsList.get(a).getOrderPrice());
					goodsMap.put("goodsName", goodsList.get(a).getGoodsName());

					list1.add(goodsMap);
				}
				map.put("list", list1);
				// title goodsName
				if (goodsList.size() == 0) {
					String titleGoodsName = "";
				} else if (goodsList.size() > 1) {
					String titleGoodsName = goodsList.get(0).getGoodsName().toString() + " 외 " + (goodsList.size() - 1)
							+ "개";
					map.put("titleGoodsName", titleGoodsName);
				} else {
					String titleGoodsName = goodsList.get(0).getGoodsName().toString();
					map.put("titleGoodsName", titleGoodsName);
				}
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
		mv.addObject(Const.HEAD, reqHeadMap);
		return mv;
	}

	// 주문 read 직원 (조리상태가 Y인 모든 것 )
	@RequestMapping(method = RequestMethod.POST, value = "/api/order/empListY")
	public ModelAndView orderEmpListY(HttpSession session, HttpServletRequest request) {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		List<Map<String, Object>> orderList = new ArrayList<Map<String, Object>>();

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
			List<MemberOrderDTO> list = memberOrderService.selectAllEmpOrderY();
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
		mv.addObject(Const.HEAD, reqHeadMap);
		return mv;
	}

	// 주문 read 직원 (테이크아웃 상태가 N인 모든 것 )
	@RequestMapping(method = RequestMethod.POST, value = "/api/order/empListTake")
	public ModelAndView orderEmpListTake(HttpSession session, HttpServletRequest request) {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		List<Map<String, Object>> orderList = new ArrayList<Map<String, Object>>();

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
			List<MemberOrderDTO> list = memberOrderService.selectAllEmpOrderTake();
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
		mv.addObject(Const.HEAD, reqHeadMap);
		return mv;
	}

	// 주문 read 직원 (조리상태가 N인 모든 것 )
	@RequestMapping(method = RequestMethod.POST, value = "/api/order/empListN")
	public ModelAndView orderEmpListN(HttpSession session, HttpServletRequest request) {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		List<Map<String, Object>> orderList = new ArrayList<Map<String, Object>>();

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
			List<MemberOrderDTO> list = memberOrderService.selectAllEmpOrderN();
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
		mv.addObject(Const.HEAD, reqHeadMap);
		return mv;
	}

	// 주문 detail 직원주문 상세페이지
	@RequestMapping(method = RequestMethod.POST, value = "/api/order/empDetail")
	public ModelAndView orderEmpDetail(HttpServletRequest request, HttpSession session) {
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		List<Map<String, Object>> orderList = new ArrayList<Map<String, Object>>();

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
			List<MenuDTO> menuList = menuService.selectOrderMenu(reqBodyMap);
			logger.info("======================= responseBodyMap : {}", menuList.size());

			for (int i = 0; i < menuList.size(); i++) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("goodsNum", menuList.get(i).getGoodsNum());
				map.put("goodsName", menuList.get(i).getGoodsName());
				map.put("orderlistQty", menuList.get(i).getOrderlistQty());

				orderList.add(map);
			}
			MemberOrderDTO dto = memberOrderService.selectOrderDetail(reqBodyMap);
			if (!StringUtils.isEmpty(dto)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("takeout", dto.getTakeout());
				responseBodyMap.put("cookState", dto.getCookState());
				responseBodyMap.put("orderPrice", dto.getOrderPrice());
				responseBodyMap.put("orderTime", dto.getOrderTime());
				responseBodyMap.put("memberNum", dto.getMemberNum());
				responseBodyMap.put("orderNum", dto.getOrderNum());
				responseBodyMap.put("list", orderList);

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
