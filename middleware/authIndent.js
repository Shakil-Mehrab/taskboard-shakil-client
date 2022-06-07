export default function ({ store, redirect, route }) {
  if (!store.state.auth.loggedIn) {
    return redirect(`/auth/login?redirect=${route.path}`);
  }
}
