import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  categories: string[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  isSidebarOpen = false;
 
slides = [
  {
    title: "iPhone 14 Series",
    description: "Up to 10% off Voucher",
    image: "WhatsApp Image 2025-02-28 at 5.00.24 PM.jpeg",
    link: "#"
  },
  {
    title: "Gaming Accessories",
    description: "Save up to 30%",
    image: "WhatsApp Image 2025-02-28 at 5.00.24 PM.jpeg",
    link: "#"
  },
  {
    title: "Smart Home Devices",
    description: "Best Deals Today",
    image: "WhatsApp Image 2025-02-28 at 5.00.24 PM.jpeg",
    link: "#"
  }
];

currentSlideIndex = 0;

constructor(
  private sharedService: SharedService,
  private router: Router, private globalService: GlobalService) {
  setInterval(() => {
    this.nextSlide();
  }, 5000);
}

ngOnInit() {
  this.globalService.getPosts().subscribe((res: any) => {
    this.products = res.products;
    this.categories = [...new Set(this.products.map((p: any) => p.category))];
  });
}
filterByCategory(category: string) {
  this.filteredProducts = this.products.filter(p => p.category === category);
}


navigateToFilteredProducts(category: string) {
  this.isSidebarOpen = false;
  this.router.navigate(['/all-products'], { queryParams: { category } });
}

nextSlide() {
  this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
}
goToSlide(index: number) {
  this.currentSlideIndex = index;
}
}
