import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

  parentListFilter: string;
  pageTitle = 'Product List';
  showImage = false;
  includDetail:boolean = true;

  imageWidth = 50;
  imageMargin = 2;
  errorMessage = ''

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productService: ProductService) { }

  ngAfterViewInit(): void {
    this.parentListFilter = this.filterComponent.listFilter;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.performFilter(this.parentListFilter);

      },
      error: err => this.errorMessage = err
    });
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }


  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(product =>
        product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredProducts = this.products;
    }
  }
}
