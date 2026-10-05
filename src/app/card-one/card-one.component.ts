import { Component, Input } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-card-one',
  standalone: false,
  templateUrl: './card-one.component.html',
  styleUrls: ['./card-one.component.css']
})
export class CardOneComponent {
  @Input() product: any;
  wishlist: any[] = [];
  isInWishlist: boolean = false;
  isInCart: boolean = false;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.wishlistService.getWishlist().subscribe((data: any[]) => {
      this.wishlist = data;
      this.isInWishlist = this.wishlist.some(item => item.id === this.product?.id);
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    this.isInCart = true;
  }

  toggleWishlist() {
    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.product.id);
    } else {
      this.wishlistService.addToWishlist(this.product);
    }
  }


  @Input() discountFlag = false;
  @Input() new = false;
  @Input() iconone = true;
  @Input() icontwo = true;
  @Input() iconthree = false;
  @Input() delprice = true;
  @Input() stars = true;
}
