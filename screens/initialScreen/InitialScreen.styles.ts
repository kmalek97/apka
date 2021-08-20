import {StyleSheet} from 'react-native';
import {IInitialScreen} from './InitialScreen.types';

export const styles = StyleSheet.create<IInitialScreen>({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '70%',
  },
  button: {
    width: 250,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E79A36',
    borderRadius: 15,
    marginBottom: 45,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    width: '90%',
    height: '100%',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
});
