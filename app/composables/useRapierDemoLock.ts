const activeDemo = shallowRef<symbol | null>(null)

/**
 * @tresjs/rapier v1 corrupts its worlds when two `<Physics>` instances are alive
 * at the same time, so a page may only ever run one rapier demo. Whichever demo
 * claims the lock last is the one that renders; the others unmount their canvas.
 */
export function useRapierDemoLock() {
  const id = Symbol('rapier-demo')
  const isActive = computed(() => activeDemo.value === id)

  function claim() {
    activeDemo.value = id
  }

  function release() {
    if (activeDemo.value === id) {
      activeDemo.value = null
    }
  }

  onScopeDispose(release)

  return { isActive, claim, release }
}
