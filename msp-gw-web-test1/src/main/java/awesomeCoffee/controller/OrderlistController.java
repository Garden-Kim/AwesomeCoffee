package awesomeCoffee.controller;

import java.util.ArrayList;
import java.util.Date;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import awesomeCoffee.dto.AuthInfo;
import awesomeCoffee.dto.MemberOrderDTO;
import awesomeCoffee.dto.MenuCategoryDTO;
import awesomeCoffee.dto.MenuDTO;
import awesomeCoffee.dto.OrderlistDTO;
import awesomeCoffee.dto.PaymentDTO;
import awesomeCoffee.service.MemberOrderService;
import awesomeCoffee.service.MemberService;
import awesomeCoffee.service.MenuService;
import awesomeCoffee.service.OrderlistService;
import awesomeCoffee.service.PaymentService;
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
	@Autowired
	private MenuService menuService;
	@Autowired
	private PaymentService paymentService;

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

	// 주문내역 read 회원
	@RequestMapping(method = RequestMethod.POST, value = "/api/orderlist/list")
	public ModelAndView orderlist(HttpSession session, HttpServletRequest request) {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		List<Map<String, Object>> orderList = new ArrayList<Map<String, Object>>();
		List<MenuDTO> menulist = menuService.selectAllMenu();
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
				List<Map<String, Object>> list1 = new ArrayList<Map<String, Object>>();
				List<OrderlistDTO> goodsList = orderlistService.selectGoodsNums(map);
				for (int a = 0; a < goodsList.size(); a++) {
					Map<String, Object> goodsMap = new HashMap<String, Object>();
					goodsMap.put("goodsNum", goodsList.get(a).getGoodsNum());
					goodsMap.put("goodsImage", goodsList.get(a).getGoodsImage());
					goodsMap.put("orderPrice", goodsList.get(a).getOrderPrice());
					goodsMap.put("goodsName", goodsList.get(a).getGoodsName());

					list1.add(goodsMap);
				}
				map.put("list", list1);
				// title goodsName, goodsImage
				if (goodsList.size() == 0) {
					String titleGoodsName = "";
					String titleGoodsImage = "";
				}else if (goodsList.size() > 1) {
					String titleGoodsName = goodsList.get(0).getGoodsName().toString() + " 외 " + (goodsList.size() - 1)
							+ "개";
					String titleGoodsImage = goodsList.get(0).getGoodsImage().toString();
					map.put("titleGoodsName", titleGoodsName);
					map.put("titleGoodsImage", titleGoodsImage);
				} else {
					String titleGoodsName = goodsList.get(0).getGoodsName().toString();
					String titleGoodsImage = goodsList.get(0).getGoodsImage().toString();
					map.put("titleGoodsName", titleGoodsName);
					map.put("titleGoodsImage", titleGoodsImage);
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
	
	
	// 주문내역 read 회원 (조리상태가 N 수령상태 N)
		@RequestMapping(method = RequestMethod.POST, value = "/api/orderlist/listNN")
		public ModelAndView orderlistNN(HttpSession session, HttpServletRequest request) {
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
				String memberNum = memberService.getMemberNum(authInfo.getLoginId());
				List<MemberOrderDTO> list = memberOrderService.selectMemOrderNN(memberNum);
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
					}else if (goodsList.size() > 1) {
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

		
		// 주문내역 read 회원 (조리상태가 Y 수령상태 N)
		@RequestMapping(method = RequestMethod.POST, value = "/api/orderlist/listYN")
		public ModelAndView orderlistYN(HttpSession session, HttpServletRequest request) {
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
				String memberNum = memberService.getMemberNum(authInfo.getLoginId());
				List<MemberOrderDTO> list = memberOrderService.selectMemOrderYN(memberNum);
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
					}else if (goodsList.size() > 1) {
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

		
		// 주문내역 read 회원 (조리상태가 Y 수령상태 Y)
		@RequestMapping(method = RequestMethod.POST, value = "/api/orderlist/listYY")
		public ModelAndView orderlistYY(HttpSession session, HttpServletRequest request) {
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
				String memberNum = memberService.getMemberNum(authInfo.getLoginId());
				List<MemberOrderDTO> list = memberOrderService.selectMemOrderYY(memberNum);
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
					}else if (goodsList.size() > 1) {
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

		
		
	

	// 주문내역 상세페이지
	@RequestMapping(method = RequestMethod.POST, value = "/api/orderlist/detail")
	public ModelAndView orderListDetail(HttpSession session, HttpServletRequest request) {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		List<Map<String, Object>> orderList = new ArrayList<Map<String, Object>>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		String memberNum = memberService.getMemberNum(authInfo.getLoginId());
		reqBodyMap.put("memberNum", memberNum);
		MemberOrderDTO member = memberOrderService.selectOrderDetail(reqBodyMap);
		System.out.println(member.getMemberNum().toString());
		System.out.println(memberNum.toString());
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			if (!memberNum.equals(member.getMemberNum())) {
				System.out.println("@!#ER");
				responseBodyMap.put("rsltCode", "1003");
				responseBodyMap.put("rsltMsg", "No Permission");
			} else {
				List<OrderlistDTO> goodsList = orderlistService.selectGoodsNums(reqBodyMap);
				// 주문 번호
				String orderNum = reqBodyMap.get("orderNum").toString();
				// 주문(결제) 날짜, 결제 수단, 총 주문 가격
				PaymentDTO dto = paymentService.selectOnePayment(orderNum);
				Date orderDate = dto.getPaymentDate();
				String paymentKind = dto.getPaymentKind();
				String paymentPrice = dto.getPaymentPrice();

				for (int a = 0; a < goodsList.size(); a++) {
					Map<String, Object> goodsMap = new HashMap<String, Object>();
					// 상품 이름,번호
					goodsMap.put("goodsNum", goodsList.get(a).getGoodsNum());
					goodsMap.put("goodsName", goodsList.get(a).getGoodsName());
					// 상품 하나당 주문 개수
					goodsMap.put("orderlistQty", goodsList.get(a).getOrderlistQty());
					// 상품의 가격
					goodsMap.put("goodsPrice", goodsList.get(a).getGoodsPrice());
					// 상품주문개수*상품가격
					goodsMap.put("price", goodsList.get(a).getPrice());

					orderList.add(goodsMap);
				}
				if (!StringUtils.isEmpty(orderList)) {
					responseBodyMap.put("rsltCode", "0000");
					responseBodyMap.put("rsltMsg", "Success");
					responseBodyMap.put("orderDate", orderDate);
					responseBodyMap.put("paymentKind", paymentKind);
					responseBodyMap.put("paymentPrice", paymentPrice);

					// 주문한 메뉴 상세리스트
					responseBodyMap.put("list", orderList);

				} else {
					responseBodyMap.put("rsltCode", "2003");
					responseBodyMap.put("rsltMsg", "Data not found.");
				}
			}

		}

		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.BODY, responseBodyMap);
		mv.addObject(Const.HEAD, reqHeadMap);
		return mv;
	}

	// 주문내역 delete
	@RequestMapping(method = RequestMethod.POST, value = "/api/orderlist/delete")
	public ModelAndView orderListDelete(HttpServletRequest request, HttpSession session) {
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
			int result = orderlistService.deleteOrderlist(reqBodyMap);
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
