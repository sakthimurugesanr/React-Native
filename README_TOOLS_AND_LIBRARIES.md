# React Native tools and libraries: a practical reference

[Back to the main README](./README.md) · [React web comparison and code examples](./README_REACT_VS_REACT_NATIVE.md) · [Complete setup and interview guide](./REACT_NATIVE_COMPLETE_GUIDE.md)

Use this catalogue to understand what each tool does and choose dependencies for a feature. The linked names lead to official documentation or maintainer repositories. This is a list of options, not a list of packages to install together.

The sample uses Expo, TypeScript, Expo Router, Zustand, native components, and manual form validation. Check [package.json](./package.json) for the actual dependencies. Most libraries below are alternatives for future practice, not features already implemented in this app.

## 1. Frameworks and development tools

| Framework / tool | What it is | Main purpose | When it helps |
|---|---|---|---|
| [React Native](https://reactnative.dev/) | Core native UI framework | Build Android/iOS apps with React components | The foundation of every app in this guide |
| [Expo](https://docs.expo.dev/) | React Native framework and toolchain | Development server, native modules, configuration, builds, and updates | A practical starting point for learning and production apps |
| [React Native Community CLI](https://github.com/react-native-community/cli) | Command-line tooling | Set up and operate native Android/iOS projects directly | Teams that need to manage native project files themselves |
| [Expo Router](https://docs.expo.dev/router/introduction/) | Routing framework | Map route files to screens, layouts, and deep links | Expo apps with file-based navigation |
| [Ignite](https://ignitecookbook.com/) | Application starter / boilerplate | Provide an opinionated project structure and conventions | Starting with an established architecture |
| [Solito](https://solito.dev/) | Cross-platform navigation utilities | Share navigation-related code between React Native and Next.js | A product with mobile and Next.js applications |
| [Tamagui](https://tamagui.dev/) | UI and styling system | Share components, themes, and styling across web/native | A shared cross-platform design system |
| [NativeWind](https://www.nativewind.dev/) | Styling library | Use Tailwind-style utility classes with native components | Developers who prefer utility-based styling |
| [Expo Application Services (EAS)](https://docs.expo.dev/eas/) | Hosted development services | Cloud builds, store submission, and compatible app updates | Building and distributing Android/iOS apps |

For your first exercises, use **React Native + Expo + TypeScript + Expo Router**, then add a library when a feature needs it. Expo and React Native work together. EAS is a service; Tamagui and NativeWind provide UI/styling rather than replacing React Native.

## 2. Navigation

| Library | Purpose | How to choose |
|---|---|---|
| [Expo Router](https://docs.expo.dev/router/introduction/) | File-based routes, layouts, stack/tab navigation, and deep links | Use it for this repository; route files live in src/app |
| [React Navigation](https://reactnavigation.org/docs/getting-started/) | Explicitly configured stacks, tabs, drawers, and nested navigators | An alternative when choosing a navigation architecture for another app |
| [React Native Navigation — Wix](https://wix.github.io/react-native-navigation/docs/before-you-start/) | Navigation using native screen containers | Consider when its native setup and navigation model suit the project |

Expo Router integrates React Navigation concepts and navigator APIs. However, **SDK 56 and later changed how those APIs are imported in Router apps**: follow the [SDK 55 → 56 migration guide](https://docs.expo.dev/router/migrate/sdk-55-to-56/) instead of copying older direct @react-navigation imports. Do not install a second navigation system merely to create another screen.

## 3. State management

State is data that changes over time. Local input state, shared client state, fetched server data, and persisted data have different owners.

| Tool | State model / purpose | Example | Learning effort* |
|---|---|---|---|
| [useState / useReducer](https://react.dev/learn/managing-state) | Built-in React local state | Input text, expanded panels, related screen transitions | Low to moderate |
| [React Context](https://react.dev/reference/react/createContext) | Built-in value sharing through a component tree | Theme or a small shared settings object | Low initially; update design matters |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Structured global store with slices/actions | Many related business features and explicit updates | Moderate |
| [Zustand](https://zustand.docs.pmnd.rs/) | Small store with actions and selectors | Shared counter/profile, as in this sample | Low |
| [Jotai](https://jotai.org/) | State organized into atoms | Small independent values and derived state | Moderate |
| [MobX](https://mobx.js.org/README.html) | Observable state with reactive tracking | Observable domain models | Moderate |
| [XState](https://stately.ai/docs/xstate) | State machines and actors | Checkout, onboarding, or multi-step workflows | Higher |

*Learning effort is an approximate teaching judgment, not an official rating. Context shares a value; it does not automatically add caching, persistence, or store selectors. A store also does not automatically survive an app restart.

Start with local state. Share state only when multiple screens need it. Use a server-state tool for API caching, and storage for persistence; putting everything into a global client store creates unnecessary synchronization work.

## 4. API requests and server state

| API / library | Purpose | Practical distinction |
|---|---|---|
| [Fetch API](https://reactnative.dev/docs/network) | Built-in HTTP requests | No HTTP library needed; handle status, parsing, loading, and errors |
| [Axios](https://axios.rest/pages/getting-started/first-steps) | HTTP client with interceptors and request configuration | Useful for shared request handling; not a server cache |
| [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/react-native) | Query caching, retries, mutations, and invalidation | Connect native app focus/network lifecycle as documented |
| [RTK Query](https://redux.js.org/toolkit/rtk-query/overview) | API fetching and caching within Redux Toolkit | A convenient option for apps already using Redux |
| [Apollo Client](https://www.apollographql.com/docs/react/integrations/react-native) | GraphQL queries, mutations, and caching | Choose when working with a GraphQL API |
| [SWR](https://github.com/vercel/swr) | Hook-based fetching, revalidation, and caching | Supply a fetcher and account for native lifecycle behavior |

Fetch/Axios handle transport; TanStack Query, RTK Query, Apollo, and SWR manage server data. For example, TanStack Query can call fetch or Axios. Usually choose one cache owner for a particular API feature.

## 5. UI components and styling

| Library / API | Purpose | Selection note |
|---|---|---|
| [React Native core components and StyleSheet](https://reactnative.dev/docs/components-and-apis) | Basic native UI and styles | Learn View, Text, TextInput, Pressable, and FlatList first |
| [React Native Paper](https://reactnativepaper.com/) | Material Design components | Useful for consistent buttons, inputs, dialogs, and themes |
| [React Native Elements / RNEUI](https://reactnativeelements.com/) | Ready-made component collection | Evaluate component and theme needs |
| [Tamagui](https://tamagui.dev/) | Cross-platform components, themes, and styling | Useful for shared web/mobile UI |
| [NativeWind](https://www.nativewind.dev/) | Tailwind-style utility classes | Requires its own setup; browser CSS support is not universal |
| [Gluestack UI](https://gluestack.io/) | Customizable UI components | Review the current component/setup workflow |
| [React Native UI Lib — Wix](https://wix.github.io/react-native-ui-lib/) | UI toolkit and design-system utilities | Evaluate its components and native dependencies |
| [React Native Reusables](https://reactnativereusables.com/) | Composable UI patterns inspired by shadcn/ui | Useful when you want to own and customize component code |
| [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) | Multiple icon collections | Follow current family-specific package instructions |
| [Lucide React Native](https://lucide.dev/guide/react-native) | Lucide icon components | Uses native SVG support; follow dependency setup |

Pick a primary component system for consistent appearance. An icon library can complement it. Web Material UI components cannot be pasted into native screens; React Native Paper is an alternative with different components and props.

## 6. Forms and validation

| Library | Purpose | React Native adaptation |
|---|---|---|
| [React Hook Form](https://github.com/react-hook-form/react-hook-form) | Field state, errors, and submission | Connect TextInput with Controller, value, onChangeText, and onBlur |
| [Formik](https://formik.org/) | Form values, touched state, errors, and submission | Connect native inputs and a button/Pressable submit action |
| [Zod](https://zod.dev/) | TypeScript-oriented schema validation | Validate JavaScript values; combine with a form library if useful |
| [Yup](https://github.com/jquense/yup) | Schema validation | Validate values and map errors to field messages |

React Hook Form/Formik manage forms; Zod/Yup define rules. They serve different roles and can be combined. Native screens have no HTML form submit event or browser required-field validation. For a small form, use controlled inputs and a validation function, as in [the sample registration screen](./src/app/register.tsx). See the [side-by-side examples](./README_REACT_VS_REACT_NATIVE.md) for code.

## 7. Storage and databases

| Library | Purpose | Suitable data / important behavior |
|---|---|---|
| [AsyncStorage](https://github.com/react-native-async-storage/async-storage) | Asynchronous persistent key-value storage | Ordinary preferences or small JSON data; not encrypted secret storage |
| [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/) | Platform-backed secure key-value storage | Small sensitive values; review platform/backup behavior |
| [React Native MMKV](https://github.com/margelo/react-native-mmkv) | Fast native key-value storage | Frequently accessed values; needs compatible native setup |
| [Expo SQLite](https://docs.expo.dev/versions/v57.0.0/sdk/sqlite/) | Local SQL database | Structured records, queries, and transactions |
| [WatermelonDB](https://watermelondb.dev/docs) | Reactive local database for offline-oriented apps | Larger local datasets; server synchronization requires a design |
| [Realm](https://github.com/realm/realm-js) | Local object database | Persist object models; evaluate current SDK compatibility and maintenance |

Storage and React state are separate: reading stored data does not automatically update every screen. Load it into state, show a loading state where appropriate, and save changes deliberately. Persistence is also separate from backend synchronization.

## 8. Animations, gestures, and graphics

| Library / API | Purpose | Example |
|---|---|---|
| [Animated](https://reactnative.dev/docs/animated) | Built-in animation API | Basic fade or movement |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | Advanced native animations | Gesture-driven transitions and animated styles |
| [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) | Native touch/gesture recognition | Pan, pinch, swipe, and coordinated gestures |
| [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native) | Render supported exported animation files | A designer-created loading/success animation |
| [React Native Skia](https://github.com/Shopify/react-native-skia) | Custom 2D graphics rendering | Drawing, effects, or custom visualizations |
| [Moti](https://moti.fyi/) | Declarative animations built on Reanimated | Reusable entrance/exit animation patterns |

These can complement one another, but they add setup and compatibility considerations. Match Reanimated and its required companion dependencies to your Expo SDK; use the maintainer's current installation guide.

## 9. Device features

The linked Expo pages are the official module references. Select the version matching your installed Expo SDK when reading them; this repository currently declares SDK 57.

| Library | Purpose | What to handle in the app |
|---|---|---|
| [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/) | Camera preview/capture | Permission, denial, and device availability |
| [Expo ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/) | Select or capture images/videos | Cancellation, permissions, and upload/file handling |
| [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/) | Location access | Foreground/background permission and platform requirements |
| [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) | Local/push notification support | Permission, token registration, and backend push delivery |
| [Expo FileSystem](https://docs.expo.dev/versions/latest/sdk/filesystem/) | Files and directories | SDK-specific API and file lifecycle |
| [Expo Image](https://docs.expo.dev/versions/latest/sdk/image/) | Image rendering and caching | Loading, sizing, caching, and accessibility |
| [Expo LocalAuthentication](https://docs.expo.dev/versions/latest/sdk/local-authentication/) | Biometric authentication prompts | Hardware/enrollment availability and fallback behavior |
| [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) | Tactile feedback | Supported device/platform behavior |
| [Expo Sharing](https://docs.expo.dev/versions/latest/sdk/sharing/) | Share files with other apps | Availability and platform-specific file sharing |
| [React Native Maps](https://github.com/react-native-maps/react-native-maps) | Native map views | Map provider configuration, keys, and native builds |
| [React Native WebView](https://github.com/react-native-webview/react-native-webview) | Embed web content in a native screen | Navigation policy and communication with page content |

Biometric device authentication does not itself sign a user into your backend. Notifications need more than a UI library: remote delivery also requires credentials, a delivery service, and token management. Android/iOS permissions and capabilities differ; check each module's platform support rather than assuming web preview proves device behavior.

## 10. Testing and monitoring

| Tool | Purpose | What it verifies |
|---|---|---|
| [Jest](https://jestjs.io/docs/getting-started) | JavaScript test runner | Pure functions, logic, and configured unit tests |
| [React Native Testing Library](https://oss.callstack.com/react-native-testing-library/) | Component tests focused on user behavior | Rendered text, interaction, and validation feedback |
| [Maestro](https://docs.maestro.dev/) | End-to-end UI flows | Running application interactions on supported targets |
| [Detox](https://wix.github.io/Detox/) | End-to-end automation with app integration | Device/emulator workflows in a configured test build |
| [Sentry](https://github.com/getsentry/sentry-react-native) | Error/crash and performance monitoring | Runtime failures and diagnostics after instrumentation |

Monitoring observes failures; it does not replace tests. Jest/component tests also do not prove real camera permissions, native gestures, or platform builds work.

## 11. React web → React Native comparison

| Familiar React web tool / concept | Native counterpart | What transfers | What changes |
|---|---|---|---|
| React Router | Expo Router / React Navigation | Screens, parameters, navigation concepts | Native stacks, back behavior, deep links, and route configuration |
| Redux Toolkit | Redux Toolkit | Slices, actions, selectors | Storage adapters and native integrations |
| Zustand | Zustand | Stores, actions, selectors | Persistence backend if enabled |
| Axios | Axios | HTTP request configuration | Device network addresses and platform network policies |
| TanStack Query | TanStack Query | Queries, mutations, cache keys | App focus and connectivity integration |
| React Hook Form | React Hook Form | Rules, field state, submission | Controller/native input events rather than DOM registration |
| Zod / Yup | Zod / Yup | Value schemas and validation | Error presentation in native Text components |
| Tailwind CSS | NativeWind | Utility-style authoring approach | Setup, supported styles, and native layout rules |
| Material UI | React Native Paper | Component-library/design-system approach | Different components, props, themes, and native rendering |
| localStorage | AsyncStorage | Persistent key-value concept | Asynchronous API; serialize/parse values; no window.localStorage |
| DOM tags | React Native core components | JSX composition | View/Text/TextInput/Pressable, native props and events |
| Framer Motion | Reanimated / Moti | Animation/transition concepts | Different animation APIs and execution model |
| Browser fetch | React Native fetch | Promise-based requests | Native networking constraints; emulator localhost differs from your computer |
| CSS files | StyleSheet / styling system | Many familiar style names | JavaScript styles, native supported properties, no general browser cascade |
| Browser URL navigation | Native routes and deep links | Route identifiers and parameters | OS links, navigation history, screen lifecycle |

Several JavaScript libraries transfer directly. UI, browser APIs, and navigation integrations need adaptation. “Counterpart” means a similar role, not interchangeable code. See the [complete comparison with simple code examples](./README_REACT_VS_REACT_NATIVE.md).

## 12. Choose a small stack for practice

| Practice goal | Start with | Add when needed |
|---|---|---|
| Learn screens and inputs | Expo + TypeScript + Expo Router + native components | Nothing else initially |
| Share state between screens | Local React state + existing Zustand store | Persistence only when restart behavior is a requirement |
| Build larger validated forms | React Hook Form + Zod | Resolver integration and deliberate error messages |
| Fetch a product list | fetch + TanStack Query | Pagination, native lifecycle integration, and mutation invalidation |
| Save ordinary preferences | AsyncStorage | Store hydration/loading behavior |
| Access a camera or location | Relevant Expo module | Permission handling and an appropriate device build |
| Build consistent Material UI | React Native Paper | Theme and icons |
| Test a registration flow | Component tests | Maestro or Detox for device flows |

These are learning choices, not requirements to combine all packages. The current manual form is useful for understanding validation before introducing a form library.

## 13. Installation and platform checklist

Run dependency commands from the app folder containing package.json. For this repository, use the root folder. Install only the packages for the feature you choose. These commands are examples; they were not executed as part of writing this catalogue.

```powershell
# Optional: form management plus schema validation
npx expo install react-hook-form zod @hookform/resolvers

# Optional: API caching (fetch is already available)
npx expo install @tanstack/react-query

# Optional: ordinary preference storage
npx expo install @react-native-async-storage/async-storage

# Optional: camera feature
npx expo install expo-camera

# Check SDK dependency compatibility
npx expo-doctor
```

Installing a package is only the first step: some need providers, configuration plugins, permission descriptions, native dependencies, or a rebuilt app. Follow the official setup instructions linked above. Expo's installer selects known SDK-compatible versions where available; it cannot guarantee every third-party package combination works.

| Development target | What to check |
|---|---|
| Web preview | Explicit web support; mobile-only modules may have limited or no browser implementation |
| Expo Go | The matching client must include the native module and support the required feature |
| Development build | Custom native dependencies/configuration must be compiled into your own app; rebuild after native changes |
| Android local build | Android Studio, SDK, compatible JDK, and an emulator/device |
| iOS local build | macOS, Xcode, and a simulator/device |
| EAS cloud build | Build configuration and signing; store distribution still has account/platform requirements |

For native dependencies unavailable in Expo Go, use a development build. Windows can run Android tooling and request cloud builds; local iOS compilation and the iOS Simulator require macOS. Read the [installation guide](./REACT_NATIVE_COMPLETE_GUIDE.md#4-tools-and-installation-paths) and [versioned Expo SDK documentation](https://docs.expo.dev/versions/v57.0.0/) before changing native setup.

## 14. Interview practice using this catalogue

| Question | Short answer |
|---|---|
| Is Expo a replacement for React Native? | It is a framework/toolchain built around React Native, with modules and development services. |
| What is the difference between client state and server state? | Client state belongs to UI/app interactions; server state is remotely owned data whose cache must be refreshed and invalidated. |
| Why use TanStack Query with Axios? | Axios performs requests; Query manages cached results, loading/error states, retries, and mutations. |
| Does Zustand persist data automatically? | No. Persistence must be configured with a storage adapter and appropriate serialization/hydration. |
| Why use Controller with React Hook Form? | Native inputs expose native props/events instead of the HTML input/ref interface expected by common DOM registration patterns. |
| Can localStorage store data in an iOS screen? | A native screen has no browser localStorage; choose native storage and handle its API. |
| Can every library run in Expo Go? | No. It can use only the native code bundled into its compatible client; other native code requires your own build. |
| Is a native component library the same as a web component library? | They may solve similar design problems, but rendering, props, dependencies, and accessibility behavior differ. |

Continue with [80 interview questions and answers](./REACT_NATIVE_COMPLETE_GUIDE.md#16-interview-questions-and-answers), then explain these choices using a feature you actually built.
