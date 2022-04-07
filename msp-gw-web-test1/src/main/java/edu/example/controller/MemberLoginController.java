//package edu.example.controller;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.servlet.http.HttpSession;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.servlet.ModelAndView;
//
//import edu.example.dto.LoginDTO;
//import edu.example.dto.MemberDto;
//import edu.example.service.MemberLoginService;
//import kr.msp.constant.Const;
//
//@Controller
//public class MemberLoginController {
//
//	private Logger logger = LoggerFactory.getLogger(MemberLoginController.class);
//	
//	@Autowired(required=true)
//	private MemberLoginService service;
//	
//	
//	// 로그아웃
//	@RequestMapping(method = RequestMethod.POST, value="/api/member/logout")
//	public ModelAndView logout(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
//		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
//		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
//		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
//
//		if (reqHeadMap == null) {
//			reqHeadMap = new HashMap<String, Object>();
//		}
//		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
//		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
//
//		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
//
//		LoginDTO loginDTO = service.logout(reqBodyMap);
//		
//		if (loginDTO != null) {
//			responseBodyMap.put("rsltCode", "0000");
//			responseBodyMap.put("rsltMsg", "Success");
//			session.invalidate();
//			
//		} else {
//			responseBodyMap.put("rsltCode", "2003");
//			responseBodyMap.put("rsltMsg", "Data not found.");
//		}
//		ModelAndView mv = new ModelAndView("defaultJsonView");
//		mv.addObject(Const.HEAD, reqHeadMap);
//		mv.addObject(Const.BODY, responseBodyMap);
//
//		return mv;
//	}
//	// 로그인
//	@RequestMapping(method = RequestMethod.POST, value = "/api/member/login2")
//	public ModelAndView login(HttpSession session, HttpServletRequest request, HttpServletResponse response) {
//		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
//		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
//		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
//
//		if (reqHeadMap == null) {
//			reqHeadMap = new HashMap<String, Object>();
//		}
//		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
//		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);
//
//		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
//
//		LoginDTO loginDTO = service.login(reqBodyMap);
//
//		if (loginDTO != null) {
//			responseBodyMap.put("rsltCode", "0000");
//			responseBodyMap.put("rsltMsg", "Success");
//			session.setAttribute("loginDTO", loginDTO);
//
//		} else {
//			responseBodyMap.put("rsltCode", "2003");
//			responseBodyMap.put("rsltMsg", "Data not found.");
//		}
//		ModelAndView mv = new ModelAndView("defaultJsonView");
//		mv.addObject(Const.HEAD, reqHeadMap);
//		mv.addObject(Const.BODY, responseBodyMap);
//
//		return mv;
//	}
//
//}
