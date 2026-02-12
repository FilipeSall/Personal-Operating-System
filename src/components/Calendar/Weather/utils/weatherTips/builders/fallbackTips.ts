import type { WeatherSnapshot, WeatherTip } from '../../../../../../types/weather';
import type { WeatherTipSignals } from '../types';
import { buildWeatherTipSignals } from '../signals';
import { createTip } from '../tipUtils';

/**
 * Gera dicas coringa para completar a lista.
 * @param snapshot Snapshot diário de clima.
 * @param selectedDate Data selecionada no calendário.
 * @returns Lista de dicas coringa.
 */
export const buildFallbackTips = (snapshot: WeatherSnapshot, selectedDate: Date): WeatherTip[] => {
  const tips: WeatherTip[] = [];
  const maxTemp = Math.round(snapshot.temperature.max);
  const minTemp = Math.round(snapshot.temperature.min);
  const feelsLike = Math.round(snapshot.feelsLike);
  const signals = buildWeatherTipSignals(snapshot, selectedDate);

  if (maxTemp >= 30) {
    tips.push(
      createTip(
        'fallback-heat',
        'Hidratação',
        `Máxima de ${maxTemp}°C. Mantenha-se bem hidratado durante todo o dia.`,
        'temperature'
      )
    );
  }

  if (minTemp <= 12) {
    tips.push(
      createTip(
        'fallback-cold',
        'Agasalho',
        `Mínima de ${minTemp}°C. Leve casaco para o período da manhã e noite.`,
        'temperature'
      )
    );
  }

  const isWeatherImpactful = signals.isStorm ||
    signals.isSnowy ||
    signals.isRainy ||
    signals.isWindy;
  const balanceMessage = isWeatherImpactful
    ? `Sensação de ${feelsLike}°C. O clima pede atenção; adapte o ritmo e combine com as condições do dia.`
    : `Sensação de ${feelsLike}°C. Temperatura agradável para atividades diversas.`;
  tips.push(
    createTip(
      'fallback-balance',
      'Ritmo leve',
      balanceMessage,
      'generic'
    )
  );

  tips.push(...buildRoutineTips(signals));
  tips.push(...buildQuickCheckTips(signals));

  return tips;
};

/**
 * Gera dicas de rotina com base no clima e no dia da semana.
 * @param signals Sinais consolidados do clima/dia.
 * @returns Dicas de rotina.
 */
const buildRoutineTips = (signals: WeatherTipSignals): WeatherTip[] => {
  const tips: WeatherTip[] = [];

  if (signals.isFuture) {
    if (signals.isSnowy) {
      tips.push(
        createTip(
          'fallback-routine-future-snow-1',
          'Rotina',
          'Neve prevista: programe deslocamentos com folga e separe roupas térmicas. Seu futuro eu agradece.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isStorm) {
      tips.push(
        createTip(
          'fallback-routine-future-storm-1',
          'Rotina',
          'Tempestade prevista: remarca tarefas externas e deixe o guarda-chuva no modo prontidão.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isRainy) {
      tips.push(
        createTip(
          'fallback-routine-future-rain-1',
          'Rotina',
          signals.isWeekend
            ? 'Chuva prevista no fds: planeje rolês cobertos e leve capa/guarda-chuva na bolsa.'
            : 'Chuva prevista: planeje rotas cobertas e leve capa/guarda-chuva na bolsa.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isSunny && signals.isHot) {
      tips.push(
        createTip(
          'fallback-routine-future-sun-hot-1',
          'Rotina',
          signals.isWeekend
            ? 'Calor previsto no fds: programe academia e alguma atividade com água (clube/piscina).'
            : 'Calor previsto: roupas leves e água por perto. Planejamento evita perrengue.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isSunny) {
      tips.push(
        createTip(
          'fallback-routine-future-sun-1',
          'Rotina',
          signals.isWeekend
            ? 'Tempo aberto no fds: ótimo pra passeio e atividades ao ar livre. Separe protetor e óculos.'
            : 'Tempo aberto previsto: boa chance de agenda externa. Separe protetor e óculos.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isOvercast || signals.isMostlyCloudy || signals.isPartlyCloudy) {
      tips.push(
        createTip(
          'fallback-routine-future-clouds-1',
          'Rotina',
          signals.isWeekend
            ? 'Nuvens previstas no fds: clima estável pra passeios sem calorão.'
            : 'Nuvens previstas: clima mais estável e sem calorão. Planeje atividades sem sofrer no sol.',
          'generic'
        )
      );
      return tips;
    }

    tips.push(
      createTip(
        'fallback-routine-future-generic-1',
        'Rotina',
        signals.isWeekend
          ? 'Fim de semana à vista: organize a agenda com base na previsão e prepare o rolê.'
          : 'Dia futuro: organize a agenda com base na previsão. Deixe a mochila pronta e evite correria.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isWeekend) {
    if (signals.isNight && (signals.isSunny || signals.isPartlyCloudy || signals.isMostlyCloudy)) {
      tips.push(
        createTip(
          'fallback-routine-weekend-night-1',
          'Rotina',
          'Noite de tempo estável: passeio leve, comida na rua ou filme ao ar livre. Sem sol, sem pressa.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isSnowy) {
      tips.push(
        createTip(
          'fallback-routine-weekend-snow-1',
          'Rotina',
          'Neve no fim de semana: boneco de neve, chocolate quente e fotos épicas. Ande devagar, o chão vira patinação.',
          'generic'
        ),
        createTip(
          'fallback-routine-weekend-snow-2',
          'Rotina',
          'Nevasca leve: passeio curto e seguro, depois lareira/filme. Meias grossas são o verdadeiro luxo.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isStorm) {
      tips.push(
        createTip(
          'fallback-routine-weekend-storm-1',
          'Rotina',
          'Tempestade no fds: plano B é sofá, pipoca e jogo/filme. Evita virar pipa humana lá fora.',
          'generic'
        ),
        createTip(
          'fallback-routine-weekend-storm-2',
          'Rotina',
          'Trovoadas: fique em casa, carregue os eletrônicos e curta um game. O céu hoje tá bravo.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isRainy) {
      tips.push(
        createTip(
          'fallback-routine-weekend-rain-1',
          'Rotina',
          'Chuva no fim de semana: troca o rolê externo por cinema, museu ou maratona. Academia coberta salva o cardio.',
          'generic'
        ),
        createTip(
          'fallback-routine-weekend-rain-2',
          'Rotina',
          'Dia molhado: livro, café e treino indoor. Guarda-chuva como acessório fashion involuntário.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isSunny && signals.isHot) {
      const hotWeekendCopy = signals.isAfternoon
        ? 'Sol e calor no fds: tarde pede clube/piscina e água gelada. Hidrata e vai.'
        : 'Sol e calor no fds: de manhã, academia cedo; à tarde, clube/piscina. Hidrata e vai.';
      tips.push(
        createTip(
          'fallback-routine-weekend-sun-hot-1',
          'Rotina',
          hotWeekendCopy,
          'generic'
        ),
        createTip(
          'fallback-routine-weekend-sun-hot-2',
          'Rotina',
          'Solzão no fim de semana: manhã de treino leve, tarde de clube ou sombra com água de coco.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isSunny) {
      const sunnyWeekendCopy = signals.isAfternoon
        ? 'Solzinho no fds: tarde de café na rua e passeio leve. Rolê sem pressa.'
        : 'Solzinho de fim de semana: manhã de parque ou bike, tarde de café na rua. Rolê sem pressa.';
      tips.push(
        createTip(
          'fallback-routine-weekend-sun-1',
          'Rotina',
          sunnyWeekendCopy,
          'generic'
        ),
        createTip(
          'fallback-routine-weekend-sun-2',
          'Rotina',
          'Dia aberto: caminhada cedo e depois brunch. A tarde pede passeio tranquilo.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isOvercast) {
      tips.push(
        createTip(
          'fallback-routine-weekend-overcast-1',
          'Rotina',
          'Céu fechado: museu, café ou cinema. Sem sol, sem drama.',
          'generic'
        ),
        createTip(
          'fallback-routine-weekend-overcast-2',
          'Rotina',
          'Dia cinza total: rolê indoor e manta no sofá. O sol hoje entrou de folga.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isMostlyCloudy) {
      tips.push(
        createTip(
          'fallback-routine-weekend-mostly-cloudy-1',
          'Rotina',
          signals.isAfternoon
            ? 'Nublado com brechas: tarde tranquila pra café na rua. O sol aparece, mas sem exagero.'
            : 'Nublado com brechas: passeio curto e café na rua. O sol aparece, mas sem exagero.',
          'generic'
        )
      );
      return tips;
    }

    if (signals.isPartlyCloudy) {
      tips.push(
        createTip(
          'fallback-routine-weekend-partly-cloudy-1',
          'Rotina',
          signals.isAfternoon
            ? 'Sol e nuvens alternando: tarde ótima pra feira ou caminhada. Sem torrar, sem sumir.'
            : 'Sol e nuvens alternando: ótimo pra caminhada ou feira. Sem torrar, sem sumir.',
          'generic'
        )
      );
      return tips;
    }

    tips.push(
      createTip(
        'fallback-routine-weekend-generic-1',
        'Rotina',
        'Fim de semana livre: agenda leve, pausa sem culpa e um rolê que não começa com “só vou ali”.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isStorm) {
    tips.push(
      createTip(
        'fallback-routine-weekday-storm-1',
        'Rotina',
        'Tempestade em dia útil: se puder, home office. Se sair, saia cedo e evite áreas alagadas.',
        'generic'
      ),
      createTip(
        'fallback-routine-weekday-storm-2',
        'Rotina',
        'Trovoadas hoje: horário flexível ajuda. Tenha capa e carregador (o clima adora desligar tudo).',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isSnowy) {
    tips.push(
      createTip(
        'fallback-routine-weekday-snow-1',
        'Rotina',
        'Neve no expediente: saia com tempo extra, use sola aderente e leve luvas. O chão tá no modo escorregadio.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isRainy) {
    tips.push(
      createTip(
        'fallback-routine-weekday-rain-1',
        'Rotina',
        'Chuva no expediente: planeje deslocamento e use calçado que não chora com poça.',
        'generic'
      ),
      createTip(
        'fallback-routine-weekday-rain-2',
        'Rotina',
        'Dia chuvoso: guarda-chuva na mochila e +10 min no trajeto. Seu tênis agradece.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isHot) {
    tips.push(
      createTip(
        'fallback-routine-weekday-hot-1',
        'Rotina',
        `Calorão no trabalho: roupas leves e água por perto. ${signals.maxTemp}°C não é brincadeira.`,
        'generic'
      ),
      createTip(
        'fallback-routine-weekday-hot-2',
        'Rotina',
        'Dia quente: programe pausas curtas pra não virar torrada. Ar-condicionado é aliado.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isCold) {
    tips.push(
      createTip(
        'fallback-routine-weekday-cold-1',
        'Rotina',
        `Frio no ar: camadas e cachecol. Mínima de ${signals.minTemp}°C pede respeito.`,
        'generic'
      ),
      createTip(
        'fallback-routine-weekday-cold-2',
        'Rotina',
        'Dia frio: café quentinho e mãos protegidas. Produtividade gosta de calor humano.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isSunny) {
    const sunnyWeekdayCopy = signals.isNight
      ? 'Noite limpa: caminhada leve ou pausa na varanda. O sol já foi, mas o clima ajuda.'
      : signals.isAfternoon
        ? 'Tarde ensolarada: aproveite uma pausa rápida ao ar livre.'
        : 'Solzinho: aproveite o almoço ao ar livre. Vitamina D no intervalo é upgrade.';
    tips.push(
      createTip(
        'fallback-routine-weekday-sun-1',
        'Rotina',
        sunnyWeekdayCopy,
        'generic'
      )
    );
    return tips;
  }

  if (signals.isOvercast) {
    tips.push(
      createTip(
        'fallback-routine-weekday-overcast-1',
        'Rotina',
        'Céu fechado: luz baixa e clima constante. Bom dia pra foco e café.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isMostlyCloudy) {
    tips.push(
      createTip(
        'fallback-routine-weekday-mostly-cloudy-1',
        'Rotina',
        signals.isNight
          ? 'Noite com nuvens: clima estável pra foco e descanso. Sem clarão, sem stress.'
          : 'Nublado com brechas: dá pra sair sem sol estourado. Café e produtividade em paz.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isPartlyCloudy) {
    tips.push(
      createTip(
        'fallback-routine-weekday-partly-cloudy-1',
        'Rotina',
        signals.isNight
          ? 'Noite com nuvens alternando: passeio rápido e seguro. Luz da rua resolve.'
          : 'Sol aparecendo de vez em quando: ótimo pra uma pausa rápida ao ar livre.',
        'generic'
      )
    );
    return tips;
  }

  tips.push(
    createTip(
      'fallback-routine-weekday-generic-1',
      'Rotina',
      'Rotina padrão: previsão checada, mochila ok, vida andando. Bônus de organização desbloqueado.',
      'generic'
    )
  );
  return tips;
};

/**
 * Gera dicas curtas de check rapido baseadas no clima.
 * @param signals Sinais consolidados do clima/dia.
 * @returns Dicas rápidas de checagem.
 */
const buildQuickCheckTips = (signals: WeatherTipSignals): WeatherTip[] => {
  const tips: WeatherTip[] = [];

  if (signals.isFuture && signals.isStorm) {
    tips.push(
      createTip(
        'fallback-check-future-storm-1',
        'Check rápido',
        'Tempestade prevista: carregue a bateria reserva e evite marcar compromissos ao ar livre.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isFuture && signals.isSnowy) {
    tips.push(
      createTip(
        'fallback-check-future-snow-1',
        'Check rápido',
        'Neve prevista: separe casaco térmico, luvas e calçado aderente.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isFuture && signals.isRainy) {
    tips.push(
      createTip(
        'fallback-check-future-rain-1',
        'Check rápido',
        'Chuva prevista: guarda-chuva pronto e capa na mochila. Seu tênis agradece nesse dia.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isFuture && signals.isSunny && signals.isHot) {
    tips.push(
      createTip(
        'fallback-check-future-hot-1',
        'Check rápido',
        'Calor previsto: garrafa de água e protetor separados com antecedência.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isFuture && signals.isSunny) {
    tips.push(
      createTip(
        'fallback-check-future-sun-1',
        'Check rápido',
        'Tempo aberto previsto: protetor e óculos já na mochila.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isFuture && (signals.isOvercast || signals.isMostlyCloudy || signals.isPartlyCloudy)) {
    tips.push(
      createTip(
        'fallback-check-future-clouds-1',
        'Check rápido',
        'Nuvens previstas: luz extra pode ajudar em atividades de foco.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isStorm) {
    tips.push(
      createTip(
        'fallback-check-storm-1',
        'Check rápido',
        'Capa, celular carregado e longe de janela. Hoje o céu tá elétrico.',
        'generic'
      ),
      createTip(
        'fallback-check-storm-2',
        'Check rápido',
        'Tempestade chegando: guarda-chuva firme e evita se abrigar debaixo de árvore. Árvore não é para-raios.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isSnowy) {
    tips.push(
      createTip(
        'fallback-check-snow-1',
        'Check rápido',
        'Luva, gorro e sola aderente. O chão escorrega mais que promessa.',
        'generic'
      ),
      createTip(
        'fallback-check-snow-2',
        'Check rápido',
        'Neve no radar: casaco grosso e passo curto. Andar rápido hoje é esporte radical.',
        'generic'
      )
    );
    return tips;
  }

  if (signals.isRainy) {
    tips.push(
      createTip(
        'fallback-check-rain-1',
        'Check rápido',
        'Guarda-chuva + meia extra. Poça adora tênis limpo.',
        'generic'
      ),
      createTip(
        'fallback-check-rain-2',
        'Check rápido',
        'Risco de chuva hoje. Prefira rotas com marquise e leve pano seco na mochila.',
        'generic'
      )
    );
  }

  if (signals.isHot) {
    tips.push(
      createTip(
        'fallback-check-hot-1',
        'Check rápido',
        'Água, protetor solar e roupa leve. Derreter não é meta.',
        'generic'
      )
    );
  }

  if (signals.isCold) {
    tips.push(
      createTip(
        'fallback-check-cold-1',
        'Check rápido',
        'Casaco, cachecol e mãos quentes. Frio gosta de dedos distraídos.',
        'generic'
      )
    );
  }

  if (signals.isWindy) {
    tips.push(
      createTip(
        'fallback-check-wind-1',
        'Check rápido',
        'Prende o cabelo e segura objetos leves. O vento tá querendo ser DJ.',
        'generic'
      )
    );
  }

  if (signals.isSunny && !signals.isHot) {
    tips.push(
      createTip(
        'fallback-check-sun-1',
        'Check rápido',
        signals.isNight
          ? 'Noite limpa: se for sair, casaco leve resolve. Céu aberto ajuda na sensação térmica.'
          : 'Óculos escuros e protetor. Sol tá no modo holofote.',
        'generic'
      )
    );
  }

  if (signals.isOvercast) {
    tips.push(
      createTip(
        'fallback-check-overcast-1',
        'Check rápido',
        'Céu bem fechado: liga uma luz extra. O sol não vem, mas o foco precisa.',
        'generic'
      )
    );
  }

  if (signals.isPartlyCloudy || signals.isMostlyCloudy) {
    tips.push(
      createTip(
        'fallback-check-partly-cloudy-1',
        'Check rápido',
        signals.isNight
          ? signals.cloudCover >= 75
            ? 'Noite com nuvens alternando: luz extra ajuda. Sol não dá as caras, mas a segurança sim.'
            : 'Noite com nuvens leves: luz da rua e uma blusa extra bastam. Não precisa de holofote.'
          : 'Nuvens alternando: óculos escuros opcional. O sol aparece sem aviso prévio.',
        'generic'
      )
    );
  }

  if (tips.length === 0) {
    const message = signals.isFuture
      ? `Sensação de ${signals.feelsLike}°C. Olhou a previsão? Pronto, já ganhou bônus de organização.`
      : `Sensação de ${signals.feelsLike}°C agora. Ajuste a roupa e se hidrate; a previsão das próximas horas ajuda.`;
    tips.push(
      createTip(
        'fallback-check-generic-1',
        'Check rápido',
        message,
        'generic'
      )
    );
  }

  return tips;
};
