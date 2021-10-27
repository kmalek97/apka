import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const categoriesCreateEb = functions.firestore
  .document("ebooks/{ebooksID}")
  .onCreate(async (change, context) => {
    const categories = await (await db.collection("categories").get()).docs;

    const mappedCategories = categories.map((category) => ({
      ...category.data(),
      id: Number(category.id),
    }));
    const getCategory = () =>
      change.data().categories.map((category: number) => {
        return mappedCategories.find((value) => {
          return value.id === category;
        });
      });

    return db.collection("ebooks").doc(context.params.ebooksID).update({
      categories: getCategory(),
    });
  });

export const categoriesCreateAudio = functions.firestore
  .document("audiobooks/{audiobooksID}")
  .onCreate(async (change, context) => {
    const categories = await (await db.collection("categories").get()).docs;

    const mappedCategories = categories.map((category) => ({
      ...category.data(),
      id: Number(category.id),
    }));
    const getCategory = () =>
      change.data().categories.map((category: number) => {
        return mappedCategories.find((value) => {
          return value.id === category;
        });
      });

    return db.collection("audiobooks").doc(context.params.audiobooksID).update({
      categories: getCategory(),
    });
  });
