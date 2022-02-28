export interface UserDocument {
  uid?: string;
  accountType: string;
  displayName: string;
  displayName_lower: string;
  email: string;
  email_lower: string;
  photoURL?: string;
  about?: string;
  country?: string;
  street_address?: string;
  zipCode?: string;
  phone_number?: string;
  city?: string;
  language?: string;
}
