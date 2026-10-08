# React Native learning app

Expo SDK 57 + TypeScript + Expo Router + Zustand. Three routes: Home, Register, Profile.

From this directory:

```powershell
npm.cmd install
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run web
```

For a compatible Expo Go device, use `npm.cmd start` and scan its QR code. For Android emulator preview, start the emulator and run `npm.cmd run android`. iOS local simulator requires macOS/Xcode.

Try these steps:

1. Increment the counter and open Profile; the same counter appears.
2. Open Register and submit blank fields; validation errors appear.
3. Enter `Demo User`, `demo@example.com`, and `demo1234` twice; enable the demo agreement and save.
4. Open Profile; name/email appear. Reset demo state to clear them.

This is a local teaching demo. There is no backend/account creation, credential persistence, or real authentication. Reloading loses store state. Use dummy passwords.

Code tour: `src/app/_layout.tsx` defines the stack; `src/app/register.tsx` owns local form state; `src/validation.ts` holds pure rules; `src/store.ts` owns shared profile/counter; `src/components/ui.tsx` supplies common native UI.

See `../REACT_NATIVE_COMPLETE_GUIDE.md` and `../SETUP_STATUS.md` for installation, theory, interviews, and actual machine verification.
