import { useEffect, useRef } from 'react';

export function useInterval<C extends CallableFunction>(
  callback: C,
  delay: number | null
): void {
  /*
   * Hook customizado para gerenciar o setInterval de forma segura no ciclo de vida do React.
   *
   * O uso de useRef<C | null>(null) cria uma referência mutável (MutableRefObject).
   * Isso permite atualizar e armazenar o callback mais recente a cada renderização
   * sem disparar um novo ciclo e sem precisar reiniciar o cronômetro do setInterval,
   * evitando bugs de estado obsoleto (stale closure) e vazamentos de memória.
   */
  const savedCallback = useRef<C | null>(null);

  //Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
