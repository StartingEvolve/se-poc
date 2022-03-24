//One to many
export interface Editor {
  id: string; //provider uuid
  firstName: string;
  lastName: string;
  nickname: string;
  image: string; //Avatar
  email: string;
  articleId: string[];
  accountType: string; //It can be 'independent' or 'organisation'
}
