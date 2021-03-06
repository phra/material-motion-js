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
  Dict,
  MotionMappable,
  NextChannel,
  Observable,
} from '../types';

export interface MotionPluckable<T> {
  pluck<U>(key: string): Observable<U>;
}

export function withPluck<T, S extends Constructor<MotionMappable<T>>>(superclass: S): S & Constructor<MotionPluckable<T>> {
  return class extends superclass implements MotionPluckable<T> {
    /**
     * Extracts the value at a given key from every incoming object and passes
     * those values to the observer.
     *
     * For instance:
     *
     * - `transform$.pluck('translate')` is equivalent to
     *   `transform$.map(transform => transform.translate)`
     *
     * - `transform$.pluck('translate.x')` is equivalent to
     *   `transform$.map(transform => transform.translate.x)`
     */
    pluck<U>(path: string): Observable<U> {
      return this._map(
        createPlucker(path)
      );
    }
  };
}

// TODO: fix the type annotations
export function createPlucker(path: string) {
  const pathSegments = path.split('.');

  return function plucker(value: Dict<any>) {
    let result = value;

    for (let pathSegment of pathSegments) {
      result = result[pathSegment];
    }

    return result;
  };
}
