package awesomeCoffee.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
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
import awesomeCoffee.service.CartService;
import awesomeCoffee.service.MemberService;
import kr.msp.constant.Const;

@Controller
public class CartController {
	private Logger logger = LoggerFactory.getLogger(CartController.class);
	@Autowired
	private CartService cartService;
	@Autowired
	private MemberService memberService;

	// 장바구니 create
	@RequestMapping(method = RequestMethod.POST, value = "/api/cart/regist")
	public ModelAndView wishlistInsert(HttpServletRequest request, HttpSession session) {
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
			int result = 0;
			String memberNum = memberService.getMemberNum(authInfo.getLoginId());
			reqBodyMap.put("memberNum", memberNum);
			List<CartDTO> list = cartService.selectAllCart(memberNum);
			if (list.isEmpty()) {
				result = cartService.insertCart(reqBodyMap);
				if (result > 0) {
					responseBodyMap.put("rsltCode", "0000");
					responseBodyMap.put("rsltMsg", "Success");
				} else {
					responseBodyMap.put("rsltCode", "2003");
					responseBodyMap.put("rsltMsg", "Data not found.");
				}
			}else {
				for (int i=0; i<list.size(); i++) {
					if (list.get(i).getGoodsNum().equals(reqBodyMap.get("goodsNum"))) {
						result = cartService.updateCart(reqBodyMap);
					}else {
						result = cartService.insertCart(reqBodyMap);
					}
				}
				if (result > 0) {
					responseBodyMap.put("rsltCode", "0000");
					responseBodyMap.put("rsltMsg", "Success");
				} else {
					responseBodyMap.put("rsltCode", "2003");
					responseBodyMap.put("rsltMsg", "Data not found.");
				}
			}
			
			
		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// 장바구니 read
	@RequestMapping(method = RequestMethod.POST, value = "/api/cart/list")
	public ModelAndView cartList(HttpSession session) {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		List<Map<String, Object>> cartList = new ArrayList<Map<String, Object>>();

		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			String memberNum = memberService.getMemberNum(authInfo.getLoginId());
			List<CartDTO> list = cartService.selectAllCart(memberNum);
			logger.info("======================= responseBodyMap : {}", list.size());

			for (int i = 0; i < list.size(); i++) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("memberNum", list.get(i).getMemberNum());
				map.put("goodsNum", list.get(i).getGoodsNum());
				map.put("qty", list.get(i).getQty());

				cartList.add(map);
			}
			logger.info("======================= wishlist : {}", cartList.toString());

			if (!StringUtils.isEmpty(list)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("list", cartList);
			} else {
				responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Data not found.");
			}
		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// 장바구니 deleteOne
	@RequestMapping(method = RequestMethod.POST, value = "/api/cart/deleteOne")
	public ModelAndView cartDeleteOne(HttpServletRequest request, HttpSession session) {
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
			int result = cartService.deleteCartOne(reqBodyMap);
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

	// 장바구니 delete
	@RequestMapping(method = RequestMethod.POST, value = "/api/cart/delete")
	public ModelAndView cartDelete(HttpServletRequest request, HttpSession session) {
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
			int result = cartService.deleteCart(reqBodyMap);
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
