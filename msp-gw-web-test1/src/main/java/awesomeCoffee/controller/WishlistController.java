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
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import awesomeCoffee.dto.AuthInfo;
import awesomeCoffee.dto.MenuDTO;
import awesomeCoffee.dto.WishlistDTO;
import awesomeCoffee.service.MemberService;
import awesomeCoffee.service.MenuService;
import awesomeCoffee.service.WishlistService;
import kr.msp.constant.Const;

@Controller
public class WishlistController {
	private Logger logger = LoggerFactory.getLogger(WishlistController.class);
	@Autowired
	private WishlistService wishlistService;
	@Autowired
	private MemberService memberService;
	@Autowired
	private MenuService menuService;
	
	// 관심상품 update (insert/delete)
	@RequestMapping(method = RequestMethod.POST, value ="/api/wishlist/update")
	public ModelAndView wishlistUpdate (HttpServletRequest request, HttpSession session) {
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
			int result = wishlistService.updateWishlist(reqBodyMap);
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
	// 관심상품 read
	@RequestMapping(method = RequestMethod.POST, value="/api/wishlist/list")
	public ModelAndView WishList( HttpSession session, HttpServletRequest request) {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		List<Map<String, Object>> wishlist = new ArrayList<Map<String, Object>>();
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
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
			List<WishlistDTO> list = wishlistService.selectAllWishlist(memberNum);
			logger.info("======================= responseBodyMap : {}", list.size());
			for (int i =0; i<list.size() ; i++) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("goodsName", list.get(i).getGoodsName());
				map.put("goodsPrice", list.get(i).getGoodsPrice());
				map.put("goodsImage", list.get(i).getGoodsImage());
				map.put("memberNum", list.get(i).getMemberNum());
				map.put("goodsNum", list.get(i).getGoodsNum());
				map.put("wishlistDate", list.get(i).getWishlistDate());

				wishlist.add(map);
			}
			logger.info("======================= wishlist : {}" , wishlist.toString());
						
			if (!StringUtils.isEmpty(wishlist)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("list",wishlist);
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
