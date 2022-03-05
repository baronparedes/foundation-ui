import {Month, Period} from './@types';
import {ProfileType, RecordStatus} from './Api';

export const STATUS_COLORS = {
  active: 'text-success',
  inactive: 'text-danger',
};

export const RECORD_STATUS: RecordStatus[] = ['active', 'inactive'];
export const PROFILE_TYPE: ProfileType[] = ['user', 'stakeholder', 'admin'];

export const SETTING_KEYS = {};

export const DEFAULTS = {
  BRAND: 'foundation',
};

export const VERBIAGE = {
  FILE_NAMES: {
    SOA_DOC_TITLE: (propertyCode: string | undefined, period: Period) =>
      `${propertyCode ?? 'Unit'} - SOA - ${period.year} ${period.month}`,
    PAYMENT_HISTORY_DOC_TITLE: (
      propertyCode: string | undefined,
      year: number
    ) => `${propertyCode ?? 'Unit'} - Payment History - ${year}`,
    EXPENSE_OVER_REVENUE: (year: number, month: Month) =>
      `Expense over Revenue - ${year} ${month}`,
  },
};

export const MONTHS: Month[] = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

export const STATUS_VARIANT = {
  pending: 'primary',
  rejected: 'danger',
  cancelled: 'warning',
  approved: 'success',
};
