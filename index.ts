// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
// 这里定义一个工具类型，简化代码

type ReplaceValByOwnKey<T, S extends any> = { [P in keyof T]: S[P] };

// shift action
type ShiftAction<T extends any[]> = ((...args: T) => any) extends (
  arg1: any,
  ...rest: infer R
) => any
  ? R
  : never;

// unshift action
type UnshiftAction<T extends any[], A> = ((
  args1: A,
  ...rest: T
) => any) extends (...args: infer R) => any
  ? R
  : never;

// pop action
type PopAction<T extends any[]> = ReplaceValByOwnKey<ShiftAction<T>, T>;

// push action
type PushAction<T extends any[], E> = ReplaceValByOwnKey<
  UnshiftAction<T, any>,
  T & { [k: string]: E }
>;

// test ...
type tuple = ['vue', 'react', 'angular'];

type resultWithShiftAction = ShiftAction<tuple>; // ["react", "angular"]
type resultWithUnshiftAction = UnshiftAction<tuple, 'jquery'>; // ["jquery", "vue", "react", "angular"]
type resultWithPopAction = PopAction<tuple>; // ["vue", "react"]
type resultWithPushAction = PushAction<tuple, 'jquery'>; // ["vue", "react", "angular", "jquery"]

// appDiv.innerHTML = foo();
