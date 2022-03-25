import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Epc, EpcEncoding, EpcVersion } from './epc';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css'],
})
export class QrcodeComponent implements OnInit {
  @ViewChild('qr', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('qrCodeSvg', { static: true })
  svgElement!: ElementRef<HTMLElement>;

  constructor() {}

  ngOnInit(): void {}

  async createEpc(): Promise<void> {
    const canvas2d = this.canvas?.nativeElement.getContext('2d');

    /*
    const qrcode = Epc.Builder()
      .withVersion(EpcVersion.V2)
      .withAmount(35.55)
      .withEncoding(EpcEncoding.UTF8)
      .withBic('')
      .withIban('DE52500105170477004907')
      .withName('Hugo')
      .withReference('test')
      .build()
      .render(canvas2d!);
      */

    const qrcode2 = Epc.Builder()
      .withVersion(EpcVersion.V2)
      .withAmount(35.55)
      .withEncoding(EpcEncoding.UTF8)
      .withBic('')
      .withIban('DE52500105170477004907')
      .withName('Hugo')
      .withReference('test')
      .build()
      .createSvgTag(true);

    this.svgElement.nativeElement.innerHTML = qrcode2;

    /*
    var svgData = this.svgElement.nativeElement.outerHTML;
    var svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'newesttree.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    */

    const base64svg = window.btoa(
      new XMLSerializer().serializeToString(this.svgElement.nativeElement)
    );
    const dataUrl = `data:image/svg+xml;base64,${base64svg}`;

    const image = new Image();
    image.crossOrigin = 'anonymous';

    const w = 100;
    const h = 100;

    image.onload = () => {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = w;
      tempCanvas.height = h;
      const tempContext = tempCanvas.getContext('2d');
      tempContext?.drawImage(image, 0, 0, w, h);
    };
    image.src = dataUrl;
  }

  test() {
    window.alert('test');
  }
}
