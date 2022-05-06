import { MonthlyYearlyCarInsuranceOfferInterface } from './monthly-yearly-car-insurance-offer.interface';

export interface CarInsuranceOfferResponseInterface {
  monthly: MonthlyYearlyCarInsuranceOfferInterface;
  yearly: MonthlyYearlyCarInsuranceOfferInterface;
}
