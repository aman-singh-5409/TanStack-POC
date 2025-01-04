export interface Bank {
  cardExpire: string;
  cardNumber: string;
}

export interface User {
  firstName: string;
  lastName: string;
  image: string;
  email: string;
  bank: Bank;
}
