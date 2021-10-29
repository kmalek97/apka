import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();
const defaultStorage = admin.storage();

export const categoriesCreateEb = functions.firestore
  .document("ebooks/{ebookID}")
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

    return db.collection("ebooks").doc(context.params.ebookID).update({
      categories: getCategory(),
    });
  });

export const categoriesCreateAudio = functions.firestore
  .document("audiobooks/{audiobookID}")
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

    return db.collection("audiobooks").doc(context.params.audiobookID).update({
      categories: getCategory(),
    });
  });

export const deleteUselessEb = functions.firestore
  .document("ebooks/{ebookID}")
  .onDelete((snap, context) => {
    const linkFile = snap.data().downloadURL;
    const linkCover = snap.data().coverURL;
    const bucket = defaultStorage.bucket();
    const pattern = /(?<=2F)(.*)(?=\?)/gm;
    const fileName = linkFile.match(pattern);
    const coverName = linkCover.match(pattern);
    const file = bucket.file(`ebook/${fileName}`);
    const cover = bucket.file(`cover/${coverName}`);
    return file.delete(), cover.delete();
  });

export const deleteUselessAudio = functions.firestore
  .document("audiobooks/{audiobookID}")
  .onDelete((snap, context) => {
    const linkFile = snap.data().downloadURL;
    const linkCover = snap.data().coverURL;
    const bucket = defaultStorage.bucket();
    const pattern = /(?<=2F)(.*)(?=\?)/gm;
    const fileName = linkFile.match(pattern);
    const coverName = linkCover.match(pattern);
    const file = bucket.file(`audiobook/${fileName}`);
    const cover = bucket.file(`cover/${coverName}`);
    return file.delete(), cover.delete();
  });

export const deleteOldAvatar = functions.firestore
  .document("users/{userID}")
  .onUpdate((change, context) => {
    const before = change.before.data().downloadURL;
    const after = change.after.data().downloadURL;
    const pattern = /(?<=2F)(.*)(?=\?)/gm;
    const secondPattern = /(?<=2F)(.*)/g;
    const bucket = defaultStorage.bucket();
    const avatarName = before.match(pattern)[0];
    const avatarNameFinal = avatarName.match(secondPattern)[0];
    const file = bucket.file(
      `avatar/${context.params.userID}/${avatarNameFinal}`
    );

    if (before !== after && before) {
      return file.delete();
    } else {
      return null;
    }
  });
