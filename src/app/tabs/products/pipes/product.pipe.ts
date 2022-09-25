import { Pipe, PipeTransform } from '@angular/core';
import { ProductModule } from '../models/product-module';

@Pipe({
  name: 'productPipe'
})
export class ProductPipe implements PipeTransform {

  transform(value: ProductModule[], filterText: string): ProductModule[] {
    if(filterText !== null && filterText !== undefined && filterText !== ''){
      return value.filter(c=>c.name.toLowerCase().indexOf(filterText.toLowerCase())!==-1);
    }

    return value;
  }

}
