//Many to one
//Todo (zack): Storing article in Cloud storage might be better for performance
export interface Article {
  id: string;
  title: string;
  content: string; //html content of the article
  editorId: string;
  createdAt: string;
  modifiedAt: string;
}

//For the time being only an editor can work on an article
//We might add article collaboration later
