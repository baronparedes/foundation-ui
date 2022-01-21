// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApprovedAny = any;
export type ProfileType = 'admin' | 'stakeholder' | 'user';
export type Profile = {
  name: string;
  username: string;
  type: ProfileType;
};
export type Month =
  | 'JAN'
  | 'FEB'
  | 'MAR'
  | 'APR'
  | 'MAY'
  | 'JUN'
  | 'JUL'
  | 'AUG'
  | 'SEP'
  | 'OCT'
  | 'NOV'
  | 'DEC';
export type RecordStatus = 'active' | 'inactive';
export interface Period {
  month: Month;
  year: number;
}

export type RegisterProfile = {
  mobileNumber?: string;
  email: string;
  password: string;
  username: string;
  name: string;
};
