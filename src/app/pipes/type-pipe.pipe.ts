import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typePipe'
})
export class TypePipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    const values = [
      { key: 'O', value: 'Abierta' },
      { key: 'C', value: 'Cerrada' },
      { key: 'P', value: 'Pendiente' },
      { key: 'B', value: 'Comprado' },
      { key: 'NC', value: 'No Comprado' },
      { key: 'N', value: 'No Comprado' },
      { key: 'D', value: 'Diaria' },
      { key: 'S', value: 'Especial' }
    ]
    
    for(let i = 0; i < values.length; i++){
      if(values[i].key == value){
        return values[i].value;
      }
    }

    return null;
  }

}
