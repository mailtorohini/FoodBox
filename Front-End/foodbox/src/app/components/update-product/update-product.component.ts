import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Router} from "@angular/router"
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategory } from 'src/app/common/product-category';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: Product = new Product();
  cuisine: ProductCategory = new ProductCategory(); 
  id: number = 0;
  productCuisines: ProductCategory[];
   
  constructor(private loginService: LoginService,
    private productService: ProductService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.listProductCategories()
    this.handleProductDetails()
    
  }


  
  handleProductDetails() {

    // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
         
      }
    )
 
  }


  updateProduct(){
    console.log(this.product.cuisine)
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    this.productService.updateProduct(theProductId, this.product).subscribe( data =>{
      console.log(data)
    }
    , error => console.log(error));
  //window.location.replace('/products');
  }

  listProductCategories() {
    
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('Product Categories=' + JSON.stringify(data));
        this.productCuisines = data;
      }
    );
  }

}
