# Toolbox Code Challenge — React Native

Aplicación React Native que consume una API REST y muestra el contenido en carruseles horizontales y verticales con reproductor de video.

---

## Requisitos

- Node.js 18 o superior
- npm 9 o superior
- Para iOS: macOS con Xcode 15 o superior y CocoaPods instalado
- Para Android: Android Studio con un emulador configurado

> **Nota:** la aplicación usa `react-native-video`, un módulo nativo. No es compatible con Expo Go. Se debe construir con `expo run:ios` o `expo run:android`.

---

## Instalación

```bash
git clone https://github.com/thomasnoveintacincoalbertini/toolbox-code-challenge.git
cd toolbox-code-challenge
npm install
```

---

## Ejecución

### Prebuild

```bash
npx expo prebuild
```

### iOS 

```bash
npx expo run:ios
```

### Android

Asegurarse de crear el archivo `android/local.properties` con la ruta del SDK antes de compilar:

```bash
echo "sdk.dir=$HOME/Library/Android/sdk" > android/local.properties
```
> Si el SDK está en otra ubicación, se puede verificar en Android Studio → Settings → Android SDK → Android SDK Location.

```bash
npx expo run:android
```

---

## Tests

```bash
npm test
```
