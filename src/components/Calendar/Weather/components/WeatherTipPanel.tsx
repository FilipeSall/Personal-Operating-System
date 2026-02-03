import { useCallback, useMemo, useState, type ReactElement } from 'react';
import {
  MdAcUnit,
  MdAir,
  MdBlurOn,
  MdCheckCircle,
  MdChevronLeft,
  MdChevronRight,
  MdCloud,
  MdDeviceThermostat,
  MdGrain,
  MdInfo,
  MdOpacity,
  MdThunderstorm,
  MdUmbrella,
  MdWarning,
  MdWbSunny,
  MdArrowForward,
} from 'react-icons/md';
import type { WeatherTip, WeatherTipKind } from '../../../../types/weather';
import {
  weatherTipCard,
  weatherTipItem,
  weatherTipIcon,
  weatherTipHeader,
  weatherTipDot,
  weatherTipLabel,
  weatherTipText,
  weatherTipFooter,
  weatherTipNav,
  weatherTipNavButton,
  weatherTipCounter,
} from '../CSS/WeatherTipPanel.styles';
import { weatherDetailsButton } from '../CSS/WeatherFooter.styles';

type WeatherTipPanelProps = {
  tips: WeatherTip[];
  canOpenDetails: boolean;
  onOpenDetails: () => void;
};

const tipIconElements: Record<WeatherTipKind, ReactElement> = {
  sun: <MdWbSunny size={18} />,
  rain: <MdUmbrella size={18} />,
  storm: <MdThunderstorm size={18} />,
  snow: <MdAcUnit size={18} />,
  fog: <MdBlurOn size={18} />,
  clouds: <MdCloud size={18} />,
  wind: <MdAir size={18} />,
  humidity: <MdOpacity size={18} />,
  uv: <MdWbSunny size={18} />,
  temperature: <MdDeviceThermostat size={18} />,
  precipitation: <MdGrain size={18} />,
  alert: <MdWarning size={18} />,
  generic: <MdInfo size={18} />,
  composite: <MdDeviceThermostat size={18} />,
  positive: <MdCheckCircle size={18} />,
};

/**
 * Resolve o icone correto de acordo com o tipo de dica.
 */
const getTipIcon = (kind: WeatherTipKind): ReactElement => {
  return tipIconElements[kind] ?? tipIconElements.generic;
};

/**
 * Painel principal das dicas do clima, com paginacao.
 */
export function WeatherTipPanel({ tips, canOpenDetails, onOpenDetails }: WeatherTipPanelProps) {
  const tipCount = tips.length;
  const tipsSignature = useMemo(() => tips.map((tip) => tip.id).join('|'), [tips]);
  return (
    <WeatherTipPanelContent
      key={tipsSignature}
      tips={tips}
      tipCount={tipCount}
      canOpenDetails={canOpenDetails}
      onOpenDetails={onOpenDetails}
    />
  );
}

type WeatherTipPanelContentProps = {
  tips: WeatherTip[];
  tipCount: number;
  canOpenDetails: boolean;
  onOpenDetails: () => void;
};

const TIPS_PER_PAGE = 2;

/**
 * Conteudo do painel de dicas, com estado interno de paginacao.
 */
const WeatherTipPanelContent = ({
  tips,
  tipCount,
  canOpenDetails,
  onOpenDetails,
}: WeatherTipPanelContentProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const clampedIndex = tipCount === 0 ? 0 : Math.min(activeIndex, tipCount - 1);
  const pageStart = Math.floor(clampedIndex / TIPS_PER_PAGE) * TIPS_PER_PAGE;
  const pageTips = tips.slice(pageStart, pageStart + TIPS_PER_PAGE);
  const pageCount = Math.max(1, Math.ceil(tipCount / TIPS_PER_PAGE));
  const currentPage = Math.min(pageCount, Math.floor(pageStart / TIPS_PER_PAGE) + 1);

  /**
   * Vai para a dica anterior.
   */
  const handlePrevTip = useCallback(() => {
    if (tipCount === 0) {
      return;
    }
    setActiveIndex((previous) => {
      const previousPageIndex =
        (Math.floor(previous / TIPS_PER_PAGE) - 1 + pageCount) % pageCount;
      return previousPageIndex * TIPS_PER_PAGE;
    });
  }, [pageCount, tipCount]);

  /**
   * Vai para a proxima dica.
   */
  const handleNextTip = useCallback(() => {
    if (tipCount === 0) {
      return;
    }
    setActiveIndex((previous) => {
      const nextPageIndex = (Math.floor(previous / TIPS_PER_PAGE) + 1) % pageCount;
      return nextPageIndex * TIPS_PER_PAGE;
    });
  }, [pageCount, tipCount]);

  if (pageTips.length === 0) {
    return null;
  }

  const isSingleTip = tipCount <= TIPS_PER_PAGE;

  return (
    <div className={weatherTipCard}>
      {pageTips.map((tip) => (
        <div key={tip.id} className={weatherTipItem}>
          <div className={weatherTipIcon}>{getTipIcon(tip.kind)}</div>
          <div className={weatherTipHeader}>
            <span className={weatherTipDot} />
            <span className={weatherTipLabel}>{tip.label}</span>
          </div>
          <p className={weatherTipText}>{tip.message}</p>
        </div>
      ))}
      <div className={weatherTipFooter}>
        <button
          type="button"
          className={weatherDetailsButton}
          disabled={!canOpenDetails}
          onClick={onOpenDetails}
        >
          <span>Detalhes do clima</span>
          <MdArrowForward size={16} />
        </button>
        <div className={weatherTipNav}>
          <button
            type="button"
            className={weatherTipNavButton}
            onClick={handlePrevTip}
            aria-label="Dica anterior"
            disabled={isSingleTip}
          >
            <MdChevronLeft size={16} />
          </button>
          <span className={weatherTipCounter}>
            {currentPage} / {pageCount}
          </span>
          <button
            type="button"
            className={weatherTipNavButton}
            onClick={handleNextTip}
            aria-label="Proxima dica"
            disabled={isSingleTip}
          >
            <MdChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
