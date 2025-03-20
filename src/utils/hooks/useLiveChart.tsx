import { CategoricalChartState } from 'recharts/types/chart/types';
import { useLiveChartContext } from './useLiveChartContext';
import { useTimeControls } from './useTimeControls';

const useLiveChart = () => {
  const { data, dispatch } = useLiveChartContext();
  const { eventsFiltered, timeInfo, timeNavigation, playControls, resetControls } = useTimeControls();

  const handleChartClick = (event: CategoricalChartState) => {
    if (event && event.activeTooltipIndex !== undefined && event.activeTooltipIndex !== null) {
      // Ajuster l'index en fonction de la position dans eventsFiltered
      const adjustedIndex = timeInfo.startIndex + event.activeTooltipIndex;
      const realEvent = data.events[adjustedIndex];

      if (realEvent?.index !== undefined) {
        // Si nous ne sommes pas en pause, mettre en pause pour permettre l'édition
        if (!data.paused) {
          dispatch({ type: 'toggle_paused' });
        }

        dispatch({
          type: 'edit_cell',
          payload: { index: realEvent.index, field: 'value1' }
        });
      }
    }
  };

  return {
    data,
    eventsFiltered,
    handleTogglePause: playControls.handleTogglePause,
    handleChartClick,
    handleReset: resetControls.handleReset,
    timeInfo,
    timeNavigation
  };
};
export default useLiveChart;
