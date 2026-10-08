# React web vs React Native: complete comparison with examples

For a developer who already knows React. Updated 8 October 2026.

In this document, **React web** means React rendered through React DOM in a browser. **React Native** means React rendered for Android/iOS. React itself supplies the component and hook model to both. React Native Web is a separate web rendering layer; support in a browser does not prove that browser-only code will run on Android or iOS.

Read this alongside [the complete learning guide](./REACT_NATIVE_COMPLETE_GUIDE.md). For the installed demo, see [learning-app/README.md](./learning-app/README.md).

## Contents

1. [What stays the same](#1-what-stays-the-same)
2. [Tags and native component equivalents](#2-tags-and-native-component-equivalents)
3. [Props, attributes, and events](#3-props-attributes-and-events)
4. [Styling and layout](#4-styling-and-layout)
5. [Forms and validation](#5-forms-and-validation)
6. [State, hooks, and lifecycle](#6-state-hooks-and-lifecycle)
7. [Navigation, storage, APIs, and tooling](#7-navigation-storage-apis-and-tooling)
8. [Simple side-by-side code examples](#8-simple-side-by-side-code-examples)
9. [Migration mistakes and decision checklist](#9-migration-mistakes-and-decision-checklist)
10. [Official references](#10-official-references)

## 1. What stays the same

The biggest distinction: JSX is a syntax for describing elements, not a requirement to use HTML. Lowercase web tags such as `div` belong to the browser renderer. Native components such as `View` are imported React components.

| Concept | React web | React Native | Can the same code transfer? |
|---|---|---|---|
| Function component | `function Card() { ... }` | Same syntax | Yes, if the rendered host components are adapted |
| JSX expressions | `{name}`, `{items.map(...)}` | Same expressions | Yes |
| Props | `<Card title="Hello" />` | Same component prop pattern | Yes, for your own compatible components |
| Children | Nested components | Same | Yes |
| Fragment | `<>...</>` | Same | Yes; a Fragment does not create a container |
| useState | Local state | Same | Yes |
| useReducer | Explicit state transitions | Same | Yes |
| useContext | Consume shared provider values | Same | Yes |
| useEffect | Synchronize external systems | Same hook | Hook logic may transfer; external APIs can differ |
| useRef | Mutable reference / DOM ref | Mutable reference / native component ref | Non-UI refs transfer; imperative component APIs differ |
| useMemo/useCallback | Cache calculation/function identity | Same | Yes, when dependencies/behavior are compatible |
| Custom hooks | Reusable logic | Same | Yes if they avoid browser-only APIs |
| Context providers | Dependency/state distribution | Same | Yes |
| TypeScript | Types, interfaces, unions | Same language | Shared models usually transfer |
| Conditional rendering | Ternary, `&&`, early return | Same | Yes, but ensure native text is wrapped correctly |
| List keys | Stable identity | Same | Yes |
| Pure utilities | Validation, calculation, formatting | Same JS/TS | Usually yes |
| Imported browser component | HTML/DOM-oriented UI | Requires compatible native UI | Usually adapt or replace |

Hooks preserve the React programming model; they do not make `document`, DOM elements, or browser storage portable. [React reference](https://react.dev/reference/react)

## 2. Tags and native component equivalents

The **mapping type** matters: “similar purpose” means an implementation choice, not an exact tag replacement. React Native core does not include every browser widget.

### Containers and text

| React web tag/pattern | React Native choice | Mapping type | Difference to remember |
|---|---|---|---|
| `<div>` | `<View>` | Similar purpose | Container; does not scroll by default |
| `<section>` | `<View>` | Similar layout purpose | HTML section semantics are not automatically preserved |
| `<main>` | `<View>` plus appropriate accessibility structure | Similar purpose | No direct core `main` tag |
| `<article>` | `<View>` | Similar purpose | Add meaningful accessibility separately |
| `<header>` | `<View>` or navigator header | Depends on use | A screen header may belong to navigation |
| `<footer>` | `<View>` | Similar purpose | Handle safe-area/system UI insets |
| `<nav>` | Navigator/tab UI | Depends on use | A View alone does not create navigation behavior |
| `<aside>` | `<View>` / drawer layout | Depends on use | Drawer behavior comes from navigation/UI code |
| `<p>` | `<Text>` | Similar purpose | Spacing comes from styles |
| `<h1>`–`<h6>` | `<Text>` with size/weight and heading accessibility | Similar purpose | Font size alone does not convey heading semantics |
| `<span>` | Nested `<Text>` for inline text | Similar purpose | Use View for a layout group, Text for inline text |
| `<strong>` / `<b>` | `<Text style={{ fontWeight: '700' }}>` | Visual mapping | Text emphasis styling is explicit |
| `<em>` / `<i>` | `<Text style={{ fontStyle: 'italic' }}>` | Visual mapping | Font/platform support still matters |
| `<small>` | `<Text>` with smaller `fontSize` | Visual mapping | Keep text readable with font scaling |
| `<br>` | `{'\n'}` inside Text, or separate layout | Depends on purpose | Do not add HTML br in native JSX |
| `<hr>` | Thin `<View>` | Visual mapping | Add accessibility if the separator conveys meaning |
| `<pre>` / `<code>` | `<Text>` with a suitable font/layout | Similar purpose | No browser code block semantics or automatic monospace |
| Raw text under `<div>` | `<Text>` inside View | Requires adaptation | `<View>Hello</View>` is not the normal supported text pattern |
| `<>...</>` | Same Fragment | Exact React construct | Neither produces a native View nor DOM div |

References: [core components](https://reactnative.dev/docs/intro-react-native-components), [Text](https://reactnative.dev/docs/text), [accessibility](https://reactnative.dev/docs/accessibility).

### Inputs and actions

| React web tag/pattern | React Native choice | Mapping type | Difference to remember |
|---|---|---|---|
| `<button>` | `<Button>` or `<Pressable>` + Text | Similar purpose | Core Button uses `title`; Pressable offers custom composition |
| `<input type="text">` | `<TextInput>` | Similar purpose | `onChangeText` receives the string |
| `<input type="email">` | TextInput with email input/keyboard configuration | Similar purpose | Keyboard configuration does not validate |
| `<input type="password">` | TextInput with `secureTextEntry` | Similar purpose | Masking is not encryption or persistence policy |
| `<input type="number">` | TextInput with appropriate numeric keyboard | Partial | Value remains text; parse and validate explicitly |
| `<input type="tel">` | TextInput with phone keyboard configuration | Partial | Country-specific validation still needed |
| `<textarea>` | `<TextInput multiline>` | Similar purpose | Native multiline sizing and alignment need styling |
| `<input type="checkbox">` | Checkbox library or accessible custom control | No exact core equivalent | Switch fits a toggle, not every checkbox use case |
| `<input type="radio">` | Radio group library/custom controls | No exact core equivalent | Manage selection and accessibility |
| `<input type="range">` | Slider library | No exact core equivalent | Install a compatible native package |
| `<select>` / `<option>` | Picker/select library | No exact core equivalent | Native presentation differs by platform |
| `<input type="date">` | Date/time picker library | No exact core equivalent | Platform picker and locale behavior differ |
| `<input type="file">` | Document/image picker library | No exact core equivalent | Native file selection and permissions differ |
| `<form>` | View/ScrollView + submit handler | No core form element | Button press explicitly calls validation/submission |
| `<label htmlFor>` | Text label + accessible input association | No exact HTML mapping | A nearby Text is not automatically a linked label |
| `<fieldset>` / `<legend>` | Grouped View + Text + accessibility | Similar purpose | Group semantics need deliberate implementation |
| On/off control | `<Switch>` | Native control | Uses `value` and `onValueChange` |

References: [TextInput](https://reactnative.dev/docs/textinput), [Button](https://reactnative.dev/docs/button), [Switch](https://reactnative.dev/docs/switch). Picker controls above are engineering choices; inspect each library's SDK/platform support.

### Lists, media, overlays, and links

| React web tag/pattern | React Native choice | Mapping type | Difference to remember |
|---|---|---|---|
| `<ul>` / `<ol>` with items | FlatList / View + Text | Depends on size | Bullets/numbering must be rendered if needed |
| `<li>` | Your row component | Similar purpose | No core li component |
| Grouped list | SectionList | Native list pattern | Section headers and virtualized rows |
| `div` with `overflow: auto` | ScrollView | Similar purpose | Needs bounded layout height to scroll effectively |
| Large `.map()` list | FlatList | Adaptation | Virtualization helps manage long collections |
| `<table>` / `<tr>` / `<td>` | Custom rows/cells or table library | No exact core equivalent | Consider mobile cards instead of a wide table |
| `<img>` | `<Image>` | Similar purpose | `source`, sizing and resize behavior differ |
| CSS background image | Image/custom layout layer | Similar purpose | Choose supported image/layout APIs |
| `<svg>` | Compatible SVG library | No core HTML SVG renderer | Do not paste DOM SVG tags into native UI |
| `<canvas>` | Drawing library/native view | No exact core equivalent | Renderer/API depends on the library |
| `<video>` | Compatible media player module | No exact core equivalent | Playback, background behavior, controls differ |
| `<audio>` | Compatible audio module | No exact core equivalent | Audio sessions/permissions/lifecycle differ |
| `<iframe>` | WebView library when appropriate | Similar embedding purpose | Separate web content, not a normal native layout tag |
| `<a href>` internal route | Router Link / navigator action | Similar purpose | Use route conventions for your navigation system |
| `<a href>` external URL | Linking API | Similar purpose | Opens system-supported URL handler |
| `<dialog>` | Modal or navigation modal screen | Similar purpose | Handle dismissal/back behavior explicitly |
| `<progress>` | Progress component/library | No exact core equivalent | ActivityIndicator represents indeterminate loading |
| `<details>` / `<summary>` | Expandable component using state | No exact core equivalent | Implement interaction and accessibility |
| CSS loading spinner | ActivityIndicator | Similar purpose | Platform loading UI |

References: [FlatList](https://reactnative.dev/docs/flatlist), [Image](https://reactnative.dev/docs/image), [Modal](https://reactnative.dev/docs/modal), [Linking](https://reactnative.dev/docs/linking).

## 3. Props, attributes, and events

| Task | React web | React Native | What changes |
|---|---|---|---|
| Component identifier | DOM `id` | `nativeID` when an API requires it | Not a general DOM query mechanism |
| Test lookup | Often `data-testid` | `testID` | Tool/platform handling differs |
| Class styling | `className="card"` | `style={styles.card}` | Core native components do not implement browser classes |
| Text input value | `value={email}` | Same controlled-value pattern | Event differs |
| Text changed | `onChange={e => setEmail(e.target.value)}` | `onChangeText={setEmail}` | String callback rather than DOM target |
| Activate button | `onClick={save}` | `onPress={save}` | Native press handling |
| Long press | Custom gesture/timer logic | `onLongPress` on Pressable | Native interaction API |
| Press feedback | CSS active/focus states | Pressable style callback/state | Define feedback intentionally |
| Input blur/focus | `onBlur`, `onFocus` | Same prop names on TextInput | Event objects are not assumed to be DOM events |
| Disable editable field | `disabled` | TextInput `editable={false}` | Does not use input disabled prop as the primary API |
| Disable action | `<button disabled>` | Pressable/Button `disabled` | Expose accessibility state when needed |
| Placeholder | `placeholder="Email"` | Same prop | Add a label; placeholder is not a substitute |
| Maximum text length | `maxLength={40}` | Same prop | Still validate on server |
| Autofill | HTML autocomplete conventions | Native autoComplete/textContentType options | Platform-supported values differ |
| Submit via keyboard | Form submit or Enter handling | TextInput `onSubmitEditing` | Keyboard and multiline behavior differ |
| Keyboard type | HTML type/inputMode | Native inputMode/keyboardType | Not validation |
| Image location | `src="..."` | `source={{ uri: '...' }}` | Local assets can use static require |
| Screen reader description | `aria-label` | `accessibilityLabel` is a common native API | Some ARIA aliases exist; do not assume full HTML parity |
| Control semantics | Semantic HTML / role | `accessibilityRole` / supported role APIs | Native platform support must be checked |
| Scroll event | DOM scroll metrics | `onScroll` nativeEvent metrics | Payload and throttling differ |
| Layout measurement | DOM getBoundingClientRect | `onLayout` / supported ref measurement | Coordinate/timing conventions differ |

Do not apply a universal rename to every prop. The target component's API defines what is supported. [Common DOM props](https://react.dev/reference/react-dom/components/common), [TextInput](https://reactnative.dev/docs/textinput), [Pressable](https://reactnative.dev/docs/pressable).

## 4. Styling and layout

| Feature | React web | React Native | Practical consequence |
|---|---|---|---|
| Primary styling | CSS, classes, inline styles | JS style objects, StyleSheet, supported libraries | Change the styling layer |
| Property spelling | CSS kebab case; inline camelCase | camelCase | `backgroundColor`, not `background-color` |
| Numeric dimensions | CSS px or other units | Density-independent layout values | `padding: 16` is the common native pattern |
| Percent dimensions | CSS percentages | Supported for suitable native dimension properties | Parent sizing still matters |
| CSS cascade | Selector specificity and inheritance | Explicit style composition | No general browser cascade |
| Style override | Specificity/order | Later entries in a style array override earlier ones | `style={[base, active]}` |
| Font inheritance | Often inherited through DOM | Text nesting has text-specific behavior | A View's font style does not style all nested Text |
| Default flex direction | Row for a flex container | Column | Specify row explicitly |
| Default flex shrink | Browser flex defaults include shrink 1 | Native default shrink 0 | Layout can need an explicit shrink |
| Flex growth | CSS flex properties | Native supported flex properties | Similar concepts; defaults/semantics differ |
| CSS Grid | Browser grid layout | No core browser Grid engine | Use supported Flexbox or a library |
| Gap | CSS gap | Supported native gap properties | Verify version and acceptable values |
| Media queries | CSS breakpoints | useWindowDimensions and adaptive styles | Respond to actual window size |
| Hover | CSS :hover / pointer events | Supported hover APIs where relevant | Mobile touch interaction is primary |
| Press state | CSS :active | Pressable pressed state | Style through component state |
| Overflow scroll | CSS overflow | ScrollView / lists | Use a scrolling component |
| Position fixed/sticky | Browser positioning | Layout/native/navigation-specific approach | Not a universal direct CSS replacement |
| Shadows | CSS box-shadow | Version/platform-supported native shadow APIs | Check RN version, architecture, and target OS |
| Animation | CSS transitions / web animation APIs | Animated or compatible animation library | Different supported properties/execution model |
| Safe areas | Browser viewport/inset handling | Safe-area context/insets | Account for mobile system UI |
| Dark mode | CSS queries/theme | useColorScheme/theme | Carry theme through UI consistently |

Avoid the blanket statement “React Native supports no CSS-like properties.” It supports many familiar properties, but it is not a browser CSS engine. [Style](https://reactnative.dev/docs/style), [Flexbox](https://reactnative.dev/docs/flexbox), [layout property reference](https://reactnative.dev/docs/layout-props), [View style props](https://reactnative.dev/docs/view-style-props).

## 5. Forms and validation

| Concern | React web | React Native |
|---|---|---|
| Field state | useState or form library | Same ownership options |
| Form element | HTML form | Container + explicit submit handler |
| Submit default behavior | Browser navigation may need prevention | No HTML form default for native press submission |
| Required/email browser checks | HTML constraints available | Implement client checks yourself/library |
| Email/password input UI | HTML input type | Native TextInput configuration |
| Checkbox state | checked + change event | Library/custom checkbox; Switch value/onValueChange for toggles |
| React Hook Form binding | register for supported web inputs; Controller when needed | Controller/useController for native controlled inputs |
| Blur/touched state | Track blur or use library | Same idea, native callbacks |
| Server errors | Field or form-level messages | Same concept |
| Keyboard overlap | Browser/viewport behavior | Keyboard-aware layout and device testing |
| Submit pending | Disable/show loading | Same UX concept with native action props |
| Password storage | Never persist raw passwords as app state | Same principle |
| Authoritative validation | Server | Server |

For a small form, manual state is a useful learning exercise. For many fields/complex dependencies, a form library can centralize validation, touched state, and submission status. A phone keyboard can still allow unexpected characters; parse and validate the actual value.

## 6. State, hooks, and lifecycle

| Requirement | React web | React Native | Shared or different? |
|---|---|---|---|
| Counter/modal state | useState | useState | Shared React logic |
| Wizard transitions | useReducer | useReducer | Shared React logic |
| Theme/scoped dependencies | Context | Context | Shared React mechanism |
| Shared client state | Zustand/Redux Toolkit/etc. | Same compatible libraries | Store logic often shared |
| Remote data | Query cache/API layer | Query cache/API layer | Mobile focus/network wiring can differ |
| Derived total | Compute from source values | Same | Do not create unnecessary second state |
| Form state | Values/errors/touched | Same categories | Input adapters differ |
| Component unmount | Effect cleanup | Same | Navigation away may preserve a mobile screen |
| Screen becomes visible | Web route/focus logic | Navigation focus lifecycle | Not identical to mount |
| Page visibility | Browser visibility APIs | AppState | Platform-specific external API |
| Background work | Browser constraints | OS suspension/native background APIs | JS timers are not a reliable background job system |
| Persistence restore | Browser storage + state | Native storage + state | Async hydration often needs an explicit loading state |

State ownership principles remain portable. AppState describes app activity, while navigation focus describes a screen; these are different events. [React state guide](https://react.dev/learn/managing-state), [AppState](https://reactnative.dev/docs/appstate).

## 7. Navigation, storage, APIs, and tooling

| Area | React web | React Native | Main adaptation |
|---|---|---|---|
| Route model | Browser URLs/history | Screens, stack/tabs, deep links | Select a native navigation approach |
| Internal navigation | Web router Link | Expo Router Link/router or native navigator | Different library-specific paths/actions |
| Back | Browser history | Android Back / iOS gestures / navigator | Test platform expectations |
| External links | HTML anchors/window opening | Linking | Handle unsupported URL/error paths |
| Fetch | fetch/API library | fetch/API library | Much request logic can transfer |
| Cross-origin rules | Browser CORS applies | Native networking differs | RN Web still runs under browser rules |
| Local API host | localhost is the computer browser host | localhost is the phone/emulator itself | Use reachable host addressing |
| localStorage | Browser synchronous API | Not a native global storage API | Choose a native storage library |
| Nonsecret preferences | Browser storage | AsyncStorage or appropriate storage | Hydrate state after load |
| Credentials | Secure server/session design | Platform secure-storage design | Browser cookie patterns are not automatically native patterns |
| Privileged secrets | Must stay on server | Must stay on server | Bundled environment values are extractable |
| Camera/location/files | Browser APIs | Native modules | Different permissions/configuration |
| Accessibility | HTML semantics/browser accessibility | Native accessibility APIs | Test screen readers on each platform |
| UI test tools | Browser component/E2E tools | Native component/device tools | Web tests do not prove native behavior |
| Bundling | Web tooling | Metro in common RN workflows | Bundler differs from JS runtime |
| Development preview | Browser dev server | Metro + native client; web preview optional | Page shell can load before JS bundle |
| Android local build | Not needed for a website | Android SDK/JDK/build tooling | Native binary production |
| iOS local build | Not needed for a website | Mac/Xcode/toolchain | Windows cannot run Xcode locally |
| Distribution | Website URL | Store/internal native builds | Signing, versions, platform review |
| Updates | Deploy web assets | New binary and compatible JS update workflows | Native changes need a native build |

Sources: [networking](https://reactnative.dev/docs/network), [security](https://reactnative.dev/docs/security), [environment setup](https://reactnative.dev/docs/set-up-your-environment).

**Important for this folder's sample:** it uses Expo SDK 57 and Expo Router. In SDK 56+, app code uses Router's corresponding navigation entry points rather than external `@react-navigation/*` imports. For example, import `useHeaderHeight` from `expo-router/react-navigation`. A standalone React Navigation project is a separate valid approach. [Migration reference](https://docs.expo.dev/router/migrate/sdk-55-to-56/)

## 8. Simple side-by-side code examples

Each web/native pair is an alternative, not code to combine into one file. Complete component examples include their imports. Short fragments explicitly identify values supplied by the surrounding component. The native examples can be adapted into a screen in the installed Expo project; changing a screen's export may require matching its route convention.

### Example 1: container, heading, and inline text

**React web**

```tsx
export function Welcome() {
  return (
    <section style={{ padding: 16 }}>
      <h1>Welcome</h1>
      <p>Hello, <strong>Sakthi</strong>!</p>
    </section>
  );
}
```

**React Native**

```tsx
import { View, Text } from 'react-native';

export function Welcome() {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text accessibilityRole="header" style={{ fontSize: 28, fontWeight: '700' }}>
        Welcome
      </Text>
      <Text>Hello, <Text style={{ fontWeight: '700' }}>Sakthi</Text>!</Text>
    </View>
  );
}
```

What transfers: component syntax and composition. What changes: host components, explicit spacing, text nesting, accessibility semantics.

### Example 2: button and counter

**React web**

```tsx
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(previous => previous + 1)}>Add</button>
    </div>
  );
}
```

**React Native**

```tsx
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text>Count: {count}</Text>
      <Pressable accessibilityRole="button"
        onPress={() => setCount(previous => previous + 1)}
        style={({ pressed }) => ({
          padding: 12, backgroundColor: pressed ? '#173487' : '#2349bb',
          borderRadius: 8,
        })}>
        <Text style={{ color: 'white' }}>Add</Text>
      </Pressable>
    </View>
  );
}
```

For a basic native Button instead of custom content:

```tsx
import { Button } from 'react-native';
// Inside Counter, using its existing setter:
<Button title="Add" onPress={() => setCount(previous => previous + 1)} />
```

Button's label is a `title` prop; Pressable can contain custom UI. The state update is unchanged.

### Example 3: controlled text input

**React web**

```tsx
import { useState } from 'react';

export function NameInput() {
  const [name, setName] = useState('');
  return (
    <div>
      <label htmlFor="name">Full name</label>
      <input id="name" value={name} onChange={e => setName(e.target.value)} />
      <p>Hello, {name}</p>
    </div>
  );
}
```

**React Native**

```tsx
import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

export function NameInput() {
  const [name, setName] = useState('');
  return (
    <View style={{ padding: 16, gap: 10 }}>
      <Text>Full name</Text>
      <TextInput accessibilityLabel="Full name" value={name}
        onChangeText={setName}
        style={{ padding: 12, borderWidth: 1, borderColor: '#777' }} />
      <Text>Hello, {name}</Text>
    </View>
  );
}
```

The visible native Text label is supplemented with an explicit accessible input label. There is no DOM `e.target.value` in this callback.

### Example 4: simple validated form

This checks email shape for immediate feedback. It does not verify ownership or create a real account. Backend validation is still required in a real app.

**React web**

```tsx
import { useState } from 'react';
import type { FormEvent } from 'react';

export function EmailForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setError(valid ? '' : 'Enter a valid email.');
    setSaved(valid);
  }
  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email}
        onChange={e => { setEmail(e.target.value); setError(''); setSaved(false); }} />
      {error && <p role="alert">{error}</p>}
      <button type="submit">Save</button>
      {saved && <p>Demo accepted.</p>}
    </form>
  );
}
```

**React Native**

```tsx
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export function EmailForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  function submit() {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setError(valid ? '' : 'Enter a valid email.');
    setSaved(valid);
  }
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text>Email</Text>
      <TextInput accessibilityLabel="Email" value={email}
        keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
        onChangeText={value => { setEmail(value); setError(''); setSaved(false); }}
        style={{ borderWidth: 1, padding: 12 }} />
      {!!error && <Text accessibilityRole="alert">{error}</Text>}
      <Pressable accessibilityRole="button" onPress={submit}>
        <Text>Save</Text>
      </Pressable>
      {saved && <Text>Demo accepted.</Text>}
    </View>
  );
}
```

What is shared: state and validation logic. What changes: the form container, events, submission entry point, and controls. The web example uses noValidate so this particular example consistently displays its own errors.

### Example 5: multiline and password fields

Fragments: the enclosing component supplies string states `notes`, `password` and setters `setNotes`, `setPassword`.

**React web**

```tsx
<>
  <textarea aria-label="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
  <input aria-label="Password" type="password" value={password}
    onChange={e => setPassword(e.target.value)} />
</>
```

**React Native**

```tsx
import { TextInput } from 'react-native';

<>
  <TextInput accessibilityLabel="Notes" multiline value={notes}
    onChangeText={setNotes} style={{ minHeight: 100, textAlignVertical: 'top' }} />
  <TextInput accessibilityLabel="Password" secureTextEntry value={password}
    onChangeText={setPassword} autoCapitalize="none" autoCorrect={false} />
</>
```

Do not apply secureTextEntry to a multiline notes input. Check native password/autofill behavior on real devices.

### Example 6: toggle

**React web**

```tsx
import { useState } from 'react';

export function NotificationToggle() {
  const [enabled, setEnabled] = useState(false);
  return <label>
    <input type="checkbox" checked={enabled}
      onChange={e => setEnabled(e.target.checked)} />
    Enable notifications
  </label>;
}
```

**React Native**

```tsx
import { useState } from 'react';
import { View, Text, Switch } from 'react-native';

export function NotificationToggle() {
  const [enabled, setEnabled] = useState(false);
  return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
    <Switch accessibilityLabel="Enable notifications"
      value={enabled} onValueChange={setEnabled} />
    <Text>Enable notifications</Text>
  </View>;
}
```

These controls only change demo state. They do not request OS notification permission or subscribe to a service. A Switch is a useful on/off mapping; use a real checkbox implementation when checkbox semantics are required.

### Example 7: image

**React web**

```tsx
export function Photo() {
  return <img src="https://picsum.photos/120" alt="Sample photograph"
    width={120} height={120} style={{ objectFit: 'cover', borderRadius: 12 }} />;
}
```

**React Native**

```tsx
import { Image } from 'react-native';

export function Photo() {
  return <Image source={{ uri: 'https://picsum.photos/120' }}
    accessible accessibilityLabel="Sample photograph" resizeMode="cover"
    style={{ width: 120, height: 120, borderRadius: 12 }} />;
}
```

The remote URL is an example external image service and requires network access. For the sample's existing local asset:

```tsx
// From learning-app/src/app/index.tsx:
<Image source={require('../../assets/icon.png')}
  style={{ width: 64, height: 64 }} />
```

Use a static asset path known at build time; image imports are not a promise that arbitrary dynamic require strings will resolve.

### Example 8: list

**React web**

```tsx
const users = [{ id: '1', name: 'Anu' }, { id: '2', name: 'Ravi' }];

export function Users() {
  return <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}
```

**React Native**

```tsx
import { FlatList, Text, View } from 'react-native';

const users = [{ id: '1', name: 'Anu' }, { id: '2', name: 'Ravi' }];
export function Users() {
  return <FlatList data={users} keyExtractor={user => user.id}
    renderItem={({ item }) => (
      <View style={{ padding: 16 }}><Text>{item.name}</Text></View>
    )}
    ListEmptyComponent={<Text>No users.</Text>} />;
}
```

For two items, View + map would also be reasonable. FlatList demonstrates the pattern that scales to larger collections; it does not automatically render HTML bullets or list semantics.

### Example 9: styling and layout

**React web**

```tsx
export function Card() {
  return <div className="card"><span>Left</span><span>Right</span></div>;
}
```

```css
.card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  background-color: #edf1fc;
  border-radius: 12px;
}
```

**React Native**

```tsx
import { View, Text, StyleSheet } from 'react-native';

export function Card() {
  return <View style={styles.card}><Text>Left</Text><Text>Right</Text></View>;
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', justifyContent: 'space-between', padding: 16,
    backgroundColor: '#edf1fc', borderRadius: 12,
  },
});
```

The layout idea transfers; the stylesheet API and supported units differ. Styling libraries may add className conventions, but those are library features, not a browser CSS engine in native core.

### Example 10: conditional rendering and style

Fragments: the surrounding component supplies booleans `loading`, `selected`, and number `count`.

**React web**

```tsx
<div className={selected ? 'card selected' : 'card'}>
  {loading ? <p>Loading...</p> : <p>Ready</p>}
  {count > 0 && <span>{count}</span>}
</div>
```

**React Native**

```tsx
import { View, Text, ActivityIndicator } from 'react-native';

<View style={[{ padding: 16 }, selected && { borderWidth: 2 }]}>
  {loading ? <ActivityIndicator /> : <Text>Ready</Text>}
  {count > 0 && <Text>{count}</Text>}
</View>
```

Use a boolean condition such as `count > 0`. `count && <Text>...</Text>` can evaluate to raw `0`, which is particularly problematic under a native View.

### Example 11: internal and external navigation

**React web: React Router example** (requires a React Router app/provider and matching route):

```tsx
import { Link } from 'react-router';

export function Links() {
  return <div>
    <Link to="/profile">Profile</Link>
    <a href="https://react.dev">React documentation</a>
  </div>;
}
```

**React Native: Expo Router example** (works with the included profile route):

```tsx
import { useState } from 'react';
import { Link } from 'expo-router';
import { Linking, Pressable, Text, View } from 'react-native';

export function Links() {
  const [error, setError] = useState('');
  async function openDocs() {
    setError('');
    try { await Linking.openURL('https://react.dev'); }
    catch { setError('Could not open documentation.'); }
  }
  return <View style={{ gap: 12 }}>
    <Link href="/profile">Profile</Link>
    <Pressable accessibilityRole="link" onPress={() => { void openDocs(); }}>
      <Text>React documentation</Text>
    </Pressable>
    {!!error && <Text>{error}</Text>}
  </View>;
}
```

React Router is a web example, not a dependency to install into this native sample. Other web routers have their own APIs. External links and internal screen transitions are separate tasks.

### Example 12: modal

**React web**

```tsx
import { useState } from 'react';

export function Help() {
  const [open, setOpen] = useState(false);
  return <div>
    <button onClick={() => setOpen(true)}>Open help</button>
    {open && <dialog open aria-label="Help">
      <p>Help content</p>
      <button onClick={() => setOpen(false)}>Close</button>
    </dialog>}
  </div>;
}
```

The web fragment above is a simple open dialog, **not** a complete modal implementation. A production web modal also needs appropriate modal presentation, focus management, and dismissal behavior.

**React Native**

```tsx
import { useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';

export function Help() {
  const [open, setOpen] = useState(false);
  return <View>
    <Button title="Open help" onPress={() => setOpen(true)} />
    <Modal visible={open} transparent animationType="fade"
      onRequestClose={() => setOpen(false)}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 24,
        backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, gap: 12 }}>
          <Text>Help content</Text>
          <Button title="Close" onPress={() => setOpen(false)} />
        </View>
      </View>
    </Modal>
  </View>;
}
```

The shared part is `open` state. Platform presentation and dismissal differ; `onRequestClose` handles the native dismissal request, including relevant Android Back behavior.

### Example 13: responsive layout

**React web**

```tsx
export function TwoPanels() {
  return <div className="panels"><div>First</div><div>Second</div></div>;
}
```

```css
.panels { display: flex; flex-direction: column; gap: 16px; }
@media (min-width: 700px) { .panels { flex-direction: row; } }
```

**React Native**

```tsx
import { Text, View, useWindowDimensions } from 'react-native';

export function TwoPanels() {
  const { width } = useWindowDimensions();
  return <View style={{ flexDirection: width >= 700 ? 'row' : 'column', gap: 16 }}>
    <View style={{ flex: 1 }}><Text>First</Text></View>
    <View style={{ flex: 1 }}><Text>Second</Text></View>
  </View>;
}
```

The 700 breakpoint is an example product choice, not a universal phone/tablet rule. This hook responds to window changes; test actual parent constraints and large text. [useWindowDimensions](https://reactnative.dev/docs/usewindowdimensions)

### Example 14: API logic that can be shared

**Shared JS/TS utility** for either environment:

```tsx
type User = { id: string; name: string };

export async function getUsers(url: string, signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(item =>
    item !== null && typeof item === 'object' &&
    typeof item.id === 'string' && typeof item.name === 'string')) {
    throw new Error('Unexpected response format');
  }
  return data as User[];
}
```

The caller supplies a real HTTPS API URL and handles loading/error/success. Render the result with web HTML or native FlatList. The function is reusable; browser CORS, native transport policy, auth handling, and reachable host addressing still need environment-specific attention.

### Example 15: shared store, different UI

Install a compatible Zustand version in the target project if absent; it is already installed in this sample.

**Shared store module**

```tsx
import { create } from 'zustand';

type CounterState = { count: number; add: () => void };
export const useCounter = create<CounterState>()(set => ({
  count: 0,
  add: () => set(state => ({ count: state.count + 1 })),
}));
```

**React web UI**

```tsx
import { useCounter } from './counter-store';

export function SharedCounter() {
  const count = useCounter(state => state.count);
  const add = useCounter(state => state.add);
  return <button onClick={add}>Count: {count}</button>;
}
```

**React Native UI**

```tsx
import { Pressable, Text } from 'react-native';
import { useCounter } from './counter-store';

export function SharedCounter() {
  const count = useCounter(state => state.count);
  const add = useCounter(state => state.add);
  return <Pressable accessibilityRole="button" onPress={add}>
    <Text>Count: {count}</Text>
  </Pressable>;
}
```

Store subscriptions and transitions transfer. Host UI changes. This module is illustrative; the actual sample's counter lives in `src/store.ts` with its own action names. [Zustand create](https://zustand.docs.pmnd.rs/reference/apis/create)

### Example 16: ordinary preference persistence

These are isolated persistence fragments, not complete hydration flows. Avoid treating a storage write as an automatic UI update.

**React web**

```ts
localStorage.setItem('theme', 'dark');
const savedTheme = localStorage.getItem('theme');
```

**React Native** (requires a compatible AsyncStorage installation):

```ts
import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('theme', 'dark');
const savedTheme = await AsyncStorage.getItem('theme');
```

Handle storage exceptions and feed restored values into your state owner. Use this for nonsensitive preferences; choose suitable secure storage for sensitive credentials. This sample does not persist its counter/profile. [AsyncStorage API](https://react-native-async-storage.github.io/async-storage/docs/api/)

## 9. Migration mistakes and decision checklist

| Mistake | Better approach |
|---|---|
| Copy `<div>` and `<input>` into an Android screen | Replace host components and adapt event contracts |
| Assume every web tag has an exact native substitute | Map user intent; choose a library/custom UI where needed |
| Put raw strings/numbers directly under View | Use Text and explicit boolean conditional expressions |
| Use `e.target.value` in onChangeText | Use the string argument |
| Treat keyboardType as validation | Validate actual input on client and server |
| Expect className and browser CSS without a library | Use native styles or a deliberate compatible styling system |
| Forget native Flexbox defaults | Set layout direction/shrink intentionally |
| Use a giant ScrollView for an unbounded list | Use virtualized list/pagination suited to the collection |
| Pass the entire user record/password to navigation | Pass IDs or use an appropriate state owner |
| Fetch only on mount when refresh is needed on focus | Set a deliberate focus/freshness policy |
| Use localStorage in native code | Use a supported storage API and hydrate state |
| Call localhost API from a phone expecting the laptop | Use reachable development host addressing |
| Assume React Native Web success proves mobile success | Run and test Android/iOS binaries separately |
| Think all Expo projects prohibit custom native code | Use a development build and supported native integration |
| Use external React Navigation imports in SDK 57 Router code | Use documented Expo Router entry points |
| Assume an HTTP 200 page means React UI ran | Verify JS bundle load and actual interaction |

When converting a feature, answer these questions:

1. Which parts are pure React/JS logic and can remain shared?
2. Which parts depend on HTML, DOM, browser CSS, or browser globals?
3. Which native components/libraries express the same user task?
4. Which event payloads and input props change?
5. Who owns local, shared, server, form, and navigation state?
6. Does the feature need permissions, secure storage, or native rebuilds?
7. How will keyboard, Back, safe areas, and screen readers behave?
8. What must be verified on Android and iOS separately?

For practice, rewrite one existing React form into a native screen, keeping validation functions and types shared. Then compare the UI adapters. That exercise demonstrates the distinction more clearly than memorizing only tag names.

## 10. Official references

Component mappings in this file are practical comparisons, not promises of identical platform semantics. Refer to your selected version's APIs before adding a library or adopting a property. The installed sample is Expo SDK 57 / React Native 0.86.3; some React Native links open the current documentation version.

- [React APIs](https://react.dev/reference/react)
- [React DOM common components](https://react.dev/reference/react-dom/components/common)
- [React Native core component overview](https://reactnative.dev/docs/intro-react-native-components)
- [Text](https://reactnative.dev/docs/text), [TextInput](https://reactnative.dev/docs/textinput)
- [Pressable](https://reactnative.dev/docs/pressable), [Button](https://reactnative.dev/docs/button), [Switch](https://reactnative.dev/docs/switch)
- [Image](https://reactnative.dev/docs/image), [FlatList](https://reactnative.dev/docs/flatlist), [ScrollView](https://reactnative.dev/docs/scrollview)
- [Style](https://reactnative.dev/docs/style), [Flexbox](https://reactnative.dev/docs/flexbox), [layout props](https://reactnative.dev/docs/layout-props), [View styles](https://reactnative.dev/docs/view-style-props)
- [Accessibility](https://reactnative.dev/docs/accessibility), [Modal](https://reactnative.dev/docs/modal), [Linking](https://reactnative.dev/docs/linking)
- [Networking](https://reactnative.dev/docs/network), [AppState](https://reactnative.dev/docs/appstate), [security](https://reactnative.dev/docs/security)
- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/), [Router navigation](https://docs.expo.dev/router/basics/navigation/), [Router SDK 56+ import migration](https://docs.expo.dev/router/migrate/sdk-55-to-56/)
- [React Router Link](https://reactrouter.com/api/components/Link)
- [Zustand store API](https://zustand.docs.pmnd.rs/reference/apis/create)
- [AsyncStorage API](https://react-native-async-storage.github.io/async-storage/docs/api/)
