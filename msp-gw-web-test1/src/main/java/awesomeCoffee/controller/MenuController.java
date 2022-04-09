package awesomeCoffee.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import awesomeCoffee.dto.AuthInfo;
import awesomeCoffee.dto.MenuCategoryDTO;
import awesomeCoffee.dto.MenuDTO;
import awesomeCoffee.service.MenuService;
import kr.msp.constant.Const;

@Controller
public class MenuController {
	private Logger logger = LoggerFactory.getLogger(MenuController.class);

	@Autowired(required = true)
	private MenuService menuService;

	// 메뉴 삭제
	// 이미지 수정시 file삭제 해야하는것처럼 삭제시에도 upload한 파일 삭제,,
	@RequestMapping (method = RequestMethod.POST, value="/api/menu/delete")
	public ModelAndView deleteMenu(HttpServletRequest request, HttpSession session) {
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
			int result = menuService.deleteMenu(reqBodyMap);
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
	// 메뉴 수정 
	@RequestMapping(method = RequestMethod.POST, value = "/api/menu/update")
	public @ResponseBody Map<String, Object> menuUpdate(MultipartHttpServletRequest request, HttpSession session) {
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = new HashMap<String, Object>();
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		
		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		reqBodyMap.put("goodsNum", request.getParameter("goodsNum"));
		reqBodyMap.put("goodsName", request.getParameter("goodsName"));
		reqBodyMap.put("goodsPrice", request.getParameter("goodsPrice"));
		reqBodyMap.put("goodsContent", request.getParameter("goodsContent"));
		reqBodyMap.put("goodsKal", request.getParameter("goodsKal"));
		reqBodyMap.put("categoryNum", request.getParameter("categoryNum"));

		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			int result = menuService.updateMenu(reqBodyMap);
			
			if (result > 0) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
			} else {
				responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Data not found.");
			}
		}
		return responseBodyMap;
	}
	// 메뉴 수정 (파일 업로드 포함)
	@RequestMapping(method = RequestMethod.POST, value = "/api/menu/updateFile")
	public @ResponseBody Map<String, Object> menuUpdateFile(MultipartHttpServletRequest request, HttpSession session) {
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = new HashMap<String, Object>();
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		
		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		reqBodyMap.put("goodsNum", request.getParameter("goodsNum"));
		reqBodyMap.put("goodsName", request.getParameter("goodsName"));
		reqBodyMap.put("goodsPrice", request.getParameter("goodsPrice"));
		reqBodyMap.put("goodsContent", request.getParameter("goodsContent"));
		reqBodyMap.put("goodsKal", request.getParameter("goodsKal"));
		reqBodyMap.put("categoryNum", request.getParameter("categoryNum"));

		MultipartFile menuImage = request.getFile("goodsImage");
		
		String fileDir = "/view/goods/upload";
		String filePath = request.getSession().getServletContext().getRealPath(fileDir);
		System.out.println(filePath);
		
		String originalFile = menuImage.getOriginalFilename();
		
		//.png
		String extension = originalFile.substring(originalFile.lastIndexOf("."));
		
		// 7b2582aca35e4525b4a579d84e8b6c9d
		// 중복 방지
		String storeName = UUID.randomUUID().toString().replace("-", "");
		String storeFileName=storeName + extension;
		File file = new File(filePath + "/" + storeFileName);
		try {
			menuImage.transferTo(file); // 파일을 저장
		}catch(Exception e) {e.printStackTrace();}
		reqBodyMap.put("originalFile", originalFile);
		reqBodyMap.put("goodsImage", storeFileName);
		
		System.out.println("========== 이미지이름 : " + reqBodyMap.get("goodsImage"));		
		
		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			int result = menuService.updateFileMenu(reqBodyMap);
			
			if (result > 0) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
			} else {
				responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Data not found.");
			}
		}
		return responseBodyMap;
	}
	// 메뉴 리스트 (카테고리별)
	@RequestMapping(method = RequestMethod.POST , value="/api/category/menuList")
	public ModelAndView menuCategoryList (HttpServletRequest request, HttpSession session) {
		Map<String, Object> reqBodyMap = (Map<String, Object>) request.getAttribute(Const.BODY);
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		List<Map<String, Object>> menuList = new ArrayList<Map<String, Object>>();

		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			List<MenuDTO> dto = menuService.selectCategoryMenu(reqBodyMap);
			for (int i =0; i<dto.size() ; i++) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("goodsNum", dto.get(i).getGoodsNum());
				map.put("goodsName", dto.get(i).getGoodsName());
				map.put("goodsPrice", dto.get(i).getGoodsPrice());
				map.put("goodsContent", dto.get(i).getGoodsContent());
				map.put("goodsImage", dto.get(i).getGoodsImage());
				map.put("goodsKal ", dto.get(i).getGoodsKal());
				map.put("categoryNum", dto.get(i).getCategoryNum());
				map.put("storeNum", dto.get(i).getStoreNum());

				menuList.add(map);
			}
			logger.info("======================= categoryList : {}" , dto.toString());
						
			if (!StringUtils.isEmpty(dto)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("list",menuList);
			} else { 
				responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Data not found.");
			}
		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}
	// 메뉴 리스트
	@RequestMapping(method = RequestMethod.POST, value="/api/menu/list")
	public ModelAndView menuList( HttpSession session) {
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();
		List<Map<String, Object>> menuList = new ArrayList<Map<String, Object>>();

		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			List<MenuDTO> dto = menuService.selectAllMenu();
			
			for (int i =0; i<dto.size() ; i++) {
				Map<String , Object> map = new HashMap<String, Object>();
				map.put("goodsNum", dto.get(i).getGoodsNum());
				map.put("goodsName", dto.get(i).getGoodsName());
				map.put("goodsPrice", dto.get(i).getGoodsPrice());
				map.put("goodsContent", dto.get(i).getGoodsContent());
				map.put("goodsImage", dto.get(i).getGoodsImage());
				map.put("goodsKal ", dto.get(i).getGoodsKal());
				map.put("categoryNum", dto.get(i).getCategoryNum());
				map.put("storeNum", dto.get(i).getStoreNum());

				menuList.add(map);
			}
			logger.info("======================= categoryList : {}" , dto.toString());
						
			if (!StringUtils.isEmpty(dto)) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
				responseBodyMap.put("list",menuList);
			} else { 
				responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Data not found.");
			}
		}
		ModelAndView mv = new ModelAndView("defaultJsonView");
		mv.addObject(Const.BODY, responseBodyMap);

		return mv;
	}

	// 메뉴 등록
	@RequestMapping(method = RequestMethod.POST, value = "/api/menu/regist")
	public @ResponseBody Map<String, Object> menuRegist(MultipartHttpServletRequest request, HttpSession session) {
		Map<String, Object> reqHeadMap = (Map<String, Object>) request.getAttribute(Const.HEAD);
		Map<String, Object> reqBodyMap = new HashMap<String, Object>();
		Map<String, Object> responseBodyMap = new HashMap<String, Object>();

		if (reqHeadMap == null) {
			reqHeadMap = new HashMap<String, Object>();
		}
		reqHeadMap.put(Const.RESULT_CODE, Const.OK);
		reqHeadMap.put(Const.RESULT_MESSAGE, Const.SUCCESS);

		reqBodyMap.put("goodsName", request.getParameter("goodsName"));
		reqBodyMap.put("goodsPrice", request.getParameter("goodsPrice"));
		reqBodyMap.put("goodsContent", request.getParameter("goodsContent"));
		reqBodyMap.put("goodsKal", request.getParameter("goodsKal"));
		reqBodyMap.put("categoryNum", request.getParameter("categoryNum"));

		MultipartFile menuImage = request.getFile("goodsImage");
		
		String fileDir = "/view/goods/upload";
		String filePath = request.getSession().getServletContext().getRealPath(fileDir);
		System.out.println(filePath);
		
		String originalFile = menuImage.getOriginalFilename();
		
		//.png
		String extension = originalFile.substring(originalFile.lastIndexOf("."));
		
		// 7b2582aca35e4525b4a579d84e8b6c9d
		// 중복 방지
		String storeName = UUID.randomUUID().toString().replace("-", "");
		
		String storeFileName=storeName + extension;
		
		File file = new File(filePath + "/" + storeFileName);
		try {
			menuImage.transferTo(file); // 파일을 저장
		}catch(Exception e) {e.printStackTrace();}
		reqBodyMap.put("originalFile", originalFile);
		reqBodyMap.put("goodsImage", storeFileName);
		
		System.out.println("========== 이미지이름 : " + reqBodyMap.get("goodsImage"));		
		
		AuthInfo authInfo = (AuthInfo) session.getAttribute("authInfo");
		if (StringUtils.isEmpty(authInfo)) {
			responseBodyMap.put("rsltCode", "1003");
			responseBodyMap.put("rsltMsg", "Login required.");
		} else {
			
			int result = menuService.insertMenu(reqBodyMap);
			
			if (result > 0) {
				responseBodyMap.put("rsltCode", "0000");
				responseBodyMap.put("rsltMsg", "Success");
			} else {
				responseBodyMap.put("rsltCode", "2003");
				responseBodyMap.put("rsltMsg", "Data not found.");
			}
		}
		return responseBodyMap;
	}
}
