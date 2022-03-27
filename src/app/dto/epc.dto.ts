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

export interface EpcDto {
  readonly bic: string;
  name: string;
  readonly iban: string;
  readonly amount: number;
  readonly version: EpcVersion;
  readonly encoding: EpcEncoding;
  readonly sepaPurposeCode?: string;
  readonly structuredCreditorReference?: string;
  readonly reference?: string;
  readonly notes?: string;
}
