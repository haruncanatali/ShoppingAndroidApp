import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { BasketModule } from '../baskets/models/basket-model';
import { BasketServiceService } from '../baskets/services/basket-service.service';
import { ProductModule } from './models/product-module';
import { ErrorService } from './services/error.service';
import { ProductServiceService } from './services/product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit,AfterContentChecked {
  products : ProductModule[] = []
  filterTxt : string;
  quantity : number = 0;
  loading : any;
  isLoading = false;
  
  constructor(
    private productServis:ProductServiceService,
    private errorServis:ErrorService,
    private basketServis:BasketServiceService,
    private loadingController:LoadingController,
    private menu:MenuController
    ) { }
  ngAfterContentChecked(): void {
    this.products = this.productServis.getList()
  }

  ngOnInit() {
    this.getListFakeSpinner()
    this.products = this.productServis.getList()
  }

  getListFakeSpinner(){
    this.presentLoading(1500)
    this.isLoading = false
    this.dissmissLoading()
  }

  arttir(p:ProductModule){
    const _quantity : number = Number(document.getElementById('name-'+p.id).innerHTML.toString());
    if(_quantity<p.inventoryQuantity){
      document.getElementById('name-'+p.id).innerHTML = (+_quantity+1).toString()
    }
    else{
      this.errorServis.errorHandlerTxt('Stok adetini aşamassınız');
    }
  }

  azalt(p:ProductModule){
    const _quantity : number = Number(document.getElementById('name-'+p.id).innerHTML.toString());

    if(_quantity > 0){
      document.getElementById('name-'+p.id).innerHTML = (_quantity-1).toString();
    }
    else{
      this.errorServis.errorHandlerTxt("Sipariş adeti negatif değer olamaz.");
    }
  }

  addToBasket(product:ProductModule){
    if(product.inventoryQuantity > 0){
      const basketModule : BasketModule = new BasketModule();

      basketModule.id = this.listedenUniqueIdOlustur();
      basketModule.product = product;
      basketModule.productId = product.id;
      basketModule.quantity = (+(document.getElementById('name-'+product.id).innerHTML))

      if(basketModule.quantity === 0){
        this.errorServis.errorHandlerTxt('Eklenecek ürün sayısı 0 olamaz!');
        return;
      }

      this.presentLoading(500)
      this.basketServis.addBasket(basketModule)
      this.productServis.stokDurumuAyarlaEksiltim(basketModule)
      this.sepeteEklemedenSonraMiktarSifirla(document.getElementById('name-'+product.id))
      this.isLoading = false
      this.dissmissLoading()
      this.errorServis.errorHandlerTxt('Ürün başarıyla sepete eklendi.');
    }
    else{
      this.errorServis.errorHandlerTxt('Stok yok!');
    }
  }

  listedenUniqueIdOlustur():number{
    var kontrol = false
    var rnd = 1
    var liste = this.basketServis.fakeBasket

    while(kontrol === false){
      rnd = Math.random()
      liste.forEach(elem=>{
        if(elem.id === rnd){
          kontrol = true;
        }
      })

      if(kontrol){
        kontrol = false
      }
      else{
        break;
      }
    }

    return rnd
  }

  sepeteEklemedenSonraMiktarSifirla(element:HTMLElement){
    element.innerText = "0"
  }

  async presentLoading(_duration:number){
    this.isLoading = true
    this.loading = await this.loadingController.create({
      cssClass:'my-custom-class',
      message : 'Lütfen bekleyin ...',
      duration : _duration
    }).then(a=>{
      a.present().then(()=>{
        if(!this.isLoading){
          a.dismiss()
        }
      });
    });
    await this.loading.present();
    this.dissmissLoading()
  }

  async dissmissLoading(){
    this.isLoading = false
    return await this.loading.dismiss();
  }

  openFirst(){
    this.menu.enable(true,'first')
    this.menu.open('first')
  }
  

}
