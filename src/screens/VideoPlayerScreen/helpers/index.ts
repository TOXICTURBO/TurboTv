import {EpisodeInfo} from '../../../@types';
import {episodeSQLHelper} from '../../../utils/database';

export const watchTimeBeforeSync = 80;

export const updateDB = async (
  currentTime: number,
  duration: number,
  episode_info: EpisodeInfo,
  watched_amount?: number,
) => {
  const watchedAmount = parseFloat(
    (watched_amount ?? (currentTime / duration) * 100).toFixed(2),
  );

  if (isNaN(watchedAmount)) return;

  await episodeSQLHelper.updateTable({
    id: episode_info.id,
    watched: watchedAmount > watchTimeBeforeSync,
    watched_percentage:
      watchedAmount > 0 && watchedAmount > watchTimeBeforeSync
        ? 100
        : watchedAmount,
  });

  console.log(`Set watched to ${watchedAmount} for ${episode_info.id} in db`);
};

export type UPDATEDB = typeof updateDB;
