export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  phoneNumber: string | null;
}

export interface CustomerFormData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
