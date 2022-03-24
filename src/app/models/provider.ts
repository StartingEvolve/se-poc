//One to many
export interface Provider {
  id: string; //provider uuid
  name: string; //provider full name
  image: string;
  email: string;
  phone?: string;
  courseId: string[];
  description?: string;
  industry?: string; //If organization
  profession?: string; //If independent
  accountType: string; //It can be 'independent' or 'organisation'
}
