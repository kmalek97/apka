import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, Chip, TextInput } from "react-native-paper";
import Wrapper from "../../components/Wrapper";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import SelfActivityIndicator from "../../components/ActivityIndicator/SelfActivityIndicator";
import { IAddEbookProps } from "./AddEbookForm.types";
import { styles } from "./AddEbookForm.styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

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
  numberOfPages: Yup.number().max(15000),
  categories: Yup.array().min(1, "Too Short!"),
});

const AddEbookForm = ({ isLoading, categories }: IAddEbookProps) => {
  const navigation = useNavigation();

  const handleOnSubmit = (values: any) => {
    console.log(values);
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([1]);

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

  return (
    <Wrapper>
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
                numberOfPages: "123",
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
                      errors.author && touched.author ? errors.author : "author"
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
                      errors.numberOfPages && touched.numberOfPages
                        ? errors.numberOfPages
                        : "number of pages"
                    }
                    placeholder="number of pages"
                    mode="outlined"
                    maxLength={15000}
                    value={values.numberOfPages}
                    onChangeText={handleChange("numberOfPages")}
                    onBlur={handleBlur("numberOfPages")}
                    error={!!errors.numberOfPages && touched.numberOfPages}
                  />
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
    </Wrapper>
  );
};

export default AddEbookForm;
