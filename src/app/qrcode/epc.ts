import * as qrcode from 'qrcode-generator';

export enum EpcEncoding {
  UTF8 = '1',
  ISO_8859_1 = '2',
  ISO_8859_2 = '3',
  ISO_8859_4 = '4',
  ISO_8859_5 = '5',
  ISO_8859_7 = '6',
  ISO_8859_10 = '7',
  ISO_8859_15 = '8',
}

export enum EpcVersion {
  V1 = '001',
  V2 = '002',
}

export class Epc {
  private bcd = 'BCD';
  private sct = 'SCT';

  constructor(
    private bic: string,
    private name: string,
    private iban: string,
    private amount: number,
    private version: EpcVersion = EpcVersion.V2,
    private encoding: EpcEncoding = EpcEncoding.UTF8,
    private sepaPurposeCode?: string,
    private structuredCreditorReference?: string,
    private reference?: string,
    private notes?: string
  ) {}

  public static Builder() {
    return new EpcBuilder();
  }

  private createQrCodeContent(): string {
    const delim = '\n';
    const raw = [
      this.bcd,
      this.version,
      this.encoding,
      this.sct,
      this.bic,
      this.name,
      this.iban,
      `EUR${this.amount}`,
      this.sepaPurposeCode ? this.sepaPurposeCode : '',
      this.reference
        ? ''
        : this.structuredCreditorReference
        ? this.structuredCreditorReference
        : '',
      this.structuredCreditorReference
        ? ''
        : this.reference
        ? this.reference
        : '',
      this.notes ? this.notes : '',
    ].join(delim);

    return raw;
  }

  private createQrCode(): QRCode {
    const typeNumber = 4;
    const errorCorrectionLevel = 'L';
    const qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(this.createQrCodeContent());
    qr.make();

    return qr;
  }

  public createDataUrl(): string {
    const qr = this.createQrCode();
    return qr.createDataURL();
  }

  public render(canvas: CanvasRenderingContext2D) {
    const qr = this.createQrCode();
    qr.renderTo2dContext(canvas);
  }

  public createSvgTag(scalable: boolean): string {
    const qr = this.createQrCode();
    return qr.createSvgTag({ scalable: scalable });
  }
}

export class EpcBuilder {
  private version!: EpcVersion;
  private encoding!: EpcEncoding;
  private bic!: string;
  private name!: string;
  private iban!: string;
  private amount!: number;
  private sepaPurposeCode?: string;
  private structuredCreditorReference?: string;
  private reference?: string;
  private notes?: string;

  public withVersion(version: EpcVersion) {
    this.version = version;

    return this;
  }

  public withEncoding(encoding: EpcEncoding) {
    this.encoding = encoding;

    return this;
  }

  public withBic(bic: string) {
    this.bic = bic;

    return this;
  }

  public withName(name: string) {
    this.name = name;

    return this;
  }

  public withIban(iban: string) {
    this.iban = iban;

    return this;
  }

  public withAmount(amount: number) {
    this.amount = amount;

    return this;
  }

  public withSepaPurposeCode(sepaPurposeCode: string) {
    this.sepaPurposeCode = sepaPurposeCode;

    return this;
  }
  public withStructuredCreditorReference(structuredCreditorReference: string) {
    this.structuredCreditorReference = structuredCreditorReference;

    return this;
  }
  public withReference(reference: string) {
    this.reference = reference;

    return this;
  }
  public withNotes(notes: string) {
    this.notes = notes;

    return this;
  }

  public build(): Epc {
    return new Epc(
      this.bic,
      this.name,
      this.iban,
      this.amount,
      this.version,
      this.encoding,
      this.sepaPurposeCode,
      this.structuredCreditorReference,
      this.reference,
      this.notes
    );
  }
}
