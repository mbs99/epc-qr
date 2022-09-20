import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { EpcDto, EpcEncoding, EpcVersion } from '../dto/epc.dto';
import { Epc } from './epc';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css'],
})
export class QrcodeComponent implements OnChanges {
  @ViewChild('qr', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  @Input()
  ecpInputEvent?: EpcDto;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ecpInputEvent'] && changes['ecpInputEvent'].currentValue) {
      this.createEpc(changes['ecpInputEvent'].currentValue);
    }
  }

  private createEpc(epcDto: EpcDto): void {
    const canvas2d = this.canvas?.nativeElement.getContext('2d');

    Epc.Builder()
      .withVersion(epcDto?.version ? epcDto.version : EpcVersion.V2)
      .withAmount(epcDto.amount)
      .withEncoding(epcDto?.encoding ? epcDto.encoding : EpcEncoding.UTF8)
      .withBic(epcDto.bic)
      .withIban(epcDto.iban)
      .withName(epcDto.name)
      .withReference(epcDto.reference)
      .build()
      .render(canvas2d!);

    this.cropImageFromCanvas(canvas2d!);
  }

  private cropImageFromCanvas(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;
    let w = canvas.width;
    let h = canvas.height;
    const pixelsX: number[] = [];
    const pixelsY: number[] = [];
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let x: number, y: number, index: number;

    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        index = (y * w + x) * 4;
        if (!this.isWhite(imageData, index)) {
          pixelsX.push(x);
          pixelsY.push(y);
        }
      }
    }
    pixelsX.sort(function (a, b) {
      return a - b;
    });
    pixelsY.sort(function (a, b) {
      return a - b;
    });
    var n = pixelsX.length - 1;

    w = 1 + pixelsX[n] - pixelsX[0] + 5;
    h = 1 + pixelsY[n] - pixelsY[0] + 5;
    var cut = ctx.getImageData(pixelsX[0], pixelsY[0], w, h);

    canvas.width = w;
    canvas.height = h;
    ctx.putImageData(cut, 0, 0);

    const imageUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = 'qrcode.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  private isWhite(imageData: ImageData, index: number) {
    return (
      imageData.data[index] != 255 &&
      imageData.data[index + 1] != 255 &&
      imageData.data[index + 2] != 255
    );
  }
}
