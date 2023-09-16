/** @format */

import { Dimensions, Platform, StatusBar } from 'react-native'
import { getDeviceId } from 'react-native-device-info'
import { deviceIdToStatusBarHeight } from './devices'

const deviceId = getDeviceId()
export function isIphoneX () {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    deviceIdToStatusBarHeight[deviceId] !== undefined
  )
}

export function isDynamicIsland () {
  return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV &&
    deviceIdToStatusBarHeight[deviceId] !== undefined &&
    deviceIdToStatusBarHeight[deviceId].hasDynamicIsland
}

const _getIphoneStatusBarHeight = () => {
  if (isIphoneX()) {
    const deviceInfo = deviceIdToStatusBarHeight[deviceId]
    if (deviceInfo) {
      return deviceInfo.safeInset
    } else {
      // return default value if deviceId is not in deviceIdToStatusBarHeight
      return 44
    }
  }
  return 20
}

export function ifIphoneX (iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle
  }
  return regularStyle
}

export function getStatusBarHeight () {
  return Platform.select({
    ios: _getIphoneStatusBarHeight(),
    android: StatusBar.currentHeight,
    default: 0,
  })
}

export function getBottomSpace () {
  return isIphoneX() ? 34 : 0
}

export function isIphoneXLegacy () {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (checkDimension(780) ||
      checkDimension(812) ||
      checkDimension(844) ||
      checkDimension(896) ||
      checkDimension(926) ||
      checkDimension(852) ||
      checkDimension(932))
  )
}

export function isDynamicIslandLegacy () {
  return Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV &&
    _isStatusBarHeight59()
}

const checkDimension = (size) => {
  // window is not correct sometimes when screen is correct
  const window = Dimensions.get('window')
  const windowRes = window.width == size || window.height == size
  const screen = Dimensions.get('screen')
  const screenRes = screen.width == size || screen.height == size
  return windowRes || screenRes
}

const checkDimensions = (portraitWidth, portraitHeight) => {
  const window = Dimensions.get('window')
  const windowRes =
    (window.height === portraitHeight && window.width === portraitWidth) ||
    (window.width === portraitHeight && window.height === portraitWidth)

  const screen = Dimensions.get('screen')
  const screenRes =
    (screen.height === portraitHeight && screen.width === portraitWidth) ||
    (screen.width === portraitHeight && screen.height === portraitWidth)

  return windowRes || screenRes
}

// 12, 12 Pro, 13, 13 Pro and 12 Pro Max, 13 Pro Max
const _isStatusBarHeight47 = () => {
  return checkDimensions(390, 844) || checkDimensions(428, 926)
}

// 11, xr
const _isStatusBarHeight48 = () => {
  // FIXME: cannot distinguish 11/xr between 11/11 pro max by their resolution
  // if (!checkDimensions(414, 896)) {
  //     return false
  // }
  return false
}

// 12 Mini, 13 Mini
const _isStatusBarHeight50 = () => {
  return checkDimensions(375, 812)
}
// 14 Pro, 14 Pro Max
const _isStatusBarHeight59 = () => {
  return checkDimensions(393, 852) || checkDimensions(430, 932)
}
const _getIphoneStatusBarHeightLegacy = () => {
  if (isIphoneXLegacy()) {
    if (_isStatusBarHeight47()) {
      return 47
    }
    if (_isStatusBarHeight48()) {
      return 48
    }
    if (_isStatusBarHeight50()) {
      return 50
    }
    if (_isStatusBarHeight59()) {
      return 59
    }
    return 44
  }

  return 20
}

export function ifIphoneXLegacy (iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle
  }
  return regularStyle
}

export function getStatusBarHeightLegacy () {
  return Platform.select({
    ios: _getIphoneStatusBarHeightLegacy(),
    android: StatusBar.currentHeight,
    default: 0,
  })
}

export function getBottomSpaceLegacy () {
  return isIphoneX() ? 34 : 0
}