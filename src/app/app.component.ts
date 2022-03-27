import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { EpcDto } from './dto/epc.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'epc';

  epcData?: EpcDto;

  onEpcDataEvent(epcDto: EpcDto) {
    this.epcData = epcDto;
  }
}
