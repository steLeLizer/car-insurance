interface InquiryProps {
  map(arg0: (car: { manufacturer: string }) => string): string[];
  monthly: {
    globalOffer: string;
    universalOffer: string;
  };
  yearly: {
    globalOffer: string;
    universalOffer: string;
  };
  driverAge: number;
  carName: string;
  purchasePrice: number;
  ruleType: string,
  message?: string
}

export default InquiryProps;
