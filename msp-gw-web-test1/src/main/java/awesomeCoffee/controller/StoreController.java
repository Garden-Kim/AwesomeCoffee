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
import awesomeCoffee.dto.StoreDTO;
import awesomeCoffee.service.StoreService;
import kr.msp.constant.Const;

@Controller
public class StoreController {

	private Logger logger = LoggerFactory.getLogger(StoreController.class);

	@Autowired
	StoreService storeService;

	
	// 매장상태 수정
		@RequestMapping(method = RequestMethod.POST, value = "/api/store/state")
		public ModelAndView updateStoreState(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

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
			if (!StringUtils.isEmpty(authInfo.getLoginId())) {
				if (!authInfo.getLoginId().equals(reqBodyMap.get("storeId"))) {
					responseBodyMap.put("rsltCode", "1011");
					responseBodyMap.put("rsltMsg", "No permisson.");
				} else {
					int result = storeService.updateState(reqBodyMap);
					if (result > 0) {
						responseBodyMap.put("rsltCode", "0000");
						responseBodyMap.put("rsltMsg", "Success");
					} else {
						responseBodyMap.put("rsltCode", "2003");
						responseBodyMap.put("rsltMsg", "Data not found.");
					}
				}
			} else {
				responseBodyMap.put("rsltCode", "1003");
				responseBodyMap.put("rsltMsg", "Login required.");
			}
			ModelAndView mv = new ModelAndView("defaultJsonView");
			mv.addObject(Const.HEAD, reqHeadMap);
			mv.addObject(Const.BODY, responseBodyMap);

			return mv;
		}
	// 매장정보 수정
	@RequestMapping(method = RequestMethod.POST, value = "/api/store/update")
	public ModelAndView updateStore(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

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
		if (!StringUtils.isEmpty(authInfo.getLoginId())) {
			if (!authInfo.getLoginId().equals(reqBodyMap.get("storeId"))) {
				responseBodyMap.put("rsltCode", "1011");
				responseBodyMap.put("rsltMsg", "No permisson.");
			} else {
				int result = storeService.updateStore(reqBodyMap);
				if (result > 0) {
					responseBodyMap.put("rsltCode", "0000");
					responseBodyMap.put("rsltMsg", "Success");
				} else {
					responseBodyMap.put("rsltCode", "2003");
					responseBodyMap.put("rsltMsg", "Data not found.");
				}
			}
		} else {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// 매장삭제
	@RequestMapping(method = RequestMethod.POST, value = "/api/store/delete")
	public ModelAndView deleteStore(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

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
		if (StringUtils.isEmpty(authInfo.getLoginId())) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			if (!authInfo.getLoginId().equals(reqBodyMap.get("storeId"))) {
				responseBodyMap.put("rsltCode", "1011");
				responseBodyMap.put("rsltMsg", "No permission.");
			} else {
				int result = storeService.deleteStore(reqBodyMap);

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

	// 매장리스트_기맹ver
	@RequestMapping(method = RequestMethod.POST, value = "/api/store/list")
	public ModelAndView storeList() {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		List<Map<String, Object>> storeList = new ArrayList<Map<String, Object>>();

		List<StoreDTO> info = storeService.storeList();
		if (StringUtils.isEmpty(info)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			List<StoreDTO> storeInfo = storeService.storeList();
			logger.info("======================= responseBodyMap : {}", storeInfo.size());

			for (int i = 0; i < storeInfo.size(); i++) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("storeNum", storeInfo.get(i).getStoreNum());
				map.put("storeName", storeInfo.get(i).getStoreName());
				map.put("storeAddr", storeInfo.get(i).getStoreAddr());
				map.put("storePhone", storeInfo.get(i).getStorePhone());
				map.put("state", storeInfo.get(i).getState());

				storeList.add(map);
			}
			logger.info("======================= categoryList : {}", storeInfo.toString());

			if (!StringUtils.isEmpty(storeInfo)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("list", storeList);
			} else {
				responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Data not found.");
			}
		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}


	// 매장조회
	@RequestMapping(method = RequestMethod.POST, value = "/api/store/info")
	public ModelAndView getStoreInfo(HttpServletRequest request, HttpServletResponse response, HttpSession session) {

		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());
		StoreDTO info = storeService.getStoreInfoByName(reqBodyMap);

		if (!StringUtils.isEmpty(info)) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
			responseBodyMap.put("storeNm", info.getStoreName());
			responseBodyMap.put("storeAddr", info.getStoreAddr());
			responseBodyMap.put("storePhone", info.getStorePhone());
			responseBodyMap.put("state", info.getState());
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}

		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// 매장 등록
	@RequestMapping(method = RequestMethod.POST, value = "/api/store/regist")
	public ModelAndView regiStore(HttpServletRequest request, HttpServletResponse response) {

		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}

		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		logger.info("======================= reqBodyMap : {}", reqBodyMap.toString());

		int result = storeService.insertStore(reqBodyMap);

		if (result > 0) {
			responseBodyMap.put("rsltCode", "0000");
			responseBodyMap.put("rsltMsg", "Success");
		} else {
			responseBodyMap.put("rsltCode", "2003");
			responseBodyMap.put("rsltMsg", "Data not found.");
		}

		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.HEAD, reqHeadMap);
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

}