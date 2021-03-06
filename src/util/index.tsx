import moment from 'moment';
import { IRestaurant } from 'stores';

export const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export const formatTime = (time: string) => moment(time, ['h:m a', 'H:m']).format('h:mma')

export const hoursToday = (hours: IRestaurant["hours"]) => {
  const today: string = daysOfWeek[new Date().getDay() - 1];
  const hoursToday = hours!.filter(({ day }) => day === today);
  return hoursToday[0];
}

const US_LOCALE = 'en-US';

interface IFormatCents {
  cents: number;
  round?: boolean;
  dropEmptyCents?: boolean;
  dropComma?: boolean;
  dropCentsRoundUp?: boolean;
  maximumFractionDigits?: number;
}
export function formatCents({
  cents,
  round,
  dropEmptyCents = false,
  dropComma = false,
  dropCentsRoundUp = false,
  maximumFractionDigits = 2,
}: IFormatCents): string {
  const dollars = Math.floor(cents / 100);
  const remainingCents = cents % 100;

  if (dropCentsRoundUp && remainingCents > 0) {
    return (dollars + 1).toLocaleString(US_LOCALE);
  }

  if (round) {
    return Math.round(cents / 100).toLocaleString(US_LOCALE);
  }

  if (remainingCents === 0 && (dropEmptyCents || dropCentsRoundUp)) {
    return dollars.toLocaleString(US_LOCALE);
  }

  let returnValue = (cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits,
  });

  if (dropComma) {
    returnValue = returnValue.replace(/,/g, '');
  }
  return returnValue;
}