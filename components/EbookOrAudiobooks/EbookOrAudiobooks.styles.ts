import {StyleSheet} from 'react-native';
import {IEbookorAudiobooksStyles} from './EbookorAudiobooks.types';

export const styles = StyleSheet.create<IEbookorAudiobooksStyles>({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderRadius: 7,
  },
  buttonText: {
    color: '#E5E7E9',
    fontSize: 13,
    width: '80%',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  button: {
    width: 170,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E79A36',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonOff: {
    width: 170,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C7985A',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
