interface IUser {
  id: number;
  username: string;
  fullname: string;
  password: string;
  scope: string;
  locale: string;
  perm: Permissions;
  commands: string[];
  favorites: string[];
  rules: IRule[];
  lockPassword: boolean;
  hideDotfiles: boolean;
  singleClick: boolean;
  dateFormat: boolean;
  viewMode: ViewModeType;
  sorting?: Sorting;
}

type ViewModeType = "list" | "mosaic" | "mosaic gallery";

interface IUserForm {
  id?: number;
  username?: string;
  fullname?: string;
  password?: string;
  scope?: string;
  locale?: string;
  perm?: Permissions;
  commands?: string[];
  rules?: IRule[];
  lockPassword?: boolean;
  hideDotfiles?: boolean;
  singleClick?: boolean;
  dateFormat?: boolean;
}

interface Permissions {
  admin: boolean;
  copy: boolean;
  create: boolean;
  delete: boolean;
  download: boolean;
  execute: boolean;
  modify: boolean;
  move: boolean;
  rename: boolean;
  share: boolean;
  shell: boolean;
  trash: boolean;
  upload: boolean;
}

interface Sorting {
  by: string;
  asc: boolean;
}

interface IRule {
  allow: boolean;
  path: string;
  regex: boolean;
  regexp: IRegexp;
}

interface IRegexp {
  raw: string;
}

type UserTheme = "light" | "dark" | "";
