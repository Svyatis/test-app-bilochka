import { CartItem } from 'ng-shopping-cart';

export class ProductsCartItem extends CartItem {
  public identifier: string;
  public label: string;
  public cost: number;
  public amount: number;
  public description: string;
  public country: string;
  public photo: string;
  public weight: number;

  constructor(itemData: any = {}) {
    super();
    const { identifier, label, cost, amount, description, country, photo, weight } = itemData;
    this.identifier = identifier || 0;
    this.label = label || '';
    this.cost = cost || 0;
    this.amount = amount || 1;
    this.description = description || '';
    this.country = country || '';
    this.photo = photo || '';
    this.weight = weight || '0100';
  }

  getId(): any {
    return this.identifier;
  }

  getName(): string {
    return this.label;
  }

  getPrice(): number {
    return this.cost;
  }

  getQuantity(): number {
    return this.amount;
  }

  setQuantity(quantity: number): void {
    this.amount = quantity;
  }

  getImage(): string {
    return this.photo;
  }

}

export class OrdersItem {
  public identifier: string;
  public email: string;
  public name: string;
  public phone: string;
  public totalCost: number;
  public date: string;

  constructor(itemData: any = {}) {
    const { identifier, label, cost, amount, description, country, photo, weight } = itemData;
    this.identifier = identifier || 0;
    this.email = label || '';
    this.name = cost || '';
    this.phone = amount || '';
    this.totalCost = description || 0;
    this.date = country || '';
  }
}
