package awesomeCoffee.controller;

import java.util.HashMap;
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
import awesomeCoffee.service.MemberService;
import awesomeCoffee.service.PaymentService;
import kr.msp.constant.Const;

@Controller
public class PaymentController {
	private Logger logger = LoggerFactory.getLogger(PaymentController.class);
	@Autowired(required = true)
	private PaymentService paymentService;
	@Autowired
	private MemberService memberService;

	// 결제 insert
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
			
			int result = paymentService.paymentInsert(reqBodyMap);

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
