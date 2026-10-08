# React Native for a React developer: setup, code, architecture, and interviews

Prepared: 8 October 2026. Audience: you already understand React web and want to build Android and iOS apps.

This is a practical learning handbook, not a promise that one document covers every platform API. Examples use TypeScript. The accompanying `learning-app` demonstrates stack navigation, a validated registration form, and shared state. Read `SETUP_STATUS.md` for what was actually installed and verified on this computer.

## Contents

1. [What React Native is and why use it](#1-what-react-native-is-and-why-use-it)
2. [React web vs React Native vs platform-native](#2-react-web-vs-react-native-vs-platform-native)
3. [Syntax and component translation](#3-syntax-and-component-translation)
4. [Tools and installation paths](#4-tools-and-installation-paths)
5. [Windows quick start with Expo](#5-windows-quick-start-with-expo)
6. [Android Studio and Android SDK setup](#6-android-studio-and-android-sdk-setup)
7. [iOS support from Windows and macOS](#7-ios-support-from-windows-and-macos)
8. [Project structure and development workflow](#8-project-structure-and-development-workflow)
9. [Layout, styling, and components](#9-layout-styling-and-components)
10. [State types and management choices](#10-state-types-and-management-choices)
11. [Forms and validation](#11-forms-and-validation)
12. [Routing and navigation](#12-routing-and-navigation)
13. [APIs, storage, permissions, and lifecycle](#13-apis-storage-permissions-and-lifecycle)
14. [Architecture, performance, and testing](#14-architecture-performance-and-testing)
15. [Builds, release, and troubleshooting](#15-builds-release-and-troubleshooting)
16. [Interview questions and answers](#16-interview-questions-and-answers)
17. [Practice plan and exercises](#17-practice-plan-and-exercises)
18. [Official reference library](#18-official-reference-library)

## 1. What React Native is and why use it

React defines components, hooks, state, and rendering rules. React DOM renders React components into browser elements. React Native renders React components using native platform UI. A React Native app normally runs JavaScript through a mobile JavaScript runtime and uses native functionality through React Native and its libraries.

React Native is not simply your React website inside a browser window. A WebView is a separate component you can choose when embedded web content is appropriate. JSX does not imply HTML: `<View>` and `<Text>` belong to the native renderer. [Core components](https://reactnative.dev/docs/intro-react-native-components)

Why a team might choose it:

- Existing React knowledge transfers: components, hooks, composition, props, and immutable state.
- Business rules, validation, API clients, types, and much UI code can be shared across Android and iOS.
- One feature team can deliver both mobile platforms while using native modules where required.
- Fast Refresh supports a quick edit-and-observe workflow.

Tradeoffs to evaluate: platform integration still requires platform knowledge; native dependencies can complicate upgrades; accessibility, permissions, keyboards, and performance need device testing. Choose Swift/Kotlin when deep platform customization or existing native infrastructure makes that the better fit. Choose a responsive website when installation and app-store delivery add little value. This is an engineering decision based on your app, not a universal winner.

## 2. React web vs React Native vs platform-native

| Topic | React web | React Native | Platform-native Android / iOS |
|---|---|---|---|
| Main language | JS/TS + JSX | JS/TS + JSX; native code when needed | Kotlin/Java; Swift/Objective-C |
| UI renderer | DOM/browser | Native renderer | Platform SDK UI |
| UI primitives | div, p, input, button | View, Text, TextInput, Pressable | Compose/Views; SwiftUI/UIKit |
| Layout | Browser CSS | Style objects and Yoga layout | Platform layout systems |
| Events | onClick, DOM change event | onPress, onChangeText, native events | Platform callbacks |
| Navigation | URLs and browser history | Screen stacks/tabs, deep links | Platform navigation APIs |
| Storage | localStorage, IndexedDB, cookies | Storage libraries and platform secure storage | Platform storage APIs |
| Device features | Browser APIs and permissions | Native modules and permissions | Direct SDK integration |
| Build | Web bundle | JS/assets plus Android/iOS binary | Android/iOS binary |
| Distribution | URL/web hosting | Play Store, App Store, internal builds | Same native distribution routes |
| Sharing | Browser code | Substantial cross-platform reuse | Usually separate platform UI code |
| Debugging | Browser tools | React Native tools + platform tools | Android Studio/Xcode tools |
| iOS local build on Windows | Web works in browser | Requires macOS build environment | Requires macOS build environment |

What stays familiar: `useState`, `useReducer`, `useEffect`, `useContext`, refs, props, custom hooks, React.memo, composition, and TypeScript. What changes most: rendering primitives, layout constraints, input events, navigation lifecycle, device APIs, and distribution.

Do not copy DOM-dependent packages into native code without checking support. A pure validation utility may work unchanged; a library that accesses browser elements may not. Native support is a property of the library, not its npm availability.

## 3. Syntax and component translation

| Web habit | Native equivalent / difference |
|---|---|
| `<div>` | `<View>` |
| `<p>`, headings, text nodes | `<Text>` with styles |
| `<button onClick={fn}>` | `<Pressable onPress={fn}><Text>...</Text></Pressable>` |
| `<input onChange={e => ...}>` | `<TextInput onChangeText={text => ...}>` |
| `className="card"` | `style={styles.card}` unless a styling library adds another API |
| `style={{ backgroundColor: ... }}` | Similar object syntax; supported properties differ |
| `<img src={url}>` | `<Image source={{ uri: url }} style={{ width: 80, height: 80 }}>` |
| Imported/local image | `<Image source={require('./assets/icon.png')}>` |
| `overflow: auto` | ScrollView or FlatList |
| `<form onSubmit>` | Explicit submit handler on a button; no HTML form element |
| `<a href>` | Navigation library Link, or Linking for external URLs |
| `window.innerWidth` | `useWindowDimensions()` |
| `localStorage` | AsyncStorage for nonsensitive data; secure storage for credentials |
| `alert(...)` | `Alert.alert(...)` on native; inline messages also work cross-platform |
| CSS media query | Responsive logic using dimensions, breakpoints, platform styles |
| `position: fixed` | Layout/absolute positioning relative to a parent or navigation layer |
| DOM `document.querySelector` | Usually refs and declarative state; no browser document assumption |

### Same feature, different syntax

React web:

```tsx
const [name, setName] = useState('');
return (
  <div>
    <input value={name} onChange={e => setName(e.target.value)} />
    <button onClick={() => console.log(name)}>Save</button>
  </div>
);
```

React Native:

```tsx
import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export function NameEditor() {
  const [name, setName] = useState('');
  return (
    <View style={styles.card}>
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />
      <Pressable accessibilityRole="button" onPress={() => console.log(name)}>
        <Text>Save</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  card: { padding: 16, gap: 12 },
  input: { borderWidth: 1, borderColor: '#777', padding: 12, borderRadius: 8 },
});
```

`onChangeText` receives the text directly. Native `onChange` is a different callback with a native event payload. Keep text inside `Text`, including button labels. [TextInput API](https://reactnative.dev/docs/textinput)

## 4. Tools and installation paths

“Google Studio” in this context means **Android Studio**, Google's Android IDE.

| Tool | Purpose | When needed |
|---|---|---|
| Node.js LTS + npm | JS tooling, dependencies, Metro | All local JS development |
| Expo | React Native framework/tooling and native libraries | Recommended learning path in this handbook |
| Metro | Bundles JS and assets for development/builds | RN development |
| Android Studio | SDK management, emulator, native debugging | Local Android emulator/native builds |
| Android SDK | Android build tools and APIs | Local Android native builds |
| ADB | Device connection, installation, logs | Android development |
| JDK | Runs Java-based Android build tooling | Local Android native builds |
| Gradle | Android build system | Managed by the native project |
| Xcode | Apple SDKs, signing, simulator, native builds | Local iOS development on a Mac |
| CocoaPods/Bundler | Native iOS dependency tooling | Depending on the native project |
| EAS Build | Expo's hosted build service | Optional cloud builds |

There are three useful paths:

1. **Expo Go**: quickest learning loop with supported bundled native libraries. No Android SDK is needed when testing through Expo Go on a physical phone.
2. **Expo development build**: your own debug binary including your chosen native dependencies. Rebuild when native dependencies/configuration change.
3. **React Native Community CLI**: direct ownership of Android/iOS projects. Useful when project constraints call for it; more setup work.

Expo Go is not the production binary for your app. Expo development builds support custom native code; “Expo can never use native code” is an outdated assumption. [Expo workflow](https://docs.expo.dev/workflow/overview/), [development builds](https://docs.expo.dev/develop/development-builds/introduction/)

## 5. Windows quick start with Expo

### Step 1: check Node and npm

Open PowerShell:

```powershell
node --version
npm.cmd --version
```

Use a supported Node LTS release matching your selected Expo/RN version. On this machine the check returned Node `v24.21.0` and npm `11.19.0`. `npm.cmd` and `npx.cmd` avoid the common PowerShell script-policy error affecting npm.ps1.

If Node is missing, install the Windows LTS installer from [Node.js](https://nodejs.org/en/download), close the terminal, and open it again. Do not globally install the old `expo-cli` or `react-native-cli` for these instructions.

### Step 2: create a project

For the file-based routing default template:

```powershell
npx.cmd create-expo-app@latest my-mobile-app
cd my-mobile-app
npx.cmd expo start
```

For a minimal TypeScript project like the accompanying sample:

```powershell
npx.cmd create-expo-app@latest learning-app --template blank-typescript
cd learning-app
```

Do not rerun project creation over the existing sample. Use `npm.cmd install` inside it. Templates can change; inspect the generated package.json and entry file instead of assuming every template has App.tsx. [Create a project](https://docs.expo.dev/get-started/create-a-project/), [CLI templates](https://docs.expo.dev/more/create-expo/)

### Step 3: start the accompanying sample

From this React Native folder:

```powershell
cd learning-app
npm.cmd install
npm.cmd run typecheck
npm.cmd start
```

For web preview:

```powershell
npm.cmd run web
```

For Android, start an emulator first and press `a` in Expo's terminal, or scan the QR code with Expo Go on a compatible Android phone. For iPhone, use Expo Go and follow its current account/device requirements. Keep phone and computer on the same accessible network. If LAN fails, investigate firewall/network isolation; Expo's tunnel option is another development transport and can require additional tooling.

### Step 4: understand the run loop

Metro starting successfully means the development server runs. Web loading proves the web build. An Android/iOS device actually loading and interacting with the app proves that platform run. These are separate checks; see the status file for evidence from this session.

## 6. Android Studio and Android SDK setup

### A. Install Android Studio

1. Download Windows Android Studio from [Google's official download page](https://developer.android.com/studio).
2. Run the installer and include Android Studio and the Android Virtual Device component when offered.
3. Launch Studio and complete the setup wizard; let it download its SDK components.
4. Open **More Actions → SDK Manager** on the welcome screen, or Android SDK settings in an open project.
5. Record the exact SDK location. Common location: `C:\Users\Sakthi\AppData\Local\Android\Sdk`.

You can continue editing JS/TS in any editor. Android Studio provides the Android tooling. [Installation guide](https://developer.android.com/studio/install)

### B. Install the required SDK packages

In SDK Manager, install the project's compile SDK platform, Build-Tools, Platform-Tools, Command-line Tools, Emulator, and a suitable emulator system image. Install the NDK/CMake versions when your project requests them. The project and its versioned docs determine exact versions; an emulator API is not the same as compileSdk or minSdk.

For this sample, Expo SDK 57 targets React Native 0.86, React 19.2.3, Android compile/target SDK 36, and iOS 16.4+. Its reference lists minimum Node 22.13.x and Xcode 26.4+ for local iOS builds. The generic RN setup page recommends JDK 17, but SDK platform examples there can differ from this Expo template. Follow your project's SDK requirement rather than copying another version's platform 35 example. [Expo SDK 57 reference](https://docs.expo.dev/versions/v57.0.0/), [RN environment setup](https://reactnative.dev/docs/set-up-your-environment)

### C. Configure Windows environment variables

Open Windows **Edit environment variables for your account**:

1. Add `ANDROID_HOME` with the SDK location recorded in Studio.
2. Add these separate entries to your user `Path`:
   - `C:\Users\Sakthi\AppData\Local\Android\Sdk\platform-tools`
   - `C:\Users\Sakthi\AppData\Local\Android\Sdk\emulator`
   - `C:\Users\Sakthi\AppData\Local\Android\Sdk\cmdline-tools\latest\bin`
3. For native builds, install the recommended JDK and set `JAVA_HOME` to its root folder, not its bin folder.
4. Reopen PowerShell and verify:

```powershell
java -version
adb version
emulator -list-avds
```

To set SDK paths for the current terminal only, after checking the actual location:

```powershell
$env:ANDROID_HOME = 'C:\Users\Sakthi\AppData\Local\Android\Sdk'
$env:Path += ';' + $env:ANDROID_HOME + '\platform-tools'
$env:Path += ';' + $env:ANDROID_HOME + '\emulator'
```

These changes last only for that shell. Do not replace your entire Path variable.

### D. Create and start an emulator

1. Open **Device Manager** and create a virtual phone.
2. Select a phone profile and compatible system image; download it if needed.
3. Finish the AVD wizard and press its play button.
4. Wait for Android to finish booting.
5. Run `adb devices`; the emulator should appear with `device` status.
6. Run the Expo app and press `a`.

On Windows, check firmware virtualization and use the current Windows Hypervisor Platform guidance. Enabling virtualization/Windows features can require administrator access and a reboot. Old HAXM tutorials are not a good default. [Google's emulator acceleration guide](https://developer.android.com/studio/run/emulator-acceleration)

### E. Physical Android phone alternative

Expo Go requires its app and network access, not USB debugging. For installing/debugging your own native binary: enable Developer Options and USB debugging, connect with a data-capable cable, approve the computer on the phone, then check `adb devices`. OEM USB drivers may be required. `unauthorized` means the phone has not approved the connection; no device can also mean a cable/driver problem.

### F. Local native builds

Expo, after installing the Android toolchain:

```powershell
npx.cmd expo install expo-dev-client
npx.cmd expo run:android
```

Community CLI alternative, in a separate project:

```powershell
npx.cmd @react-native-community/cli@latest init NativePractice
cd NativePractice
npm.cmd start
# In another terminal in NativePractice:
npm.cmd run android
```

Do not mix creation commands or blindly install a newer React Native inside an Expo project. Use Expo's compatible dependency versions.

## 7. iOS support from Windows and macOS

React Native uses platform implementations of shared components. Shared business logic can run on both platforms; native APIs, permission text, signing, styling details, and testing still differ.

| Activity | Windows | Mac |
|---|---|---|
| Write shared React Native code | Yes | Yes |
| Test supported code on real iPhone via Expo Go | Yes | Yes |
| Run Apple's iOS Simulator locally | No | Yes, through Xcode |
| Compile/sign iOS locally | No | Yes, with Apple tooling |
| Request an EAS hosted iOS build | Yes | Yes |
| Fully debug custom iOS native code locally | Needs a Mac environment | Yes |

On a Mac: install a supported Xcode, select Command Line Tools in Xcode settings, install an iOS Simulator runtime, and follow the native project's Ruby/Bundler/CocoaPods setup when applicable. With Expo run `npx expo run:ios`; with a Community CLI project use its iOS script and native dependency instructions. Xcode workspaces are used when the dependency setup generates them.

From Windows, EAS can use hosted macOS builders. Signing, provisioning, distribution, account permissions, and applicable service fees still apply. Cloud builds do not turn Windows into an iOS Simulator host. [RN environment setup](https://reactnative.dev/docs/set-up-your-environment), [EAS Build](https://docs.expo.dev/build/introduction/)

Platform-specific code:

```tsx
import { Platform } from 'react-native';
const topPadding = Platform.OS === 'ios' ? 12 : 8;
const stylesForPlatform = Platform.select({
  ios: { padding: 12 },
  android: { padding: 10 },
  default: { padding: 8 },
});
```

For larger differences create `CameraButton.ios.tsx` and `CameraButton.android.tsx`, then import `./CameraButton`. Use shared code where it reads clearly; isolate genuine platform differences rather than filling every component with branches.

## 8. Project structure and development workflow

Suggested structure as the app grows:

```text
learning-app/
  src/
    app/                  # sample routes and _layout.tsx stack
    components/           # reusable native UI
    screens/              # Home, Register, Profile
    navigation/           # route types, navigators
    stores/               # shared client state
    services/             # API requests
    hooks/                # reusable behavior
    validation.ts         # pure form rules
  assets/
  app.json                # Expo app configuration
  package.json            # scripts and dependency versions
  package-lock.json       # exact resolved dependency tree
```

In Expo Router projects, screens live in the template's `app/` or `src/app/` directory and `_layout.tsx` configures layouts. The sample uses Expo Router in `src/app/`; this guide also shows direct React Navigation to explain the underlying building blocks.

Keep the lockfile. After checkout use `npm ci` for a clean reproducible dependency install. Use `npx expo install <native-package>` for Expo-compatible versions. A JavaScript-only package can generally use npm. After changing native modules or config plugins, rebuild the development binary. Metro cache reset alone cannot add native code to an existing binary.

## 9. Layout, styling, and components

Native layout is not a complete browser CSS environment. Learn supported properties and test on both platforms. Common differences: default `flexDirection` is `column`; numeric sizes are density-independent layout values; default flex shrink differs from web. [Flexbox](https://reactnative.dev/docs/flexbox)

```tsx
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f4f6fb' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { fontSize: 24, fontWeight: '700', color: '#10233f' },
  card: { padding: 16, borderRadius: 12, backgroundColor: 'white' },
});
// Later styles override earlier ones:
<View style={[styles.card, selected && { borderWidth: 2 }]} />
```

Use `flex: 1` to fill available space when the parent establishes dimensions. A horizontal row needs `flexDirection: 'row'`. Text styling belongs on Text; do not assume every View font property inherits into children.

| Component | Use |
|---|---|
| View | Container/layout |
| Text | Text, nesting text, text styling |
| Pressable | Touch interaction and pressed-state styling |
| TextInput | Editable text |
| Image | Local or remote image; provide appropriate dimensions |
| ScrollView | Small finite scrollable content/form |
| FlatList | Long or growing collection |
| SectionList | Grouped collection |
| KeyboardAvoidingView | Adjust around keyboard; test behavior per platform |
| ActivityIndicator | Loading indication |
| Modal | Overlay presentation |
| Switch | Boolean input |
| SafeAreaView from safe-area-context | Protect content from insets when configured appropriately |

### Long list example

```tsx
<FlatList
  data={users}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <Text style={{ padding: 16 }}>{item.name}</Text>}
  ListEmptyComponent={<Text>No users yet.</Text>}
  refreshing={refreshing}
  onRefresh={refreshUsers}
/>
```

Use stable IDs and immutable data updates. `extraData` matters when rendering depends on data outside the `data` array. Offscreen rows can be unmounted, so important row state belongs in item data or an external owner. `getItemLayout` is useful when dimensions are known accurately. [FlatList](https://reactnative.dev/docs/flatlist)

Accessibility: label controls clearly, use appropriate roles, expose disabled state, permit font scaling, test screen readers and large text, and avoid color as the only error signal. Mobile layouts must also handle small screens, landscape, keyboards, and safe areas.

## 10. State types and management choices

React Native uses React state concepts. There is no special requirement to replace `useState` with Redux because the renderer changed.

| State category | Example | Suitable owner |
|---|---|---|
| Local UI | Password visible, modal open, selected tab in a component | useState |
| Complex local transitions | Multi-step wizard | useReducer |
| Shared client state | Cart, user preference, selected workspace | Context, Zustand, Redux Toolkit |
| Server data | Products, profile fetched from API | TanStack Query or RTK Query |
| Form state | Values, touched, errors, submitting | useState or React Hook Form |
| Navigation state | Current screen, route params, history | Navigation library |
| Persisted data | Saved preference or draft | Storage plus hydration logic |
| Derived values | Total price, full name, filtered list | Compute from source data |
| App lifecycle | Active, inactive, background | AppState subscription |

Persisted storage is not automatically a reactive state store. Loading a value does not notify every component unless you connect it to state. Avoid storing the same server record in several stores without a clear synchronization strategy. [React state organization](https://react.dev/learn/managing-state)

### useState

```tsx
const [count, setCount] = useState(0);
setCount(previous => previous + 1);
const [profile, setProfile] = useState({ name: '', city: '' });
setProfile(previous => ({ ...previous, city: 'Chennai' }));
```

Functional updates matter when the new value depends on the previous value. State is a snapshot for that render, not a mutable variable you read immediately after a setter.

### useReducer

```tsx
type State = { count: number };
type Action = { type: 'increment' } | { type: 'reset' };
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'reset': return { count: 0 };
  }
}
const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'increment' });
```

Reducers make transitions explicit; they are not only for Redux. Keep reducers pure. Effects or event handlers perform external operations.

### Context

Good for providing a theme or a scoped dependency. Context distributes a value; useState/useReducer or another store owns updates. Consumers can rerender when the provider value changes. Separate unrelated values and consider stable provider values when needed. Avoid a single frequently-changing provider containing your entire application.

### Zustand

```tsx
import { create } from 'zustand';
type CounterStore = { count: number; increment: () => void };
export const useCounter = create<CounterStore>()(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}));
// In a component:
const count = useCounter(state => state.count);
const increment = useCounter(state => state.increment);
```

This small shared store is easy to introduce. Select only the fields the component needs. New objects returned from selectors need attention to equality/stability; simple primitive selectors are a useful starting point. [Zustand create API](https://zustand.docs.pmnd.rs/reference/apis/create)

### Redux Toolkit

```tsx
import { configureStore, createSlice } from '@reduxjs/toolkit';
const counter = createSlice({
  name: 'counter', initialState: { value: 0 },
  reducers: { increment(state) { state.value += 1; } },
});
export const store = configureStore({ reducer: { counter: counter.reducer } });
export const { increment } = counter.actions;
```

Provide this store through `Provider` from react-redux; components use typed dispatch and selectors. The mutation-like slice syntax works because Toolkit uses Immer to produce immutable results. Toolkit is useful when a team wants explicit actions, middleware, devtools, and consistent conventions. [Redux Toolkit](https://redux.js.org/toolkit/introduction/getting-started)

### Server data

TanStack Query/RTK Query handle a different problem: fetching, caching, freshness, invalidation, retries, and mutation lifecycles. A cart counter does not need a query cache. A remotely-owned product list often does. On mobile, wire focus/reconnect behavior to AppState/network status when your requirements need it; browser window focus assumptions do not automatically transfer. [TanStack Query on React Native](https://tanstack.com/query/latest/docs/framework/react/react-native)

My starting choice for this learning app: local useState for forms and visibility, Zustand for the demo profile and counter, navigation-owned history. For a real API-backed app, add a server-data cache when fetching requirements justify it.

## 11. Forms and validation

### A. Simple controlled form without a library

```tsx
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export function EmailForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  function submit() {
    const normalized = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      setError('Enter a valid email address.');
      setMessage('');
      return;
    }
    setError('');
    setMessage(`Demo accepted: ${normalized}`);
  }
  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text>Email</Text>
      <TextInput
        accessibilityLabel="Email"
        value={email}
        onChangeText={value => { setEmail(value); setError(''); setMessage(''); }}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
        style={{ borderWidth: 1, padding: 12 }}
      />
      {!!error && <Text accessibilityRole="alert">{error}</Text>}
      <Pressable accessibilityRole="button" onPress={submit}><Text>Submit</Text></Pressable>
      {!!message && <Text>{message}</Text>}
    </View>
  );
}
```

The regex is a practical UI check, not a full email specification or proof of ownership. A server validates again and email verification establishes ownership. A keyboard type helps typing; it does not validate.

### B. React Hook Form for larger forms

Install `react-hook-form` in your project. This is an alternative to the sample's manual form; it is not required to run the sample.

```tsx
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, Pressable } from 'react-native';

type Values = { email: string };
export function HookFormExample() {
  const { control, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<Values>({ defaultValues: { email: '' }, mode: 'onBlur' });
  const submit = async (values: Values) => {
    console.log('Demo value:', values.email.trim());
    // Await your API here; catch errors and show an inline message/setError.
  };
  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{ validate: value =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || 'Enter a valid email.' }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextInput ref={ref} value={value} onChangeText={onChange} onBlur={onBlur}
            accessibilityLabel="Email" autoCapitalize="none" keyboardType="email-address"
            style={{ borderWidth: 1, padding: 12 }} />
        )}
      />
      {!!errors.email && <Text>{errors.email.message}</Text>}
      <Pressable disabled={isSubmitting} accessibilityRole="button"
        onPress={handleSubmit(submit)}><Text>{isSubmitting ? 'Saving...' : 'Save'}</Text></Pressable>
    </View>
  );
}
```

Controller adapts controlled native input events to the form library. Schema validation such as Zod/Yup can centralize rules through the relevant resolver when needed. [Controller reference](https://react-hook-form.com/docs/usecontroller/controller)

### C. States the sample form uses

| State | Meaning |
|---|---|
| values | Name, email, password, confirmation, agreement |
| touched | Whether each text field has blurred |
| submitted | Show all validation errors after an attempted submit |
| showPassword | Local visibility toggle |
| submitting | Disable duplicate submissions during simulated save |
| submitError | Display a save failure if one occurs |
| profile | Shared demo profile after valid submission |

The sample validates name/email, minimum password length, matching confirmation, and agreement. It saves name/email only in memory and clears passwords before returning to Home. It does not create a real user account, contact a server, persist passwords, or prove an email address. Password rules are demonstration rules; real account policy comes from the service.

Form UX checklist: blur and submit errors, retain ordinary values after server failure, prevent duplicate submits, show pending/success/failure, provide labels and readable errors, respect the keyboard, and allow scrolling on small devices. Client validation is for feedback; the backend remains authoritative.

## 12. Routing and navigation

Mobile navigation tracks screens and history, and also coordinates headers, gestures, and platform back behavior. URL routing still matters through deep links and web support.

| Pattern | Typical purpose |
|---|---|
| Stack | Home → Details → Edit; Back returns |
| Bottom tabs | Top-level sections such as Home/Search/Profile |
| Drawer | Secondary sections behind a side menu |
| Modal | Temporary flow such as composing/editing |
| Deep link | Open a specific screen from a URL/notification |

React Navigation offers configurable navigators. Expo Router provides file-based routes and its navigation integration. In Expo SDK 56+, application code in a Router project must use the matching `expo-router` entry points rather than external `@react-navigation/*` imports; for example, `useHeaderHeight` comes from `expo-router/react-navigation`. Direct React Navigation remains an alternative in a separate non-Router project. [React Navigation setup](https://reactnavigation.org/docs/getting-started/), [Router SDK 56 migration](https://docs.expo.dev/router/migrate/sdk-55-to-56/)

### A. React Navigation installation

Inside a minimal Expo project that does not use Expo Router. These are comparison instructions, not additional steps for the included Router sample:

```powershell
npm.cmd install @react-navigation/native @react-navigation/native-stack
npx.cmd expo install react-native-screens react-native-safe-area-context
```

Example:

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, Pressable } from 'react-native';

type Routes = { Home: undefined; Details: { productId: string } };
const Stack = createNativeStackNavigator<Routes>();
function Home({ navigation }: NativeStackScreenProps<Routes, 'Home'>) {
  return <Pressable onPress={() => navigation.navigate('Details', { productId: '42' })}>
    <Text>Open product</Text>
  </Pressable>;
}
function Details({ route }: NativeStackScreenProps<Routes, 'Details'>) {
  return <Text>Product: {route.params.productId}</Text>;
}
export default function App() {
  return <NavigationContainer><Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator></NavigationContainer>;
}
```

This uses the supported dynamic API; current documentation also shows a static API. [Native stack introduction](https://reactnavigation.org/docs/hello-react-navigation/)

`navigate` moves to a route using navigator rules; `push` adds a stack entry; `goBack` returns; `replace` exchanges a stack screen; `reset` rewrites history. Send small serializable params such as IDs. Avoid functions, passwords, tokens, or duplicated full records in route params.

### B. Expo Router equivalent

In a project created with its Router template:

```text
src/app/
  _layout.tsx
  index.tsx
  products/
    [id].tsx
```

```tsx
// src/app/_layout.tsx
import { Stack } from 'expo-router';
export default function Layout() { return <Stack />; }

// In a screen:
import { router } from 'expo-router';
router.push({ pathname: '/products/[id]', params: { id: '42' } });

// In products/[id].tsx:
import { useLocalSearchParams } from 'expo-router';
const { id } = useLocalSearchParams<{ id: string }>();
```

Dynamic route segments use brackets; `(group)` folders organize route layouts without adding that group to the URL. Validate incoming params at runtime: TypeScript does not make an external URL trusted. Configure scheme/universal links/app links for the real application.

### C. Navigation lifecycle and authentication

Navigating away does not always unmount a screen. An effect with `[]` is not a reliable “every time this screen opens” hook. Use the library's focus lifecycle when required, with cleanup and appropriate query freshness.

For authentication: first restore session state, show a loading gate, then render the signed-in or signed-out navigation tree. On logout, clear credentials and user-scoped cache/state. Navigation guards improve UX; your backend still checks access on every protected request.

## 13. APIs, storage, permissions, and lifecycle

### Fetch with explicit failure and cleanup

```tsx
useEffect(() => {
  const controller = new AbortController();
  async function load() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://example.com/api/products', {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!controller.signal.aborted) setProducts(data);
    } catch (error) {
      if (!controller.signal.aborted) setError('Could not load products. Try again.');
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }
  void load();
  return () => controller.abort();
}, []);
```

The URL is illustrative and not a provided backend. In real code validate response structure before storing it, handle pagination/timeouts, and consider a query library for caching. A successful fetch call can still return HTTP 400/500; check status.

`localhost` on a physical phone means that phone, not your laptop. Android emulator commonly accesses its host through `10.0.2.2`; a physical phone uses a reachable host address. HTTPS is the normal production choice. iOS transport security and Android cleartext rules can affect local HTTP development; configure narrow development exceptions only when needed.

### Persistence and credentials

Use AsyncStorage for ordinary preferences or drafts. Use a supported secure storage library, such as Expo SecureStore, for suitable small sensitive values. Account for uninstall/reinstall, backup behavior, and platform-specific persistence rules; do not assume a secure store is a universal database.

API secrets shipped with the app can be extracted. Public client configuration is different from a server secret. Keep privileged keys on the backend; store only what the client actually needs. Do not persist raw passwords or print credentials in logs. [RN security guidance](https://reactnative.dev/docs/security)

### Permissions

Camera, location, microphone, notifications, and photo access have platform-specific configuration and runtime behavior. Use a supported library, configure native permission declarations and iOS explanation strings where required, request access when the feature needs it, and handle denied/restricted/unavailable states. Expo Go can mask configuration differences; validate your own development/release binary.

### App lifecycle

```tsx
import { AppState } from 'react-native';
useEffect(() => {
  const subscription = AppState.addEventListener('change', next => {
    console.log('Lifecycle:', next);
  });
  return () => subscription.remove();
}, []);
```

An app can move into the background without the current component unmounting. Mobile operating systems may suspend execution or terminate a process. Do not rely on ordinary JS timers for guaranteed background work; use appropriate native background APIs and follow platform limits.

## 14. Architecture, performance, and testing

### Understand the modern architecture

Know these terms:

- **JSI**: interface supporting interaction between the JS runtime and native/C++ functionality.
- **Fabric**: the modern rendering system.
- **TurboModules**: modern native module system.
- **Codegen**: generates native integration code from typed specifications.
- **Hermes**: JavaScript engine used in React Native mobile applications.
- **Yoga**: layout engine.
- **Metro**: JavaScript bundler, not the JS execution engine.

Old interviews often describe every JS/native interaction as a serialized bridge message. Explain that as legacy architecture and then describe the modern model. React Native 0.82 made the New Architecture mandatory; later versions continue that direction. Avoid suggesting “disable New Architecture” as a fix for those versions. JSI does not mean all work is synchronous or automatically faster. [Architecture](https://reactnative.dev/architecture/landing-page), [0.82 architecture transition](https://reactnative.dev/blog/2025/10/08/react-native-0.82)

### Performance approach

1. Reproduce on a representative device in a release-like build.
2. Identify whether JS work, rendering/layout, image memory, network, or native work is responsible.
3. Profile the actual slow interaction.
4. Apply one relevant fix and measure again.

Useful fixes: paginate data, simplify list rows, avoid repeated heavy computations, resize large images, subscribe to smaller store slices, use correct list virtualization, and keep expensive synchronous work off interaction paths. Native stack transitions can avoid some JS-driven animation costs. Animated's native driver supports a subset of properties; gesture/animation libraries may offer a different UI-runtime model. Memoization cannot repair every slow app and adds complexity if applied everywhere. [Performance overview](https://reactnative.dev/docs/performance), [list tuning](https://reactnative.dev/docs/optimizing-flatlist-configuration)

### Testing layers

| Layer | What to test |
|---|---|
| Pure unit tests | Validation, reducers, price calculations, mapping |
| Component behavior | User input, error messages, pending state, accessible controls |
| Integration | API errors, session restore, navigation/store interaction |
| Device E2E | Registration/login, back behavior, permissions, keyboard |
| Manual platform QA | VoiceOver/TalkBack, rotation, dark mode, slow network, small screens |

Use compatible test tooling for your selected SDK. A TypeScript check catches types, not runtime behavior. A web export catches bundling, not Android/iOS native behavior. Tests should assert meaningful outcomes, not the exact implementation structure.

## 15. Builds, release, and troubleshooting

### Development vs release

Development binaries connect to Metro and provide debugging tools. Release builds package application JS/assets with platform code. An app's backend may still require internet; a production binary does not normally need your laptop's Metro server.

For a hosted Expo build, install/use the EAS CLI, sign in, configure the project, select a build profile, then request Android/iOS builds. This can involve accounts and charges; follow current EAS documentation rather than assuming every profile is free. Android app bundles are commonly used for Play distribution; APKs suit certain direct/internal installation workflows. iOS distribution requires Apple's signing and provisioning flow. [EAS introduction](https://docs.expo.dev/build/introduction/)

Over-the-air updates can change compatible JS/assets, not introduce arbitrary new native code into an existing binary. Native changes need a new build. Configure runtime compatibility and update policies deliberately.

### Troubleshooting table

| Symptom | Check/action |
|---|---|
| npm.ps1 cannot run | Use npm.cmd / npx.cmd; inspect policy before changing it |
| Node not recognized | Install supported Node; reopen terminal; verify Path |
| Dependency download fails | Registry access, proxy, connection, permissions, error logs |
| Expo Go says incompatible SDK | Match project's SDK and device client; use a development build when required |
| Native module missing | Install compatible module and rebuild your own native binary |
| ADB missing | Install Platform-Tools; check SDK Path |
| ADB unauthorized | Accept phone's debugging prompt |
| Emulator fails to start | System image, disk/RAM, virtualization, current hypervisor settings |
| Gradle Java mismatch | Check JAVA_HOME and project-required JDK/Gradle pairing |
| SDK package missing | Install exact package required by project/build error |
| Phone cannot load Metro | Same accessible network, host address, firewall, port, tunnel option |
| Desktop preview is blank/loading | Inspect Metro's bundle progress and browser console. An HTTP 200 page shell can arrive before its JS bundle. This sample's first development bundle took about four minutes; cached requests were much faster. Investigate errors if bundling fails or never completes. |
| API works on PC only | Phone localhost differs; host binding/network/HTTPS configuration |
| Form hidden by keyboard | ScrollView, KeyboardAvoidingView, insets, keyboard taps |
| FlatList selection not updating | Immutable data/extraData/selectors and row props |
| Stale state after navigate | Screen may remain mounted; focus lifecycle/query policy |
| iOS local command on Windows fails | Use real iPhone Expo Go, hosted build, or Mac for native tooling |
| OneDrive/long path build issues | If errors point to sync/locks/path limits, use a short local nonsynced workspace |

OneDrive and spaces are possible sources of build trouble, not proof your current folder is broken. Keep this guide here as requested; move a native build workspace only if evidence calls for it.

## 16. Interview questions and answers

These are practice prompts with concise answers, not a prediction of a particular employer's interview. For each answer be able to explain a concrete example and tradeoff. See the official references above for the underlying APIs.

### Fundamentals and React transfer

**1. What is React Native?** A React renderer and mobile framework ecosystem for native applications using JS/TS. It shares React's component model while using platform UI and capabilities.

**2. React vs React Native?** React supplies UI programming concepts. React Native is one renderer/platform integration; React DOM is the browser renderer. The main differences are host components, styling, events, navigation, and deployment.

**3. Is React Native a WebView app?** Normally no. Native host components render the UI. You can explicitly embed WebView content when the feature warrants it.

**4. What React knowledge transfers?** Hooks, composition, props, state snapshots, immutable updates, context, effects, refs, and TypeScript. Browser APIs do not automatically transfer.

**5. Can all web React components be reused?** Logic-heavy components/hooks may transfer. Components using HTML, CSS, DOM APIs, or browser-only dependencies need adaptation.

**6. Why must text use Text?** The native renderer has a text host component. A raw text node under an ordinary View is not the supported text layout pattern.

**7. Props vs state?** Props are values supplied by an owner; state is data owned by a component/store that can change over time. Both participate in rendering.

**8. Why use functional state updates?** They calculate from the latest queued previous value, preventing stale-snapshot mistakes when updates depend on previous state.

**9. Why is mutating state a problem?** React/store comparisons often depend on identity. Mutation can hide changes and create unpredictable shared references. Produce new state according to the library's rules.

**10. When does useEffect run?** After the render is committed according to dependency changes. It synchronizes external systems; cleanup runs before appropriate resynchronization and on unmount. Development Strict Mode may expose cleanup bugs through extra checks.

**11. useRef vs useState?** Ref mutations do not trigger rendering. Use refs for imperative handles or values not needed to render; use state for visible UI data.

**12. What causes rerenders?** State updates, ancestor rendering, context changes, or subscribed store updates. A rerender does not imply every native view is recreated.

### Layout and interaction

**13. View vs ScrollView?** View is a layout container. ScrollView enables scrolling and generally renders its children together; it is appropriate for modest content.

**14. ScrollView vs FlatList?** FlatList virtualizes growing lists. ScrollView is convenient for short forms or finite content. Virtualized rows may unmount outside the render window.

**15. What is SectionList?** A virtualized list organized into sections, useful for grouped contacts or categorized items.

**16. Why keyExtractor?** Stable identity lets the list associate rows with records across insertions/reordering. Index keys are risky when item order changes.

**17. What is extraData?** An additional prop signaling list updates when row rendering depends on state outside the data array. Supply immutable changed references/values.

**18. What does getItemLayout do?** Supplies known row length/offset so layout can avoid measuring each row. It is wrong when the assumed heights differ from actual content.

**19. Native Flexbox differences?** Column is the default direction, layout uses native supported style properties, and defaults differ from browser Flexbox. Explain a row/column example.

**20. Does StyleSheet.create make styles browser CSS?** No. It organizes typed native style objects; supported properties/platform behavior are defined by React Native.

**21. How do style arrays work?** Later valid entries override earlier values. Conditional entries make state-dependent styles convenient.

**22. onPress vs onClick?** onPress is the standard native touch activation callback. Browser click conventions do not define native gesture behavior.

**23. onChangeText vs onChange?** onChangeText receives a text string. TextInput's onChange receives a native event; web e.target.value is not the same contract.

**24. Why KeyboardAvoidingView?** To help layout respond to the keyboard. It still needs device-specific verification, appropriate behavior/offsets, and often scrollable content.

**25. Why safe areas?** Notches, system bars, and gestures affect usable space. Consume safe-area insets appropriately rather than hardcoding a top padding for every phone.

**26. How do you handle responsive layouts?** Use flexible layout and window dimensions, limit widths where useful, support rotation/font scaling, and test devices. Do not hardcode a single phone size.

**27. How do you make a button accessible?** Give it a role and understandable label, expose disabled state, provide readable contrast/touch area, and test with assistive technology.

### State and forms

**28. Which state library is mandatory?** None. Begin with ownership requirements; useState/useReducer suffice for many local features.

**29. When useReducer?** When related transitions are complex enough that explicit actions and a pure transition function improve clarity.

**30. Is Context a Redux replacement?** Context is a delivery mechanism for values. It can support a small state solution, but Redux also supplies conventions, middleware, devtools, and store subscriptions.

**31. Why Zustand?** A small store API with selective subscriptions suits many shared client-state needs. Still design ownership and persistence carefully.

**32. Why Redux Toolkit?** It provides structured store/slice conventions and modern Redux tooling. It fits teams needing explicit actions and consistent complex workflows.

**33. Does Redux Toolkit really mutate state?** Slice reducers use Immer drafts; mutation-like code produces immutable results. This permission does not apply to arbitrary external object mutation.

**34. Client state vs server state?** Client state is locally owned interaction/business state. Server state is remote data with freshness/cache/synchronization concerns.

**35. Why use a query library?** It coordinates caching, status, invalidation, retries, and mutations. It reduces custom fetching logic when those needs are present.

**36. What is derived state?** A value computed from authoritative state, such as a cart total. Storing it independently can create inconsistent copies.

**37. What happens to state after the app restarts?** In-memory state is lost. Persist selected data and restore it with explicit loading/error/hydration behavior.

**38. How does a native form submit?** A press handler invokes validation/submission. There is no HTML form submission or preventDefault requirement for this pattern.

**39. Why React Hook Form Controller?** It adapts controlled native inputs to the form state API, mapping onChangeText, value, blur, and ref correctly.

**40. Is keyboardType validation?** No. It selects a helpful keyboard configuration. Validate entered values separately.

**41. What validation belongs on the server?** All authoritative validation, authorization, uniqueness, and policy checks. Client checks provide timely UX only.

**42. How prevent duplicate submission?** Track pending state, disable repeat submission, guard the handler, and use server idempotency where necessary.

**43. How handle server field errors?** Map known errors to fields and show a form-level fallback for unknown failures. Keep useful nonsecret input so the user can correct it.

### Navigation

**44. What does a stack navigator do?** Maintains screen history and platform-style transitions so users can move forward and back through a flow.

**45. Tabs vs stacks?** Tabs switch between peer sections. A section can contain its own stack for details/editing. Nest intentionally to avoid confusing back behavior.

**46. Native stack vs JS stack?** Native stack uses native navigation primitives; a JS stack can offer different customization. Choose based on behavior and performance requirements.

**47. navigate vs push vs replace?** navigate follows the library's route navigation rules; push adds a stack entry; replace swaps an entry. Explain the actual version/navigator semantics you use.

**48. Why keep params serializable and small?** It supports restoration/linking/debugging and avoids duplicate sources of truth. Pass a record ID and load/select the record.

**49. Does navigating away unmount a screen?** Not necessarily. Stack/tab navigators may preserve it. Focus lifecycle differs from mount lifecycle.

**50. How protect authenticated routes?** Gate navigation on restored session state and reset user-scoped state on logout. Backend checks remain mandatory.

**51. What is a deep link?** An external URL that identifies a destination in the app. Configure platform associations and validate route inputs.

**52. Expo Router vs React Navigation?** Router provides file-based routes/layout conventions and its navigation integration. React Navigation directly exposes configurable APIs. In Router SDK 56+ projects use Expo's navigation entry points, not external @react-navigation imports.

**53. Why type route params?** Compile-time checks catch wrong route names/argument shapes. Runtime validation still handles untrusted external links.

### Platform and native tooling

**54. Can Windows build iOS locally?** It cannot run the Apple native build toolchain or simulator locally. Use a Mac build environment, hosted build, or Expo Go for supported real-device testing.

**55. What are Android Studio, SDK, JDK, Gradle, and ADB?** IDE; platform tools/APIs; Java tooling; build system; device communication tool. They serve different roles.

**56. Expo Go vs development build?** Expo Go contains a predefined native library set. A development build is your own binary containing your native dependencies.

**57. When must you rebuild?** When binary-level native dependencies/configuration change. Compatible JS-only edits normally use the development server/reload workflow.

**58. Platform.OS vs platform files?** Small branches suit Platform.OS/Platform.select. Larger separate implementations can use .ios/.android files.

**59. Why does permission behavior differ by OS?** Platforms have different declarations, consent models, restrictions, and lifecycle behavior. Test real builds on each platform.

**60. Why does an API at localhost fail on a phone?** localhost resolves to the device itself. Use an accessible development host and check network/transport policies.

**61. AsyncStorage vs secure storage?** AsyncStorage is ordinary persistent key/value storage. Secure storage uses platform facilities for suitable sensitive values. Neither is a reason to store raw passwords.

**62. Can an environment variable hide a secret in a mobile binary?** No. Bundled client values can be recovered. Keep privileged secrets on trusted server infrastructure.

### Architecture, performance, and production

**63. Metro vs Hermes?** Metro bundles/transforms JS and assets. Hermes executes JavaScript on the device.

**64. What was the legacy bridge?** A communication mechanism associated with the older architecture, often described through asynchronous serialized message exchange. Identify it as historical when discussing current releases.

**65. What are JSI, Fabric, and TurboModules?** Runtime/native interface, modern renderer, and modern native module system. Distinguish their responsibilities instead of calling all of them a bridge.

**66. Does New Architecture remove every performance problem?** No. Slow JS algorithms, excessive rendering, images, networking, and native work can still dominate.

**67. What is Codegen?** Tooling generating native integration artifacts from typed specs. It helps enforce interfaces between native implementations and JS APIs.

**68. Why measure release builds?** Development instrumentation and checks alter timings. Profile realistic binaries/devices for user-facing conclusions.

**69. When React.memo/useMemo/useCallback?** When identity/cost measurably matters or an API needs stable identity. They are performance tools, not correctness substitutes.

**70. How troubleshoot a slow list?** Measure; inspect row complexity, image sizes, rerenders, key/data stability, virtualization settings, and data pagination. Tune for memory and responsiveness together.

**71. Why can JS timers fail in background?** The OS can suspend the app or kill its process. Use supported native background mechanisms where the task requires them.

**72. What can an OTA update change?** Compatible JS and assets under the configured runtime/update model. It cannot supply arbitrary new native code to an installed binary.

**73. What do you test before release?** Core flows, errors, slow/offline network, device lifecycle, accessibility, permissions, navigation/back behavior, signing/configuration, and each supported platform.

**74. How do you debug a native crash?** Obtain platform crash logs, reproduce on the target build/device, inspect native stack traces and dependencies, and correlate with JS logs where applicable.

**75. What is your approach to an RN upgrade?** Read version-specific migration notes, check native dependency compatibility, update a controlled branch, rebuild platforms, and test critical flows. Do not blindly bump every package to latest.

### Scenario answers: explain the steps

**76. A user taps Save twice and creates duplicate records.** Add pending-state UI and a handler guard; inspect retries and server behavior; implement server idempotency/uniqueness appropriate to the operation. Disabling a button alone cannot guarantee exactly-once processing.

**77. A product screen shows outdated data after editing.** Identify the owner/cache key; update or invalidate that cache after mutation; consider focus freshness. Avoid putting another unsynchronized copy in navigation params.

**78. Logout returns to a private screen when Back is pressed.** Switch/reset the authenticated navigation tree; clear credentials and private cached data; test Android Back and iOS gestures; verify backend rejects expired/removed sessions.

**79. A form works on web but not Android.** Reproduce in a native client; check DOM assumptions, events, keyboard, native dependency compatibility, and platform config. Web success is only one platform check.

**80. A registration request fails on a slow connection.** Show pending state; apply an appropriate timeout/retry policy; preserve useful input; explain the failure; prevent duplicate creation with server safeguards; avoid silently claiming success.

## 17. Practice plan and exercises

| Stage | Build | Be able to explain |
|---|---|---|
| 1 | Counter and profile card | JSX/native primitives, state, press events |
| 2 | Styled responsive screen | Flexbox, text, safe areas, accessibility |
| 3 | Validated registration form | Controlled input, blur/submit, keyboard |
| 4 | Home/Register/Profile stack | Route types, back, shared state |
| 5 | Remote products list | Fetch statuses, pagination, refresh |
| 6 | Persistent preferences | Storage, hydration, failure handling |
| 7 | Auth flow prototype | Session gate, secure storage, logout |
| 8 | Development binary | Toolchain, permissions, native rebuild |
| 9 | Android + iOS QA | Platform differences, accessibility, lifecycle |
| 10 | Interview rehearsal | Tradeoffs, architecture, debugging stories |

Exercises: add phone validation without treating keyboardType as validation; implement a Context alternative to the sample store; add a product-details route with ID params; implement a persisted theme; handle a simulated API failure and retry; explain why a background timer is unreliable; profile a long list before changing settings.

For interviews, rehearse three concrete stories: a form you implemented, a state ownership decision, and a mobile bug you diagnosed. Explain the symptom, evidence, fix, and verification. Be candid about what you have actually run on Android/iOS.

## 18. Official reference library

Use these versioned/current references when installing or upgrading:

- [React state](https://react.dev/learn/managing-state)
- [React Native core components](https://reactnative.dev/docs/intro-react-native-components)
- [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment)
- [Flexbox](https://reactnative.dev/docs/flexbox)
- [TextInput](https://reactnative.dev/docs/textinput)
- [FlatList](https://reactnative.dev/docs/flatlist)
- [Performance](https://reactnative.dev/docs/performance)
- [Security](https://reactnative.dev/docs/security)
- [Modern architecture](https://reactnative.dev/architecture/landing-page)
- [Expo project creation](https://docs.expo.dev/get-started/create-a-project/)
- [Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [Android Studio installation](https://developer.android.com/studio/install)
- [Emulator acceleration](https://developer.android.com/studio/run/emulator-acceleration)
- [React Navigation](https://reactnavigation.org/docs/getting-started/)
- [React Hook Form Controller](https://react-hook-form.com/docs/usecontroller/controller)
- [Zustand](https://zustand.docs.pmnd.rs/reference/apis/create)
- [Redux Toolkit](https://redux.js.org/toolkit/introduction/getting-started)
- [TanStack Query React Native](https://tanstack.com/query/latest/docs/framework/react/react-native)
