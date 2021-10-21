import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Button, Chip, TextInput } from "react-native-paper";
import Wrapper from "../../components/Wrapper";
import * as Yup from "yup";
import { Formik } from "formik";
import SelfActivityIndicator from "../../components/ActivityIndicator/SelfActivityIndicator";
import { IAddAudiobookProps } from "./AddAudiobookForm.types";
import { styles } from "./AddAudiobookForm.styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import firebase from "firebase";
import Icon from "react-native-vector-icons/FontAwesome";

const schema = Yup.object().shape({
  title: Yup.string()
    .min(1, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  author: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  description: Yup.string().max(500),
  publishing: Yup.string().min(3).max(150).required("Required"),
  publicationDate: Yup.string(),
  lector: Yup.string().max(50),
  time: Yup.object().shape({
    hour: Yup.number().max(100, "hours error"),
    minute: Yup.number().max(59, "minutes error"),
  }),
  categories: Yup.array().min(1, "Too Short!"),
});

const AddAudiobookForm = ({ isLoading, categories }: IAddAudiobookProps) => {
  const navigation = useNavigation();

  const handleOnSubmit = (values: any) => {
    uploadFile(values);
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([1]);
  const [resultUri, setResultUri] = useState<any>({});
  const [resultCoverUri, setResultCoverUri] = useState<string>("");
  const [loader, setLoader] = useState<Boolean>(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any, setFieldValue: any) => {
    setFieldValue("publicationDate", moment(date).format("YYYY-MM-DD"));
    hideDatePicker();
  };

  const handleCategory = (id: number, setFieldValue: any) => {
    const foundedCategory = selectedCategories.some(
      (selected) => selected === id
    );
    if (foundedCategory) {
      setSelectedCategories((oldState) => {
        const newState = oldState.filter((state) => state !== id);
        setFieldValue("categories", newState);
        return newState;
      });
    } else {
      setSelectedCategories((oldState) => {
        setFieldValue("categories", [...oldState, id]);
        return [...oldState, id];
      });
    }
  };

  const pickCover = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 0.5,
    });
    if (result.cancelled) {
      alert("Choose cover");
      setResultCoverUri("");
    } else {
      setResultCoverUri(result?.uri);
    }
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "audio/mpeg",
    });
    if (result.type === "success") {
      return setResultUri(result);
    }
    alert("Choose file");
    setResultUri({});
  };

  const uploadFile = async (values: any) => {
    const response = await fetch(resultUri.uri).catch((err) => {
      alert("File error");
    });
    const blob = await response?.blob();

    const responseCover = await fetch(resultCoverUri).catch((err) => {
      alert("Cover error");
    });
    const blobCover = await responseCover?.blob();

    if (blob && blobCover) {
      setLoader(true);

      let downloadURL = "";
      let coverURL = "";

      const task = firebase
        .storage()
        .ref()
        .child(`audiobook/${Math.random().toString(36)}`)
        .put(blob);

      const taskProgress = (snapshot: { bytesTransferred: any }) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
      };

      const taskCompleted = () => {
        task.snapshot.ref.getDownloadURL().then((snapshot) => {
          downloadURL = snapshot;
          const taskCover = firebase
            .storage()
            .ref()
            .child(`cover/${Math.random().toString(36)}`)
            .put(blobCover);

          const taskCoverProgress = (snapshot: { bytesTransferred: any }) => {
            console.log(`transferred: ${snapshot.bytesTransferred}`);
          };

          const taskCoverCompleted = () => {
            taskCover.snapshot.ref.getDownloadURL().then((snapshotCover) => {
              coverURL = snapshotCover;
              savePostData(downloadURL, coverURL, values);
            });
          };

          const taskCoverError = (snapshot: any) => {
            alert(snapshot);
          };

          taskCover.on(
            "state_changed",
            taskCoverProgress,
            taskCoverError,
            taskCoverCompleted
          );
        });
      };

      const taskError = (snapshot: any) => {
        alert(snapshot);
      };

      task.on("state_changed", taskProgress, taskError, taskCompleted);
    }
  };

  const savePostData = (downloadURL: string, coverURL: string, values: any) => {
    firebase
      .firestore()
      .collection("audiobooks")
      .add({
        downloadURL,
        coverURL,
        ...values,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        navigation?.goBack();
      });
  };

  return (
    <Wrapper>
      {loader ? (
        <SelfActivityIndicator />
      ) : (
        <ScrollView>
          <View style={styles.formContainer}>
            {isLoading ? (
              <SelfActivityIndicator />
            ) : (
              <Formik
                initialValues={{
                  title: "Nad Kamienicą",
                  author: "Mati Sarota - Zbąszynek",
                  description: "Taka sobie powieść o gównie.",
                  publishing: "Wydawnictwo Bobowa",
                  lector: "Adam Małysz",
                  time: {
                    hour: "2",
                    minute: "45",
                  },
                  publicationDate: "",
                  categories: [1],
                }}
                validationSchema={schema}
                onSubmit={(values) => handleOnSubmit(values)}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                }) => (
                  <View style={styles.wrapper}>
                    <TextInput
                      style={styles.input}
                      outlineColor="#E79A36"
                      label={
                        errors.title && touched.title ? errors.title : "title"
                      }
                      placeholder="title"
                      mode="outlined"
                      maxLength={100}
                      value={values.title}
                      onChangeText={handleChange("title")}
                      onBlur={handleBlur("title")}
                      error={!!(errors.title && touched.title)}
                    />
                    <TextInput
                      style={styles.input}
                      outlineColor="#E79A36"
                      label={
                        errors.author && touched.author
                          ? errors.author
                          : "author"
                      }
                      placeholder="author"
                      mode="outlined"
                      maxLength={100}
                      value={values.author}
                      onChangeText={handleChange("author")}
                      onBlur={handleBlur("author")}
                      error={!!(errors.author && touched.author)}
                    />
                    <TextInput
                      style={styles.input}
                      outlineColor="#E79A36"
                      label="description"
                      placeholder="description"
                      mode="outlined"
                      maxLength={500}
                      value={values.description}
                      onChangeText={handleChange("description")}
                      onBlur={handleBlur("description")}
                      error={!!(errors.description && touched.description)}
                      multiline={true}
                    />
                    <TextInput
                      outlineColor="#E79A36"
                      style={styles.input}
                      label={
                        errors.publishing && touched.publishing
                          ? errors.publishing
                          : "publishing"
                      }
                      placeholder="publishing"
                      mode="outlined"
                      maxLength={150}
                      value={values.publishing}
                      onChangeText={handleChange("publishing")}
                      onBlur={handleBlur("publishing")}
                      error={!!errors.publishing && touched.publishing}
                    />
                    <TextInput
                      outlineColor="#E79A36"
                      style={styles.input}
                      label={
                        errors.lector && touched.lector
                          ? errors.lector
                          : "lector"
                      }
                      placeholder="lector"
                      mode="outlined"
                      maxLength={50}
                      value={values.lector}
                      onChangeText={handleChange("lector")}
                      onBlur={handleBlur("lector")}
                      error={!!errors.lector && touched.lector}
                    />
                    <View style={styles.timeContainer}>
                      <TextInput
                        outlineColor="#E79A36"
                        style={styles.timeInput}
                        label={
                          errors.time?.hour && touched.time?.hour
                            ? errors.time?.hour
                            : "hour"
                        }
                        placeholder="hour"
                        mode="outlined"
                        maxLength={3}
                        value={values.time.hour}
                        onChangeText={handleChange("time.hour")}
                        onBlur={handleBlur("hour")}
                        error={!!errors.time?.hour && touched.time?.hour}
                        keyboardType="numeric"
                      />
                      <TextInput
                        outlineColor="#E79A36"
                        style={styles.timeInput}
                        label={
                          errors.time?.minute && touched.time?.minute
                            ? errors.time.minute
                            : "minute"
                        }
                        placeholder="minute"
                        mode="outlined"
                        maxLength={2}
                        value={values.time.minute}
                        onChangeText={handleChange("time.minute")}
                        onBlur={handleBlur("minute")}
                        error={!!errors.time?.minute && touched.time?.minute}
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.coverButtonContainer}>
                      <Button
                        labelStyle={styles.dateButton}
                        mode="contained"
                        onPress={pickCover}
                      >
                        {resultCoverUri !== "" ? (
                          <Icon name="check" color="#3cd113" size={17} />
                        ) : (
                          "Choose cover"
                        )}
                      </Button>
                    </View>
                    <View>
                      <TextInput
                        outlineColor="#E79A36"
                        style={styles.dateInput}
                        label={
                          errors.publicationDate && touched.publicationDate
                            ? errors.publicationDate
                            : "publication date"
                        }
                        placeholder="publication date"
                        mode="outlined"
                        maxLength={15000}
                        value={values.publicationDate}
                        onChangeText={handleChange("publicationDate")}
                      />
                      <Button
                        onPress={showDatePicker}
                        mode="contained"
                        compact={true}
                        labelStyle={styles.dateButton}
                      >
                        Set Date
                      </Button>
                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={(date) => handleConfirm(date, setFieldValue)}
                        onCancel={hideDatePicker}
                      />
                    </View>

                    <View style={styles.categoryContainer}>
                      {categories.map((category) => (
                        <Chip
                          style={styles.categoryItem}
                          onPress={() =>
                            handleCategory(category.id, setFieldValue)
                          }
                          key={category.id}
                          selected={values.categories.some(
                            (selected) => selected === category.id
                          )}
                        >
                          {category.name}
                        </Chip>
                      ))}
                    </View>
                    <Button
                      labelStyle={styles.dateButton}
                      mode="contained"
                      onPress={pickDocument}
                    >
                      {resultUri.type === "success" ? (
                        <Icon name="check" color="#3cd113" size={17} />
                      ) : (
                        "Choose file"
                      )}
                    </Button>

                    <Button
                      style={styles.button}
                      labelStyle={styles.buttonText}
                      onPress={handleSubmit}
                    >
                      Submit
                    </Button>
                  </View>
                )}
              </Formik>
            )}
          </View>
        </ScrollView>
      )}
    </Wrapper>
  );
};

export default AddAudiobookForm;
