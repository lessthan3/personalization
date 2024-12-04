type GeneralResponse = {
  code: number;
  result?: any;
};

type ReadonlyGeneralResponse = Readonly<GeneralResponse>;

export { ReadonlyGeneralResponse };
