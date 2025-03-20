import { CategoricalChartState } from 'recharts/types/chart/types';
import { useLiveChartContext } from './useLiveChartContext';

const useLiveChart = () => {
  const { data, dispatch } = useLiveChartContext();
  const nbTotalEvents = data?.events?.length;
  const eventsFiltered = data.events.slice(nbTotalEvents - 20, nbTotalEvents);

  const handleTogglePause = () => {
    dispatch({ type: 'toggle_paused' });
  };

  const handleChartClick = (event: CategoricalChartState) => {
    if (event && event.activeTooltipIndex !== undefined && event.activeTooltipIndex !== null) {
      const index = eventsFiltered[event.activeTooltipIndex]?.index;
      if (index !== undefined) {
        // Si nous ne sommes pas en pause, mettre en pause pour permettre l'édition
        if (!data.paused) {
          dispatch({ type: 'toggle_paused' });
        }

        // Utiliser le dispatch pour déclencher l'édition de cellule
        dispatch({
          type: 'edit_cell',
          payload: { index, field: 'value1' }
        });
      }
    }
  };

  return {
    data,
    eventsFiltered,
    handleTogglePause,
    handleChartClick
  };
};

export default useLiveChart;
