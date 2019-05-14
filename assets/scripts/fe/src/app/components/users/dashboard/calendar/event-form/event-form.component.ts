import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Input() eventDate : Date;
  @Output() submitSuccess   : EventEmitter<any> = new EventEmitter();

  users        : Array<User>;
  private form : EventForm;

  constructor(
    private feed         : FeedService,
    private usersService : UsersService
  ) {
    this.users = usersService.allUsers;
  }

  ngOnInit() {
    const event_date = moment(this.eventDate).format('YYYY-MM-DD');
    this.form = new EventForm(new Event);
    this.form.defaultValue({ event_date });
  }

  onSubmit({ value, valid }: { value: Event, valid: boolean }) {
    // initiate submission of form.
    this.form.submitted = true;
    // send the form data to the backend if the value
    // format are valid.
    if (valid) {
      this.feed.addEvent(value).then((data) => {
        console.log(data);
        this.submitSuccess.emit(data);
      });
    }
  }
}
