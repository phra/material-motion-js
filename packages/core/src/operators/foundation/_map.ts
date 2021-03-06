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
  MotionNextOperable,
  NextChannel,
  Observable,
} from '../../types';

export interface MotionMappable<T> {
  _map<U>(transform: (value: T) => U): Observable<U>;
}

export function withMap<T, S extends Constructor<MotionNextOperable<T>>>(superclass: S): S & Constructor<MotionMappable<T>> {
  return class extends superclass implements MotionMappable<T> {
    /**
     * Applies `transform` to every incoming value and synchronously passes the
     * result to the observer.
     */
    _map<U>(transform: (value: T) => U): Observable<U> {
      return this._nextOperator(
        (value: T, dispatch: NextChannel<U>) => {
          dispatch(transform(value));
        }
      );
    }
  };
}
