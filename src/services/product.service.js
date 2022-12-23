import http from "./http-common";

class productDataService {
    
  getSliderData() {
    return http.get("/api/ClientSide/GetGroup?GroupProductType=FrontPageSlider");
  }

  getNewArrivalData() {
    return http.get("/api/ClientSide/GetCurrentGroupProducts?GroupProductType=NewArrivals");
  }

  getDiscountedProducts() {
    return http.get("/api/ClientSide/GetCurrentGroupProducts?GroupProductType=Discount");
  }

  getProductList(start,end) {
    return http.get(`/api/ClientSide/GetProducts?start=`+`${start}`+`&end=`+`${end}`);
  }

}
export default new productDataService();