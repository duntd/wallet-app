// import {Colors} from 'const';
// import React, {Fragment, useRef} from 'react';
// import {Text, View} from 'react-native';
// import {Font} from 'styles';
// import {Ratio} from 'utils';
// import SignatureScreen, {SignatureViewRef} from 'react-native-signature-canvas';
// import {CachesDirectoryPath, writeFile, readFile} from 'react-native-fs';
// import {CustomButton} from 'components/button';
// import {useWrapDispatch} from 'hooks';
// import {SET_MODAL} from 'store/reducers/app';

// interface Props {
//   onSave: (path: string) => void;
// }

// export const SignatureModal = ({onSave}: Props) => {
//   const ref = useRef<SignatureViewRef>(null);

//   const modal = useWrapDispatch(SET_MODAL);

//   const handleOK = (signature: string) => {
//     const path = CachesDirectoryPath + Math.random() * 999 + 'sign.png';
//     writeFile(path, signature.replace('data:image/png;base64,', ''), 'base64')
//       .then(() => {
//         onSave(path);
//       })
//       .catch(console.error);
//   };

//   const handleClear = () => {
//     ref.current?.clearSignature();
//   };

//   const handleConfirm = () => {
//     ref.current?.readSignature();
//   };

//   const onCancel = () => {
//     modal({open: false, children: <Fragment />});
//   };

//   const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

//   return (
//     <View
//       style={[
//         padding(33, 6, 27, 6),
//         {
//           position: 'absolute',
//           backgroundColor: Colors.WHITE,
//           borderRadius: 8,
//           top: height(170),
//           alignSelf: 'center',
//           width: width(350),
//         },
//       ]}>
//       <Text
//         style={[
//           Font.H3,
//           {textAlign: 'center', marginBottom: height(16)},
//         ]}>
//         Vui lòng ký lên màn hình
//       </Text>

//       <View
//         style={[
//           size(316, 174),
//           {
//             borderRadius: 6,
//             borderWidth: 1,
//             borderColor: Colors.N3,
//             alignItems: 'center',
//             alignSelf: 'center',
//           },
//         ]}>
//         <SignatureScreen ref={ref} onOK={handleOK} webStyle={style} />
//       </View>

//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-evenly',
//           marginTop: height(16),
//           alignItems: 'center',
//         }}>
//         <CustomButton
//           label="Huỷ"
//           onPress={onCancel}
//           style={{width: width(80)}}
//           outline
//         />
//         <CustomButton
//           label="Xoá"
//           onPress={handleClear}
//           style={{width: width(80)}}
//           outline
//         />
//         <CustomButton
//           label="Xác nhận"
//           onPress={handleConfirm}
//           //style={{width: width(100)}}
//         />
//       </View>
//     </View>
//   );
// };
