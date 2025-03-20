import { useLiveChartContext } from './useLiveChartContext';

/**
 * Hook qui centralise toutes les fonctions de contrôle
 * pour la navigation temporelle, pause/play, et réinitialisation des valeurs
 */
export const useTimeControls = () => {
  const { data, dispatch } = useLiveChartContext();
  const nbTotalEvents = data?.events?.length || 0;

  // Fonctions de contrôle Play/Pause
  const handleTogglePause = () => {
    // Si on est en pause et qu'on clique sur Play, on remet le curseur à la fin
    if (data.paused) {
      // D'abord, remettre le curseur à la fin
      dispatch({ type: 'go_to_time', payload: nbTotalEvents });
      // Ensuite, désactiver la pause
      dispatch({ type: 'toggle_paused' });
    } else {
      // Si on est en lecture et qu'on clique sur Pause, on se contente de mettre en pause
      dispatch({ type: 'toggle_paused' });
    }
  };

  // Fonction de réinitialisation
  const handleReset = () => {
    if (!data.paused) {
      dispatch({ type: 'toggle_paused' });
    }
    dispatch({ type: 'reset_values' });
  };

  // Fonctions de navigation temporelle
  const handleGoToTime = (time: number) => {
    dispatch({ type: 'go_to_time', payload: time });
  };

  const handleGoToStart = () => {
    dispatch({ type: 'go_to_time', payload: data.maxTimeIndex });
  };

  const handleGoToEnd = () => {
    dispatch({ type: 'go_to_time', payload: nbTotalEvents });
  };

  const handleGoBack = () => {
    dispatch({ type: 'go_to_time', payload: Math.max(data.maxTimeIndex, data.timeIndex - 5) });
  };

  const handleGoForward = () => {
    dispatch({ type: 'go_to_time', payload: Math.min(nbTotalEvents, data.timeIndex + 5) });
  };

  // Calcul des limites pour le filtrage des événements
  const startIndex = Math.max(0, data.timeIndex - data.maxTimeIndex);
  const endIndex = data.timeIndex;
  const eventsFiltered = data.events.slice(startIndex, endIndex);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    handleGoToTime(value);
  };

  return {
    // État
    data,
    eventsFiltered,

    // Informations temporelles
    timeInfo: {
      currentTime: data.timeIndex,
      maxTime: nbTotalEvents,
      isAtStart: data.timeIndex <= data.maxTimeIndex,
      isAtEnd: data.timeIndex >= nbTotalEvents,
      startIndex,
      endIndex
    },

    // Contrôles lecture/pause
    playControls: {
      isPaused: data.paused,
      handleTogglePause
    },

    // Contrôles de réinitialisation
    resetControls: {
      handleReset
    },

    // Contrôles de navigation temporelle
    timeNavigation: {
      handleGoToTime,
      handleGoToStart,
      handleGoToEnd,
      handleGoBack,
      handleGoForward,
      handleSliderChange
    }
  };
};
