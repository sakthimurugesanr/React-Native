# React Native: learning hub and project practice

Start here if you already know React web and want to learn React Native through practical projects. This README connects the setup guide, comparison tables, interview preparation, and sample application.

**Main README location:** `C:\Users\Sakthi\OneDrive - Cannyfore Technology Solutions Pvt Ltd\Desktop\React Native\README.md`.

## All README files and learning documents

| Document | What you will find | When to use it |
|---|---|---|
| [Main README — this file](./README.md) | Reading order, commands, project exercises, and code map | Start here |
| [React web vs React Native comparison](./README_REACT_VS_REACT_NATIVE.md) | Tags, components, events, styling, forms, hooks, navigation, storage, and 16 side-by-side examples | Translate your existing React knowledge |
| [Complete React Native guide](./REACT_NATIVE_COMPLETE_GUIDE.md) | Installation, Android Studio, iOS support, state management, validation, routing, architecture, and 80 interview questions | Learn topics in depth |

The repository also has [root project instructions](./AGENTS.md) and [sample project instructions](./learning-app/AGENTS.md). These describe development conventions; they are not part of the beginner reading sequence.

## Recommended reading and practice order

1. Read the [comparison tables](./README_REACT_VS_REACT_NATIVE.md#2-tags-and-native-component-equivalents): learn `View`, `Text`, `TextInput`, `Pressable`, and `FlatList`.
2. Read [setup and tools](./REACT_NATIVE_COMPLETE_GUIDE.md#4-tools-and-installation-paths). Choose web preview, Expo Go, or a native development build according to your device/tooling.
3. Run the sample using the commands below.
4. Complete Practice 1–4: components, local/shared state, navigation, and validated forms.
5. Complete Practice 5–8: lists, APIs, persistence, and device testing.
6. Use the [interview questions](./REACT_NATIVE_COMPLETE_GUIDE.md#16-interview-questions-and-answers) to explain the features you built.

## Choose the project folder before running commands

This workspace currently contains app source/configuration in **two locations**: the root React Native folder and `learning-app/`. They are separate checkouts/copies for command purposes. Editing one does not automatically update the other.

The original installed and previously verified sample is **`learning-app/`**. Use it for the quickest continuation. All practice source links below point to that sample. If you decide to work in the root app copy, run commands at the root and edit its `src/` instead. Avoid switching between the copies during an exercise.

### Run the original sample

Open PowerShell in the React Native folder:

```powershell
cd learning-app
npm.cmd install
npm.cmd run web
```

When dependencies are already installed and unchanged, you can go straight to `npm.cmd run web`. Open the URL printed in the terminal; it is usually `http://localhost:8081` when that port is free. If a server is already running, use that server or stop it before starting another. Follow Expo's printed port if it selects a different one.

For compatible Expo Go phone testing, from `learning-app/`:

```powershell
npm.cmd start
```

Use the terminal's QR code with a supported client and reachable network. For Android emulator testing, install/configure Android Studio and the emulator first, start the emulator, and then run:

```powershell
npm.cmd run android
```

See [Android Studio setup](./REACT_NATIVE_COMPLETE_GUIDE.md#6-android-studio-and-android-sdk-setup) and [iOS development choices](./REACT_NATIVE_COMPLETE_GUIDE.md#7-ios-support-from-windows-and-macos). Local iOS Simulator/Xcode builds require a Mac; a web preview is not an Android/iOS device test.

### Run the root app copy instead

If your terminal is already in the root React Native folder, omit `cd learning-app`:

```powershell
npm.cmd install
npm.cmd run web
```

This runs the root package.json and uses the root src directory. The original sample's prior verification does not automatically verify this separate copy.

## What the sample teaches

| Feature | Implementation | State owner | Observable result |
|---|---|---|---|
| Home screen | Native containers, text, cards, buttons | Component rendering + shared store | Three learning sections |
| Counter | Zustand action and selector | Shared client store | Count is consistent across Home and Profile |
| Registration | Controlled TextInput fields and validation | Local React state | Errors appear on blur/submit |
| Password visibility | Switch and secureTextEntry | Local React state | Demo password display toggles |
| Submit status | Pending state and duplicate-submit guard | Local state/ref | Save button becomes disabled while saving |
| Profile | Read name/email from store | Shared client store | A valid submission appears on another screen |
| Navigation | Expo Router stack | Router | Move between Home, Register, Profile |
| Reset | Store reset action | Shared client store | Profile clears and counter returns to zero |

This is a local teaching demo. It has no backend, real account creation, or authentication. Only name/email enter the in-memory profile store; use dummy passwords. Reloading resets shared state.

## Code map: open these files as you practice

| File | Purpose | First thing to inspect |
|---|---|---|
| [Route layout](./learning-app/src/app/_layout.tsx) | Stack and screen titles | Stack.Screen configuration |
| [Home](./learning-app/src/app/index.tsx) | Counter, learning cards, navigation actions | Store selectors and router.push |
| [Registration](./learning-app/src/app/register.tsx) | Inputs, touched/errors, submission, keyboard layout | onChangeText, submit, and input props |
| [Profile](./learning-app/src/app/profile.tsx) | Shared profile/counter and reset | Selectors, reset, return Home |
| [Store](./learning-app/src/store.ts) | Shared state and actions | count, profile, increment, saveProfile, reset |
| [Validation](./learning-app/src/validation.ts) | Pure field rules | validate(values) and its error object |
| [Reusable UI](./learning-app/src/components/ui.tsx) | Page, Card, Action, styles | Pressable and style composition |
| [Validation tests](./learning-app/tests/validation.test.ts) | Empty/valid/invalid cases | Expected user-visible rules |
| [Package scripts](./learning-app/package.json) | Run/check commands and dependency versions | start, web, typecheck, lint, test |

## Practice 1: native components and styling

**Goal:** adapt a simple React profile card to native UI.

1. Open Home and the reusable UI file.
2. Add a card containing a title, description, and action.
3. Use View for layout, Text for strings, and Pressable for the action.
4. Add padding, borderRadius, and a horizontal row with flexDirection.
5. Make the action update visible text instead of only logging.

**Done when:** the card renders, the action changes the UI, and there is no raw text placed directly under View. Explain which web tags you replaced using [comparison examples 1–2](./README_REACT_VS_REACT_NATIVE.md#example-1-container-heading-and-inline-text).

## Practice 2: local vs shared state

**Goal:** choose state ownership deliberately.

1. Increment the existing counter twice; open Profile and confirm the same value.
2. Add a decrement action to the store and a button to Home.
3. Decide whether negatives are allowed and implement that rule in the action.
4. Add a local “show explanation” toggle to Home with useState.
5. Keep this screen-only toggle local while the counter stays shared.

**Done when:** Home and Profile remain consistent, reset works, and you can explain why the toggle and counter have different owners. Read [state categories](./REACT_NATIVE_COMPLETE_GUIDE.md#10-state-types-and-management-choices).

## Practice 3: navigation and routes

**Goal:** add a screen with an understandable forward/back flow.

1. Read the existing route layout and router actions.
2. Add an About route in the sample's src/app directory and a button on Home to open it.
3. Set a useful screen title and test Back.
4. Add a product-detail practice route with a small ID parameter.
5. Validate an incoming ID instead of assuming TypeScript proves an external link is valid.

**Done when:** navigation, return Home, and invalid-param handling work. Keep utilities outside src/app so they are not interpreted as routes. Use [routing guidance](./REACT_NATIVE_COMPLETE_GUIDE.md#12-routing-and-navigation), including the SDK 57 import conventions.

## Practice 4: form validation

**Goal:** understand values, touched fields, errors, and submission status.

1. Submit the existing form empty and read each error.
2. Try an invalid email and mismatched passwords.
3. Enter `Demo User`, `demo@example.com`, and `demo1234` twice; enable the demo agreement.
4. Save and confirm the shared Profile updates.
5. Add an optional city field, then add a rule only if your chosen product requirement needs one.
6. Simulate a submission failure and show a useful error while retaining ordinary input.
7. Add a meaningful validation test for the new requirement.

**Done when:** valid submission succeeds, invalid submission stays on the form, pending state prevents repeats, and passwords do not enter the shared store. Read [forms and validation](./REACT_NATIVE_COMPLETE_GUIDE.md#11-forms-and-validation).

## Practice 5: list and detail project

**Goal:** build a small contacts/products app using local sample data first.

1. Create a typed array with stable IDs.
2. Display it with FlatList and a reusable row component.
3. Add empty state and a search box; compute the filtered list from source data.
4. Open a detail route using the selected ID.
5. Add/remove an item with immutable updates.

**Done when:** search, empty state, item identity, and details work. Start with local data so network debugging does not hide list/navigation mistakes. See [list example](./README_REACT_VS_REACT_NATIVE.md#example-8-list).

## Practice 6: API-backed project

**Goal:** extend the list with a real API you can access.

1. Move fetching into a service or query layer.
2. Represent loading, success, empty, and failure states explicitly.
3. Check HTTP status and validate response shape.
4. Add refresh and a useful retry action.
5. Test a deliberately failing request and a slow connection.
6. Explain whether a query cache is useful for your app and why.

**Done when:** failures do not masquerade as success, stale responses do not overwrite newer results, and users can recover. Read [API handling](./REACT_NATIVE_COMPLETE_GUIDE.md#13-apis-storage-permissions-and-lifecycle). The existing demo does not supply a backend URL.

## Practice 7: persisted preferences

**Goal:** learn persistence and hydration separately from reactive state.

1. Add a light/dark preference owned by a state store or Context.
2. Choose and install a supported storage library using the project's Expo instructions.
3. Save the preference and restore it on startup.
4. Handle pending restoration and storage errors.
5. Reload and confirm the preference survives while temporary UI state follows its intended policy.

**Done when:** persistence and visible state remain consistent. Store ordinary preferences here; use suitable secure storage for sensitive credentials in an actual auth project. See [persistence comparison](./README_REACT_VS_REACT_NATIVE.md#example-16-ordinary-preference-persistence).

## Practice 8: mobile QA and interview explanation

**Goal:** verify behavior beyond the desktop browser.

1. Test a compatible Android/iOS client available to you.
2. Check keyboard overlap, scrolling, safe areas, Back/gestures, and large text.
3. Test foreground/background transitions and slow/offline networking where relevant.
4. Record exactly which platforms/builds you tested.
5. Explain one component migration, one state ownership choice, one validation rule, and one bug you diagnosed.

**Done when:** your evidence matches your claims. Use the [status document](./SETUP_STATUS.md) as an example of separating web checks from native verification, then rehearse [interview answers](./REACT_NATIVE_COMPLETE_GUIDE.md#16-interview-questions-and-answers).

## Suggested practice projects after the sample

| Project | Features to build | Concepts to learn |
|---|---|---|
| Todo app | Add/edit/delete, filters, saved tasks | Forms, immutable updates, FlatList, persistence |
| Contact manager | Search, validated contact form, details | Typed routes, shared state, validation |
| Product catalog | API list, refresh, detail, favorites | Server data, loading/error/empty states |
| Expense tracker | Amount entry, categories, totals | Parsing, derived state, reducer/store ownership |
| Notes app | Multiline editor, draft saving, theme | TextInput, keyboard UX, hydration |

These are practice ideas, not additional applications already implemented in this workspace. Build one feature at a time and describe what you verified before adding the next.

## Checks before finishing an exercise

Run from the project folder you edited. For the original sample:

```powershell
cd learning-app
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
```

If you are already inside learning-app, omit the cd line. Run relevant manual interactions too: passing types or unit tests does not establish native keyboard/navigation behavior.

If a preview is blank, check the development terminal and JS bundle rather than assuming a page-shell HTTP response means the app has rendered. The initial sample bundle was slow; the [verification record](./SETUP_STATUS.md) explains the observed behavior.
