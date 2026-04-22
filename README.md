# Toolbox Code Challenge — React Native

## Como funciona ?

La app se loguea contra una API, obtiene carruseles y los muestra en pantalla. 

Hay dos tipos: `poster` (vertical) y `thumb` (horizontal apaisado). 
Al tocar cualquier ítem se abre el reproductor de video. Si el ítem no tiene `videoUrl`, aparece "Video no disponible".

---

## Puntos opcionales

Implementé los tres:

- **Reproductor de video** con `react-native-video`, incluyendo el mensaje de "Video no disponible" cuando no hay URL.
- **Redux** para manejar el token de sesión.
- **Tests unitarios con Jest** sobre `CarouselRow` y `LazyImage`.

---

## Algunas decisiones que tomé y por qué

**Por qué Expo**
El brief pide que la app funcione en Android y iOS. Expo simplifica eso, el setup de builds, la configuración nativa y el tooling ya vienen resueltos. Usé `expo prebuild` para generar los proyectos nativos y poder usar `react-native-video`, que requiere código nativo y no funciona con Expo Go.

**Expiración del token**
Decodifico el token para leer su `expireDate` y programo un `setTimeout` que renueva la sesión antes de que expire. Si por alguna razón eso falla y llega un 401, un interceptor de Axios lo captura y re-autentica. Cuando el token nuevo llega a Redux, React Query detecta el cambio y re-fetcha los carruseles solo.

**Redux y React Query juntos**
Redux lo uso solo para el token porque es estado global real. Lo consumen el interceptor, el guard del query y los hooks. Introducí React Query  para los carruseles porque el caché y el re-fetch automático al cambiar el token lo hacen por sí solos, sin tener que manejarlo a mano. No se pisan, hacen cosas distintas.

**Estructura de componentes**
Organicé los componentes en atoms, molecules y organisms. En `CarouselRow` uso un mapa `ITEM_COMPONENTS` para elegir el componente según el tipo de carrusel, si en futuro viene un tipo nuevo, solo agrego una entrada al mapa sin tocar nada más.

**Lazy loading**
Cada `CarouselRow` trackea qué ítems son visibles con `onViewableItemsChanged` y le pasa un prop `visible` a cada ítem. `LazyImage` cuando `visible` es `false` renderiza solo un placeholder vacío sin montar `<Image>`, sin hacer ningún request. La imagen se pide recién cuando el ítem entra al viewport.

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

### Paso 1: Prebuild

`react-native-video` usa código nativo, así que primero hay que generar los proyectos nativos de iOS y Android:

```bash
npx expo prebuild
```

Solo hace falta correrlo una vez, o si se agregan nuevas dependencias nativas.

### Paso 2.1: iOS

```bash
npx expo run:ios
```

Detecta automáticamente los simuladores corriendo y dispositivos físicos conectados. Si hay varios, pregunta cuál usar.

### Paso 2.2: Android

Antes de compilar, hay que asegurarse de que el archivo `android/local.properties` apunte al SDK:

```bash
echo "sdk.dir=$HOME/Library/Android/sdk" > android/local.properties
```

> Si el SDK está en otra ubicación, se puede verificar en Android Studio → Settings → Android SDK → Android SDK Location.

Luego:

```bash
npx expo run:android
```

Detecta automáticamente los emuladores corriendo y dispositivos físicos conectados por USB. Si hay varios, pregunta cuál usar.

---

## Tests

Tests sobre `CarouselRow` y `LazyImage`, cubriendo renderizado, interacción y el comportamiento de lazy loading.

```bash
npm test
```

> Nota para los reviewers

El `imageUrl` manda a un dominio que ya no existe [http://placeimg.com/640/480/any](http://placeimg.com/640/480/any). Lo consulté y me confirmaron que se podía reemplazar, así que las URLs se normalizan a `picsum.photos` en `imageUtils.js` antes de llegar a los componentes.
