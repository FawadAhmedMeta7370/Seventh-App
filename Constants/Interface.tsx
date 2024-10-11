import {NavigationProp} from '@react-navigation/native';
import {ReactNode} from 'react';

export interface ImagePicker {}

export interface IAddPlace {
  navigation: NavigationProp<any>;
}

export interface IOutlineButton {
  onPress?: any;
  icon?: any;
  children?: ReactNode;
  size?: number;
  color?: string;
}

export interface IPlaceAddForm {
    onCreatePlace?: () => void
}

export interface ILocationPicker {
  onPickeLocation?: object;
  color?: string;
  size?: number;
}

export interface IGetMapPreview {
  lat?: number;
  long?: number;
}

export interface IMap {
  navigation?: NavigationProp<any>;
  route?: any
}

export interface ILoadingOverlay {
  message?: string
}

export interface IPlaceDetails {
  route?: any
}