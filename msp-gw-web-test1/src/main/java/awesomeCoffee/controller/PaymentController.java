package awesomeCoffee.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import awesomeCoffee.dto.AuthInfo;
import awesomeCoffee.dto.CartDTO;
import awesomeCoffee.dto.MenuDTO;
import awesomeCoffee.dto.PaymentDTO;
import awesomeCoffee.service.CartService;
import awesomeCoffee.service.MemberOrderService;
import awesomeCoffee.service.MemberService;
import awesomeCoffee.service.OrderlistService;
import awesomeCoffee.service.PaymentService;
import awesomeCoffee.service.StoreService;
import kr.msp.constant.Const;

@Controller
public class PaymentController {
	private Logger logger = LoggerFactory.getLogger(PaymentController.class);
	@Autowired(required = true)
	private PaymentService paymentService;
	@Autowired
	private MemberService memberService;
	@Autowired
	private CartService cartService;
	@Autowired
	private OrderlistService orderlistService;
	@Autowired
	private MemberOrderService memberOrderService;
	@Autowired
	private StoreService storeService;

	// 결제 insert 주문 insert 바로주문
	@RequestMapping(method = RequestMethod.POST, value = "/api/payment/directRegist")
	public ModelAndView directPayment(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY); // goodsNum과
																									// paymentKind 받음
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
			String orderNum = memberOrderService.createOrderNum();
			reqBodyMap.put("orderNum", orderNum);
			MenuDTO dto = memberOrderService.directOrder(reqBodyMap);
			int price = Integer.parseInt(dto.getGoodsPrice()) * Integer.parseInt(reqBodyMap.get("qty").toString());
			reqBodyMap.put("paymentPrice", price);
			reqBodyMap.put("orderPrice", price);

			if (dto != null) {
				int i = memberOrderService.insertDirectOrder(reqBodyMap);
				// 회원 주문 내역 insert
				orderlistService.insertDirectOrderlist(reqBodyMap);
				if (i > 0) {
					responseBodyMap.put("rsltCode", "0000");
					responseBodyMap.put("rsltMsg", "Success");
					int result = paymentService.directPaymentInsert(reqBodyMap);

					if (result > 0) {
						responseBodyMap.put("rsltCode", "0000");
						responseBodyMap.put("rsltMsg", "Success");
					} else {
						responseBodyMap.put("rsltCode", "2003");
						responseBodyMap.put("rsltMsg", "Payment Fail");
					}
				} else {
					responseBodyMap.put("rsltCode", "2003");
					responseBodyMap.put("rsltMsg", "Order Fail");
				}
			} else {
				responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Data not found");
			}

		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// 결제 insert 주문 insert
	@RequestMapping(method = RequestMethod.POST, value = "/api/payment/regist")
	public ModelAndView payment(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
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
			String orderNum = memberOrderService.createOrderNum();
			reqBodyMap.put("orderNum", orderNum);

			List<CartDTO> list = cartService.selectAllCart(memberNum);
			if (!list.isEmpty()) {
				int result = paymentService.paymentInsert(reqBodyMap);
				if (result > 0) {
					responseBodyMap.put("rsltCode", "0000");
					responseBodyMap.put("rsltMsg", "Success");
					// 회원 주문 insert
					int i = memberOrderService.insertMemberOrder(reqBodyMap);
					if (i > 0) {
						// 회원 주문 내역 insert
						orderlistService.insertOrderlist(reqBodyMap);
						// 회원 cart delete
						cartService.deleteCart(reqBodyMap);
						responseBodyMap.put("rsltCode", "0000");
						responseBodyMap.put("rsltMsg", "Success & Delete CartList");
					} else {
						responseBodyMap.put("rsltCode", "2003");
						responseBodyMap.put("rsltMsg", "Order Fail");
					}
				} else {
					responseBodyMap.put("rsltCode", "2003");
					responseBodyMap.put("rsltMsg", "Payment Fail");
				}
			} else {
				responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Cart is empty");
			}
		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// 결제 합계 (년도)
	@RequestMapping(method = RequestMethod.POST, value = "/api/payment/yearSum")
	public ModelAndView paymentYearSum(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());

		String sum = paymentService.selectYearPayment(reqBodyMap);
		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			if (!StringUtils.isEmpty(sum)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("yearPaymentSum", sum);
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

	// 결제 합계 (월별) 매출 그래프 
	@RequestMapping(method = RequestMethod.POST, value = "/api/payment/monthSum")
	public ModelAndView paymentMonthSum(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());

		List<Map<String, Object>> paymentList = new ArrayList<Map<String, Object>>();
		List<PaymentDTO> monthList = paymentService.selectMonthSum(reqBodyMap);
		String monthSum = "0";
		for (int i = 1; i <= 12; i++) {
			String j = null;
			if(i < 10){
				j = "0"+ Integer.toString(i);
			}else {
				j = Integer.toString(i);
			}
			for( PaymentDTO dto : monthList ) {
				System.out.println(i);
				if(dto.getMonth() != null && j.equals(dto.getMonth())) {
					monthSum = dto.getMonthSum();
					break;
				}
			}
			Map<String, Object> map = new HashMap<String, Object>();
			//map.put("month", monthList.get(i).getMonth());
			map.put("monthSum", monthSum);
			paymentList.add(map);
			
		}

		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			if (!StringUtils.isEmpty(paymentList)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("monthList", paymentList);
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

	// 결제 합계 (일)
	@RequestMapping(method = RequestMethod.POST, value = "/api/payment/daySum")
	public ModelAndView paymentDaySum(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		// String year = reqBodyMap.get("paymentDate").toString();
		String sum = paymentService.selectDaySum(reqBodyMap);
		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			if (!StringUtils.isEmpty(sum)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("dayPaymentSum", sum);
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

	// 결제 리스트 (특정날짜)
	@RequestMapping(method = RequestMethod.POST, value = "/api/payment/dateList")
	public ModelAndView paymentList(HttpSession session, HttpServletRequest request) {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		List<Map<String, Object>> paymentList = new ArrayList<Map<String, Object>>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		String storeNum = storeService.getStoreNumById(authInfo.getLoginId());
		reqBodyMap.put("storeNum", storeNum);
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			List<PaymentDTO> list = paymentService.selectDayPaymentList(reqBodyMap);
			logger.info("======================= responseBodyMap : {}", list.size());
			for (int i = 0; i < list.size(); i++) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("orderNum", list.get(i).getOrderNum());
				map.put("paymentDate", list.get(i).getPaymentDate());
				map.put("paymentKind", list.get(i).getPaymentKind());
				map.put("paymentPrice", list.get(i).getPaymentPrice());

				paymentList.add(map);
			}
			logger.info("======================= paymentList : {}", paymentList.toString());

			if (!StringUtils.isEmpty(list)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("list", paymentList);
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
}
