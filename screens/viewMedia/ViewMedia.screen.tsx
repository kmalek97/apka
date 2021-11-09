import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import PDFReader from "rn-pdf-reader-js";
import { Audio, AVPlaybackStatus, Video } from "expo-av";

import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { styles } from "./ViewMedia.styles";
import { IFileScreenProps } from "../fileScreen/FileScreen.types";
import theme from "../../components/Wrapper/theme";
import SelfActivityIndicator from "../../components/ActivityIndicator/SelfActivityIndicator";

const ViewMedia = () => {
  const {
    params: { dataItem },
  } = useRoute<IFileScreenProps>();

  const [sound, setSound] = useState<Audio.Sound>();
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playbackInstancePosition, setPlaybackInstancePosition] = useState<
    number | null
  >(null);
  const [playbackInstanceDuration, setPlaybackInstanceDuration] = useState<
    number | null
  >(null);

  const _getMMSSFromMillis = (millis: number) => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number: number) => {
      const string = number.toString();
      if (number < 10) {
        return "0" + string;
      }
      return string;
    };
    return padWithZero(minutes) + ":" + padWithZero(seconds);
  };

  const _getTimestamp = () => {
    if (
      sound &&
      playbackInstancePosition != null &&
      playbackInstanceDuration != null
    ) {
      return `${_getMMSSFromMillis(
        playbackInstancePosition
      )} / ${_getMMSSFromMillis(playbackInstanceDuration)}`;
    }
    return "";
  };

  const statusUpdate = (status: AVPlaybackStatus) => {
    if ("durationMillis" in status) {
      setPlaybackInstanceDuration(status.durationMillis || null);
      setPlaybackInstancePosition(status.positionMillis || null);
    }
    setIsLoading(!status.isLoaded);
  };

  const loadSound = async () => {
    console.log("Loading Sound");
    if (dataItem.downloadURL) {
      const { sound } = await Audio.Sound.createAsync(
        {
          uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
          // uri: dataItem.downloadURL,
        },
        undefined,
        statusUpdate,
        false
      );
      return sound;
    }
  };

  async function playSound() {
    if (sound) {
      setIsRunning(true);
      await sound.playAsync();
    }
  }

  const stopSound = async () => {
    if (sound) {
      setIsRunning(false);
      await sound.stopAsync();
    }
  };

  const pouseSound = async () => {
    if (sound) {
      setIsRunning(false);
      await sound.pauseAsync();
    }
  };

  const onValueChange = (value: number) => {
    if (sound) {
      sound.setPositionAsync(value * 100);
    }
  };

  useEffect(() => {
    if (!dataItem.numberOfPages) {
      setIsLoading(true);
    }
    if (!sound) {
      loadSound().then((data) => setSound(data));
    }
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : loadSound;
  }, [sound]);

  if (isLoading) {
    return <SelfActivityIndicator />;
  }

  console.log("dataItem.downloadURL", dataItem.downloadURL);

  if (dataItem.numberOfPages) {
    return (
      <PDFReader
        source={{
          uri: dataItem.downloadURL,
        }}
      />
    );
  } else {
    return (
      <SafeAreaView style={styles.contanier}>
        <View style={styles.musicLogoView}>
          <Image source={{ uri: dataItem.coverURL }} style={styles.imageView} />
        </View>

        <View style={styles.nameOfSongView}>
          <Text style={styles.nameOfSongText1}>{dataItem.title}</Text>
          <Text style={styles.nameOfSongText2}>{dataItem.author}</Text>
          <Feather name="repeat" size={20} color={theme.colors.primary} />
        </View>

        <View style={styles.sliderView}>
          <Slider
            style={styles.sliderStyle}
            minimumValue={0}
            maximumValue={(playbackInstanceDuration || 0) / 100}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor={theme.colors.primary}
            onValueChange={onValueChange}
            value={(playbackInstancePosition || 0) / 100}
          />
          <Text style={styles.sliderTime}>{_getTimestamp()}</Text>
        </View>

        <View style={styles.functionsView}>
          <Entypo
            name="controller-fast-backward"
            size={24}
            color={theme.colors.primary}
          />
          <TouchableOpacity
            onPress={() => (isRunning ? pouseSound() : playSound())}
          >
            <AntDesign
              name={isRunning ? "pausecircle" : "rightcircle"}
              size={50}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
          <Entypo
            name="controller-fast-forward"
            size={24}
            color={theme.colors.primary}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default ViewMedia;
