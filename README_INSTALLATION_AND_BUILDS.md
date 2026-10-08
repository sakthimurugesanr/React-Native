# Expo and React Native: installation, Android, iOS, and builds

[Main README](./README.md) · [Tools and libraries](./README_TOOLS_AND_LIBRARIES.md) · [React comparison](./README_REACT_VS_REACT_NATIVE.md) · [Complete learning guide](./REACT_NATIVE_COMPLETE_GUIDE.md)

Follow one development path at a time. Commands marked optional are for that feature or platform. This guide documents setup; it does not mean Android Studio, Xcode, signing accounts, or cloud builds have been configured on this computer.

## 1. Choose your development path

| Path | What runs | What you need | Native compilation? |
|---|---|---|---|
| Web preview | Browser version | Node, dependencies, browser | No |
| Expo Go on a phone | App JS inside a compatible Expo Go client | Node, phone, supported SDK/native modules, reachable Metro | No custom binary |
| Android emulator with Expo Go | Supported app in a virtual Android device | Android Studio emulator plus the above | No custom binary |
| Local development build | Your own debug app with native dependencies | Android SDK/JDK or macOS/Xcode | Yes |
| EAS development build | Your own debug app compiled in the cloud | Expo account, project config, applicable signing | Cloud compilation |
| Preview / production build | App with bundled JS/assets | Build configuration and distribution credentials | Yes, locally or in cloud |

Expo is a framework around React Native. Metro serves/bundles JavaScript; Expo CLI operates the project; EAS builds and distributes it. A development build contains your native modules. Native module changes require rebuilding; ordinary JS edits use reload/Fast Refresh. [Development builds](https://docs.expo.dev/develop/development-builds/introduction/)

## 2. Install the basic tools

1. Install a supported **Node.js LTS** from [Node.js](https://nodejs.org/en/download). npm comes with it.
2. Install Git if you want to clone/manage repositories, from [Git](https://git-scm.com/downloads).
3. Use your preferred editor. Open the folder containing package.json.
4. Close and reopen your terminal after installing tools.
5. Check the versions before installing app dependencies:

```powershell
# Windows PowerShell: .cmd avoids npm.ps1 execution-policy errors
node --version
npm.cmd --version
npx.cmd --version
git --version
```

On macOS/Linux, use npm and npx without .cmd. Do not globally install the old expo-cli. The project CLI is invoked with npx expo. [Project requirements](https://docs.expo.dev/get-started/create-a-project/)

This repository declares **Expo ~57.0.27, React Native 0.86.3, React 19.2.3**. SDK 57's reference lists Node 22.13.x minimum, Android compile/target SDK 36, iOS 16.4 minimum, and Xcode 26.4 minimum. A newer SDK can change these requirements; check the [SDK 57 reference](https://docs.expo.dev/versions/v57.0.0/) and [package.json](./package.json), rather than upgrading individual framework packages independently.

## 3. Install and run this existing repository

### Step 1 — open the repository root

```powershell
# Your current folder; keep the quotes because the path contains spaces
Set-Location -LiteralPath 'C:\Users\Sakthi\OneDrive - Cannyfore Technology Solutions Pvt Ltd\Desktop\React Native'

# Confirm that this is the app folder
Get-Item package.json
```

The root contains the app source. A nested learning-app checkout may exist locally; use root commands consistently for the published repository.

### Step 2 — install dependencies

```powershell
# Use the committed package-lock.json for a reproducible installation
npm.cmd ci
```

npm ci replaces the current node_modules installation and requires package.json/lockfile consistency. If deliberately changing dependencies, use npx.cmd expo install followed by reviewing the lockfile. If starting a project without a lockfile, npm.cmd install creates one. Do not delete a lockfile just to bypass a dependency error.

### Step 3 — verify and start

```powershell
# Dependency/configuration diagnosis
npx.cmd expo-doctor

# Project checks: run separately and inspect each result
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test

# Start web preview; open the URL printed by Expo
npm.cmd run web
```

Keep Metro running. Stop it with Ctrl+C before switching commands if you want to reuse the same port. The first bundle can take longer than later reloads. A running terminal server is not proof that the browser/device loaded the app.

### Step 4 — test on a phone with Expo Go

1. Install an Expo Go client compatible with the project's SDK on the phone.
2. Put computer and phone on a reachable network.
3. Run the command below, then scan Expo's QR code using the supported phone workflow.
4. Confirm Home renders; increment the counter, navigate, and submit the dummy registration form.

```powershell
# Explicitly target Expo Go
npx.cmd expo start --go
```

If the available Expo Go client cannot run this SDK or required module, use a development build. For network isolation, investigate firewall/LAN access or try npx.cmd expo start --tunnel. Tunnel transport may require extra tooling and internet; it does not fix SDK incompatibility. [Start developing](https://docs.expo.dev/get-started/start-developing/)

## 4. Create a new Expo project instead

Use this section for a **new folder**, not to recreate this repository.

```powershell
# Run from a parent folder where you want a NEW app
npx.cmd create-expo-app@latest my-expo-practice
Set-Location -LiteralPath .\my-expo-practice

# Inspect the generated versions and scripts
Get-Content package.json

# Start the project
npx.cmd expo start
```

The default template includes TypeScript and Expo Router. The latest template may use a different SDK from this repository. For a minimal TypeScript template, create a different new folder using --template blank-typescript; it requires separate Router setup if you want routing. [Create Expo App](https://docs.expo.dev/more/create-expo/)

### Understand routing setup

This repository already has Router configured: [index.ts](./index.ts) imports expo-router/entry, [app.json](./app.json) includes the expo-router plugin, and [src/app/_layout.tsx](./src/app/_layout.tsx) configures the stack. Add screens under src/app; keep components/store/validation outside it.

For a blank app that needs manual Router installation, follow the current [Router installation guide](https://docs.expo.dev/router/installation/), including entry, scheme, and web configuration. Its dependency installation starts with:

```powershell
# Optional: for a NEW blank project that does not already include Router
npx.cmd expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

Do not replace this repository's working custom index.ts entry unnecessarily. Router apps on SDK 56+ should follow the [navigation import migration guide](https://docs.expo.dev/router/migrate/sdk-55-to-56/) when adapting older examples.

## 5. Android Studio setup on Windows

### Step 1 — install Android Studio

1. Download Google's **Android Studio** from [the official installation page](https://developer.android.com/studio/install).
2. Run the Windows installer; include the virtual-device component when offered.
3. Open Studio and complete its setup wizard, SDK downloads, and license prompts.
4. Open SDK Manager from More Actions or the Android SDK settings page.
5. Record Android SDK Location; the usual location is %LOCALAPPDATA%\Android\Sdk.

You can continue editing TypeScript in your usual editor. Studio supplies Android tooling.

### Step 2 — install SDK packages and JDK

In SDK Manager, install Platform 36 for this SDK, Platform-Tools, Emulator, Command-line Tools, and the project's required Build-Tools. Install the exact NDK/CMake versions if native build output requests them. A compile SDK is different from the emulator's OS version.

Install JDK 17 for the current setup guidance; set JAVA_HOME to its installation root. Align Android Studio's Gradle JDK with the terminal's compatible JDK. [React Native environment setup](https://reactnative.dev/docs/0.86/set-up-your-environment)

### Step 3 — configure environment variables

Open Windows **Edit environment variables for your account**. Add ANDROID_HOME with your recorded SDK location and JAVA_HOME with your actual JDK root. Add these separate user Path entries, preserving existing entries:

```text
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
%ANDROID_HOME%\cmdline-tools\latest\bin
%JAVA_HOME%\bin
```

Reopen PowerShell and verify:

```powershell
# Check only relevant settings
$env:ANDROID_HOME
$env:JAVA_HOME
java -version
adb version
emulator -list-avds

# If prompted about missing SDK licenses, review and accept them
sdkmanager --licenses
```

For a temporary current-terminal SDK path, after confirming that location:

```powershell
$env:ANDROID_HOME = Join-Path $env:LOCALAPPDATA 'Android\Sdk'
$env:Path += ';' + (Join-Path $env:ANDROID_HOME 'platform-tools')
$env:Path += ';' + (Join-Path $env:ANDROID_HOME 'emulator')
```

These last assignments expire when the terminal closes. [Expo Android environment instructions](https://docs.expo.dev/workflow/android-studio-emulator/)

### Step 4 — create an emulator

1. Open Device Manager / Virtual Device Manager.
2. Create a virtual phone, choose a hardware profile, and download a supported system image matching your host architecture.
3. Finish creation and press Play. Wait for Android to boot/unlock.
4. Verify the connection below. If acceleration fails, check the Android emulator's host virtualization requirements.

```powershell
# An emulator should appear with status device
adb devices

# Start Metro and open the Android target; this does NOT compile your native app
npx.cmd expo start --android
```

The equivalent repository script is npm.cmd run android. [Manage virtual devices](https://developer.android.com/studio/run/managing-avds)

### Step 5 — physical Android phone alternative

Enable Developer options and USB debugging, connect a data-capable USB cable, authorize the computer on the phone, and run adb devices. Windows may need the manufacturer's USB driver. A status of unauthorized means the phone has not accepted the debugging prompt. Expo Go over Wi-Fi does not require USB debugging. [Run on a device](https://developer.android.com/studio/run/device)

## 6. Build your Android development app locally

```powershell
# Install the development client once in the app folder
npx.cmd expo install expo-dev-client

# Compile, install, and launch your app using the configured Android toolchain
npx.cmd expo run:android

# On later sessions, start JS development for the installed client
npx.cmd expo start --dev-client
```

Use npx.cmd expo run:android --device to select a connected target. The run command generates native files when absent and builds them. Rebuild when native dependencies, plugins, or native configuration change. Keep native configuration in app.json/plugins for a generated project. [Local debug builds](https://docs.expo.dev/guides/local-app-development/)

If deliberately generating native projects without building:

```powershell
# Optional: generate Android native project files
npx.cmd expo prebuild --platform android
```

Review changes before regeneration. The --clean option deletes and recreates native directories and can remove manual native edits; it is not an everyday cache-reset command. [Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)

## 7. iOS setup and local development on a Mac

Windows can serve JS to a compatible iPhone client and request cloud iOS builds. **Local iOS builds and the iOS Simulator require macOS/Xcode.** An Android emulator does not run iOS.

### Step 1 — configure Xcode

1. Install an Xcode version supported by your project's SDK and macOS.
2. Open Xcode and finish initial component/license setup.
3. Select the intended Command Line Tools in Xcode settings.
4. Download a supported iOS Simulator runtime in Xcode's platform/component settings.
5. Start a simulator and install the app's Node dependencies on the Mac.

```bash
# macOS terminal: no .cmd suffix
xcodebuild -version
xcode-select -p
xcrun simctl list devices available

# From the app folder
npm ci
npx expo start --ios
```

The last command starts Metro and opens the supported simulator client; it is not native compilation. [Expo iOS Simulator setup](https://docs.expo.dev/workflow/ios-simulator/)

### Step 2 — compile an iOS development app

```bash
# macOS only: add the client if not already installed
npx expo install expo-dev-client

# Generate/build/install for the simulator
npx expo run:ios

# Optional: choose a physical iPhone; requires device/signing setup
npx expo run:ios --device

# Later JS development sessions
npx expo start --dev-client
```

Expo's run workflow handles native project generation and dependency installation; follow any CocoaPods/Ruby setup diagnostics for your Mac. For an existing manually managed native project, follow its Gemfile/Bundler/CocoaPods workflow. Physical-device installation needs trusted device and signing configuration. [Local development workflow](https://docs.expo.dev/develop/development-builds/development-workflows/)

## 8. Configure cloud builds with EAS

### Step 1 — account and project configuration

```powershell
# Use the current EAS CLI without a global installation
npx.cmd eas-cli@latest login
npx.cmd eas-cli@latest whoami

# Link/create the EAS project, then initialize build configuration
npx.cmd eas-cli@latest init
npx.cmd eas-cli@latest build:configure
```

Review the generated app configuration and eas.json. This repository does not yet contain eas.json or final application identifiers. Configure unique identifiers you control before building for distribution. For example, merge these keys into the existing ios/android objects in app.json, preserving their other settings:

```json
{
  "ios": { "bundleIdentifier": "com.sakthimurugesan.reactnativelab" },
  "android": { "package": "com.sakthimurugesan.reactnativelab" }
}
```

Those are example identifiers, not a registration or availability guarantee. EAS initialization supplies the actual projectId; do not invent it. [First EAS build](https://docs.expo.dev/build/setup/)

### Step 2 — understand build profiles

Example eas.json for development, direct-install preview, simulator, and store builds:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "development-simulator": {
      "extends": "development",
      "ios": { "simulator": true }
    },
    "preview": {
      "distribution": "internal",
      "android": { "buildType": "apk" }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

Development requires expo-dev-client. Preview bundles JS for testers and does not normally depend on Metro. Production uses store-oriented defaults; Android normally produces an AAB. Simulator builds cannot be installed on a real iPhone. Profile names are user-defined; choose the matching name in commands. [eas.json configuration](https://docs.expo.dev/build/eas-json/)

### Step 3 — request development builds

```powershell
# Add the native development client before a development build
npx.cmd expo install expo-dev-client

# Android development app
npx.cmd eas-cli@latest build --platform android --profile development

# iPhone development app: follow Apple signing/device prompts
npx.cmd eas-cli@latest build --platform ios --profile development

# Optional: register an iPhone for an internal provisioning profile
npx.cmd eas-cli@latest device:create

# Simulator binary: can request from Windows, but run it on a Mac
npx.cmd eas-cli@latest build --platform ios --profile development-simulator
```

Install the completed artifact following EAS's instructions, then use npx.cmd expo start --dev-client. Adding a registered iPhone can require updating the provisioning profile and rebuilding/re-signing. Build queues, quotas, and account requirements depend on the chosen service plan. [Internal distribution](https://docs.expo.dev/build/internal-distribution/)

## 9. Preview and production builds

```powershell
# Direct-install Android APK with the example preview profile
npx.cmd eas-cli@latest build --platform android --profile preview

# Internally distributed iOS app; provisioning restricts supported devices
npx.cmd eas-cli@latest build --platform ios --profile preview

# Store binaries: run the platform you are ready to release
npx.cmd eas-cli@latest build --platform android --profile production
npx.cmd eas-cli@latest build --platform ios --profile production

# Alternative: request both store builds together
npx.cmd eas-cli@latest build --platform all --profile production

# Inspect recent cloud jobs
npx.cmd eas-cli@latest build:list
```

| Output | Use |
|---|---|
| APK | Install directly on Android/emulator; a preview APK can be tested without Metro |
| AAB | Upload to Google Play; not directly installed using adb install |
| Signed iOS device archive | Install/distribute according to its provisioning and distribution method |
| iOS simulator artifact | Simulator on macOS; separate target from real iPhone |

Optional APK installation on a connected Android target:

```powershell
# Replace this example path with the downloaded APK path
adb install -r 'C:\Downloads\react-native-lab.apk'
```

Manage Android keystores and iOS certificates/profiles through the signing workflow. Preserve access to signing credentials for future updates. [Credentials](https://docs.expo.dev/app-signing/app-credentials/), [Android APK builds](https://docs.expo.dev/build-reference/apk/)

```powershell
# Inspect/manage the selected project's signing credentials
npx.cmd eas-cli@latest credentials --platform android
npx.cmd eas-cli@latest credentials --platform ios
```

EAS iPhone internal distribution and App Store distribution require the applicable paid Apple Developer membership and signing permissions. An iOS simulator build has a different signing path. Google Play publication requires a Play Console developer account; creating an APK locally does not require publishing to Play. [iOS internal distribution requirements](https://docs.expo.dev/build/internal-distribution/)

### Local release checks

```powershell
# Windows/Android: compile and run release mode with local Android tooling
npx.cmd expo run:android --variant release
```

```bash
# macOS/iOS: compile and run release configuration
npx expo run:ios --configuration Release
```

These commands help test release behavior; they do not finish store signing/submission automatically. For manual store artifacts, follow the native signing/archive steps. EAS --local builds have different host/tooling requirements; Windows local Android builds should use the Android toolchain above rather than assuming EAS cloud commands run locally. [Local production builds](https://docs.expo.dev/guides/local-app-production/), [EAS local builds](https://docs.expo.dev/build-reference/local-builds/)

## 10. Submit to app stores

Complete the store record, package/bundle ID, signing, privacy metadata, screenshots, and testing requirements first. Configure the applicable Google Play/Apple account and submission credentials.

```powershell
# Submit a selected/latest matching production artifact
npx.cmd eas-cli@latest submit --platform android --profile production --latest
npx.cmd eas-cli@latest submit --platform ios --profile production --latest
```

Check which build --latest selects before submitting. Android may need an initial manual upload and Play API/service-account setup. iOS submission uploads to App Store Connect/TestFlight; release still needs the applicable review/store steps. Submission is separate from public release. [Store submission guide](https://docs.expo.dev/deploy/submit-to-app-stores/)

## 11. Optional compatible JavaScript updates

```powershell
# Once, to configure EAS Update in a project that needs it
npx.cmd expo install expo-updates
npx.cmd eas-cli@latest update:configure
```

Configure a runtimeVersion policy and channel such as production in the intended eas.json build profile, build and distribute that configured binary, then publish compatible updates:

```powershell
# Publishes to the production channel after its build/update setup is complete
npx.cmd eas-cli@latest update --channel production --message 'Fix registration feedback'
```

JS/assets can update only within the configured native runtime compatibility. A new native module or incompatible native change needs a new binary. The basic eas.json example above deliberately has no update channel; configure it before using this optional workflow. [EAS Update setup](https://docs.expo.dev/eas-update/getting-started/)

## 12. Everyday command reference

| Windows command | Purpose | Important note |
|---|---|---|
| npm.cmd ci | Install locked dependencies | Requires consistent lockfile; replaces node_modules |
| npx.cmd expo start | Start Metro | Select Go/development client as appropriate |
| npx.cmd expo start --web | Open browser preview | Does not build a mobile binary |
| npx.cmd expo start --android | Open Android target | Requires running/connected target |
| npx.cmd expo start --ios | Open simulator | macOS only; use npx there |
| npx.cmd expo start --clear | Restart with Metro cache cleared | Does not replace native dependencies |
| npx.cmd expo start --port 8082 | Use a different port | Open the newly printed URL |
| npx.cmd expo install package-name | Add SDK-compatible dependency | Replace placeholder; follow library setup |
| npx.cmd expo install --check | Check known package compatibility | Inspect reported mismatches |
| npx.cmd expo install --fix | Apply recommended compatible versions | Review package/lockfile changes |
| npx.cmd expo-doctor | Diagnose project | Fix actual findings before native build |
| npx.cmd expo config --type public | Inspect resolved public configuration | Public values are not secret storage |
| npm.cmd run typecheck / lint / test | Run project checks separately | Passing tests does not prove a device build |
| npx.cmd expo export --platform web | Export web output | Hosting depends on app rendering/server requirements |

The CLI options above are development/build operations with different effects; run the one matching your goal. [Expo CLI reference](https://docs.expo.dev/more/expo-cli/), [Web deployment](https://docs.expo.dev/deploy/web/)

## 13. Troubleshooting and build notes

| Problem | First checks / action |
|---|---|
| Application keeps loading | Read Metro and browser/device errors; verify the requested bundle finishes; ensure the URL belongs to this app |
| Port 8081 already occupied | Use the existing intended server or stop it; choose another port and its printed URL |
| npm.ps1 cannot run | Use npm.cmd/npx.cmd in PowerShell |
| Expo Go incompatible | Check SDK/client compatibility; use an appropriate development build |
| Phone cannot reach Metro | Check Wi-Fi isolation, firewall, VPN, and development transport |
| Native module unavailable | Confirm library support, install compatible dependencies, rebuild the client |
| SDK or build tool missing | Install the exact package/version requested by the native build |
| JAVA_HOME/Gradle errors | Check JDK location/version and Studio versus terminal JDK |
| adb missing/unauthorized | Fix Platform-Tools Path or accept phone authorization; inspect adb devices |
| iOS command on Windows fails | Use a Mac for local compilation/simulator, or request EAS cloud compilation |
| Signing/provisioning failure | Match team, identifier, profile, registered device, and build distribution type |
| Preview/release cannot call API | Use a reachable backend address; check environment config and platform networking rules |
| OneDrive/path/locked-file error | If the error points to syncing or path length, use a short nonsynced checkout for the native build |

Inspect the first meaningful error, rather than reinstalling everything. Cache reset cannot add native code; browser success does not verify native permissions. Device localhost points to the device; the Android emulator commonly reaches the host through 10.0.2.2, while a phone needs a reachable host address. [Common Expo errors](https://docs.expo.dev/workflow/common-development-errors/), [Android emulator networking](https://developer.android.com/studio/run/emulator-networking)

Before sharing a build, test registration errors/success, navigation/back, keyboard behavior, app restart, permissions, loading/error states, and release-mode API access on the intended platform. Record whether you tested web, Expo Go, development, preview, or production; each proves a different result.
