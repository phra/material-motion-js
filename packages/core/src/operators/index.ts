/** @license
 *  Copyright 2016 - present The Material Motion Authors. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import {
  Constructor,
  Observable,
} from '../types';

import {
  MotionDeduplicable,
  withDedupe,
} from './dedupe';

import {
  ObservableWithFoundationalMotionOperators,
  withFoundationalMotionOperators,
} from './foundation';

import {
  MotionInvertible,
  withInverted,
} from './inverted';

import {
  MotionLoggable,
  withLog,
} from './log';

import {
  MotionMergeable,
  withMerge,
} from './merge';

import {
  MotionRewriteRangeable,
  withRewriteRange,
} from './rewriteRange';

import {
  MotionRewriteToable,
  withRewriteTo,
} from './rewriteTo';

import {
  MotionPluckable,
  withPluck,
} from './pluck';

export type ObservableWithMotionOperators<T> = ObservableWithFoundationalMotionOperators<T>
  & MotionPluckable<T> & MotionLoggable<T> & MotionDeduplicable<T> & MotionInvertible<T>
  & MotionMergeable<T> & MotionRewriteToable<T> & MotionRewriteRangeable<T>;

export function withMotionOperators<T, S extends Constructor<Observable<T>>>(superclass: S): S
    & Constructor<ObservableWithMotionOperators<T>> {

  return withRewriteRange(withRewriteTo(withMerge(withInverted(withDedupe(withLog(
    withPluck<T, ObservableWithFoundationalMotionOperators<T>>(
      withFoundationalMotionOperators<T, Constructor<Observable<T>>>(superclass)
    )
  ))))));
}

export * from './dedupe';
export * from './foundation';
export * from './inverted';
export * from './log';
export * from './merge';
export * from './rewriteRange';
export * from './rewriteTo';
export * from './pluck';
