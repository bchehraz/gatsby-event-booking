export const isBrowser = typeof window !== `undefined`;

export const isResponseOk = (res) => {
  return !(res.status !== 200 && res.status !== 201);
}
