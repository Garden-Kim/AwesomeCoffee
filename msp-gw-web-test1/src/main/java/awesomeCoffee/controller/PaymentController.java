package awesomeCoffee.controller;

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
import awesomeCoffee.service.CartService;
import awesomeCoffee.service.MemberOrderService;
import awesomeCoffee.service.MemberService;
import awesomeCoffee.service.OrderlistService;
import awesomeCoffee.service.PaymentService;
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
				orderlistService.insertOrderlist(reqBodyMap);
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
		// String year = reqBodyMap.get("paymentDate").toString();
		String sum = paymentService.selectYearPayment(reqBodyMap);
		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			if (!StringUtils.isEmpty(sum)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("yearSum", sum);
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
