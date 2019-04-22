import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeAgoPipe } from 'time-ago-pipe';

import { SanitizeurlPipe } from './sanitizeurl.pipe';
import { GetornullPipe } from './getornull.pipe';
import { PluralizePipe } from './pluralize.pipe';
import { TimeformatPipe } from './timeformat.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SanitizeurlPipe,
    GetornullPipe,
    PluralizePipe,
    TimeAgoPipe,
    TimeformatPipe
  ],
  declarations: [SanitizeurlPipe, GetornullPipe, PluralizePipe, TimeAgoPipe, TimeformatPipe]
})
export class PipesModule { }
