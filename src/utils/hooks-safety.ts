/**
 * React Hooks Safety Utilities
 * Helps prevent common hooks violations and provides safe alternatives
 */

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Safe dynamic import hook that doesn't violate Rules of Hooks
 * Uses static fallback values until module loads
 */
export function useSafeDynamicImport<T>(
  importFn: () => Promise<{ default: T }>,
  fallback: T,
) {
  const [module, setModule] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    importFn()
      .then((mod) => {
        if (mounted) {
          setModule(mod.default);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
          setLoading(false);
          console.error("Dynamic import failed:", err);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { module, loading, error };
}

/**
 * Safe conditional hook execution
 * Ensures hooks are always called in the same order
 */
export function useSafeConditionalEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList,
  condition: boolean,
) {
  const conditionRef = useRef(condition);
  conditionRef.current = condition;

  useEffect(() => {
    if (conditionRef.current) {
      return effect();
    }
  }, deps);
}

/**
 * Safe async state management
 * Prevents state updates on unmounted components
 */
export function useSafeAsyncState<T>(initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const safeSetState = useCallback((value: T | ((prev: T) => T)) => {
    if (mounted.current) {
      setState(value);
    }
  }, []);

  const asyncSetState = useCallback(async (asyncFn: () => Promise<T>) => {
    if (!mounted.current) return;

    setLoading(true);
    setError(null);

    try {
      const result = await asyncFn();
      if (mounted.current) {
        setState(result);
      }
    } catch (err) {
      if (mounted.current) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  }, []);

  return {
    state,
    setState: safeSetState,
    asyncSetState,
    loading,
    error,
  };
}

/**
 * Hook order validator for development
 * Helps catch hooks order violations early
 */
export function useHooksOrderValidator(
  componentName: string,
  hookNames: string[],
) {
  const previousHooksRef = useRef<string[]>([]);
  const renderCountRef = useRef(0);

  renderCountRef.current += 1;

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const currentHooks = hookNames;
      const previousHooks = previousHooksRef.current;

      if (previousHooks.length > 0 && renderCountRef.current > 1) {
        // Check if hooks order changed
        const orderChanged =
          currentHooks.length !== previousHooks.length ||
          currentHooks.some((hook, index) => hook !== previousHooks[index]);

        if (orderChanged) {
          console.error(
            `🚨 Hooks order violation detected in ${componentName}!`,
            {
              previous: previousHooks,
              current: currentHooks,
              renderCount: renderCountRef.current,
            },
          );
        }
      }

      previousHooksRef.current = [...currentHooks];
    }
  });
}

/**
 * Safe component loader that handles errors gracefully
 */
export function useSafeComponentLoader<T extends React.ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
  fallback?: React.ComponentType,
) {
  const [Component, setComponent] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    loader()
      .then((module) => {
        if (mounted) {
          setComponent(() => module.default);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
          setLoading(false);
          console.error("Component loading failed:", err);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Return fallback component if provided and loading failed
  const SafeComponent = Component || fallback || null;

  return { Component: SafeComponent, loading, error };
}

/**
 * Development-only hook to track re-renders
 */
export function useRenderTracker(componentName: string) {
  const renderCount = useRef(0);
  const previousProps = useRef<any>();

  renderCount.current += 1;

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(`🔄 ${componentName} rendered ${renderCount.current} times`);
    }
  });

  return {
    renderCount: renderCount.current,
    logProps: (props: any) => {
      if (process.env.NODE_ENV === "development") {
        console.log(`📋 ${componentName} props:`, {
          current: props,
          previous: previousProps.current,
          changed:
            JSON.stringify(props) !== JSON.stringify(previousProps.current),
        });
        previousProps.current = props;
      }
    },
  };
}

/**
 * Safe event listener hook
 */
export function useSafeEventListener(
  target: EventTarget | null,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions,
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!target) return;

    const eventListener = (e: Event) => handlerRef.current(e);
    target.addEventListener(event, eventListener, options);

    return () => target.removeEventListener(event, eventListener, options);
  }, [target, event, options]);
}

/**
 * Validates that hooks are called in consistent order
 */
export function validateHooksOrder(
  componentName: string,
  expectedHooks: string[],
) {
  if (process.env.NODE_ENV === "development") {
    useHooksOrderValidator(componentName, expectedHooks);
  }
}

export default {
  useSafeDynamicImport,
  useSafeConditionalEffect,
  useSafeAsyncState,
  useHooksOrderValidator,
  useSafeComponentLoader,
  useRenderTracker,
  useSafeEventListener,
  validateHooksOrder,
};
