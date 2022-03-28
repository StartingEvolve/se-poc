//Many to one -> One Provider can Have many courses
export interface Course {
  id: string; // course uuid
  providerId: string;
  title: string; // course title
  image: string; // course image
  // description: string; // course description
  goals?: string[]; //course goals arrays
  prerequisites: string[]; //course prerequisite array
  program: string[]; // course program array
  category: string;
  status: string; // can be draft | accepted | rejected | pending
  createdAt: string;
  submittedAt: string;
  rejectionReason: string;
  // certifications: {
  //   // certificateId: string; // Certification uuid
  //   image: string; // Certification image
  //   // name: string; // Certification name
  //   // description: string;
  // }[];
  overview?: {
    article: any; // course article to implement
    public_admitted?: string[];
    price?: {
      value: number;
      new_value?: number;
      currency: string;
    };
    eligibility?: string[];
    start_date?: string; //We're going to deal with Date formatting later
    location?: {
      address?: string[];
      region: string;
      zipCode: string;
    };
    duration?: string;
    learning_mode?: string[];
    success_rate?: string;
  };
  reviews?: {
    global_score: number;
    total: number;
    date: string;
    data: {
      uuid_user: string;
      full_name: string;
      score: number;
      review?: string;
    }[];
  };
  // instructors: {
  //   // instructorId: string;
  //   full_name: string;
  //   image?: string;
  //   top_instructor: boolean;
  //   role_description: string;
  // }[];
  // views?: { count: number; users?: any }; // Incremented once per each user (Queue)
}
