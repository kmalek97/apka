import firebase from "firebase";

export interface IFilePreviewProps {
  selectedType: string;
  userState: {
    userRole: string | null;
  };
  ebooks: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[] & {
    empty: boolean;
  };
  audiobooks: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[] & {
    empty: boolean;
  };
  getFile: (
    selectedType: string,
    type?: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
  ) => void;
}

export interface ISingleItem {
  item: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
}

export interface IItemsData extends firebase.firestore.DocumentData {
  title: string;
  description: string;
  lector?: string;
  numberOfPages?: string;
  author?: string;
  coverURL?: string;
  downloadURL?: string;
  creation: any;
  publishing?: string;
  categories: [
    object: {
      id: number;
      name: string;
    }
  ];
}
