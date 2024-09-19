import { NgModule } from '@angular/core';
import { NumberFormatPipe } from 'src/app/demo/pipes/number-format.pipe';


@NgModule({
  declarations: [NumberFormatPipe],
  exports: [NumberFormatPipe]
})
export class ApplicationPipesModule { }
