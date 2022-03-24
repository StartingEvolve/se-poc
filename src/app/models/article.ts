//Many to one
//Todo (zack): Storing article in Cloud storage might be better for performance
export interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string; //html content of the article
  category: string;
  editorId: string;
  createdAt: {
    value: string; // date format
    formatted: string;
  };
  modifiedAt: {
    value: string; // date format
    formatted: string;
  };
}

//For the time being only an editor can work on an article
//We might add article collaboration later
