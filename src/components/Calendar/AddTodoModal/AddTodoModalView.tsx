import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MdClose } from 'react-icons/md';
import { TODO_TYPES } from '../../../data/todoTypes';
import type { RepeatDuration, RepeatType, TodoType, Weekday } from '../../../types/calendar';
import {
  addTodoModalRecipe,
  modalTypeButton,
  modalSubmitButton,
  repeatButton,
  weekdayButton,
  durationButton,
  weekdayLabelLong,
  weekdayLabelShort,
} from '../styles/add-todo-modal.styles';
import { css } from '../../../../styled-system/css';
import { ICONS } from '../consts/icons';
import { WEEKDAYS } from '../consts/weekdays';
import { DURATION_OPTIONS, REPEAT_OPTIONS } from '../consts/repeatOptions';

type AddTodoModalViewProps = {
  state: {
    text: string;
    selectedType: TodoType;
    startTime: string;
    endTime: string;
    hasPause: boolean;
    pauseStart: string;
    pauseEnd: string;
    comments: string;
    repeatType: RepeatType;
    selectedWeekdays: Weekday[];
    duration: RepeatDuration;
    step: 'details' | 'time' | 'tags' | 'repeat';
  };
  derived: {
    isEditing: boolean;
    dateKey: string;
    showRepeatOptions: boolean;
    isTimeRangeValid: boolean;
    isPauseRangeValid: boolean;
    canSubmit: boolean;
    canAdvanceFromDetails: boolean;
    canAdvanceFromTime: boolean;
  };
  actions: {
    handleSubmit: (e: React.FormEvent) => void;
    handleOverlayClick: (e: React.MouseEvent) => void;
    handleClose: () => void;
    goNextStep: () => void;
    goPrevStep: () => void;
    handleRepeatChange: (type: RepeatType) => void;
    toggleWeekday: (day: Weekday) => void;
    setSelectedType: (type: TodoType) => void;
    setStartTime: (value: string) => void;
    setEndTime: (value: string) => void;
    setHasPause: (value: boolean) => void;
    setPauseStart: (value: string) => void;
    setPauseEnd: (value: string) => void;
    setDuration: (value: RepeatDuration) => void;
    handleTextChange: (value: string) => void;
    handleCommentsChange: (value: string) => void;
  };
};

export function AddTodoModalView({ state, derived, actions }: AddTodoModalViewProps) {
  const modalSlots = addTodoModalRecipe();

  const {
    text,
    selectedType,
    startTime,
    endTime,
    hasPause,
    pauseStart,
    pauseEnd,
    comments,
    repeatType,
    selectedWeekdays,
    duration,
    step,
  } = state;

  const {
    isEditing,
    dateKey,
    showRepeatOptions,
    isTimeRangeValid,
    isPauseRangeValid,
    canSubmit,
    canAdvanceFromDetails,
    canAdvanceFromTime,
  } = derived;

  const {
    handleSubmit,
    handleOverlayClick,
    handleClose,
    goNextStep,
    goPrevStep,
    handleRepeatChange,
    toggleWeekday,
    setSelectedType,
    setStartTime,
    setEndTime,
    setHasPause,
    setPauseStart,
    setPauseEnd,
    setDuration,
    handleTextChange,
    handleCommentsChange,
  } = actions;

  const detailsSection = (
    <>
      <input
        type="text"
        className={modalSlots.input}
        placeholder="Descreva sua tarefa..."
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        maxLength={50}
        autoFocus
      />

      <div className={modalSlots.timeGroup}>
        <label className={modalSlots.commentLabel}>Comentários (opcional)</label>
        <textarea
          className={modalSlots.commentInput}
          placeholder="Adicione detalhes ou observações..."
          value={comments}
          onChange={(e) => handleCommentsChange(e.target.value)}
          maxLength={500}
        />
        <div
          className={css({
            fontSize: '11px',
            color: 'text.dim',
            textAlign: 'right',
            marginTop: '-4px',
          })}
        >
          {comments.length}/500
        </div>
      </div>
    </>
  );

  const timeSection = (
    <>
      <div className={modalSlots.timeRow}>
        <div className={modalSlots.timeGroup}>
          <label className={modalSlots.timeLabel}>Início</label>
          <input
            type="time"
            className={modalSlots.timeInput}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className={modalSlots.timeGroup}>
          <label className={modalSlots.timeLabel}>Término</label>
          <input
            type="time"
            className={modalSlots.timeInput}
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      {!isTimeRangeValid && (
        <span className={modalSlots.timeError}>
          O horário de término deve ser posterior ao horário de início.
        </span>
      )}

      <div className={modalSlots.timeGroup}>
        <label className={modalSlots.commentLabel}>
          <input
            type="checkbox"
            checked={hasPause}
            onChange={(e) => setHasPause(e.target.checked)}
            className={css({ marginRight: '8px' })}
          />
          Adicionar pausa (opcional)
        </label>
      </div>

      {hasPause && (
        <>
          <div className={modalSlots.timeRow}>
            <div className={modalSlots.timeGroup}>
              <label className={modalSlots.timeLabel}>Pausa início</label>
              <input
                type="time"
                className={modalSlots.timeInput}
                value={pauseStart}
                onChange={(e) => setPauseStart(e.target.value)}
              />
            </div>
            <div className={modalSlots.timeGroup}>
              <label className={modalSlots.timeLabel}>Pausa fim</label>
              <input
                type="time"
                className={modalSlots.timeInput}
                value={pauseEnd}
                onChange={(e) => setPauseEnd(e.target.value)}
              />
            </div>
          </div>
          {!isPauseRangeValid && (
            <span className={modalSlots.timeError}>
              A pausa deve ficar dentro do intervalo e com fim após o início.
            </span>
          )}
        </>
      )}
    </>
  );

  const tagsSection = (
    <div className={modalSlots.typeGrid}>
      {TODO_TYPES.map((type) => {
        const Icon = ICONS[type.icon];
        const isSelected = selectedType === type.id;
        return (
          <button
            key={type.id}
            type="button"
            className={modalTypeButton({ isSelected })}
            style={isSelected ? { borderColor: type.color, color: type.color } : {}}
            onClick={() => setSelectedType(type.id)}
          >
            {Icon && <Icon size={18} color={isSelected ? type.color : undefined} />}
            {type.label}
          </button>
        );
      })}
    </div>
  );

  const repeatSection = (
    <div className={modalSlots.repeatSection}>
      <span className={modalSlots.repeatLabel}>Repetir</span>
      <div className={modalSlots.repeatOptions}>
        {REPEAT_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            className={repeatButton({ isSelected: repeatType === option.id })}
            onClick={() => handleRepeatChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {repeatType === 'custom' && (
        <div className={modalSlots.weekdaySelector}>
          {WEEKDAYS.map((day, index) => (
            <button
              key={`${day.id}-${index}`}
              type="button"
              className={weekdayButton({ isSelected: selectedWeekdays.includes(day.id) })}
              onClick={() => toggleWeekday(day.id)}
            >
              <span className={weekdayLabelLong}>{day.long}</span>
              <span className={weekdayLabelShort}>{day.short}</span>
            </button>
          ))}
        </div>
      )}

      <div className={modalSlots.durationSection} aria-disabled={!showRepeatOptions}>
        <span className={modalSlots.repeatLabel}>Duração</span>
        <div className={modalSlots.durationOptions}>
          {DURATION_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={durationButton({ isSelected: duration === option.id })}
              onClick={() => setDuration(option.id)}
              disabled={!showRepeatOptions}
              aria-disabled={!showRepeatOptions}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={modalSlots.overlay} onClick={handleOverlayClick}>
      <div className={modalSlots.content}>
        <div className={modalSlots.header}>
          <span className={modalSlots.title}>
            {isEditing ? 'Editar tarefa' : 'Nova tarefa'} -{' '}
            {format(new Date(`${dateKey}T00:00:00`), "d 'de' MMM", { locale: ptBR })}
          </span>
          <button type="button" className={modalSlots.closeButton} onClick={handleClose}>
            <MdClose size={20} />
          </button>
        </div>

        <form className={modalSlots.form} onSubmit={handleSubmit}>
          {isEditing ? (
            <>
              {detailsSection}
              {timeSection}
              {tagsSection}
              {repeatSection}
              <button
                type="submit"
                className={modalSubmitButton}
                disabled={!canSubmit}
                title={!isTimeRangeValid ? 'O horário de término deve ser depois do início.' : undefined}
              >
                Salvar alterações
              </button>
            </>
          ) : (
            <>
              {step === 'details' && detailsSection}
              {step === 'time' && timeSection}
              {step === 'tags' && tagsSection}
              {step === 'repeat' && repeatSection}

              <div className={modalSlots.stepActions}>
                {step !== 'details' && (
                  <button type="button" className={modalSlots.stepButtonSecondary} onClick={goPrevStep}>
                    Voltar
                  </button>
                )}

                {step === 'details' && (
                  <button
                    type="button"
                    className={modalSlots.stepButtonPrimary}
                    onClick={goNextStep}
                    disabled={!canAdvanceFromDetails}
                  >
                    Avançar
                  </button>
                )}

                {step === 'time' && (
                  <button
                    type="button"
                    className={modalSlots.stepButtonPrimary}
                    onClick={goNextStep}
                    disabled={!canAdvanceFromTime}
                    title={
                      !isTimeRangeValid
                        ? 'O horário de término deve ser depois do início.'
                        : !isPauseRangeValid
                          ? 'A pausa deve ficar dentro do intervalo e com fim após o início.'
                          : undefined
                    }
                  >
                    Avançar
                  </button>
                )}

                {step === 'tags' && (
                  <button type="button" className={modalSlots.stepButtonPrimary} onClick={goNextStep}>
                    Avançar
                  </button>
                )}

                {step === 'repeat' && (
                  <button
                    type="submit"
                    className={modalSubmitButton}
                    disabled={!canSubmit}
                    title={!isTimeRangeValid ? 'O horário de término deve ser depois do início.' : undefined}
                  >
                    Adicionar tarefa
                  </button>
                )}
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
