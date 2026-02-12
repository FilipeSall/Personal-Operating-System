import type { WeatherTip } from '../../../../../types/weather';
import type { TipPool, WeatherTipsInput } from './types';
import { buildAlertTip } from './builders/alertTip';
import { buildMiseryTip, buildWindChillTip, buildBadHairDayTip, buildDeceptiveColdTip } from './builders/compositeTips';
import { buildPrimaryTip } from './builders/primaryTip';
import { buildPerfectDayTip, buildWorkoutTip } from './builders/positiveTips';
import { buildSecondaryTips } from './builders/secondaryTips';
import { buildFallbackTips } from './builders/fallbackTips';
import { formatFutureTipMessage } from './formatters';
import { isFutureLocalDay } from './signals';
import { selectFromWeightedPools } from './selectors';
import { buildTipSeed } from './seed';
import { shuffleTips } from './text';

/**
 * Monta a lista final com 4 dicas, usando sistema de prioridades.
 * @param input Snapshot e data selecionada para geração das dicas.
 * @param input.snapshot Snapshot diário de clima.
 * @param input.selectedDate Data selecionada no calendário.
 * @returns Lista final de dicas ordenadas para exibição.
 */
export const buildWeatherTips = ({ snapshot, selectedDate }: WeatherTipsInput): WeatherTip[] => {
  const now = new Date();
  const isFuture = isFutureLocalDay(selectedDate, now);
  const seed = buildTipSeed(selectedDate, snapshot.description);

  // Pools de dicas por prioridade
  const alertPool: WeatherTip[] = [];
  const compositePool: WeatherTip[] = [];
  const primaryPool: WeatherTip[] = [];
  const positivePool: WeatherTip[] = [];
  const secondaryPool: WeatherTip[] = [];
  const fallbackPool: WeatherTip[] = [];

  // 1. Alertas (maxima prioridade)
  const alertTip = buildAlertTip(snapshot.alerts);
  if (alertTip) {
    alertPool.push(alertTip);
  }

  // 2. Condicoes compostas
  const miseryTip = buildMiseryTip(snapshot);
  if (miseryTip) compositePool.push(miseryTip);

  const windChillTip = buildWindChillTip(snapshot);
  if (windChillTip) compositePool.push(windChillTip);

  const badHairTip = buildBadHairDayTip(snapshot);
  if (badHairTip) compositePool.push(badHairTip);

  const deceptiveColdTip = buildDeceptiveColdTip(snapshot);
  if (deceptiveColdTip) compositePool.push(deceptiveColdTip);

  // 3. Dica principal (baseada na descricao do clima)
  const primaryTip = buildPrimaryTip(snapshot, selectedDate);
  primaryPool.push(primaryTip);

  // 4. Condicoes positivas
  const perfectDayTip = buildPerfectDayTip(snapshot, selectedDate);
  if (perfectDayTip) positivePool.push(perfectDayTip);

  const workoutTip = buildWorkoutTip(snapshot, selectedDate);
  if (workoutTip) positivePool.push(workoutTip);

  // 5. Dicas secundarias (existentes)
  const secondaryTips = buildSecondaryTips(snapshot, primaryTip.kind, selectedDate);
  const randomizedSecondary = shuffleTips(secondaryTips, seed);
  secondaryPool.push(...randomizedSecondary);

  // 6. Dicas coringa
  const fallbackTips = buildFallbackTips(snapshot, selectedDate);
  const randomizedFallback = shuffleTips(fallbackTips, seed + 7);
  fallbackPool.push(...randomizedFallback);

  // Montar pools com pesos
  const weightedPools: TipPool[] = [
    { tips: alertPool, weight: 10 },      // Alertas sempre primeiro
    { tips: compositePool, weight: 9 },   // Condicoes compostas (alta relevancia)
    { tips: primaryPool, weight: 8 },     // Descricao principal do clima
    { tips: positivePool, weight: 7 },    // Clima perfeito (quando aplicavel)
    { tips: secondaryPool, weight: 5 },   // Metricas individuais
    { tips: fallbackPool, weight: 1 },    // Coringa (ultimo recurso)
  ];

  const selected = selectFromWeightedPools(weightedPools, 4);

  if (!isFuture) {
    return selected;
  }

  return selected.map((tip) => ({
    ...tip,
    message: formatFutureTipMessage(tip.message),
  }));
};
