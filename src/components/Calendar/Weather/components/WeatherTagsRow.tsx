import type { WeatherTag } from '../utils/weatherTags';
import { weatherTagsRow, weatherTag } from '../CSS/WeatherSummary.styles';

type WeatherTagsRowProps = {
  tags: WeatherTag[];
};

/**
 * Exibe uma linha com tags contextuais do clima.
 * Máximo de 3 tags: sensação térmica, umidade extrema, vento.
 */
export function WeatherTagsRow({ tags }: WeatherTagsRowProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={weatherTagsRow}>
      {tags.map((tag) => (
        <span key={tag.id} className={weatherTag}>
          <span>{tag.icon}</span>
          <span>{tag.label}</span>
        </span>
      ))}
    </div>
  );
}
