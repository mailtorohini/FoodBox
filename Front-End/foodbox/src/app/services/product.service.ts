import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/cuisines';

  private newURL = "http://localhost:8080/api/v1/products";

  getListURL:string = null;

  constructor(private httpClient: HttpClient) { }

  updateProduct(id: number, product: Product): Observable<Object>{
    return this.httpClient.put(`${this.newURL}/${id}`, product);
  }

  addProduct(product: Product): Observable<Object>{
    return this.httpClient.post(`${this.newURL}`, product);
  }

  deleteProduct(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.newURL}/${id}`);
  }

  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductCuisine(theProductId: number): Observable<ProductCategory> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}/cuisine`;

    return this.httpClient.get<ProductCategory>(productUrl);
  }

  getProductListPaginate(thePage: number, 
                         thePageSize: number, 
                         theCategoryId: number,
                         sortingMethod: string): Observable<GetResponseProducts> {
    
     
    if(sortingMethod == "First Created"){
        // need to build URL based on category id, page and size 
      this.getListURL = `${this.baseUrl}/search/findByCuisine?cuisine=${theCategoryId}`
        + `&page=${thePage}&size=${thePageSize}`;
    }
    else if(sortingMethod == "Last Created"){
      this.getListURL = `${this.baseUrl}/search/findByCuisineOrderByDateCreatedDesc?cuisine=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;
    }

    else{
      this.getListURL = `${this.baseUrl}/search/findByCuisineOrderByNameAsc?cuisine=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`;
    }



    return this.httpClient.get<GetResponseProducts>(this.getListURL);
  }

  getAllProductListPaginate(thePage: number, 
    thePageSize: number, 
    theCategoryId: number,
    sortingMethod: string): Observable<GetResponseProducts> {

      if(sortingMethod == "First Created"){
        // need to build URL based on category id, page and size 
      this.getListURL = `${this.baseUrl}`;
    }
    else if(sortingMethod == "Last Created"){
      this.getListURL = `${this.baseUrl}/search/findAllByOrderByDateCreatedDesc?page=${thePage}&size=${thePageSize}`;
    }

    else{
      this.getListURL = `${this.baseUrl}/search/findAllByOrderByNameAsc?page=${thePage}&size=${thePageSize}`;
    }

    return this.httpClient.get<GetResponseProducts>(this.getListURL);
}


  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {

    // need to build URL based on the keyword 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }


  searchProductsPaginate(thePage: number, 
                        thePageSize: number, 
                        theKeyword: string): Observable<GetResponseProducts> {

    // need to build URL based on keyword, page and size 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }



  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.cuisines)
    );
  }

 


}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    cuisines: ProductCategory[];
  }
}