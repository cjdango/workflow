import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';

import { EventForm } from 'src/app/commons/forms/feed.forms';
import { Event } from 'src/app/commons/models/feed.models';
import { FeedService } from 'src/app/commons/services/utils/feed.service';
import { User } from 'src/app/commons/models/user.models';
import { UsersService } from 'src/app/commons/services/users/users.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  @Input() eventDate     : Date;
  @Input() eventInstance : { [key: string]: any };

  users        : Array<User>;
  private form : EventForm;

  constructor(
    private feed         : FeedService,
    private usersService : UsersService,
    public activeModal: NgbActiveModal
  ) {
    this.users = usersService.allUsers;
  }

  ngOnInit() {
    this.form = new EventForm(new Event);
    // Populate form if `this.eventInstance` is available
    if (this.eventInstance) {
      let { start_time, end_time, participants } = this.eventInstance;
      // Get participants_id from participants.
      const participants_id = participants.map(p => p.id);
      // Get only the time from `eventInstance.start_time`
      start_time = start_time.split('T')[1];
      // Get only the time from `eventInstance.end_time`
      end_time = end_time.split('T')[1];

      this.form.defaultValue({...this.eventInstance, start_time, end_time, participants_id});
    } else {
      this.form.defaultValue({ event_date: this.formattedEventDate });
    }
  }

  /**
   * Format event date as YYYY-MM-DD
   */
  get formattedEventDate() {
    return moment(this.eventDate).format('YYYY-MM-DD');
  }

  onSubmit({ value, valid }: { value: Event, valid: boolean }, action: 'create' | 'update' | 'delete') {
    // initiate submission of form.
    this.form.submitted = true;
    // send the form data to the backend if the value
    // format are valid.
    if (valid) {
      // Submit request base on action
      switch (action) {
        case 'create':
          this.feed.addEvent(value).then((event) => {
            // Pass event into the active modal as result
            this.activeModal.close({ event, action });
          });
          break;
        case 'update':
          this.feed.updateEvent(value, this.eventInstance.id).then((event) => {
            // Pass event into the active modal as result
            this.activeModal.close({ event, action });
          });
          break;
        case 'delete':
          this.feed.deleteEvent(value, this.eventInstance.id).then((event) => {
            // Pass event into the active modal as result
            this.activeModal.close({ event, action });
          });
          break;
      }
    }
  }
}
