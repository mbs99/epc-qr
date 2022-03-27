import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpcDataComponent } from './epc-data/epc-data.component';
import { QrcodeComponent } from './qrcode/qrcode.component';

const routes: Routes = [
  {
    path: 'qrcode',
    component: QrcodeComponent,
  },
  {
    path: 'data',
    component: EpcDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
