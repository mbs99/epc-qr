import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrcodeComponent } from './qrcode/qrcode.component';

const routes: Routes = [
  {
    path: 'qrcode',
    component: QrcodeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
